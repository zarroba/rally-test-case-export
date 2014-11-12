'use strict';

var testCase = "";

function exportTestCaseMethod(result) {
    testCase += 'it(\'[' + result.Object.FormattedID + ']{' + result.Object.Priority + '} ' + result.Object.Name + '\')\n';
    testCase += '{\n';
}

function exportSteps(result) {
    var step;
    for (var i=0; i<result.Object.Results.length; i++) {
        step = result.Object.Results[i];
        testCase += '\t//' + (step.StepIndex + 1) + ' - ' + step.Input + ' - ' + step.ExpectedResult + '\n';
    }
}

function closeTestCase() {
    testCase += '}'
}

function getTestCase() {
    return testCase;
}

module.exports = {
    exportTestCaseMethod: exportTestCaseMethod,
    exportSteps: exportSteps,
    closeTestCase: closeTestCase,
    getTestCase: getTestCase
};