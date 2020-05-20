//@ts-nocheck


const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));


app.listen(process.env.PORT || 2500, function () {
    console.log("We are at server at 2500!!!");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {
    const email = (req.body.email);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const data = { //This constant is used to keep the data that we entered on our website in the following below.
        members: [ //This is the property of mailchimp that hepls us to keep data of the following user
            {
                email_address: email, //There are various parameters to feed with the data that we have on our login page like DOB,address etc. 
                status: "subscribed", //that we can go check on mailchimp website uder the audience section in audience and merge section.
                merge_fields: {
                    // EMAIL : email,
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data); //This is used to conver json data into string

    const url = ("https://us18.api.mailchimp.com/3.0/lists/");

    const options = { //parameter used in making http.request              
        method: "POST", //A string specifying the HTTP request method.
        auth: "saksham:" //Basic authentication i.e. 'user:password' to compute an Authorization header. The api that we used in this project also supports authentication thats why we have left our api link till IDkey rest is auto set.
    }
    const request = https.request(url, options, function (response) { //This is used to store the request of https in const so that we can submit our data to the following api using const.write
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/fail.html");
        }
    });

    request.write(jsonData); //this is used to submit data to api link
    request.end();


});
