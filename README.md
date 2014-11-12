# Rally Test Case Export

This project allows to export a Rally Test Case to a stub method you can use to start implementing it in your platform of choice.

Currently it only supports Protractor so if you want support to your flavour of choice please add an issue along with your vision for the layout of the exported stub.

## Installation

Just install it globally with npm:

    npm install -g rally-test-case-export

## Usage

First you have to create an account.conf.js file with your account details. Just check the directory where npm installed rally-test-case-export (`/usr/local/lib/node_modules/rally-test-case-export/`, probably) go to the conf dir, copy account.conf.reference.js and set up your rally account.

You just have to run `rally-tc-export <testcaseid> [console|clipboard]`

Please note that the test case id is actually not the formatted id (ex: TC34553) but the id you can see on the link (ex: https://rallyurl/#/12334566/detail/testcase/*5433334*)
At the moment you can chose if you want the output to be sent to the console or copied to the clipboard.
