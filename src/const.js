const AUTHORS = [
  'Ilya OReilly',
  'Anna Engelmann',
  'George Lucas',
  'Sergei Rudakov',
  'Olga Sukhova'
];

const COMMENTS = [
  'In conclusion, this was a wonderful film and I recommend it heartily for both kids and adults. For Disney fans too, I think you will be delighted, if you want humour, adventure, beautiful animation, good music, classic storytelling, witty scripting and likable characters, Tangled is a perfect match.',
  'All in all, a magical, hilarious, witty, and very well thought through movie that deserves the Oscar that is surely coming to it - simply the best animated movie of the year as, more even than Toy Story 3, it rises beyond animation to make a wonderful heart-filled adventure that makes for very satisfying viewing indeed.',
  'A wonderful movie! I had forgotten all about Tangled, and am so glad I got to see it on the big screen. A great story with fun characters and beautiful animation that still looks new.',
  'Bottom Line, ladies and gentleman, this is the Disney picture you have been waiting for. It will definitely win your heart and please audiences both young and old.',
  'Finally, my niece was happy because she was lifted by this beautiful pink princess (almost a sister for her) while my nephew got bored because the movie was lacking action and fights! In a decade, i am sure he will change his opinion!'
];

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const COMMENTS_MAX_COUNT = 8;

const FILMS = [
  {
    title: 'A Little Pony Without The Carpet',
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: 5,
    poster: 'images/posters/blue-blazes.jpg',
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitan'
    ],
    actors: [
      'Morgan Freeman'
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland'
    },
    runtime: 'Tom Ford',
    genre: [
      'Comedy'
    ],
    description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  },
  {
    title: 'Moana',
    alternativeTitle: 'The ocean is calling',
    totalRating: 5,
    poster: 'images/posters/popeye-meets-sinbad.png',
    ageRating: 8,
    director: 'Ron Clements',
    writers: [
      'Jared Bush'
    ],
    actors: [
      'Aulii Cravalho',
      'Dwayne Johnson',
      'Rachel House',
      'Temuera Morrison',
      'Jemaine Clement'
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'USA'
    },
    runtime: 'Ron Clements',
    genre: [
      'Animation',
      'Adventure',
      'Comedy',
      'Family',
      'Fantasy',
      'Musical'
    ],
    description: 'In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moanas island, she answers the Oceans call to seek out the Demigod to set things right.',
  },
  {
    title: 'Tangled',
    alternativeTitle: 'Theyre taking adventure to new lengths.',
    totalRating: 5,
    poster: 'santa-claus-conquers-the-martians.jpg',
    ageRating: 8,
    director: 'Ron Clements',
    writers: [
      'Dan Fogelman'
    ],
    actors: [
      'Mandy Moore',
      'Zachary Levi',
      'Donna Murphy',
      'Ron Perlman',
      'M.C. Gainey'
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'USA'
    },
    runtime: 'Ron Clements',
    genre: [
      'Animation',
      'Adventure',
      'Comedy',
      'Family',
      'Fantasy',
      'Musical'
    ],
    description: 'After receiving the healing powers from a magical flower, the baby Princess Rapunzel is kidnapped from the palace in the middle of the night by Mother Gothel.',
  }
];

export {AUTHORS, COMMENTS, EMOTIONS, COMMENTS_MAX_COUNT, FILMS};
