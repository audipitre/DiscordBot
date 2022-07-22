const mupFunctions = require('./mup_functions.js');

module.exports= {
    resetMupsGodCommand : function(mupCounters, message) {
        mupFunctions.resetMupCounter(mupCounters);
        message.channel.send('All mup counters succesfully reset')
    }
}