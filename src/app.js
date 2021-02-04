const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Niranjan Karanth M N",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Karanth M N",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message:
      "I am looking forward to an opportunity where I can utilize my skills in constituting effectively to the success of the organization and further improvement of my personal skills. To acquire a good position in financial sector where I could utilize my good analytical and quick calculation skills for the profitability of the organization.",
    name: "Karanth M N",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You need to provide a location!",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
          // console.log(forecastData);
        });
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "Karanth M N",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "Karanth M N",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up!");
});
