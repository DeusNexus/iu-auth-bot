// Set environment variables
const dotenv = require('dotenv');
dotenv.config();

const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const fs = require('fs');
const { parse } = require('csv-parse')

const domains = []
const chats = []

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
    bot.launch();

    function list_chats(ctx) {
        msg = 'Available student chats:\n' +
            chats.map((chat) => `${chat}\n`).join("")
        ctx.reply(msg)
    }

    function auth(ctx) {
        ctx.reply('Your telegram chat id: ' + ctx.message.chat.id)
    }

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

