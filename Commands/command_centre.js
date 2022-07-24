const mupFunctions = require('./mup_functions.js');

const mupCommandData = require('./commands.json');
const mupGodCommandData = require('./god_commands.json');

const mupCommands = require('./mup_commands.js');
const mupGodCommands = require('./mup_god_commands.js');

const godCommandCentre = require('./runGodCommands.js');

var path = require('path');
const { getTheBoys } = require('./mup_functions.js');

let mupCounters = require(path.dirname(__dirname) + '/MupsData/mup_counter.json')


module.exports = {
    run: function (message) {
        const parsedMessage = message.content.replace(/\s+/g, '').toLowerCase();
        const messagePrefix = parsedMessage.substring(0, mupCommandData.mupCommand.identifier.length);

        const isAMupIdentifier = parsedMessage.substring(parsedMessage.length - mupCommandData.isAMupCommand.identifier.length, parsedMessage.length);
        const isAFuckingMupIdentifier = parsedMessage.substring(parsedMessage.length - mupCommandData.isAFuckingMupCommand.identifier.length, parsedMessage.length);

        if (isAMupIdentifier === mupCommandData.isAMupCommand.identifier) {
            mupCommands.isAMupCommand(parsedMessage, mupCounters, message);
            mupFunctions.logCommandUses(message, mupCommandData.isAMupCommand.identifier);
        }
        else if(isAFuckingMupIdentifier === mupCommandData.isAFuckingMupCommand.identifier){
            mupCommands.isAFuckingMupCommand(parsedMessage, mupCounters, message);
            mupFunctions.logCommandUses(message, mupCommandData.isAFuckingMupCommand.identifier);
        }
        else if (messagePrefix === mupCommandData.mupCommand.identifier) {
            let arguments = parsedMessage.substring(mupCommandData.mupCommand.identifier.length, parsedMessage.length);

            if (message.author.username === "cal") {
                arguments = godCommandCentre.runGodCommands(arguments, message);
            }

            if (arguments.includes(mupCommandData.showMupCommand.identifier)) {
                mupCommands.showMupCommand(arguments, mupCounters, message);
                mupFunctions.logCommandUses(message, mupCommandData.showMupCommand.identifier);
                
            }
            else if (arguments.includes("help")) {
                if (arguments === "help") {
                    mupCommands.helpCommand(message);
                    mupFunctions.logCommandUses(message, message.author, "help");
                }
                else {
                    let botMessage = "";
                    for (var command in mupCommandData) {
                        if (arguments === "help" + mupCommandData[command].identifier) {
                            botMessage = mupFunctions.getHelpForCommand(mupCommandData[command]);
                            mupFunctions.logCommandUses(message, "help" + mupCommandData[command].identifier);
                        }
                    }
                    message.channel.send(botMessage);
                }
            }
            else {
                switch (arguments) {
                    case "god":
                        break;
                    case mupCommandData.showAllMupsCommand.identifier:
                        mupCommands.showAllMupsCommand(mupCounters, message);
                        mupFunctions.logCommandUses(message, mupCommandData.showAllMupsCommand.identifier);
                        break;
                    case mupCommandData.whoIsTheBiggestMupCommand.identifier:
                        mupCommands.whoIsTheBiggestMupCommand(mupCounters, message);
                        mupFunctions.logCommandUses(message, mupCommandData.whoIsTheBiggestMupCommand.identifier);
                        break;
                    case mupCommandData.isBotRespondingCommand.identifier:
                        mupCommands.isBotRespondingCommand(message);
                        mupFunctions.logCommandUses(message, mupCommandData.isBotRespondingCommand.identifier);
                        break;
                    case mupCommandData.flexCommand.identifier:
                        mupCommands.flexCommand(message);
                        mupFunctions.logCommandUses(message, mupCommandData.flexCommand.identifier);
                        break;
                    case mupCommandData.getAFlexGoingCommand.identifier:
                        mupCommands.getAFlexGoingCommand(message);
                        mupFunctions.logCommandUses(message, mupCommandData.getAFlexGoingCommand.identifier);
                        break;
                    default:
                        message.channel.send(`Command: '${arguments}' could not be found.`);
                }
            }
        }
    }
}