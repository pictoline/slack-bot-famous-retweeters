import request from 'request'
import TwitterAPI from 'twit'

const twitter = new TwitterAPI({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const USER = 'pictoline'
const THRESHOLD = 100000

const stream = twitter.stream('statuses/filter', {track: USER})

stream.on('connect', request => console.log(`Connecting to Twitter...`))
stream.on('connected', response => console.log(`Connected!`))
stream.on('tweet', tweet => {
  const isRetweetByPopularUser = isRetweetOfUser(tweet, USER) && isPopularUser(tweet.user, THRESHOLD)
  if (isRetweetByPopularUser) {
    const requestOptions = prepareRequest(tweet)
    request(requestOptions)
  }
})

function isRetweetOfUser (tweet, user) {
  return tweet.retweeted_status && tweet.retweeted_status.user.screen_name === user
}

function isPopularUser (user, threshold) {
  return user.followers_count >= threshold
}

function prepareRequest (tweet) {
  const payload = {
    text: `Retweeted by ${tweet.user.screen_name}.`
  }

  return {
    uri: process.env.SLACK_WEBHOOK_URL,
    method: 'POST',
    body: JSON.stringify(payload)
  }
}
