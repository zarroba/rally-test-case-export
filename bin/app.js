#!/usr/bin/env node

'use strict';

var clipboard = require('copy-paste').global()
var fs = require('fs');
var hogan = require('hogan.js');
var path = require('path');

var rally = require('../lib/rally-client');
var exporter = require('../lib/protractor-exporter');
var conf = require('../config/account.conf');
var templateFile = path.join(__dirname, '../config/output.mustache');

var template = hogan.compile(fs.readFileSync(templateFile, 'utf8'));
var tcRef = process.argv[2];
var output = process.argv[3];

if (process.argv[0] === 'node') {
    if (process.argv.length !== 4) {
        console.log('The correct usage for rally test case export should be:')
        console.log('\tnode bin/app.js `test-case-id` [clipboard|console]')
        return;
    }

    tcRef = process.argv[2];
    output = process.argv[3];
}
else if (process.argv[0] === 'rally-tc-export') {
    if (process.argv.length !== 3) {
        console.log('The correct usage for rally test case export should be:')
        console.log('\rally-tc-export `test-case-id` [clipboard|console]')
        return;
    }
    tcRef = process.argv[1];
    output = process.argv[2];
}

rally.init(conf.login, conf.password, conf.apiKey, exporter);

/*
rally.getInitiative("33076243922")
    .then(rally.readInitiative)
    .then(rally.readFeatures)
    //.then(rally.readUserStories)
    .fail(rally.onError);
*/

rally.readTestCase(tcRef)
    .then(rally.readSteps)
    .then(rally.stepsResults)
    .then(function () {
        if (output === 'clipboard') {
            clipboard.copy(exporter.getTestCase(template));
        }
        else if (output === 'console') {
            console.log(exporter.getTestCase(template));
        }
        else {
            console.log('Unknown output');
        }
    })
    .fail(rally.onError);
