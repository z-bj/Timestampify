// This is a Node.js app that uses Express.js to serve static files and provide API endpoints. It also uses CORS to allow remote testing of the API by the FreeCodeCamp (FCC) platform.

// This imports the required modules, creates an instance of the Express.js app, and enables CORS with a 200 status code.

var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// This serves static files from the "public" directory in the project.

app.use(express.static("public"));

// This sets up a route for the root URL ("/") that sends an HTML file as a response.

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// This sets up an API endpoint at "/api/hello" that returns a JSON response with a "greeting" property.

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// This sets up an API endpoint at "/api" that returns the current date and time as a JSON response with the UNIX timestamp and UTC time.

app.get("/api", (req, res) => {
  const currentDate = new Date().toUTCString();
  const currentUnix = Date.parse(currentDate);
  res.json({ unix: currentUnix, utc: currentDate });
});

// This sets up an API endpoint at "/api/:date?" that handles requests with a date string. It first checks if the date string is in UNIX timestamp format or a string format. If it is in string format, it attempts to parse it into a UNIX timestamp and returns the corresponding UTC time. If the date string is invalid, it returns an error message.

app.get("/api/:date?", (req, res) => {
  const dateString = req.params.date;
  const dateStringRegex = /^[0-9]+$/;
  const numbersOnly = dateStringRegex.test(dateString);

  if (!numbersOnly) {
    const unixTimestamp = Date.parse(dateString);
    const utcDate = new Date(unixTimestamp).toUTCString();

    unixTimestamp
      ? res.json({ unix: unixTimestamp, utc: utcDate })
      : res.json({ error: "Invalid Date" });
  } else {
    const unixTimestamp = parseInt(dateString);
    const actualDate = new Date(unixTimestamp);
    const utcDate = actualDate.toUTCString();
    res.json({ unix: unixTimestamp, utc: utcDate });
  }
});

// This starts the server on the specified port (either from the environment variable or port 3000 if it's not defined) and logs a message to the console when it's running.

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
