const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const mupFunctions = require('./mup_functions.js');
const mupCommandData = require('./commands.json');
var path = require('path');
const fs = require('fs');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { listAvailableAndNonAvailableBoys } = require('./mup_functions.js');
const { MessageNonceType } = require('discord.js/src/errors/ErrorCodes.js');
const { fileURLToPath } = require('url');
const { get } = require('https');


module.exports = {
    isBotRespondingCommand: function (message) {
        message.channel.send("I'm here ya mup!\n");
    },

    isAMupCommand: function (messageContents, mupCounters, message) {
        const whoIsAMup = messageContents.substring(0, messageContents.length - mupCommandData.isAMupCommand.identifier.length);

        mupFunctions.addMupCount(whoIsAMup, mupCounters, message);
    },

    isAFuckingMupCommand: function (messageContents, mupCounters, message) {
        const whoIsAMup = messageContents.substring(0, messageContents.length - mupCommandData.isAFuckingMupCommand.identifier.length);

        mupFunctions.addFuckingMupCount(whoIsAMup, mupCounters, message);
    },

    whoIsTheBiggestMupCommand: function (mupCounters, message) {
        mupFunctions.getBiggestMup(mupCounters, message);
    },

    showMupCommand: function (arguments, mupCounters, message) {
        const mupString = arguments.substring(7, arguments.length);

        if (mupFunctions.isMup(mupString, mupCounters)) {
            mupFunctions.showMup(mupString, mupCounters, message);
        }
        else {
            message.channel.send(`Can't find the muppet '${mupString}'. Sorry lad.`);
        }
    },

    showAllMupsCommand: function (mupCounters, message) {
        mupFunctions.showAllMups(mupCounters, message);
    },

    helpCommand: function (message) {
        let botMessage = "__**Here is a list of all the current commands and their descriptions!**__\n\n"
        for (var command in mupCommandData) {
            botMessage = botMessage + mupFunctions.getHelpForCommand(mupCommandData[command]);
            botMessage = botMessage + "\n";
            message.channel.send(botMessage);
            botMessage = "";
        }
    },

    flexCommand: function (message) {
        let availableBoys = [];
        let notAvailableBoys = [];
        message.guild.members.fetch().then(function (guildMembers) {
            const theBoys = mupFunctions.getTheBoys(guildMembers);

            availableBoys = mupFunctions.getAvailableBoys(theBoys, message);
            notAvailableBoys = mupFunctions.getNotAvailableBoys(theBoys, message);

            const botMessage = mupFunctions.getFlexMessage(availableBoys.length) + mupFunctions.listAvailableAndNonAvailableBoys(availableBoys, notAvailableBoys, message);
            message.channel.send(botMessage);
        })
    },

    getAFlexGoingCommand: function (message) {
        let getAFlexGoingTrackers = require('./CommandVariables/getAFlexGoingTrackers.js');

        var availableBoys = [];
        var unavailableBoys = [];

        //if a certain amount of time has passed and there is a flex, you can go again
        //if(mupFunctions.isThereAPotentialFlex(message) && !getAFlexGoingTrackers.currentlyGettingAFlex.get()){
        if (true) {
            getAFlexGoingTrackers.currentlyGettingAFlex.set(true);
            //dm all flexers not in the same channel
            message.guild.members.fetch().then(function (guildMembers) {
                const theBoys = mupFunctions.getTheBoys(guildMembers);

                for (var currentBoy in theBoys) {
                    if (true) {

                        const yesAndNoButtons = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('getAFlexGoingYesButton')
                                    .setLabel('Yes')
                                    .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                    .setCustomId('getAFlexGoingNoButton')
                                    .setLabel('No')
                                    .setStyle(ButtonStyle.Danger)
                            );

                        availableBoys = mupFunctions.getAvailableBoys(theBoys, message);
                        unavailableBoys = mupFunctions.getNotAvailableBoys(theBoys, message);

                        //TO DO: Create a set up command for the get A flex going function. Has a flag saying a flex is currently going

                        getAFlexGoingTrackers.getAFlexGoingChannelID.set(message.channel.id);

                        //Refactor the conditions if bot should send message.

                        if(theBoys[currentBoy].id === message.author.id){
                            const botMessage = message.author.username + "#" + message.author.discriminator + " is trying to start a flex, would you be down?";
                            theBoys[currentBoy].send({ content: botMessage, components: [yesAndNoButtons] })
                        }

                        // const voiceChannelOfAuthor = message.member.voice.channelId;
                        // if (voiceChannelOfAuthor) {
                        //     if ( (theBoys[currentBoy].voice.channelId !== voiceChannelOfAuthor && theBoys[currentBoy].id !== message.author.id) || (theBoys[currentBoy].voice.channelId === voiceChannelOfAuthor && message.member.voice.deaf)) {
                        //         const botMessage = message.author.username + "#" + message.author.discriminator + " is trying to start a flex, would you be down?";
                        //         theBoys[currentBoy].send({ content: botMessage, components: [yesAndNoButtons] });
                        //     }
                        // }
                        // else {
                        //     if (theBoys[currentBoy].id !== message.author.id) {
                        //         const botMessage = message.author.username + "#" + message.author.discriminator + " is trying to start a flex, would you be down?";
                        //         theBoys[currentBoy].send({ content: botMessage, components: [yesAndNoButtons] });
                        //     }
                        // }


                    }
                }

                message.channel.send(listAvailableAndNonAvailableBoys(availableBoys, unavailableBoys, message));
                message.channel.send(`\n**A message has been sent to the available mups, who aren't in the same voice channel as ${message.author.username}#${message.author.discriminator}, asking if they'd be down for a flex.**`);
            });
        }
        else {
            //Tell the author that a flex is still trying to get together and list the results and time of when command was called.
            message.channel.send(`A flex is still underway`);
        }
    },

    resetGetAFlexGoingCommand : function(message){
        //TO DO: DISABLE BUTTONS!!! 
        let flexers = require(path.dirname(__dirname) + '/MupsData/flexers.json')
        for(var flexer in flexers){
            flexers[flexer].hasAnswered = false;
            flexers[flexer].getAFlexGoingAnswers = 0;
        }

        let data = JSON.stringify(flexers);
        fs.writeFileSync(path.dirname(__dirname) + "/MupsData/flexers.json", data);

        let getAFlexGoingTrackers = require('./CommandVariables/getAFlexGoingTrackers.js');
        getAFlexGoingTrackers.currentlyGettingAFlex.set(false);
    }
}