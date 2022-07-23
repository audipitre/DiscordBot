const path = require('path');
const flexers = require(path.dirname(__dirname) + '/MupsData/flexers.json')

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction) {
        if(interaction.component.customId === "reeceYesButton"){
            const guildMembers = Array.from(interaction.client.users.cache);
            console.log(guildMembers);
            interaction.reply("A message has been sent to Reece letting him know of your opinion.");

            for(var guildMember in guildMembers){
                if(guildMembers[guildMember][1].username + "#" + guildMembers[guildMember][1].discriminator === flexers.james){
                    guildMembers[guildMember][1].send("James just told Cal he thinks you're a mup");
                }
            }
        }
        else if(interaction.component.customId === "reeceNoButton"){
            const guildMembers = Array.from(interaction.client.users.cache);
            interaction.reply("A message has been sent to Reece letting him know of your opinion :(");

            for(var guildMember in guildMembers){
                if(guildMembers[guildMember][1].username + "#" + guildMembers[guildMember][1].discriminator === flexers.james){
                    guildMembers[guildMember][1].send("James just told Cal he doesn't think you're a mup :D");
                }
            }
        }
    }
}