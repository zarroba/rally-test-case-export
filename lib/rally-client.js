'use strict';

var rally = require('rally');
var restApi;
var exporter;

function init(username, password, apiKey, exp) {
    restApi = rally({
        user: username,  //required if no api key, defaults to process.env.RALLY_USERNAME
        pass: password,  //required if no api key, defaults to process.env.RALLY_PASSWORD
        apiKey: apiKey,  //required if no api key, defaults to process.env.RALLY_API_KEY
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

function getInitiative(inId) {
    return restApi.get({
        ref: '/portfolioitem/initiative/' + inId,
        fetch: ['FormattedID', 'Name', 'Children']
    });
}

function readInitiative(result) {
    console.log("Initiative " + result.Object.Name)
    //console.log(result.Object)

    return restApi.get({
        ref: result.Object.Children._ref,
        fetch: ['Name', 'UserStories']
    });
}

function readFeatures(result) {
    //console.log(result.Object)
    var data;
    for (var i=0; i<result.Object.Results.length; i++) {
        data = result.Object.Results[i];
        //console.log("\tFeature " + data .Name)

        restApi.get({
            ref: data.UserStories._ref,
            fetch: ['Name']
        }, function(error, result) {
            if(error) {
                onError(error);
            } else {
                readUserStories(result);
            }
        });
    }
}

function readUserStories(result) {
    //console.log(result.Object)
    var data;
    for (var i=0; i<result.Object.Results.length; i++) {
        data = result.Object.Results[i];
        console.log("\t\tUser Story (" + i+1 + "): " + data.Name)
    }
}

module.exports = {
    init: init,
    readTestCase: readTestCase,
    readSteps: readSteps,
    getInitiative: getInitiative,
    readInitiative: readInitiative,
    readFeatures: readFeatures,
    readUserStories: readUserStories,
    stepsResults: stepsResults,
    onError: onError
};
