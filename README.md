# Rally Test Case Export

This project allows to export a Rally Test Case to a stub method you can use to start implementing it in your platform of choice.

Currently it only supports Protractor so if you want support to your flavour of choice please add an issue along with your vision for the layout of the exported stub.

## Installation

Just install it globally with npm:

    npm install -g rally-test-case-export

## Usage

First you have to create an account.conf.js file with your account details. Just check the directory where npm installed rally-test-case-export (`/usr/local/lib/node_modules/rally-test-case-export/`, probably) go to the conf dir, copy `account.conf.reference.js` and set up your rally account.

You just have to run `rally-tc-export <testcaseid> [console|clipboard]`

Please note that the test case id is actually not the formatted id (ex: TC34553) but the id you can see on the link (ex: https://rallyurl/#/12334566/detail/testcase/*5433334*)
At the moment you can chose if you want the output to be sent to the console or copied to the clipboard.

## Template

You are able to define your own template. The template file is in the same directory as your account conf file and it's called output.mustache.
We're using [Hogan.js](http://twitter.github.io/hogan.js/), a templating engine that uses the [Mustache](http://mustache.github.io/) as the template language.
You have access to the following variables in your template:

    - id
    - priority
    - name
    - pre_condition
    - validation_input
    - validation_expected_result
    - steps
        - step_index
        - input
        - expected_result

If you need any other property from rally please add an issue or do a pull requesttuds

## Changelog

### v1.2.1
 - Add "Objective" parameter and improve text legibility
 - Improve text legibility of some parameters. Convert HTML to plain-text using "html-to-text" dependency

### v1.1.2

- Fixing loading template file (Issue #4)

### v1.1.0

#### Features

- You now have the capability of defining your own template (Issue #1)

### v1.0.4

#### Bug Fixes

- Issue #2: Escape single quotes from values
- Issue #3: Fixed command line error message
- Fixed typo in README file

### v1.0.3

#### Features

- Allows you to export rally test cases in a protractor/jasmine format either to the clipboard or to the console
