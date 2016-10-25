var LessHint = require('lesshint');
var glob = require("glob");
function LessHintPlugin(options) {
    this.options = options;
}

LessHintPlugin.prototype.apply = function (compiler) {
    var lessHint = new LessHint();
    var defaultReporter = lessHint.getReporter();
    glob(this.options.files, function (err, files) {
        if (err) {
            throw new Error('Error processing files');
        }
        for (var i=0,iLen=files.length;i<iLen;i++) {
            lessHint.checkFile(files[i]).then((report)=>{
                defaultReporter.report(report);
            });
        }
    });
};

module.exports = LessHintPlugin;