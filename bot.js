// Set environment variables
const dotenv = require('dotenv');
dotenv.config();

// For python code
const { exec } = require("child_process");

const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const fs = require('fs');
const { parse } = require('csv-parse')

const domains = ['@iubh.de','@iu.org','@iu-study.org',]
const chats = ['A - Description','B - Description','C - Description',]

async function load_chats () {
    // Read Chats CSV file
    return fs.createReadStream('chats.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', (r) => {
        // console.log(r);
        chats.push(r[0]);        
    })
    .on('end', () => {
        //console.log(chats);
    })
}

async function load_domains () {
    // Read Domains CSV file
    return fs.createReadStream('iu-domains.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', (r) => {
        // console.log(r);
        domains.push(r[0]);        
    })
    .on('end', () => {
        // console.log(domains);
    })
}

async function main() {
    console.log(chats)

    const bot = new Telegraf(process.env.BOT_TOKEN);
    bot.start((ctx) => ctx.reply('Welcome'));
    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.command('auth',(ctx) => auth(ctx))
    bot.command('list',(ctx) => list_chats(ctx))
    bot.command('email',(ctx) => email(ctx))
    bot.launch();

    function list_chats(ctx) {
        msg = 'Available student chats:\n' +
            chats.map((chat) => `${chat}\n`).join("")
        ctx.reply(msg)
    }

    function auth(ctx) {
        ctx.reply('Your telegram chat id: ' + ctx.message.chat.id)
    }

    function email(ctx) {
        try {       
            console.log(`python3 send_mail.py ${process.env.TEST_EMAIL} ${process.env.TEST_CODE}`)
            email_part = ctx.message.text.split(' ')[1]
            console.log(email_part)

            var valid_domain = false
            for(var i = 0; i < domains.length; i++) {
                if(email_part.includes(domains[0])) {
                    valid_domain = true
                }
            }

            //Implement more thorough checking
            if (valid_domain) {
                exec(`python3 send_mail.py ${process.env.TEST_EMAIL} ${process.env.TEST_CODE}`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return ctx.reply('Error')
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return ctx.reply('StdError')
                    }
                    console.log(`stdout: ${stdout}`);
                    return ctx.reply('Email send!')
                });
            } else {
                ctx.reply("You don't own a IU student email address, become a student to participate in online chats.")
            }

        } catch(e) {
            console.log(e)
            ctx.reply('Something went wrong!')
        }
    }

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

main()