import songs from '../models/songs';

var Router = require('express').Router;
var uuid = require('uuid');

export default ({ config, db }) => {
	var router = Router(),
		key, fn, url;

	var route = {};
	route.load = (req, id, callback) => {
		let song = songs.find( song => song.id===id ),
			err = song ? null : 'Not found';
		callback(err, song);
	};
  route.id = 'song';

  router.param(route.id, function(req, res, next, id) {
    route.load(req, id, function(err, data) {
      if (err) return res.status(404).send(err);
      req[route.id] = data;
      next();
    });
  });

  var displaySong = (s) => {
    delete s.url;
    delete s.active;
    return s;
  }

  router.get('/', function({params}, res) {
    var f = songs.filter(song => song.active)
    f = f.map(x => Object.assign({}, x))
    f.map(displaySong);
		res.json(f);
  });

	router.post('/register', function({ body }, res) {
		body.id = uuid.v4();
    body.active = false;
    body.purchasers = [];
		songs.push(body);
		res.json(body);
  });

	router.post('/:song/purchase', function({ body, song }, res) {
		body.id = uuid.v4();
    body.payment = song.owner;
		res.json(body);
  });

	router.get('/:song', function({ song }, res) {
		res.json(displaySong(song));
	});

	return router;

	/** GET /:id - Return a given entity */
};
