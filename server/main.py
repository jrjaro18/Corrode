from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from newsapi import NewsApiClient
from datetime import datetime
import tweepy
from corrode_data import *
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import time

app = FastAPI()
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

newsapi = NewsApiClient(api_key=news_api_key)
try:
    client = tweepy.Client(bearer_token=bearer_token,
                           consumer_key=api_key,
                           consumer_secret=api_secret,
                           access_token=access_token,
                           access_token_secret=access_token_secret
                           )
    print("client created\n")
except Exception as e:
    print("error in creating client\n")
    print(e)


@app.get("/get-news")
async def root(query: str):
    date = datetime.today().strftime('%Y-%m-%d')
    date = datetime.strptime(date, '%Y-%m-%d')
    date = date.replace(day=date.day-10)
    date = date.strftime('%Y-%m-%d')
    query = query.lower()
    print(query)

    try:
        news_sources = "abc-news,the-hindu,google-news-in,the-times-of-india,al-jazeera-english,bbc-news,abc-news-au,bloomberg"
        top_headlines = newsapi.get_everything(q=query,
                                               sources=news_sources,
                                               language='en',
                                               page_size=50,
                                               from_param=date,
                                               )
        print(len(top_headlines['articles']))
        newHeadlines = []
        sia = SentimentIntensityAnalyzer()
        for article in top_headlines['articles']:
            if (sia.polarity_scores(article['title'])['compound'] < -0.7):
                newHeadlines.append(article)
        return {"articles": newHeadlines}
    except Exception as e:
        print("error in news api\n")
        print(e)
        return {"error": "error in news api"}


@app.post("/check-user")
async def root(response: Response, body: dict):
    # print(body)
    user = ['rohan', 'jrjaro18', 'qwerty']
    try:
        if body['user'] in user:
            response.status_code = 200
            return {"user": "rohan"}
        else:
            response.status_code = 205
            return {"message": "user not found"}
    except Exception as e:
        print("error in checking user\n")
        print(e)
        response.status_code = 500
        return {"error": "error in checking user"}


@app.post("/post-news")
async def root(response: Response, body: dict):
    newHeadlines = body['articles']
    try:
        for article in newHeadlines:
            tokens = word_tokenize(article['title']+article['description'])
            stop_words = set(stopwords.words('english'))
            filtered_tokens = [
                word for word in tokens if word.lower() not in stop_words
            ]
            keywords = [word for word in filtered_tokens if word.isalnum()]
            hashtags = ['#' + keyword for keyword in keywords]
            hashtags = hashtags[:9]
            hashtags = list(set(hashtags))
            hashtagsString = ""
            for hashtag in hashtags:
                hashtagsString += hashtag + " "
            str = article['title'] + "\n" + \
                hashtagsString + "\n"+article['url']
            client.create_tweet(text=str)
            print("Done...........")
            time.sleep(5)
        response.status_code = 200
        return {"message": "done"}
    except Exception as e:
        response.status_code = 500
        print("error in tweeting news \n")
        print(e)
        return {"error": "error in tweeting news"}
