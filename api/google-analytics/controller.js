const Controller = require('../../lib/controller');
const config = require('../../config');
const path = require('path');
const {
  google
} = require('googleapis');

class GoogleAnalyticsController extends Controller {
  constructor() {
    super();
    this.keyFile = config.google.keyFile;
    this.viewId = config.google.analytics.viewId;
  }

  users(req, res, next) {
    const resource = {
      reportRequests: [{
        viewId: this.viewId,
        dateRanges: [{
          startDate: '30daysAgo',
          endDate: 'today'
        }],
        metrics: [{
          expression: 'ga:users'
        }, {
          expression: 'ga:newUsers'
        }],
        dimensions: [{
          name: 'ga:date'
        }],
        includeEmptyRows: true
      }]
    };


    this.getBatch(resource)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  }

  getUserGeolocation(req, res, next) {
    const resource = {
      reportRequests: [{
        viewId: this.viewId,
        dateRanges: [{
          startDate: '30daysAgo',
          endDate: 'today'
        }],
        dimensions: [{
          name: 'ga:country'
        }],
        metrics: [{
          expression: 'ga:users'
        }]
      }]
    };
    this.getBatch(resource)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  }

  pageViews(req, res, next) {
    const resource = {
      reportRequests: [{
        viewId: this.viewId,
        dateRanges: [{
          startDate: '30daysAgo',
          endDate: 'today'
        }],
        dimensions: [{
          name: 'ga:pagePath'
        }],
        metrics: [{
          expression: 'ga:pageviews'
        }],
        includeEmptyRows: true
      }]
    };


    this.getBatch(resource)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  }

  pageViewsPerDay(req, res, next) {
    const resource = {
      reportRequests: [{
        viewId: this.viewId,
        dateRanges: [{
          startDate: '30daysAgo',
          endDate: 'today'
        }],
        dimensions: [{
          name: 'ga:date'
        }],
        metrics: [{
          expression: 'ga:pageviews'
        }],
        includeEmptyRows: true
      }]
    };


    this.getBatch(resource)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  }

  getBatch(resource) {
    return this.getClient([
      'https://www.googleapis.com/auth/analytics'
    ]).then(client => {
      const analyticsreporting = google.analyticsreporting({
        version: 'v4',
        auth: client
      });

      return analyticsreporting.reports.batchGet({
        resource
      }).then(res => {
        return res.data;
      });
    });
  }

  getClient(scopes = []) {
    return google.auth.getClient({
      keyFile: path.join(__dirname, '../../key.json'),
      scopes: scopes
    });
  }
}

module.exports = new GoogleAnalyticsController();