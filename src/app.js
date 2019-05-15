const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//console.log(__dirname);
//console.log(path.join(__dirname,'../public'));

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

//set up root page

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prasad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Prasad'
    })
});

app.get(('/help'), (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Prasad'
    })
})

// app.get('/help',(req,res) => {
//     res.send(publicDirPath +);
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {longitude,latitude,placeName} = {}) => {
        if (error) {
            return res.send({error});
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
               return res.send({error});
            };
            //console.log(placeName);
            //console.log(forecastData);
            res.send({Placename: placeName,
                      Forecast: forecastData});
        });
    });


    // res.send({
    //     address: req.query.address,
    //     forecast: 'Rain'
    // });
})

/*app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})*/

app.get('/help/*', (req, res) => {
    //res.send('Help Article not found');
    res.render('404', {
        name: 'Prasad',
        message: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    //res.send('My 404 Page');
    res.render('404', {
        name: 'Prasad',
        message: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})