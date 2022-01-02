let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

// database
let db = require('./util/database');
// port (when we deploy to server)
var port = process.env.PORT;
// using simple handlebars
const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

// parse application/x-www-form-urlencoded : Middleware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json : Middleware
app.use(bodyParser.json())

// static 'public' : Middleware
app.use(express.static(path.join(__dirname, 'public')));

// First Page
app.get('/', function(req, res) {
        res.render('login_curtis', { pageTitle: 'KnowledgeBase', curtisCSS: true, errorMessage: false })
    })
    // routers : Middleware
    // app.post('/registration', function (req, res) {
    //   console.log("registration page")
    //   // res.render('home', { pageTitle: 'Lab6', heading: 'Welcome to Artist App', data: loadData, hasData: loadData.length > 0 })
    // })


let routers = require('./routes/routers');
app.use(routers);


// Start the server
app.listen(port || 3000, () => console.log(`Express server listening on port ${port|| 3000}`))