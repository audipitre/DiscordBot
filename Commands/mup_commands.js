const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const mupFunctions = require('./mup_functions.js');
const mupCommandData = require('./commands.json');
var path = require('path');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { listAvailableAndNonAvailableBoys } = require('./mup_functions.js');
const { MessageNonceType } = require('discord.js/src/errors/ErrorCodes.js');
const { fileURLToPath } = require('url');

const flexers = require(path.dirname(__dirname) + '/MupsData/flexers.json')

module.exports = {
    testButtonCommand : function(message){
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('reeceYesButton')
                .setLabel('Yes')
                .setStyle(ButtonStyle.Primary),
        );
        const rows = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('reeceNoButton')
                .setLabel('No')
                .setStyle(ButtonStyle.Primary),
        );

        const guildMembers = Array.from(message.client.users.cache);

        for(var guildMember in guildMembers){
            if(guildMembers[guildMember][1].username + "#" + guildMembers[guildMember][1].discriminator === flexers.luke){
                guildMembers[guildMember][1].send({content: "Do you think James is a mup?", components: [row, rows]});
            }
        }
    },

    isBotRespondingCommand : function(message){
        message.channel.send("I'm here ya mup!\n");
    },

    isAMupCommand: function (messageContents, mupCounters, message) {
        const whoIsAMup = messageContents.substring(0, messageContents.length - mupCommandData.isAMupCommand.identifier.length);

        mupFunctions.addMupCount(whoIsAMup, mupCounters, message);
    },

    isAFuckingMupCommand : function (messageContents, mupCounters, message){
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
        message.guild.members.fetch().then(function (guildMembers) {
            theBoys = mupFunctions.getTheBoys(guildMembers, message);
            let availableBoys = []
            let notAvailableBoys = [];

            for (var currentBoy in theBoys) {
                if (mupFunctions.isThisBoyAvailable(theBoys[currentBoy])) {
                    availableBoys.push(theBoys[currentBoy]);
                }
                else {
                    notAvailableBoys.push(theBoys[currentBoy]);
                }
            }
            MessageNonceType
            let botMessage = "";
            if (availableBoys.length > 5) {
                botMessage = "There is deffo a flex on the cards, there's ";
                botMessage = botMessage +availableBoys.length;
                botMessage = botMessage + " mups online.\n";
            }
            else if (availableBoys.length === 4) {
                botMessage = "There is a potential flex angle, there's 4 mups online, so it might be a bit awkard.\n"
                //add options to invite trippy server?
            }
            else if (availableBoys.length === 3) {
                botMessage = "There's a 3's on the table, there's 4 mups online.\n";
            }
            else {
                botMessage = "A flex isn't on the cards :(\n";
            }
            //botMessage = mupFunctions.getFlexMessage(numberOfAvailableBoys) + mupFunctions.listAvailableAndNonAvailableBoys(availableBoys, notAvailableBoys, message);
            botMessage = botMessage + mupFunctions.listAvailableAndNonAvailableBoys(availableBoys, notAvailableBoys, message);
            message.channel.send(botMessage);
        })
    },

    audioTestCommand: function (message) {
        const connection = joinVoiceChannel(
            {
                channelId: message.member.voice.channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

        const player = createAudioPlayer();
        const resource = createAudioResource(path.dirname(__dirname) + "/MupsData/lukeclegg.mp3");

        player.play(resource);
        connection.subscribe(player);
    }
}