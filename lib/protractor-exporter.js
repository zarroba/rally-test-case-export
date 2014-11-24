'use strict';

var testCase = "";

function exportTestCaseMethod(result) {
    testCase += 'it(\'[' + escapeString(result.Object.FormattedID) + ']{' + escapeString(result.Object.Priority) + '} ' + escapeString(result.Object.Name) + '\', function () {\n';
}

function exportSteps(result) {
    var step;
    for (var i=0; i<result.Object.Results.length; i++) {
        step = result.Object.Results[i];
        testCase += '\t//' + (step.StepIndex + 1) + ' - ' + escapeString(step.Input) + ' - ' + escapeString(step.ExpectedResult) + '\n';
    }
}

function closeTestCase() {
    testCase += '});'
}

function getTestCase() {
    return testCase;
}

function escapeString(str) {
    str = str.replace(/'/g, "\\\'");
    return str;
}

module.exports = {
    exportTestCaseMethod: exportTestCaseMethod,
    exportSteps: exportSteps,
    closeTestCase: closeTestCase,
    getTestCase: getTestCase
};