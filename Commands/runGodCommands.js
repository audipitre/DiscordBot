const mupGodCommandData = require('./god_commands.json');

module.exports = {
    runGodCommands : function(arguments, message){
        switch (arguments) {
            case mupGodCommandData.resetMupCountersGodCommand.identifier:
                mupGodCommands.resetMupsGodCommand(mupCounters, message);
                return "god";
            default:
                return arguments;
        }
    }
}