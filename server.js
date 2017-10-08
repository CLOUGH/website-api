let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');

// BASE SETUP
// =============================================================================
// configure app to use bodyParser()
// this will le us get the data from a POST
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors())

// database connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/website', { useMongoClient: true, promiseLibrary: global.Promise });

var port = process.env.PORT || 3000

var Page = require('./app/models/page');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next){
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res){
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/pages')
    // create a page (accessed at POST http://localhost:3000/api/pages)
    .post(function(req, res){
        pageModel = new Page(req.body);

        pageModel.save().then(function(page){
            res.json(page);
        }, function(err){
            res.send(500, err); 
        });
    })
    // get all the pages (accessed at GET http://localhost:3000/api/pages)
    .get(function(req, res){
        Page.find().then(function(page){
            res.json(page);
        },function(err){
            res.send(500, err);
        });
    });
router.route('/pages/:page_id')
    // get the page with that id (accessed at GET http://localhost:8080/api/page/:page_id)
    .get(function(req, res) {
        Page.findById(req.params.page_id).then(function(page) {
            res.json(page);
        },function(err){
            res.send(500, err);
        });
    })
    // update the page with this id (accessed at PUT http://localhost:8080/api/pages/:page_id)
    .put(function(req, res) {        
        // use our page model to find the page we want
        Page.findById(req.params.page_id).then(function(page) {
            page.name = req.body.name;  // update the pages info

            // save the page
            page.save().then(function(page) {
                res.json(page);
            }, function(page){
                res.send(500, err);
            });

        }, function(err){
            res.send(500,err);
        });
    })
    // delete the page with this id (accessed at DELETE http://localhost:8080/api/pages/:page_id)
    .delete(function(req, res) {
        Page.remove({ _id: req.params.page_id })
            .then(function() {
                res.json({ message: 'Successfully deleted' });
            },function(err){
                res.send(500, err);
            })
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
