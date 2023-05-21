const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');



const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/contact/send', (req, res) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jolarohe@gmail.com',
            pass: '12345678'
        }
    })


    var mailOptions = {
        form: "Yosef Lakew <jolarohe@gmail.com>",
        to: "yoseflakew25@gmail.com",
        subject: "Website submission ",
        text: "you have a submission with the following details... Name: " + req.body.name + "Email: " + req.body.email + "Message: " + req.body.message,
        html: '<p>you have a submission with the following details...</p> <ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'

    }



    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.redirect('/')
        } else {
            console.log('message sent: ' + info.response);
            res.redirect('/')
        }
    })
})




app.listen(3000, () => {
    console.log('Server started on port 3000...');
})