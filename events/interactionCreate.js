const path = require('path');
const fs = require('fs');
const flexers = require(path.dirname(__dirname) + '/MupsData/flexers.json')
const client = require(path.dirname(__dirname) + '/app.js');


module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction) {
        //If interaction is flex button press
        //disable button

        const getAFlexGoingTrackers = require(path.dirname(__dirname) + '/Commands/CommandVariables/getAFlexGoingTrackers.js').getAFlexGoingChannelID;
        const interactionUser = interaction.user.username + "#" + interaction.user.discriminator;

        //setHasAnswered
        for (var flexer in flexers) {
            if (flexers[flexer].id === interactionUser) {
                flexers[flexer].hasAnswered = true;
            }
        }

        //Record answer
        if (interaction.component.customId === "getAFlexGoingYesButton") {
            for (var flexer in flexers) {
                if (flexers[flexer].id === interactionUser) {
                    flexers[flexer].getAFlexGoingAnswers = 1;
                }
            }

            let data = JSON.stringify(flexers);
            fs.writeFileSync(path.dirname(__dirname) + "/MupsData/flexers.json", data);

            client.channels.cache.get(getAFlexGoingTrackers.get()).send(`**${interaction.user.username}#${interaction.user.discriminator} has said yes to the flex :partying_face:.**`);

            interaction.reply("Get in the fucking voice channel you fat cunt.");
        }
        else if (interaction.component.customId === "getAFlexGoingNoButton") {
            client.channels.cache.get(getAFlexGoingTrackers.get()).send(`**${interaction.user.username}#${interaction.user.discriminator} has said no to the flex :rage:. What a fucking weaponhead.**`);

            interaction.reply("proper let down you");
        }

        //check if all flexers have answers

        let hasEveryoneAnswered = true;
        for(var flexer in flexers){
            if(!flexers[flexer].hasAnswered){
            hasEveryoneAnswered = flexers[flexer].hasAnswered;
            }
        }

        if(hasEveryoneAnswered){
            //Get the results
            let yesToFlex = 0;
            let noToFlex = 0;

            for(var flexer in flexers){
                if(flexers[flexer].getAFlexGoingAnswers === 0){
                    noToFlex = noToFlex + 1;
                }
                else if(flexers[flexer].getAFlexGoingAnswers === 1){
                    yesToFlex = yesToFlex + 1;
                }
            }

            if(yesToFlex >= 3){
                let botMessage = "A flex is on the cards! " + yesToFlex + " people said yes.\n**These people said yes:\n**";

                for(var flexer in flexers){
                    if(flexers[flexer].hasAnswered){
                        if(flexers[flexer].getAFlexGoingAnswers === 1){
                            botMessage = botMessage + flexers[flexer].id +"\n";
                        }
                    }
                }

                client.channels.cache.get(getAFlexGoingTrackers.get()).send(botMessage);

                botMessage = "**These people said no:\n**";

                for(var flexer in flexers){
                    if(flexers[flexer].hasAnswered){
                        if(flexers[flexer].getAFlexGoingAnswers === 0){
                            botMessage = botMessage + flexers[flexer].id +"\n";
                        }
                    }
                }
                client.channels.cache.get(getAFlexGoingTrackers.get()).send(botMessage);
                //Flex could happen
            }
            else{
                //A flex isnt happening
                client.channels.cache.get(getAFlexGoingTrackers.get()).send("Couldn't find enough flexers to play :(.");
            }


            //reset trackers
            for(var flexer in flexers){
                flexers[flexer].hasAnswered = false;
            }
            getAFlexGoingTrackers.currentlyGettingAFlex.set(false);
        }
    }
}