import os
from dotenv import load_dotenv
# Load Environment Variables
load_dotenv()

# Reading arguments when script called, python3 send_mail.py TO_EMAIL AUTH_CODE
import sys
TO_EMAIL = sys.argv[1]
AUTH_CODE = sys.argv[2]

# Mailing module
import smtplib
from email.message import EmailMessage

# From .env
EMAIL_ACCOUNT = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

# Set up the email components
msg = EmailMessage()
msg["Subject"] = "Your IU Auth Bot verification code!"
msg["From"] = "IU Auth Bot - Telegram"
msg.set_content("Message the following code to @iu_auth_bot telegram and it will add you to the student chat: \n{}".format(AUTH_CODE))

# Check for valid email!
msg["To"] = str(TO_EMAIL)

# Set up the SMTP server
smtp_server = smtplib.SMTP(SMTP, PORT)  # Replace with your SMTP server details
smtp_server.starttls()
smtp_server.login(EMAIL_ACCOUNT, EMAIL_PASSWORD)  # Replace with your email and password

# Send the email
smtp_server.send_message(msg)

# Close the SMTP server
smtp_server.quit()