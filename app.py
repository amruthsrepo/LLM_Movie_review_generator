import json
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

load_dotenv()

DEFAULT_OPEN_AI_MODEL = 'text-davinci-003'

app = Flask(__name__)
CORS(app)

@app.get('/api/get/review')
@cross_origin()
def get_review():
    args = request.args
    movie_title=args.get('movie_title')

    prompt = "Write a movie review for the movie \"{movie_title}\". The review should be less than 100 words long. The review should be written in the first person. The review should be written in the active voice."
    prompt = prompt.format(
        movie_title=movie_title,
    )
    response = client.completions.create(model = DEFAULT_OPEN_AI_MODEL,
    prompt = prompt,
    temperature = 0.5,
    max_tokens = 500,
    top_p = 1,
    frequency_penalty = 0.0,
    presence_penalty=1.0)

    return response.choices[0].text.strip()


@app.get('/api/get/plot')
@cross_origin()
def get_plot():
    args = request.args
    movie_title=args.get('movie_title')
    PLOT_WORDS = 200

    PROMPT='Summarize the plot of the movie "{movie_title}" in {plot_words} words'.format(
        movie_title=movie_title,
        plot_words=PLOT_WORDS,
    )
    response = client.completions.create(model=DEFAULT_OPEN_AI_MODEL,
    prompt=PROMPT,
    temperature=1,
    max_tokens=PLOT_WORDS * 2,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0)
    return response.choices[0].text.strip()

@app.get('/api/get/director')
@cross_origin()
def get_director():
    args = request.args
    movie_title=args.get('movie_title')
    PROMPT='Give me the director of the movie "{movie_title}", give me just the full name with no other words, characters, symbols nor punctuation added'.format(
        movie_title=movie_title
    )
    response = client.completions.create(model=DEFAULT_OPEN_AI_MODEL,
    prompt=PROMPT,
    temperature=1,
    max_tokens=64,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0)
    return response.choices[0].text.strip()

@app.get('/api/get/year')
@cross_origin()
def get_year():
    args = request.args
    movie_title=args.get('movie_title')
    PROMPT='Give me the year of the release of the movie "{movie_title}", give me just the year with no other words, characters, symbols nor punctuation added'.format(
        movie_title=movie_title
    )
    response = client.completions.create(model=DEFAULT_OPEN_AI_MODEL,
    prompt=PROMPT,
    temperature=1,
    max_tokens=64,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0)
    return response.choices[0].text.strip()

@app.get('/api/get/genre')
@cross_origin()
def get_genre():
    args = request.args
    movie_title=args.get('movie_title')
    PROMPT='Give me the genre of the movie "{movie_title}", give me just the genre with no other words, characters, symbols nor punctuation added'.format(
        movie_title=movie_title
    )
    response = client.completions.create(model=DEFAULT_OPEN_AI_MODEL,
    prompt=PROMPT,
    temperature=1,
    max_tokens=64,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0)
    return response.choices[0].text.strip()

@app.route('/')
def index_page():
    return render_template('index.html')
