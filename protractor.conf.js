/* The local protractor config */
exports.config = {
  baseUrl: 'http://localhost:9001/index.html',
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
        args: ['--test-type']
    }
  },
  specs: ['test/spec/e2e/*.js'],
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true
  }
};
