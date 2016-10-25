var LessHint = require('lesshint');
var glob = require("multi-glob").glob;
var arrify = require('arrify');
function LessHintPlugin(options, lessOptions) {
    this.options = options || {};
    this.lessOptions = lessOptions;
}

LessHintPlugin.prototype.apply = function (compiler) {
    var lessHint = new LessHint();
    lessHint.configure(this.lessOptions);
    //var defaultReporter = lessHint.getReporter(require('lesshint-reporter-stylish'));
    var defaultReporter = lessHint.getReporter();
    glob(arrify(this.options.files || ''), function (err, files) {
        if (err) {
            throw new Error('Error processing files');
        }
        for (var i = 0, iLen = files.length; i < iLen; i++) {
            lessHint.checkFile(files[i]).then((report) => {
                defaultReporter.report(report);
            });
        }
    });
};

module.exports = LessHintPlugin;