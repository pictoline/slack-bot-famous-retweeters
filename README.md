# slack-bot-famous-retweeters
Notify your Slack team when a popular user retweets you.

## Install
Clone this repo, move into it, and install its dependencies:

```
git clone https://github.com/pictoline/slack-bot-famous-retweeters
cd slack-bot-famous-retweeters
npm install
```

Now you'll need to create a `.env` file where you will store come environment variables. These will store API tokens needed for connecting to the Twitter and Slack APIs.

```
// .env
SLACK_WEBHOOK_URL="SLACK_WEBHOOK_URL"
TWITTER_CONSUMER_KEY="TWITTER_CONSUMER_KEY"
TWITTER_CONSUMER_SECRET="TWITTER_CONSUMER_SECRET"
TWITTER_ACCESS_TOKEN="TWITTER_ACCESS_TOKEN"
TWITTER_ACCESS_TOKEN_SECRET="TWITTER_ACCESS_TOKEN_SECRET"
```

You can get the SLACK_WEBHOOK_URL from [Slack Integrations](https://my.slack.com/services/new/incoming-webhook) and the Twitter Tokens from [Twitter Applications](http://apps.twitter.com/).

Finally, edit the `src/index.js` with the user and followers threshold you want. The user is the account you want to track and the threshold is the minimum amount of followers the retweeting account must have in order to send a message to Slack.

## Run the application
You can run the application with `npm run dev`.
