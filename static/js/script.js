const MOVIES = [
    {
        id: 1,
        title: 'Indiana Jones and the Last Crusade',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Indiana_Jones_and_the_Last_Crusade.png/220px-Indiana_Jones_and_the_Last_Crusade.png'
    },
    {
        id: 2,
        title: 'The Goonies',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Goonies.jpg/220px-The_Goonies.jpg'
    },
    {
        id: 3,
        title: 'Schindler\'s List',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg'
    },
    {
        id: 4,
        title: 'Dead Poets Society',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Dead_poets_society.jpg/220px-Dead_poets_society.jpg'
    },
    {
        id: 5,
        title: 'The Shawshank Redemption',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg'
    },
    {
        id: 6,
        title: 'Star Wars',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/StarWarsMoviePoster1977.jpg/220px-StarWarsMoviePoster1977.jpg'
    },
    {
        id: 7,
        title: 'The Pursuit of Happyness',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Poster-pursuithappyness.jpg/220px-Poster-pursuithappyness.jpg'
    },
    {
        id: 8,
        title: 'Lincoln',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Lincoln_2012_Teaser_Poster.jpg/220px-Lincoln_2012_Teaser_Poster.jpg'
    },
    {
        id: 9,
        title: 'Pretty Woman',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/b/b6/Pretty_woman_movie.jpg'
    },
    {
        id: 10,
        title: 'Before Sunrise',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/d/da/Before_Sunrise_poster.jpg'
    },
    {
        id: 11,
        title: 'Braveheart',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Braveheart_imp.jpg/220px-Braveheart_imp.jpg'
    },
    {
        id: 12,
        title: 'Love Actually',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Love_Actually_movie.jpg'
    }    
];

const USERS = [
  {
    id: 1,
    name: 'John',
    age: 10,
    preferred_genres: ['Adventure'],
    proficiency: "basic"
  },
  {
    id: 2,
    name: 'Lisa',
    age: 35,
    preferred_genres: ['Historical Drama'],
    proficiency: "intermediate"
  },
  {
    id: 3,
    name: 'Jane',
    age: 42,
    preferred_genres: ['Science Fiction'],
    proficiency: "advanced"
  }
]

const REQUESTS = [
    {
        button_path: 'button.plot',
        output_div_path: 'div.movie-plot',
        url: '/api/get/plot'
    },
    {
        button_path: 'button.review',
        output_div_path: 'div.movie-review',
        url: '/api/get/review'
    },
    {
        button_path: 'button.director',
        output_div_path: 'div.movie-director',
        url: '/api/get/director',
    },
    {
        button_path: 'button.year',
        output_div_path: 'div.movie-year',
        url: '/api/get/year'
    },
    {
        button_path: 'button.genre',
        output_div_path: 'div.movie-genre',
        url: '/api/get/genre'
    }
];

function addUsersDropdown() {
    var $user_dropdown = $('#user-dropdown');
    $user_dropdown.append(`
      <option value="">All Users</option>
    `);
    USERS.forEach(
        function(user) {
          $user_dropdown.append(`
            <option value="${user.id}">${user.name}</option>
          `);
        }
    )
}

function addMoviesHTML(movies) {
    movies.forEach(
        function(movie) {
            $('div.movie-table').append(`
                <div class="movie-row" data-id="${movie.id}">
                    <div class="movie-cell">
                        <strong>${movie.title}</strong><br/>
                        <img src="${movie.img_url}" alt="Movie Poster">
                    </div>
                    <div class="movie-cell">
                        <div class="movie-info">
                            <button class="button director"">Show director</button>
                            <button class="button year"">Show year</button>
                            <button class="button genre"">Show genre</button>
                            <button class="button plot"">Generate plot</button>
                            <button class="button review"">Generate review</button>
                            <button class="button reset-plot">Reset plot</button>
                            <div class="movie-director"></div>
                            <div class="movie-year"></div>
                            <div class="movie-genre"></div>
                            <div class="movie-plot"></div>
                            <div class="movie-review"></div>
                        </div>
                    </div>
                </div>
            `);
        }
    )
}

function filterAndAddMoviesHTML() {
    $('div.movie-table').empty();
    var selected_user_id = $('#user-dropdown').val();
    if (selected_user_id === '') {
        addMoviesHTML(MOVIES);
    }
    else {
        var selected_user = USERS[USERS.findIndex(x => x.id == selected_user_id)];
        var data = {};
        data.user = selected_user;
        data.movies = MOVIES.map(
            function(movie) {
              return {
                id: movie.id,
                title: movie.title
              }
            }
        );
       $.ajax({
            url: '/api/get/filtered_movies',
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            cache: false,
            success: function(response) {
                var movies_to_show = MOVIES.filter(movie => response.includes(movie.id));
                addMoviesHTML(movies_to_show);
            }
        });
    }
}

function getData(movie_id, request) {
    var selected_movie = MOVIES[MOVIES.findIndex(x => x.id == movie_id)];
    var selected_user_id = $('#user-dropdown').val();
    var selected_user = USERS[USERS.findIndex(x => x.id == selected_user_id)];
    var data = {
        movie_id: movie_id,
        movie_title: selected_movie.title,
        user: JSON.stringify(selected_user)
    };
    var $div_output = $(`div.movie-row[data-id="${movie_id}"] ${request.output_div_path}`);
    $.ajax({
        url: request.url,
        type: 'GET',
        crossDomain: true,
        data: data,
        cache: false,
        success: function(response) {
            $div_output.append(
                `<p>${response}</p>`
            )
        }
    });
}

function addEvents() {
    $(document).on(
        'change',
        '#user-dropdown',
        function(event) {
            event.preventDefault();
            filterAndAddMoviesHTML();
        }
    );

    $(document).on(
        'click',
        'button.reset-plot',
        function(event) {
            event.preventDefault();
            $button = $(event.currentTarget);
            var $div_movie_plot = $button.parents('div.movie-row').find('div.movie-plot');
            $div_movie_plot.empty();
        }
    );

    REQUESTS.forEach(
        function(request) {
            $(document).on(
                'click',
                request.button_path,
                function(event) {
                    event.preventDefault();
                    $button = $(event.currentTarget);
                    var movie_id = $button.parents('div.movie-row').data('id');
                    getData(
                        movie_id,
                        request
                    );
                }
            );
        }
    )
}

$(document).ready(
    function() {
        addUsersDropdown();
        filterAndAddMoviesHTML();
        addEvents();
   }
)