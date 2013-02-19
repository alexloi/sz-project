module.exports = {
	development: {
		root: require('path').normalize(__dirname + '/..')
		,app: {
			name: 'dev / sz-project'
		  , url: 'http://localhost:3000'
		}
		,db: 'mongodb://localhost/szproject'
	}
	, staging: {
		root: require('path').normalize(__dirname + '/..')
		,app: {
			name: 'staging / sz-project'
	      , url: 'http://staging-szproject.herokuapp.com'
		}
		,db: process.env.MONGOLAB_URI
	}
	
	, production: {
		root: require('path').normalize(__dirname + '/..')
		,app: {
			name: 'production / sz-project'
			, url: 'http://production-szproject.herokuapp.com'
		}
		,db: process.env.MONGOLAB_URI
	}
}
