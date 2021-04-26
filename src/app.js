const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Modify settings for Express apps using app.set()
// In this case we are setting handlebars/hbs as the view engine
// NOTE: nodemon does not refresh after .hbs file changes by default; to make it happen you can do "nodemon app -e hbs,js"

app.set('view engine', 'hbs');

// Set custom views directory
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

// Set partials directory
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// set up static (public) directory; this is need for any static files to be served, like images, your CSS, etc.
app.use(express.static(path.join(__dirname, '../public')));

// ROUTES, e.g.
// app.com
// app.com/help
// app.com/about

// Get current year
const date = new Date();
const year = date.getFullYear();


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Chris Mills',
    year
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Chris Mills',
    year
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Chris Mills',
    message: 'This is a message to help you!',
    year
  });
});

// SAMPLE/EXPERIMENT
// app.get('/products', (req, res) => {
//   if(!req.query.search) {
//     return res.send ({
//       error: 'You must provide a search term'
//     })
//   }
//
//   res.send({ products: []})
// });

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    })
  }

  geocode(req.query.address, (error, {location, lat, long} = {}) => {
    if(error) {
      return res.send({error});
    }

    forecast(lat, long, (error, {temperature, description} = {}) => {
      if(error) {
        return res.send({error});
      }

      res.send({
        location,
        temperature,
        description
      });
    });
  });
});

// Specific 404 page for help subpages
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Ooops, page not found!',
    name: 'Chris Mills',
    year,
    errorMsg: 'Help article not found'
  });
});

// Generic 404 page that is served if no other matches are made
app.get('*', (req, res) => {
  res.render('404', {
    title: 'Ooops, page not found!',
    name: 'Chris Mills',
    year,
    errorMsg: 'Page not found'
  });
});

// start the server

app.listen(7991, () => {
  console.log('Server running at port 7991.');
});
