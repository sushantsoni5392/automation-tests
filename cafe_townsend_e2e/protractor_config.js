var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {

    framework: 'jasmine2',
    suites: {
        townsendFull: 'specs/cafeTownsendTest.js'
    },
    onPrepare: function() {
        global.EC = protractor.ExpectedConditions;
        global.TIMEOUT = 10000;
        // Add a screenshot reporter and store screenshots to `reports`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'reports',

        }).getJasmine2Reporter());
    },
    jasmineNodeOpts: {
        // If true, display spec names.
        isVerbose: true,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 90000,
        // If true, output nothing to the terminal. Overrides other printing options.
        silent: false,
        // If true, print timestamps for failures
        showTiming: true,
        // Print failures in real time.
        realtimeFailure: true
    }
};