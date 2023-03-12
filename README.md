# Timestampify

Timestampify is an **API** service that handles dates and returns the correct Unix timestamp, UTC string, or simply returns the current Unix timestamp and UTC timestamp.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

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



## Getting Started

### Installation

Clone the repo and install the dependencies.

``` bash
git clone https://github.com/z-bj/Timestampify.git
cd Timestampify-Api/
npm install
```



### Running the App

``` bash
npm start
```
## License

This project is licensed under the MIT License
