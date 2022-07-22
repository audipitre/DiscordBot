var path = require('path');
const fs = require("fs");

const pathcommand = path.dirname(__dirname) + '/Commands/command_centre.js';
const commandCentre = require(pathcommand);

const parent = __dirname;
let mupCounters = require(path.dirname(__dirname) + "/MupsData/mup_counter.json");
const theMups = Object.keys(mupCounters);
const commandPrefix = "mups!";

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        commandCentre.run(message);
    }
}