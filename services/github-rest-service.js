var request = require('request-promise-native');
var _ = require('lodash');
var winston = require('winston');
var btoa = require('btoa');
var LOGGER = winston.loggers.get('services');

/*
Promise Based service for the Github Search API V3 (REST based)

https://developer.github.com/v3/search/

The Search API has a custom rate limit. For requests using Basic Authentication, OAuth, or client ID and secret,
you can make up to 30 requests per minute.

For unauthenticated requests, the rate limit allows you to make up to 10 requests per minute.

To authenticate your requests, update the /config/<environment>.json
    ...
    "apps":{
      "github": {
        "userId": "",               <-- update me
        "personalAccessToken": ""   <-- update me
      }
    }
    ...
*/
class GithubService {
  constructor(userId='', personalAccessToken='', logger=LOGGER) {
    this.userId = userId;
    this.personalAccessToken = personalAccessToken;
    this.LOGGER = logger;
    this.baseUrl = 'https://api.github.com';
    this.defaultSearchOpts = {q:'',page:1,per_page:10,sort:'score',order:'desc'};
    this.headers={
      'User-Agent': 'jraflores/github-rest-service',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    if( userId && personalAccessToken ) {
      let token = btoa(userId + ':' + personalAccessToken);
      this.headers['Authorization'] = `basic ${token}`;
    }
  }

  /*
  https://developer.github.com/v3/search/#search-users
  */
  SearchUsers(searchOpts){
    var self = this;
    return new Promise((resolve, reject) => {
      self.ValidateSearchOptions( searchOpts )
      .then( opts => {
        let url = `${this.baseUrl}/search/users?q=${opts.q}&page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}&order=${opts.order}`;
        self.LOGGER.debug( `Request to URL: ${url}` );
        return httpGet( url, this.headers );
      })
      .then( results => {
        //self.LOGGER.debug( JSON.stringify( results ) );
        resolve(results);
      })
      .catch( error => {
        self.LOGGER.error( error );
        reject(error);
      })
    });
  }

  /*
  https://developer.github.com/v3/search/#search-repositories
  */
  SearchRepositories(searchOpts){
    var self = this;
    return new Promise((resolve, reject) => {
      self.ValidateSearchOptions( searchOpts )
      .then( opts => {
        let url = `${this.baseUrl}/search/repositories?q=${opts.q}&page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}&order=${opts.order}`;
        self.LOGGER.debug( `Request to URL: ${url}` );
        let custom = this.headers;
        custom["Accept"] = "application/vnd.github.symmetra-preview+json";
        return httpGet( url, custom );
      })
      .then( results => {
        //self.LOGGER.debug( JSON.stringify( results ) );
        resolve(results);
      })
      .catch( error => {
        self.LOGGER.error( error );
        reject(error);
      })
    });
  }

  /*
  https://developer.github.com/v3/search/#search-commits
  */
  SearchCommits(searchOpts){
    var self = this;
    return new Promise((resolve, reject) => {
      self.ValidateSearchOptions( searchOpts )
      .then( opts => {
        let url = `${this.baseUrl}/search/commits?q=${opts.q}&page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}&order=${opts.order}`;
        self.LOGGER.debug( `Request to URL: ${url}` );
        let custom = this.headers;
        custom["Accept"] = "application/vnd.github.cloak-preview";
        return httpGet( url, custom );
      })
      .then( results => {
        //self.LOGGER.debug( JSON.stringify( results ) );
        resolve(results);
      })
      .catch( error => {
        self.LOGGER.error( error );
        reject(error);
      })
    });
  }

  /*
  https://developer.github.com/v3/search/#search-code
  */
  SearchCode(searchOpts){
    var self = this;
    return new Promise((resolve, reject) => {
      self.ValidateSearchOptions( searchOpts )
      .then( opts => {
        let url = `${this.baseUrl}/search/code?q=${opts.q}&page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}&order=${opts.order}`;
        self.LOGGER.debug( `Request to URL: ${url}` );
        return httpGet( url, this.headers );
      })
      .then( results => {
        //self.LOGGER.debug( JSON.stringify( results ) );
        resolve(results);
      })
      .catch( error => {
        self.LOGGER.error( error );
        reject(error);
      })
    });
  }

  /*
  https://developer.github.com/v3/search/#search-issues
  */
  SearchIssues(searchOpts){
    var self = this;
    return new Promise((resolve, reject) => {
      self.ValidateSearchOptions( searchOpts )
      .then( opts => {
        let url = `${this.baseUrl}/search/issues?q=${opts.q}&page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}&order=${opts.order}`;
        self.LOGGER.debug( `Request to URL: ${url}` );
        let custom = this.headers;
        custom["Accept"] = "application/vnd.github.symmetra-preview+json";
        return httpGet( url, custom );
      })
      .then( results => {
        //self.LOGGER.debug( JSON.stringify( results ) );
        resolve(results);
      })
      .catch( error => {
        self.LOGGER.error( error );
        reject(error);
      })
    });
  }

  /*
  https://developer.github.com/v3/search/#search-topics
  */
  SearchTopics(searchOpts){
    var self = this;
    return new Promise((resolve, reject) => {
      self.ValidateSearchOptions( searchOpts )
      .then( opts => {
        let url = `${this.baseUrl}/search/topics?q=${opts.q}&page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}&order=${opts.order}`;
        self.LOGGER.debug( `Request to URL: ${url}` );
        let custom = this.headers;
        custom["Accept"] = "application/vnd.github.mercy-preview+json";
        return httpGet( url, custom );
      })
      .then( results => {
        //self.LOGGER.debug( JSON.stringify( results ) );
        resolve(results);
      })
      .catch( error => {
        self.LOGGER.error( error );
        reject(error);
      })
    });
  }

  /*
  https://developer.github.com/v3/search/#search-labels
  */
  SearchLabels(searchOpts){
    var self = this;
    let url;
    return new Promise((resolve, reject) => {
      self.ValidateSearchOptions( searchOpts, [{field: 'repository_id', validationType: 'required'}] )
      .then( opts => {
        url = `${this.baseUrl}/search/labels?repository_id=${opts.repository_id}&q=${opts.q}&page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}&order=${opts.order}`;
        self.LOGGER.debug( `Request to URL: ${url}` );
        let custom = this.headers;
        custom["Accept"] = "application/vnd.github.symmetra-preview+json";
        return httpGet( url, custom );
      })
      .then( results => {
        //self.LOGGER.debug( JSON.stringify( results ) );
        resolve(results);
      })
      .catch( error => {
        //self.LOGGER.error( error );
        self.LOGGER.error( url );
        reject(error);
      })
    });
  }

  ValidateSearchOptions( opts, additionalValidation ){
    return new Promise((resolve, reject) => {
      let errors = [];

      // Standard Validation
      if( !opts.q || opts.q === ''){
        errors.push( `"q" is required` );
      }
      if( !opts.page || _.isNaN( opts.page ) || opts.page < 1){
        opts.page = this.defaultSearchOpts.page;
      }
      if( !opts.per_page || _.isNaN( opts.per_page ) || opts.per_page < 1 || opts.per_page > 100 ){
        opts.per_page = this.defaultSearchOpts.per_page;
      }
      if( !opts.sort || opts.sort === ''){
        opts.sort = this.defaultSearchOpts.sort;
      }
      if( !opts.order || !['asc', 'desc'].indexOf( _.toLower(opts.order) ) ){
        opts.order = this.defaultSearchOpts.order;
      }

      // Optional Validation
      if( additionalValidation ) {
        _.forEach(additionalValidation, (validation) => {
          if( !opts[validation.field] && _.toLower(validation.validationType) === 'required')
            errors.push( `${validation.field} is ${validation.validationType}` );
        });
      }

      if( _.isEmpty( errors ) )
        resolve( opts )
      else
        reject( errors )
    });
  }
}

module.exports=GithubService;

/************* Private Functions ******************/
/*
  GitHub requires 'User-Agent'
  https://developer.github.com/v3/#user-agent-required
*/
function httpGet(url, headers={'User-Agent': 'github-rest-service-v3', 'Accept': 'application/json', 'Content-Type': 'application/json'}) {
  return new Promise((resolve, reject) => {
    return request({
      url: url,
      method: 'GET',
      json: true,
      headers: headers
    })
    .then(function(result){
      resolve(result);
    })
    .catch(function(err){
      reject(err);
    });
  });
}
