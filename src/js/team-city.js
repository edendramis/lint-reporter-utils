/**
 * @fileoverview Utilities for reporting to TeamCity
 * @author Evangelia Dendramis
 */
'use strict';

exports.reportName = 'Example Report';

/**
 * Prints start of report to stdout
 * @returns {void}
 */
exports.reportStart = function() {
  process.stdout.write('##teamcity[testSuiteStarted name=\'' + this.reportName + '\']\n');
};

/**
 * Prints end of report to stdout
 * @returns {void}
 */
exports.reportEnd = function() {
  process.stdout.write('##teamcity[testSuiteFinished name=\'' + this.reportName + '\']\n');
};

/**
 * Prints start of test to stdout
 * @param {string} filePath - Path of file being linted
 * @returns {void}
 */
exports.testStart = function(filePath) {
  process.stdout.write('##teamcity[testStarted name=\'' + this.reportName + ': ' + this.escapeTeamCityString(filePath) + '\']\n');
};

/**
 * Prints end of test to stdout
 * @param {string} filePath - Path of file being linted
 * @returns {void}
 */
exports.testEnd = function(filePath) {
  process.stdout.write('##teamcity[testFinished name=\'' + this.reportName + ': ' + this.escapeTeamCityString(filePath) + '\']\n');
};

/**
 * Prints test failed info to stdout
 * @param {string} filePath - Path of file being linted
 * @param {array} messageList - Array of failed error messages
 * @returns {void}
 */
exports.testFailed = function(filePath, messageList) {
  process.stdout.write('##teamcity[testFailed name=\'' + this.reportName +
    ': ' + this.escapeTeamCityString(filePath) + '\' message=\'' + this.escapeTeamCityString(messageList.join('\n')) + '\']\n');
};

/**
 * Escapes a string for Team City
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
exports.escapeTeamCityString = function(str) {

  if (!str) {
    return '';
  }

  return str.replace(/\|/g, '||')
    .replace(/\'/g, '|\'')
    .replace(/\n/g, '|n')
    .replace(/\r/g, '|r')
    .replace(/\u0085/g, '|x')
    .replace(/\u2028/g, '|l')
    .replace(/\u2029/g, '|p')
    .replace(/\[/g, '|[')
    .replace(/\]/g, '|]');
};
