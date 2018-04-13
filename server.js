const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', `${log}\n`, (err) => {
        if (err) throw new Error;
        console.log('Unable to append new log(s)');
    });
    next();
});

// block site for maintenance
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Some Website!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'unable to fulfill request!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});