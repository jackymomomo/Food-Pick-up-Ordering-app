// load .env data into process.env
require('dotenv').config();
const db = require('./db/connection.js')
// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

//TWT
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const { response } = require('express');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  db.query('SELECT * FROM menu_item')
    .then((response) => {
      response.rows
      // console.log('response.rows', response.rows)
      const templateVars = { menuItems: response.rows }
      // console.log(templateVars)
      res.render('index', templateVars);
  })

});

const restaurant = (to, message) => {
  client.messages
  .create({
      body: `An order has been placed: ${message}`,
      from: '+18573845092',
      to: to
    })
   .then(message => console.log(message.sid))
};

const customer = (to, message) => {
  client.messages
  .create({
      body:` Thank you for choosing Wok N Roll, Your order will be ready in 25 minutes. Your order is:${message}`,
      from: '+18573845092',
      to: to
    })
   .then(message => console.log(message.sid))
};

app.post('/', (req, res) => {
  let order = JSON.parse(req.body.order)
  const orderMap = order.map(order => order.title).toString();
  console.log("orderMap", orderMap)
  console.log("order", order.title)
  const orderMessage = ``

customer('+12063101339', orderMap)
customer('+16043666839', orderMap)
restaurant('+18254499437', orderMap)
  return res.send()
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
