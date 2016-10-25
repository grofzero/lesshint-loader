var LessHint = require('lesshint');
var glob = require('glob-all');
var arrify = require('arrify');
function LessHintPlugin(options) {
    this.options = options || {};
    this.lessOptions = options.configFile?  require(options.configFile): {}; 
}

LessHintPlugin.prototype.apply = function (compiler) {
    var lessHint = new LessHint();
    lessHint.configure(this.lessOptions);
    var reporter = this.options.reporter || require('lesshint-reporter-stylish');
    glob(this.options.files || [], function (err, files) {
        if (err) {
            throw new Error('Error processing files');
        }
        for (var i = 0, iLen = files.length; i < iLen; i++) {
            lessHint.checkFile(files[i]).then((report) => {
                reporter.report(report);
            });
        }
    });
};

module.exports = LessHintPlugin;