exports.getAFlexGoingChannelID = {
    channelID: "0",

    set : function(ID){
        this.channelID = ID;
    },

    get : function(){
        return this.channelID;
    }
}

exports.currentlyGettingAFlex = {
    currently: false,

    set : function(isCurrently){
        currently = isCurrently;
    },

    get : function(){
        return this.currently;
    }
}

exports.getAFlexGoingVoiceChannelID = {
    voicChannelID: "0",

    set : function(ID){
        this.voiceChannelID;
    },

    get : function(){
        return this.voiceChannelID;
    }
}