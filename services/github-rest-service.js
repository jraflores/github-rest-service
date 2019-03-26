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
*/
class GithubService {
  constructor(userId='', personalAccessToken='', logger=LOGGER) {
    this.userId = userId;
    this.personalAccessToken = personalAccessToken;
    this.LOGGER = logger;
    this.baseUrl = 'https://api.github.com';
    this.defaultSearchOpts = {q:'',page:1,per_page:10,sort:'score',order:'desc'};
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
        return httpGet( url );
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
        return httpGet( url );
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
        return httpGet( url );
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
        return httpGet( url );
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
        return httpGet( url );
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
    return new Promise((resolve, reject) => {
      self.ValidateSearchOptions( searchOpts )
      .then( opts => {
        let url = `${this.baseUrl}/search/labels?q=${opts.q}&page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}&order=${opts.order}`;
        self.LOGGER.debug( `Request to URL: ${url}` );
        return httpGet( url );
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

  ValidateSearchOptions( opts ){
    return new Promise((resolve, reject) => {
      if( !opts.q || opts.q === ''){
        reject('"q" is required');
      }
      if( !opts.page || _.isNaN( opts.page ) || opts.page < 1){
        opts.page = this.defaultSearchOpts.page;
      }
      if( !opts.per_page || _.isNaN( opts.per_page ) || opts.per_page < 1){
        opts.per_page = this.defaultSearchOpts.per_page;
      }
      if( !opts.sort || opts.sort == ''){
        opts.sort = this.defaultSearchOpts.sort;
      }
      if( !opts.order || !['asc', 'desc'].indexOf( _.toLower(opts.order) ) ){
        opts.order = this.defaultSearchOpts.order;
      }
      resolve(opts)
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