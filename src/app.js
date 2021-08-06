const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("../utils/forecast");

const app = express();
const pathDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(pathDirectory));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Biswajeet Panda",
  });
});
app.get("/weather", (req, res) => {
  // console.log(req.query.location);
  const location = req.query.location;
  if (!location) {
    return res.send({
      error: "Enter a valid Location",
    });
  } else {
    forecast(location, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }
      res.send({
        location: forecastData.locate,
        weather: forecastData.weather,
      });
    });
  }
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Biswajeet Panda",
    message: "Welcome to the project",
  });
});

app.get("/about", (req, res) => {
  res.send("Welcome to about page");
});

app.get("/weather", (req, res) => {
  res.send("Welcome to weather page");
});

app.listen(3000, () => {
  console.log("Server is running on 3000! ");
});
