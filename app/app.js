'use strict';

// =================================================================================
// App Configuration
// Dialogflow: https://uutpotwjb3.execute-api.us-east-1.amazonaws.com/TESTING
// =================================================================================

const {App} = require('jovo-framework');
const {GoogleAction} = require('jovo-framework');
const {AlexaSkill} = require('jovo-framework');
const {Strings} = require('../config/strings');

const config = {
    logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function() {
        this.toStateIntent('WelcomeState', 'WelcomeIntent');
    },

    'WelcomeState' :{
        'WelcomeIntent': function() {
            let speech = this.speechBuilder()
                .addText(Strings.launchResponse);
            let reprompt = this.speechBuilder()
                .addText(Strings.launchReprompt);
            this.ask(speech, reprompt);
        },
    },

    'BusinessCardIntent': function() {
        let speech = this.speechBuilder()
            .addText("Check your device for our business card.")
            .addBreak('300ms')
            .addText("Do you want to get an estimate for your Voice App, or learn more?");
        let reprompt = this.speechBuilder()
            .addText("Do you want to get an estimate for your Voice App, or learn more?");
        if (this.getType() == "AlexaSkill") {
            this.alexaSkill().showCard(
                new AlexaSkill.StandardCard()
                    .setTitle('Voice First Tech')
                    .setText('Office#: 513-850-5805')
                    .setSmallImageUrl('https://odesk-prod-portraits.s3.amazonaws.com/Companies:5209706:CompanyLogoURL?AWSAccessKeyId=AKIAIKIUKM3HBSWUGCNQ&Expires=2147483647&Signature=C1yx2OBhlD3LErBSbQpMrZbX2iE%3D')
                    .setLargeImageUrl('https://odesk-prod-portraits.s3.amazonaws.com/Companies:5209706:CompanyLogoURL?AWSAccessKeyId=AKIAIKIUKM3HBSWUGCNQ&Expires=2147483647&Signature=C1yx2OBhlD3LErBSbQpMrZbX2iE%3D')
            );
            this.ask(speech, reprompt);
        } else {
            let basicCard = new GoogleAction.BasicCard()
                .setTitle("Voice First Tech")
                .setFormattedText("Office#: 555-555-5555")
                .setImage("https://odesk-prod-portraits.s3.amazonaws.com/Companies:5209706:CompanyLogoURL?AWSAccessKeyId=AKIAIKIUKM3HBSWUGCNQ&Expires=2147483647&Signature=C1yx2OBhlD3LErBSbQpMrZbX2iE%3D", 'Business Card', '350', '150')
                .addButton('Voice First Tech website', 'https://www.VoiceFirstTech.com/')

            this.googleAction().showBasicCard(basicCard).ask(speech, reprompt);
        }
    },

    'QuoteIntent': function() {
        this.toStateIntent("QuoteState", "StartQuoteIntent");
    },

    'LearnMoreIntent': function() {
        let speech = this.speechBuilder()
            .addText("All profits from Voice First Tech's Agency go directly towards educating high-school and college students with free Voice App development resources and bootcamps.")
            .addText("Additionally, Voice First Tech offers free resources available on pretty much every major platform to get started coding today..")
            .addBreak('300ms')
            .addText("Do you want to see our business card, or get an estimate for your Voice App?");
        let reprompt = this.speechBuilder()
            .addText("Do you want to see our business card, or get an estimate for your Voice App?")
        this.ask( speech, reprompt );
    },

    'Unhandled': function() {
        let speech = this.speechBuilder()
            .addText("I did not catch that.")
            .addBreak('300ms')
            .addText("You can say, show me your business card to see how to contact us.")
        this.ask(speech);
    },

    'QuoteState' :{
      'StartQuoteIntent' : function() {
        let speech = this.speechBuilder()
            .addText("We see you'd like to build a Voice App. We've got just the team to bring your idea to life.")
            .addBreak('300ms')
            .addText("This feature will be completed soon!")
            .addText("In the meantime, do you want to see our business card, or learn more about Voice First Tech?")
        this.ask(speech);
      }
    }
});

module.exports.app = app;
