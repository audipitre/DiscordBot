const mupFunctions = require('./mup_functions.js');

const mupCommandData = require('./commands.json');
const mupGodCommandData = require('./god_commands.json');

const mupCommands = require('./mup_commands.js');
const mupGodCommands = require('./mup_god_commands.js');

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
        }
        else if(isAFuckingMupIdentifier === mupCommandData.isAFuckingMupCommand.identifier){
            mupCommands.isAFuckingMupCommand(parsedMessage, mupCounters, message);
        }
        else if (messagePrefix === mupCommandData.mupCommand.identifier) {
            let arguments = parsedMessage.substring(mupCommandData.mupCommand.identifier.length, parsedMessage.length);

            if (message.author.username === "cal") {
                switch (arguments) {
                    case mupGodCommandData.resetMupCountersGodCommand.identifier:
                        mupGodCommands.resetMupsGodCommand(mupCounters, message);
                }
            }

            if (arguments.includes(mupCommandData.showMupCommand.identifier)) {
                mupCommands.showMupCommand(arguments, mupCounters, message);
            }
            else if (arguments.includes("help")) {
                if (arguments === "help") {
                    mupCommands.helpCommand(message);
                }
                else {
                    let botMessage = "";
                    for (var command in mupCommandData) {
                        if (arguments === "help" + mupCommandData[command].identifier) {
                            botMessage = mupFunctions.getHelpForCommand(mupCommandData[command]);
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
                        break;
                    case mupCommandData.whoIsTheBiggestMupCommand.identifier:
                        mupCommands.whoIsTheBiggestMupCommand(mupCounters, message);
                        break;
                    case "spazzyluke":
                        message.channel.send("https://scontent-man2-1.xx.fbcdn.net/v/t1.18169-9/10888390_10152655431878865_4877208139323155836_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=lRxObl1nGboAX9MjTDG&_nc_ht=scontent-man2-1.xx&oh=00_AT9BoTqDJ041kJzEwieSzlAZThVQP--RQ9ci77sa2kr2wQ&oe=62FDC2EE");
                        break;
                    case "sexyluke":
                        message.channel.send("https://scontent-man2-1.xx.fbcdn.net/v/t1.18169-9/1466093_1416842318549343_1451277241_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=7XzT53FDkRcAX9azTYK&_nc_ht=scontent-man2-1.xx&oh=00_AT-y8UAPvSwAdm4yWlD5MdG0yFwpEW1-Kqoc3g04M9k-uQ&oe=62FFC25D");
                        break;
                    case "spazzyjames":
                        message.channel.send("https://cdn.discordapp.com/attachments/533496602665549844/1000041393781231677/SmartSelectImage_2018-01-12-16-29-29.png");
                    case "spazzyphyv":
                        break
                    case "sexyphyv":
                        message.channel.send("https://cdn.discordapp.com/attachments/533496602665549844/1000042554890408086/IMG-20161222-WA0021.jpeg");
                        break;
                    case "test":
                        const test = new FileOptions();
                        break;
                    case "flex?":
                        mupCommands.flexCommand(message);
                        break;
                    default:
                        message.channel.send(`Command: '${arguments}' could not be found.`);
                }
            }
        }
    }
}