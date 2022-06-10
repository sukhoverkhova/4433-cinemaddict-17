import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    delete film.commentList;

    const adaptedFilmInfo = {...film.filmInfo,
      'alternative_title': film.filmInfo.alternativeTitle,
      'total_rating': film.filmInfo.totalRating,
      'age_rating': film.filmInfo.ageRating,
      'release': {
        ...film.filmInfo.release,
        'release_country': film.filmInfo.release.releaseCountry
      }
    };

    delete adaptedFilmInfo.alternativeTitle;
    delete adaptedFilmInfo.totalRating;
    delete adaptedFilmInfo.ageRating;
    delete adaptedFilmInfo.release.releaseCountry;

    const adaptedUserDetails = {...film.userDetails,
      'already_watched': film.userDetails.alreadyWatched,
      'watching_date': film.userDetails.watchingDate,
    };

    delete adaptedUserDetails.alreadyWatched;
    delete adaptedUserDetails.watchingDate;

    const adaptedFilm = {...film,
      'film_info': adaptedFilmInfo,
      'user_details': adaptedUserDetails,
    };

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  };
}

// {
//   "id": "0",
//   "comments": [
//       "526644",
//       "526645",
//       "526646"
//   ],
//   "filmInfo": {
//       "title": "A Shark Who Saw Himself",
//       "poster": "images/posters/the-great-flamarion.jpg",
//       "director": "Brad Bird",
//       "writers": [
//           "Stephen Spielberg",
//           "Stephen King"
//       ],
//       "actors": [
//           "Morgan Freeman ",
//           "Ralph Fiennes",
//           "Gary Oldman",
//           "Edward Norton",
//           "Cillian Murphy"
//       ],
//       "release": {
//           "date": "2022-06-26T05:36:05.280Z"
//       },
//       "runtime": 200,
//       "genre": [
//           "Sci-Fi",
//           "Adventure",
//           "Family",
//           "Comedy"
//       ],
//       "description": "Oscar-winning film, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic \"Nu, Pogodi!\" and \"Alice in Wonderland\", a film about a journey that heroes are about to make in finding themselves, with the best fight scenes since Bruce Lee.",
//       "alternativeTitle": "Raiders In The Floor",
//       "totalRating": 6.6,
//       "ageRating": 0
//   },
//   "userDetails": {
//       "watchlist": true,
//       "favorite": false,
//       "alreadyWatched": true,
//       "watchingDate": "2022-01-12T14:28:02.983Z"
//   }
// }


// {
//   "id": "0",
//   "film_info": {
//       "title": "A Shark Who Saw Himself",
//       "alternative_title": "Raiders In The Floor",
//       "total_rating": 6.6,
//       "poster": "images/posters/the-great-flamarion.jpg",
//       "age_rating": 0,
//       "director": "Brad Bird",
//       "writers": [
//           "Stephen Spielberg",
//           "Stephen King"
//       ],
//       "actors": [
//           "Morgan Freeman ",
//           "Ralph Fiennes",
//           "Gary Oldman",
//           "Edward Norton",
//           "Cillian Murphy"
//       ],
//       "release": {
//           "date": "2022-06-26T05:36:05.280Z",
//           "release_country": "Spain"
//       },
//       "runtime": 200,
//       "genre": [
//           "Sci-Fi",
//           "Adventure",
//           "Family",
//           "Comedy"
//       ],
//       "description": "Oscar-winning film, true masterpiece where love and death are closer to heroes than their family, from the creators of timeless classic \"Nu, Pogodi!\" and \"Alice in Wonderland\", a film about a journey that heroes are about to make in finding themselves, with the best fight scenes since Bruce Lee."
//   },
//   "user_details": {
//       "watchlist": false,
//       "already_watched": true,
//       "watching_date": "2022-01-12T14:28:02.983Z",
//       "favorite": false
//   },
//   "comments": [
//       "526644",
//       "526645",
//       "526646"
//   ]
// }
