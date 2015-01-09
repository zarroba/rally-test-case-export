'use strict';

var data = {};
var htmlToText = require('html-to-text');

function exportTestCaseMethod(result) {
    data.id = escapeString(result.Object.FormattedID);
    data.priority = escapeString(result.Object.Priority);
    data.name = escapeString(result.Object.Name);
    data.objective = htmlToText.fromString(result.Object.Objective, {wordwrap: 120});
    data.pre_condition = htmlToText.fromString(result.Object.PreConditions, {wordwrap: 120});
    data.validation_input = htmlToText.fromString(result.Object.ValidationInput, {wordwrap: 120});
    data.validation_expected_result = htmlToText.fromString(result.Object.ValidationExpectedResult, {wordwrap: 120});
}

function exportSteps(result) {
    data.steps = [];
    var step;
    for (var i=0; i<result.Object.Results.length; i++) {
        step = result.Object.Results[i];
        data.steps.push({
            "step_index": step.StepIndex + 1,
            "input": escapeString(step.Input),
            "expected_result": escapeString(step.ExpectedResult)
        })
    }
}

function getTestCase(template) {

    var testCase = template.render(data);
    return testCase;
}

function escapeString(str) {
    str = str.replace(/'/g, "\\\'");
    return str;
}

module.exports = {
    exportTestCaseMethod: exportTestCaseMethod,
    exportSteps: exportSteps,
    getTestCase: getTestCase
};
