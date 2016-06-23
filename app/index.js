module.exports = function(app, Model, cors, url) {

	app.get('/route', function(req, res) {
		res.sendFile(process.cwd() + '/index.html')
	})

	app.get('/ejs', function(req, res) {
		res.render('index', {
			user: "Great User",
			title: "EJS"
		});
	})

	app.get('/json', cors(), function(req, res) {
		res.send(JSON.stringify({
			key: 'value',
			another_key: 654654654
		}))
	})

	app.get('/:url', function(req, res) {
		var URL = url.parse(req.url).pathname.replace(/%20/g, ' ').slice(1);

		res.send(JSON.stringify({
			url: URL
		}));
	})

	app.get('/query/:url', function(req, res) {
		var query = req.params.url;

		res.send(JSON.stringify({
			url : query
		}));
	})

	app.get('/save/:query', cors(), function(req, res) {
		var query = req.params.query;

		var savedata = new Model({
			'request': query,
			'time': Math.floor(Date.now() / 1000)
		}).save(function(err, result) {
			if (err) throw err;

			if(result) {
				console.log('Save: ' + result);
			}
		});
	})

	app.get('/find/:query', cors(), function(req, res) {
		var query = req.params.query;

		Model.find({
			'request': query
		}, function(err, result) {
			if (err) throw err;
			if (result) {
				res.json(result)
			} else {
				res.send(JSON.stringify({
					error : 'Error'
				}))
			}
		});
	})

	app.get('/findOne/:query', cors(), function(req, res) {
		var query = req.params.query;

		Model.findOne({
			'request': query
		}, function(err, result) {
			if (err) throw err;
			if (result) {
				res.json(result)
			} else {
				res.send(JSON.stringify({
					error : 'Error'
				}))
			}
		})
	})

}
