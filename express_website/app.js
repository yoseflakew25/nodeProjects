const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






app.listen(3000, () => {
    console.log('Server started on port 3000...');
})