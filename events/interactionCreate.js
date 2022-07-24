const path = require('path');
const flexers = require(path.dirname(__dirname) + '/MupsData/flexers.json')


const flexersAnswers = require(path.dirname(__dirname) + '/MupsData/flexers.json')

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction) {
        if(interaction.component.customId === "getAFlexGoingYesButton"){
            console.log(interaction);
            interaction.reply("Get your ass on in the voice channel then!");
        }
        else if(interaction.component.customId === "getAFlexGoingNoButton"){
            interaction.reply("proper let down you");
        }
    }
}