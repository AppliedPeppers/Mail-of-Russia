import requests


def send_simple_message():
    return requests.post(
        "https://api.mailgun.net/v3/sandboxf59196e4ec034a71b57a0fcb2f1cbc26.mailgun.org/messages",
        auth=("api", "key-b5a852d3de3332fc83b0bbc6a57c9941"),
        data={"from": "Excited User <mailgun@sandboxf59196e4ec034a71b57a0fcb2f1cbc26.mailgun.org>",
              "to": ["epostarussia@gmail.com", "mailgun@sandboxf59196e4ec034a71b57a0fcb2f1cbc26.mailgun.org"],
              "subject": "Hello",
              "text": "Testing some Mailgun awesomness!"})

b = send_simple_message()
print(b)

"""
e-mail: epostarussia@gmail.com
пароль: 12eposta345
https://mailgun.com/app/dashboard
"""

"""
curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
    -F from='Sender Bob <sbob@YOUR_DOMAIN_NAME>' \
    -F to='alice@example.com' \
    -F subject='Hello' \
    -F text='Testing some Mailgun awesomness!' \
"""

