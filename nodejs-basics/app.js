// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out


// Read the data
// Parse the data
// Print the data
const https = require('https');
const username = "muhairwe";

function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in Javascript`;
    console.log(message);
}

function getProfile(username){
    // Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        let body = "";

        // Read the data
        response.on('data', data => {
            body += data.toString();
        });
        // Parse the data
        response.on('end', () => {
            // Print the data
            const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.JavaScript);
        });
    });
}

const users = process.argv.slice(2);
//users.forEach(username => {
//   getProfile(username);
//});,

users.forEach(getProfile);
// run with
// node app.js muhairwe chalkers alenaholligan davemcfarland

