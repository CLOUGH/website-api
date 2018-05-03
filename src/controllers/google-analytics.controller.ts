import { Router, Request, Response, NextFunction } from "express";
import { GOOGLE_KEY_FILE, GOOGLE_ANALYTICS_VIEW_ID } from "../util/secrets";
import { google } from "googleapis";

export class GoogleAnalyticsController {
  constructor(public router: Router) {
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/google-analytics", this.index.bind(this));
    this.router.get("/google-analytics/users", this.users.bind(this));
    this.router.get("/google-analytics/page-views", this.pageViews.bind(this));
    this.router.get("/google-analytics/page-views-per-day", this.pageViewsPerDay.bind(this));
    this.router.get("/google-analytics/user-geolocation", this.getUserGeolocation.bind(this));
  }

  index(req: Request, res: Response, next: NextFunction) {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

    res.json({
      links: [
        `${fullUrl}/users`,
        `${fullUrl}/page-views`,
        `${fullUrl}/page-views-per-day`,
        `${fullUrl}/user-geolocation`
      ]
    });
  }
  users(req, res, next) {
    const resource = {
      reportRequests: [{
        viewId: GOOGLE_ANALYTICS_VIEW_ID,
        dateRanges: [{
          startDate: "30daysAgo",
          endDate: "today"
        }],
        metrics: [{
          expression: "ga:users"
        }, {
          expression: "ga:newUsers"
        }],
        dimensions: [{
          name: "ga:date"
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
        viewId: GOOGLE_ANALYTICS_VIEW_ID,
        dateRanges: [{
          startDate: "30daysAgo",
          endDate: "today"
        }],
        dimensions: [{
          name: "ga:country"
        }],
        metrics: [{
          expression: "ga:users"
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
        viewId: GOOGLE_ANALYTICS_VIEW_ID,
        dateRanges: [{
          startDate: "30daysAgo",
          endDate: "today"
        }],
        dimensions: [{
          name: "ga:pagePath"
        }],
        metrics: [{
          expression: "ga:pageviews"
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
        viewId: GOOGLE_ANALYTICS_VIEW_ID,
        dateRanges: [{
          startDate: "30daysAgo",
          endDate: "today"
        }],
        dimensions: [{
          name: "ga:date"
        }],
        metrics: [{
          expression: "ga:pageviews"
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
      "https://www.googleapis.com/auth/analytics"
    ]).then(client => {
      const analyticsreporting = google.analyticsreporting({
        version: "v4",
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
      keyFile: GOOGLE_KEY_FILE,
      scopes: scopes
    });
  }
}
