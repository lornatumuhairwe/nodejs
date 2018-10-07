// Require https module
const https = require('https');
// require http module for status codes
const http = require('http');

function printError(error){
    console.error(`Oops! ${error.message} :(`);
}

function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in Javascript`;
    console.log(message);
}

function get(username){
    try {
        // Connect to the API URL (https://teamtreehouse.com/username.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if (response.statusCode === 200) {
                let body = "";

                // Read the data
                response.on('data', data => {
                    body += data.toString();
                });
                // Parse the data
                response.on('end', () => {
                    try {
                        // Print the data
                        const profile = JSON.parse(body);
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error) { printError(error)};
                });
            } else {
                const message =  `There was a problem getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }});

        request.on('error', error => printError(error));
    } catch(error){
        printError(error);
    }
}

module.exports.get = get;
