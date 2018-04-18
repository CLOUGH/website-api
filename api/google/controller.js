const Controller = require('../../lib/controller');
const config = require('../../config');
const {
  google
} = require('googleapis');

class GoogleApiController extends Controller {
  test(req, res, next) {
    res.json(google);
    // const urlshortener = google.urlshortener({
    //   version: 'v1',
    //   auth: config.googleApi.
    // });

    // const params = {
    //   shortUrl: 'http://goo.gl/xKbRu3'
    // };

    // // get the long url of a shortened url
    // urlshortener.url.get(params, (err, res) => {
    //   if (err) {
    //     console.error(err);
    //     throw err;
    //   }
    //   console.log(`Long url is ${res.data.longUrl}`);
    // });
  }
}

module.exports = new GoogleApiController();
