var path = require('path');
const fs = require("fs");

const pathcommand = path.dirname(__dirname) + '/Commands/command_centre.js';
const commandCentre = require(pathcommand);

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        commandCentre.run(message);
    }
}