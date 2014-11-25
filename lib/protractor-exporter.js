'use strict';

var hogan = require("hogan.js");
var fs = require('fs');
var data = {};

function exportTestCaseMethod(result) {
    data.id = escapeString(result.Object.FormattedID);
    data.priority = escapeString(result.Object.Priority);
    data.name = escapeString(result.Object.Name);
    data.pre_condition = escapeString(result.Object.PreConditions);
    data.validation_input = escapeString(result.Object.ValidationInput);
    data.validation_expected_result = escapeString(result.Object.ValidationExpectedResult);
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

function getTestCase() {
    var template = hogan.compile(fs.readFileSync("./config/output.mustache", 'utf8'));
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