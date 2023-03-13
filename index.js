// This is a Node.js app that uses Express.js to serve static files and provide API endpoints. It also uses CORS to allow remote testing of the API by the FreeCodeCamp (FCC) platform.

// This imports the required modules, creates an instance of the Express.js app, and enables CORS with a 200 status code.

const express = require("express");
const app = express();
const cors = require("cors");
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

// EMPTY REQUEST

app.get("/api", (req, res) => {
  const now = new Date();

  return res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

/---------------------------------/

app.get("/api/:date?", (req, res) => {
  // Get the date string from the request parameter
  const dateString = req.params.date;
  // Regular expression to check if the date string only contains numbers
  const dateStringRegex = /^[0-9]+$/;
  // Test if the date string contains only numbers
  const numbersOnly = dateStringRegex.test(dateString);

  // If the date string does not contain only numbers
  if (!numbersOnly) {
    // Parse the date string into a Unix timestamp
    const unixTimestamp = Date.parse(dateString);
    // Convert the Unix timestamp to a UTC date string
    const utcDate = new Date(unixTimestamp).toUTCString();

    // If the Unix timestamp is valid, send a JSON response with the Unix timestamp and UTC date string
    // Otherwise, send a JSON response with an error message
    unixTimestamp
      ? res.json({ unix: unixTimestamp, utc: utcDate })
      : res.json({ error: "Invalid Date" });
  } 
  // If the date string contains only numbers
  else {
    // Parse the date string as a Unix timestamp
    const unixTimestamp = parseInt(dateString);
    // Convert the Unix timestamp to an actual date
    const actualDate = new Date(unixTimestamp);
    // Convert the actual date to a UTC date string
    const utcDate = actualDate.toUTCString();
    // Send a JSON response with the Unix timestamp and UTC date string
    res.json({ unix: unixTimestamp, utc: utcDate });
  }
});


// -------------------------------------------------------------------

// This starts the server on the specified port (either from the environment variable or port 3000 if it's not defined) and logs a message to the console when it's running.

let listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

//The 404 Route

app.use((req, res, next) => {
  res.status(400);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname + "/views/404.html"));
  }
});

// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname + "/views/404.html"));
// });
