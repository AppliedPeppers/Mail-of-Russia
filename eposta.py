import requests


def send_simple_message():
    return requests.post(
        "https://api.mailgun.net/v3/sandboxf59196e4ec034a71b57a0fcb2f1cbc26.mailgun.org/messages",
        auth=("api", "key-b5a852d3de3332fc83b0bbc6a57c9941"),
        data={"from": "Mailgun Sandbox <postmaster@sandboxf59196e4ec034a71b57a0fcb2f1cbc26.mailgun.org>",
              "to": "E <epostarussia@gmail.com>",
              "subject": "Hello E",
              "text": "Congratulations E, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free."})


