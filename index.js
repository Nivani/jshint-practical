(function () {
    "use strict";

    var chalk = require('chalk');

    module.exports = {
        reporter: function (result) {
            var previousFile = null;
            result.forEach(function (problem) {
                var error = problem.error;
                var chalkFunction = getColorFunction(error.code[0]);

                if (previousFile !== null && previousFile !== problem.file) {
                    console.log();
                }

                var log = problem.file + ':' + error.line + ':' + error.character + ' ';
                log += chalkFunction(error.code + ' ' + error.raw);
                console.log(log);

                previousFile = problem.file;
            });

            console.log();

            function getColorFunction(errorCode) {
                switch (errorCode) {
                case 'E':
                    return chalk.red;
                case 'W':
                    return chalk.yellow;
                default:
                    return chalk.blue;
                }
            }
        }
    };
}());
