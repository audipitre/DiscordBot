const fs = require("fs");
var path = require('path');

const flexers = require(path.dirname(__dirname) + '/MupsData/flexers.json')

module.exports =
{
    getFlexMessage : function(numberOfAvailableBoys){
        let botMessage = "";

        if (numberOfAvailableBoys >= 5) {
            botMessage = "There is deffo a flex on the cards, there's 5 mups online.\n";

        }
        else if (numberOfAvailableBoys === 4) {
            botMessage = "There is a potential flex angle, there's 4 mups online, so it might be a bit awkard.\n"
            //add options to invite trippy server?
        }
        else if (numberOfAvailableBoys === 3) {
            botMessage = "There's a 3's on the table, there's 4 mups online.\n";
        }
        else {
            botMessage = "A flex isn't on the cards :(\n";
        }

        return botMessage;
    },

    isThisBoyAvailable : function(theBoy, message){
        const inVoiceChannel = theBoy.voice.channel !== null;

        const isAuthor = theBoy.id === message.author.id;
        
        let isAppearingOnline = false;
        if(theBoy.presence!== null){
            isAppearingOnline = theBoy.presence.status === 'online';
        }

        return inVoiceChannel || isAppearingOnline || isAuthor;
    },
    
    listAvailableAndNonAvailableBoys : function(availableBoys, notAvailableBoys, message){
        let botMessage = '';
        if (availableBoys.length !== 0) {
            botMessage = botMessage + "\n**Available :**\n";
            for (var currentAvailBoy in availableBoys) {
                botMessage = botMessage + availableBoys[currentAvailBoy].user.username + "\n";
            }
        }

        if (notAvailableBoys.length !== 0) {
            botMessage = botMessage + "\n**Not available :**\n";
            for (var currentNotAvailBoy in notAvailableBoys) {
                botMessage = botMessage + notAvailableBoys[currentNotAvailBoy].user.username + "\n";
            }
        }

        return botMessage;
    },

    getTheBoys: function (guildMembers) {
        let theMembers = Array.from(guildMembers.values());
        var theBoys = [];
        for (var currentMember in theMembers) {
            for (var currentFlexer in flexers) {
                let memberUsername = theMembers[currentMember].user.username;
                let memberTag = theMembers[currentMember].user.discriminator;

                if (memberUsername+ "#" + memberTag === flexers[currentFlexer]) {
                    theBoys.push(theMembers[currentMember]);
                }
            }
        }
        return theBoys;
    },

    getHelpForCommand: function (whichCommand, message) {
        let botMessage = "**name** : " + whichCommand.name;
        botMessage = botMessage + "\n**identifier** : " + whichCommand.identifier;
        botMessage = botMessage + "\n**decription** : " + whichCommand.description;
        botMessage = botMessage + "\n**example** : " + whichCommand.example;

        return botMessage;
    },

    getBiggestMup: function (mupCounters, message) {
        let biggestMup = '';
        let biggestMupCount = 0;

        for (var mup in mupCounters) {
            if (mupCounters[mup] > biggestMupCount) {
                biggestMup = mup;
                biggestMupCount = mupCounters[mup];
            }
        }

        message.channel.send(`The biggest mup is Luke. But the boys have voted that ${biggestMup[0].toUpperCase() + biggestMup.substr(1)} is the biggest mup, who has been a muppet ${mupCounters[biggestMup]} times.`);
    },

    showMup: function (whichMup, mupCounters, message) {
        message.channel.send(`${whichMup[0].toUpperCase() + whichMup.substr(1)} has been a muppet ${mupCounters[whichMup]} time(s).`);
    },

    showAllMups: function (mupCounters, message) {
        const theMups = Object.keys(mupCounters);

        let botMessage = '';
        for (let theMupsIndex = 0; theMupsIndex < theMups.length; theMupsIndex++) {
            botMessage = botMessage + `${theMups[theMupsIndex][0].toUpperCase() + theMups[theMupsIndex].substr(1)} has been a muppet ${mupCounters[theMups[theMupsIndex]]} time(s).\n`;
        }
        message.channel.send(botMessage);
    },

    isMup: function (aPotentialMup, mupCounters) {
        const theMups = Object.keys(mupCounters);

        for (let whichMupIndex = 0; whichMupIndex < theMups.length; whichMupIndex++) {
            if (aPotentialMup === theMups[whichMupIndex]) {
                return true;
            }
        }
        return false;
    },

    addMupCount: function (whichMup, mupCounters, message) {
        const theMups = Object.keys(mupCounters);

        for (let whichMupIndex = 0; whichMupIndex < theMups.length; whichMupIndex++) {
            if (whichMup == theMups[whichMupIndex]) {
                mupCounters[whichMup] = mupCounters[whichMup] + 1;

                this.showMup(whichMup, mupCounters, message);
            }
        }

        let data = JSON.stringify(mupCounters);
        fs.writeFileSync(path.dirname(__dirname) + "/MupsData/mup_counter.json", data);
    },

    addFuckingMupCount: function (whichMup, mupCounters, message) {
        const theMups = Object.keys(mupCounters);

        for (let whichMupIndex = 0; whichMupIndex < theMups.length; whichMupIndex++) {
            if (whichMup == theMups[whichMupIndex]) {
                mupCounters[whichMup] = mupCounters[whichMup] + 2;

                this.showMup(whichMup, mupCounters, message);
            }
        }

        let data = JSON.stringify(mupCounters);
        fs.writeFileSync(path.dirname(__dirname) + "/MupsData/mup_counter.json", data);
    },

    resetMupCounter: function (mupCounters) {
        Object.keys(mupCounters).forEach(function (key) { mupCounters[key] = 0 });

        let data = JSON.stringify(mupCounters);
        fs.writeFileSync(path.dirname(__dirname) + "/MupsData/mup_counter.json", data);
    },

    getAvailableBoys : function(theBoys, message){
        let availableBoys = [];
        for (var currentBoy in theBoys) {
            if (module.exports.isThisBoyAvailable(theBoys[currentBoy], message)) {
                availableBoys.push(theBoys[currentBoy]);
            }
        }
        return availableBoys;
    },

    getNotAvailableBoys : function(theBoys, message){
        let notAvailableBoys = [];
        for(var currentBoy in theBoys){
            if(!module.exports.isThisBoyAvailable(theBoys[currentBoy], message)){
                notAvailableBoys.push(theBoys[currentBoy]);
            }
        }
        return notAvailableBoys;
    },

    isThereAPotentialFlex : function(message){
        let potentialFlex = false;

        message.guild.members.fetch().then(function (guildMembers) {
            theBoys = module.exports.getTheBoys(guildMembers, message);
            let availableBoys = module.exports.getAvailableBoys(theBoys, message);
            let notAvailableBoys = module.exports.getNotAvailableBoys(theBoys, message);

            if (availableBoys.length >= 3 ){
                potentialFlex = true;
            }

            console.log(availableBoys);
            console.log(notAvailableBoys);
        })
        return potentialFlex;
    },

    logCommandUses : function(message, commandUsed){
        const pathToLogFile = path.dirname(__dirname) + '\\log.txt'
        let data_ob = new Date();
        const logLine = `${message.author.username}#${message.author.discriminator} called command: ${commandUsed} at ${data_ob}`
        console.log(logLine);

        fs.appendFile(pathToLogFile, logLine +'\n\n', function (err) {
            if (err) throw err;
          });
    }
}