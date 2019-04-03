# github-rest-service
Promise Based NodeJS implementation for the Github API REST V3

General GitHub REST API v3 Documentation:  https://developer.github.com/v3/

### Setup:
The Github Search API has a custom rate limit. For requests using Basic Authentication, OAuth, or client ID and secret,
you can make up to 30 requests per minute.

For unauthenticated requests, the rate limit allows you to make up to 10 requests per minute.  If the GitHub userId and personalAccessToken are provided, the service is configured to use Basic Authentication.

Personal Access Token Setup:  https://github.com/settings/tokens

### Config Files:
There should be a .json file for each envionment.  The below command will use the development.json file.
```
SET NODE_ENV=development
```

```
{
  "application":{
    "name": "Github Connector"
  },
  "logging":{
    "default": "debug",
    "routes": "debug",
    "services": "debug"
  },
  "port": 3100,
  "apps":{
    "github": {
      "userId": "YOUR_GITHUB_USERID",
      "personalAccessToken": "YOUR_GITHUB_ACCESS_TOKEN"
    }
  }
}
```

### Example Usage:
```
var config = require('.././config')(); // will use whatever process.env.NODE_ENV is set to
OR
var config = require('.././config')("production"); // will use production.json in the /config folder

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

### Run as a Service
- npm start OR nodemon
```
POST  http://localhost:3100/github/search/users
body  { 'users': 'username' }

POST  http://localhost:3100/github/search/repositories
body  { 'repositories': 'html', 'per_page': 50, 'page': 5 }
```

### Includes automated testing using mocha, chai
- npm test
