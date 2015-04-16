'use strict';

var rally = require('rally');
var restApi;
var exporter;

function init(username, password, exp) {
    restApi = rally({
        user: username,  //required if no api key, defaults to process.env.RALLY_USERNAME
        pass: password,  //required if no api key, defaults to process.env.RALLY_PASSWORD
        apiVersion: 'v2.0', //this is the default and may be omitted
        server: 'https://rally1.rallydev.com',  //this is the default and may be omitted
        requestOptions: {
            headers: {
                'X-RallyIntegrationName': 'Test Case Stub Generator',  //while optional, it is good practice to
                'X-RallyIntegrationVendor': 'testRally',             //provide this header information
                'X-RallyIntegrationVersion': '1.0'
            }
            //any additional request options (proxy options, timeouts, etc.)
        }
    });
    exporter = exp;
}

function readTestCase(tcId) {
    return restApi.get({
        ref: '/testcase/' + tcId,
        fetch: ['FormattedID', 'Name', 'Objective', 'Steps', 'Priority', 'PreConditions', 'PostConditions', 'ValidationInput', 'ValidationExpectedResult']
    });
}

function readSteps(result) {
    exporter.exportTestCaseMethod(result);
    return restApi.get({
        ref: result.Object.Steps._ref,
        fetch: ['StepIndex', 'Input', 'ExpectedResult']
    });
}

function stepsResults(result) {
    exporter.exportSteps(result);
}

function onError(errors) {
    console.log('Failure!', errors);
}

module.exports = {
    init: init,
    readTestCase: readTestCase,
    readSteps: readSteps,
    stepsResults: stepsResults,
    onError: onError
};
