# github-rest-service
Promise Based NodeJS implementation for the Github API REST V3

Documentation:  https://developer.github.com/v3/

Example Usage:
```
var GitHubRestService = require('../services/github-rest-service');
var service = new GitHubRestService(config.apps.github.userId, config.apps.github.personalAccessToken, LOGGER);
var searchOptions = {q: 'username', page: 1, per_page: 100, sort: 'stars', order: 'desc' };
service.SearchUsers( searchOptions )
.then( results => {
  return anotherPromise(results.items);
})
.then( results => {
  // more code here
})
.catch( error => {
  LOGGER.error( error )
});
```    

Run as a Service
- npm start OR nodemon
```
POST  http://localhost:3100/github/search/users
body  { 'users': 'username' }

POST  http://localhost:3100/github/search/repositories
body  { 'repositories': 'html', 'per_page': 50, 'page': 5 }
```

Includes automated testing using mocha, chai
- npm test
