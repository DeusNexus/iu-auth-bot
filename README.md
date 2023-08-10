# IU International - Student Authentication Bot
### Purpose
Keeping student chats free of spammers, unsolicited private messages or scams. This bot will send an authentication code to your IU International email address, which enables you to participate in student chats.

## Usage
If you wish to join a chat, 
1. ask the bot to generate a new authentication 8-digit pin. 
2. A request to provide it with your IU student email will be prompted.
3. Send the email address in a text message back, it will confirm and show you where the confirmation email was send.
4. You have 24 hours to use the code, check spam in email inbox. After that your private data will be removed.
5. Redeem the code, and the bot will add you to the student chat.

## Technical Installation
- Local SMTP mail server from Postfix has to be installed: https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-as-a-send-only-smtp-server-on-ubuntu-22-04
- Port forwarding

### Data Privacy and Protection
You're private data is kept up to 24 hours so that the bot can grant you access to the student chat.
After it has added you, your 8-digit pin will no longer be valid. You're identifier (telegram_id) and email address will be removed.
Only if you want to join a new chat your data will be stored for a maximum of 24 hours.

## Disclaimer
The developed application is licensed under the GNU General Public License.