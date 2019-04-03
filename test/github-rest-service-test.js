const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// Config running under 'local' ------------------------------------------------
var config = require('.././config')("local");

// Service to Test -------------------------------------------------------------
var GitHubRestService = require('../services/github-rest-service');

describe('Test Runner for github-rest-service', () => {

  let LOGGER, githubRest;

  before(() => {
    LOGGER = console;
    githubRest = new GitHubRestService(config.apps.github.userId, config.apps.github.personalAccessToken, LOGGER);
  });

  describe('Methods Defined', () => {
    it('SearchUsers', () => {
      expect(typeof githubRest.SearchUsers).to.equal('function');
    });
    it('SearchRepositories', () => {
      expect(typeof githubRest.SearchRepositories).to.equal('function');
    });
    it('SearchCode', () => {
      expect(typeof githubRest.SearchCode).to.equal('function');
    });
    it('SearchIssues', () => {
      expect(typeof githubRest.SearchIssues).to.equal('function');
    });
    it('SearchTopics', () => {
      expect(typeof githubRest.SearchTopics).to.equal('function');
    });
    it('SearchLabels', () => {
      expect(typeof githubRest.SearchLabels).to.equal('function');
    });
    it('httpGet', () => {
      expect(typeof githubRest.httpGet).to.equal('undefined');
    });
  });

  describe('SearchUsers Tests', () => {
    it('Search for a single user: "jraflores"', () => {
      return githubRest.SearchUsers({q: "jraflores"}).then((results) => {
        expect(results.items).to.have.lengthOf(1);
      });
    });
    it('Search for a list: "api"', () => {
      return githubRest.SearchUsers({q: "api", per_page: -10, page: "dfsadsaf"}).then((results) => {
        expect(results.items).to.have.lengthOf(10);
      });
    });
  });

  describe('SearchRepositories Tests', () => {
    it('Search for a list: "api"', () => {
      return githubRest.SearchRepositories({q: "api", per_page: -1, page: 2}).then((results) => {
        expect(results.items).to.have.lengthOf(10);
      });
    });
  });

  describe('SearchCommits Tests', () => {
    it('Search for a list: "initial commit"', () => {
      return githubRest.SearchCommits({q: "initial commit"}).then((results) => {
        expect(results.items).to.have.lengthOf(10);
      });
    });
  });

  describe('SearchCode Tests', () => {
    it('Search for a list: "java"', () => {
      return githubRest.SearchCode({q: "java"}).then((results) => {
        expect(results.items).to.have.lengthOf(10);
      });
    });
  });

  describe('SearchIssues Tests', () => {
    it('Search for a list: "linux"', () => {
      return githubRest.SearchIssues({q: "linux"}).then((results) => {
        expect(results.items).to.have.lengthOf(10);
      });
    });
  });

  describe('SearchTopics Tests', () => {
    it('Search for a list: "nodejs"', () => {
      return githubRest.SearchTopics({q: "nodejs"}).then((results) => {
        expect(results.items).to.have.lengthOf(10);
      });
    });
  });

  describe('SearchLabels Tests', () => {
    it('Search for: "html"', () => {
      return githubRest.SearchLabels({q: "html", repository_id: "176592549"}).then((results) => {
        expect(results.items).to.have.lengthOf(0);
      });
    });
  });

});
