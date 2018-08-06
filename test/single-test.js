const expect = require('chai').expect;

const getPlatformRequestBuilder = require('jovo-framework').util.getPlatformRequestBuilder;
const {send} = require('jovo-framework').TestSuite;

for (let rb of getPlatformRequestBuilder('AlexaSkill', 'GoogleActionDialogFlowV2')) {

  describe('WelcomeTestGroup', () => {
    // Launch -> WelcomeIntent
    it('welcomes users', () => {
      return send(rb.launch())
        .then((res) => {
            const matchedResponse = res.isAsk('Welcome to Voice First Tech. <break time=\"300ms\"/> Do you want to see our business card, get an estimate for your Voice App, or learn more?', 'Do you want to see our business card, get an estimate for your Voice App, or learn more?');
            expect(matchedResponse).to.equal(true);
            return send(rb.intent('WelcomeIntent').setState("WelcomeState"))
        })
        .then((res) => {
            const matchedResponse = res.isAsk('Welcome to Voice First Tech. <break time=\"300ms\"/> Do you want to see our business card, get an estimate for your Voice App, or learn more?', 'Do you want to see our business card, get an estimate for your Voice App, or learn more?');
            expect(matchedResponse).to.equal(true);
        })
    });

  });

  describe('BusinessCardTestGroup', () => {
    // Launch -> BusinessCardIntent
    it('shows business card', () => {
      return send(rb.launch())
        .then((res) => {
            const matchedResponse = res.isAsk('Welcome to Voice First Tech. <break time=\"300ms\"/> Do you want to see our business card, get an estimate for your Voice App, or learn more?', 'Do you want to see our business card, get an estimate for your Voice App, or learn more?');
            expect(matchedResponse).to.equal(true);
            return send(rb.intent('BusinessCardIntent'));
        })
        .then((res) => {
          let expectedResponse = 'Check your device for our business card. <break time=\"300ms\"/> Do you want to get an estimate for your Voice App, or learn more?';
          let expectedReprompt = 'Do you want to get an estimate for your Voice App, or learn more?';
            const matchedResponse = res.isAsk(expectedResponse, expectedReprompt);
            expect(matchedResponse).to.equal(true);
        })
    });

  });

  describe('LearnMoreTestGroup', () => {
    // Launch -> LearnMoreIntent
    it('tells customers about business', () => {
      return send(rb.launch())
        .then((res) => {
            const matchedResponse = res.isAsk('Welcome to Voice First Tech. <break time=\"300ms\"/> Do you want to see our business card, get an estimate for your Voice App, or learn more?', 'Do you want to see our business card, get an estimate for your Voice App, or learn more?');
            expect(matchedResponse).to.equal(true);
            return send(rb.intent('LearnMoreIntent'));
        })
        .then((res) => {
          let expectedResponse = 'All profits from Voice First Tech\'s Agency go directly towards educating high-school and college students with free Voice App development resources and bootcamps. Additionally, Voice First Tech offers free resources available on pretty much every major platform to get started coding today.. <break time=\"300ms\"/> Do you want to see our business card, or get an estimate for your Voice App?';
          let expectedReprompt = 'Do you want to see our business card, or get an estimate for your Voice App?';
            const matchedResponse = res.isAsk(expectedResponse, expectedReprompt);
            expect(matchedResponse).to.equal(true);
        })
    });

  });

}