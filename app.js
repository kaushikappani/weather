require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const https = require('https');
const date = require(__dirname + "/date.js");
// const location = require(__dirname + "/location.js");
const ip = require('ip');
const superagent = require('superagent');

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/", function(req, res) {
  const dateNow = date.getDate();
  const dayNow = date.getDay();
  res.render("index", {
    date: dateNow,
    day: dayNow
  });
});
app.get("/locate", function(req, res) {
  const dateNow = date.getDate();
  const dayNow = date.getDay();
  res.render("index", {
    date: dateNow,
    day: dayNow
  });
});
app
app.post("/", function(req, res) {
  // console.log(req.body.location);
  const query = req.body.location;
  const apiKey = process.env.API_KEY;
  const unit = "Metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    response.on('data', function(data) {
      if (response.statusCode == 200) {
        const dateNow = date.getDate();
        const dayNow = date.getDay();
        // console.log(JSON.parse(data));
        mainData = JSON.parse(data)
        const temp = mainData.main.temp.toFixed(0);
        const rainpPer = mainData.clouds.all;
        const windSpeed = mainData.wind.speed;
        const icon = mainData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const weatherDes = mainData.weather[0].description;
        const name = mainData.name;
        const country = mainData.sys.country;
        const windDirection = mainData.wind.deg;
        const humidity = mainData.main.humidity;
        const maxTemp = mainData.main.temp_max;
        const pressure = mainData.main.pressure
        res.render("search", {
          temp: temp,
          rainpPer: rainpPer,
          windSpeed: windSpeed,
          location: name + " " + country,
          imageURL: imageURL,
          date: dateNow,
          day: dayNow,
          weatherDes: weatherDes,
          windDirection: windDirection,
          humidity: humidity,
          maxTemp: maxTemp,
          pressure: pressure
        })
      }else{
        const dateNow = date.getDate();
        const dayNow = date.getDay();
        res.render("index", {
          date: dateNow,
          day: dayNow
        });
      }
    });
  });
});
app.post("/locate", function(req, res) {
  const lat = req.body.lat;
  console.log(lat)
  const long = req.body.long;
  const apiKey = process.env.API_KEY;
  const unit = "Metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    response.on('data', function(data) {
      if (response.statusCode == 200) {
        const dateNow = date.getDate();
        const dayNow = date.getDay();
        // console.log(JSON.parse(data));
        mainData = JSON.parse(data)
        const temp = mainData.main.temp.toFixed(0);
        const rainpPer = mainData.clouds.all;
        const windSpeed = mainData.wind.speed;
        const icon = mainData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const weatherDes = mainData.weather[0].description;
        const name = mainData.name;
        const country = mainData.sys.country;
        const windDirection = mainData.wind.deg;
        const humidity = mainData.main.humidity;
        const maxTemp = mainData.main.temp_max;
        const pressure = mainData.main.pressure
        res.render("search", {
          temp: temp,
          rainpPer: rainpPer,
          windSpeed: windSpeed,
          location: name + " " + country,
          imageURL: imageURL,
          date: dateNow,
          day: dayNow,
          weatherDes: weatherDes,
          windDirection: windDirection,
          humidity: humidity,
          maxTemp: maxTemp,
          pressure: pressure
        })
      } else {
        const dateNow = date.getDate();
        const dayNow = date.getDay();
        res.render("index", {
          date: dateNow,
          day: dayNow
        });
      }
    });
  });
})
app.post("/email",function(req,res){

})




var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("app started at port 3000");
})
