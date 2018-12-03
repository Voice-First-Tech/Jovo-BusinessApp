const expect = require('chai').expect;

const getPlatformRequestBuilder = require('jovo-framework').util.getPlatformRequestBuilder;
const {send} = require('jovo-framework').TestSuite;
const {Strings} = require('../config/strings');

for (let rb of getPlatformRequestBuilder('AlexaSkill', 'GoogleActionDialogFlowV2')) {

  describe('YesIntentTestGroup' + "-" + rb.type(), () => {
    // YesIntent
    it('gives users more information about Voice First', () => {
      return send(rb.intent('YesIntent').setState("WelcomeState").setSessionNew(true))
        .then((res) => {
            const matchedResponse = res.isAsk(Strings.WELCOME_STATE.YESINTENTRESPONSE, Strings.WELCOME_STATE.YESINTENTREPROMPT);
            expect(matchedResponse).to.equal(true);
        })
    });
    // Launch -> WelcomeIntent
    it('gives users more information about Voice First AFTER LAUNCH', () => {
      return send(rb.launch().setSessionNew(true))
        .then((res) => {
            const matchedResponse = res.isAsk(Strings.launchResponse, Strings.launchReprompt);
            expect(matchedResponse).to.equal(true);
            return send(rb.intent('YesIntent').setState("WelcomeState"))
        })
        .then((res) => {
            const matchedResponse = res.isAsk(Strings.WELCOME_STATE.YESINTENTRESPONSE, Strings.WELCOME_STATE.YESINTENTREPROMPT);
            expect(matchedResponse).to.equal(true);
        })
    });

  });


}
