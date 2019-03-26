var moment = require('moment');
var _ = require('lodash');
var config = require('../config')();

var express = require('express');
var router = express.Router();

var winston = require('winston');
var LOGGER = winston.loggers.get('routes');
var servicesLogger = winston.loggers.get('services');

var GitHubRestService = require('../services/github-rest-service');
var githubRestService = new GitHubRestService(config.apps.github.userId, config.apps.github.personalAccessToken, servicesLogger);

/* Am I running? */
router.get('/', function(req, res, next) {
  LOGGER.info(`GitHub Alive at ${moment().toISOString()}`);
  res.status(200).json({success: true, message: `${config.environment} - GitHub Alive at ${moment().toISOString()}`, data: {}});
});

/**
 * POST request to return GitHub search data
 *  examples)
 *    POST  http://localhost:3100/github/search/users
 *    body  { 'users': 'username' }
 *
 *    POST  http://localhost:3100/github/search/repositories
 *    body  { 'q': 'responsive', 'per_page': 50, 'page': 5 }
 */
router.post('/search/:searchType/', function(req, res) {
  let searchType = _.toLower( req.params.searchType );

  LOGGER.info( `POST: /search/${searchType}/ \n\t ${JSON.stringify( req.body )}` );

  let searchOpts = {
    q: req.body[searchType] || req.body.q || '', // accepts either 'searchType' or q in the request body
    page: req.body.page  || '1',
    per_page: req.body.per_page || '10',
    sort: req.body.sort || 'score',
    order: req.body.order || 'desc'
  }

  LOGGER.debug( JSON.stringify( searchOpts ) );

  if( searchType === 'users' ) {
    githubRestService.SearchUsers( searchOpts )
      .then( results => {
        res.status(200).json({success: true, message: `Success`, data: results });
      })
      .catch( error => {
        LOGGER.error( error );
        res.status(500).json({success: false, message: `Error: ${error}`, data: {}});
      })
  } else if( searchType === 'repositories' ) {
    githubRestService.SearchRepositories( searchOpts )
      .then( results => {
        res.status(200).json({success: true, message: `Success`, data: results });
      })
      .catch( error => {
        LOGGER.error( error );
        res.status(500).json({success: false, message: `Error: ${error}`, data: {}});
      })
  } else if( searchType === 'labels' ) {
    githubRestService.SearchLabels( searchOpts )
      .then( results => {
        res.status(200).json({success: true, message: `Success`, data: results });
      })
      .catch( error => {
        LOGGER.error( error );
        res.status(500).json({success: false, message: `Error: ${error}`, data: {}});
      })
  } else if( searchType === 'code' ) {
    githubRestService.SearchCode( searchOpts )
      .then( results => {
        res.status(200).json({success: true, message: `Success`, data: results });
      })
      .catch( error => {
        LOGGER.error( error );
        res.status(500).json({success: false, message: `Error: ${error}`, data: {}});
      })
  } else if( searchType === 'topics' ) {
    githubRestService.SearchTopics( searchOpts )
      .then( results => {
        res.status(200).json({success: true, message: `Success`, data: results });
      })
      .catch( error => {
        LOGGER.error( error );
        res.status(500).json({success: false, message: `Error: ${error}`, data: {}});
      })
  } else if( searchType === 'issues' ) {
    githubRestService.SearchIssues( searchOpts )
      .then( results => {
        res.status(200).json({success: true, message: `Success`, data: results });
      })
      .catch( error => {
        LOGGER.error( error );
        res.status(500).json({success: false, message: `Error: ${error}`, data: {}});
      })
  } else {
    res.status(404).json({success: false, message: `Not Found`, data: {}});
  }

});

module.exports = router;
