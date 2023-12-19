import json
import os
import openai
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

DEFAULT_OPEN_AI_MODEL = 'text-davinci-003'

app = Flask(__name__)
CORS(app)

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
    response = openai.Completion.create(
        model=DEFAULT_OPEN_AI_MODEL,
        prompt=PROMPT,
        temperature=1,
        max_tokens=PLOT_WORDS * 2,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return response.choices[0].text.strip()

@app.get('/api/get/director')
@cross_origin()
def get_director():
    args = request.args
    movie_title=args.get('movie_title')
    PROMPT='Give me the director of the movie "{movie_title}", give me just the full name with no other words, characters, symbols nor punctuation added'.format(
        movie_title=movie_title
    )
    response = openai.Completion.create(
        model=DEFAULT_OPEN_AI_MODEL,
        prompt=PROMPT,
        temperature=1,
        max_tokens=64,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return response.choices[0].text.strip()

@app.get('/api/get/year')
@cross_origin()
def get_year():
    args = request.args
    movie_title=args.get('movie_title')
    PROMPT='Give me the year of the release of the movie "{movie_title}", give me just the year with no other words, characters, symbols nor punctuation added'.format(
        movie_title=movie_title
    )
    response = openai.Completion.create(
        model=DEFAULT_OPEN_AI_MODEL,
        prompt=PROMPT,
        temperature=1,
        max_tokens=64,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return response.choices[0].text.strip()

@app.get('/api/get/genre')
@cross_origin()
def get_genre():
    args = request.args
    movie_title=args.get('movie_title')
    PROMPT='Give me the genre of the movie "{movie_title}", give me just the genre with no other words, characters, symbols nor punctuation added'.format(
        movie_title=movie_title
    )
    response = openai.Completion.create(
        model=DEFAULT_OPEN_AI_MODEL,
        prompt=PROMPT,
        temperature=1,
        max_tokens=64,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    return response.choices[0].text.strip()

@app.route('/')
def index_page():
    return render_template('index.html')
