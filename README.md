![banner](https://github.com/z-bj/Timestampify/blob/master/Banner.jpg)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)


# Timestampify

Timestampify is an **API** service that handles dates and returns the correct Unix timestamp, UTC string, or simply returns the current Unix timestamp and UTC timestamp.


## Examples

### Input 

``` url
/api/timestamp/2015-12-25
```

### Output

``` json
{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
```

<hr>

### Input

``` url
`/api/timestamp/` 
```

### Output

``` json
{"unix":1634587186427,"utc":"Tue, 18 Oct 2021 17:46:26 GMT"}
```



## API Endpoint

- The API endpoint is `GET /api/timestamp/:date_string`.

- A date string is considered valid if it can be successfully parsed by the JavaScript `Date` object. The Unix timestamp needs to be an integer (not a string) specifying milliseconds. In our tests, we use date strings compliant with ISO-8601 (e.g., "2016-11-20") because this will ensure a UTC timestamp.

- If the `date_string` parameter is empty or not provided, the API uses the current timestamp.

- If the `date_string` parameter is invalid, the API returns a JSON object with the following structure: `{"error" : "Invalid Date" }`.

- If the `date_string` parameter is valid, the API returns a JSON object with the following structure: `{"unix": <timestamp>, "utc": <utc_date_string>}`,
   e.g., `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.


## Core

``` javascript
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


```

## Getting Started

### Installation

Clone the repo and install the dependencies.

``` bash
git clone https://github.com/z-bj/Timestampify.git
cd Timestampify/
npm install
```



### Running the App

``` bash
npm start
```
## License

This project is licensed under the MIT License
