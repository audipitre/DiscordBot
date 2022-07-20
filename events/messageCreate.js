var path = require('path');
const fs = require("fs");

const parent = __dirname;
let mupCounters = require(path.dirname(__dirname) + "/MupsData/mup_counter.json");
const theMups = Object.keys(mupCounters);
const commandPrefix = "mups!";


function showMup(whichMup, message){
    message.channel.send(`${whichMup} has been a muppet ${mupCounters[whichMup]} time(s).`);
}

function showAllMups(message)
{
    for(let theMupsIndex = 0; theMupsIndex < theMups.length; theMupsIndex++)
    {
        showMup(theMups[theMupsIndex], message);
    }
}

function isMup(aPotentialMup)
{
    for(let whichMupIndex = 0; whichMupIndex < theMups.length; whichMupIndex++)
    {
        if(aPotentialMup === theMups[whichMupIndex]){
            return true;
        }
    }
    return false;
}

function addMupCount(whichMup, message){
    for(let whichMupIndex = 0; whichMupIndex < theMups.length; whichMupIndex++)
    {
        if(whichMup == theMups[whichMupIndex]){
            mupCounters[whichMup] = mupCounters[whichMup] + 1;

            showMup(whichMup, message);

            let data = JSON.stringify(mupCounters);
            fs.writeFileSync(path.dirname(__dirname) + "/MupsData/mup_counter.json", data);

        }
    }
}

function resetMupCounter()
{
    Object.keys(mupCounters).forEach(function(key){ mupCounters[key] = 0 });

    let data = JSON.stringify(mupCounters);
    fs.writeFileSync(path.dirname(__dirname) + "/MupsData/mup_counter.json", data);
}

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        theMups;
        const parsedMessage = message.content.replace(/\s+/g, '').toLowerCase();

        const messagePrefix = parsedMessage.substring(0, commandPrefix.length);

        const isAMupString = "isamup";
        const isAMupIdentifier = parsedMessage.substring(parsedMessage.length - isAMupString.length, parsedMessage.length);

    
        if(message.author.username === "Cleggeh" && (messagePrefix === commandPrefix || isAMupIdentifier == isAMupString))
        {
            message.channel.send("Shut up Luke, you mup");
            addMupCount(mupCounters.luke, message);
            message.author.send("spaz");
        }
        else if(isAMupIdentifier === isAMupString){
            const whoIsAMup = parsedMessage.substring(0, parsedMessage.length - isAMupString.length);

            addMupCount(whoIsAMup, message);
        }
        else if(messagePrefix === commandPrefix)
        {
            const arguments = parsedMessage.substring(commandPrefix.length, parsedMessage.length);

            if(arguments === 'showallmups'){
                showAllMups(message);
            }
            else if(arguments === 'resetmupcounter')
            {
                resetMupCounter();
                message.channel.send('All mup counters succesfully reset.');
            }
            else if(arguments.includes("showmup"))
            {
                const mupString = arguments.substring(7, arguments.length);

                if(isMup(mupString))
                {
                    showMup(mupString, message);
                }
                else
                {
                    message.channel.send(`Can't find the muppet '${mupString}'. Sorry lad.`);
                }
            }
            else{
                message.channel.send(`Command: '${arguments}' could not be found.`);
                message.author.send('test');
            }
        }
    }
}