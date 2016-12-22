var LessHint = require('lesshint');
var glob = require('glob-all');
var arrify = require('arrify');
function LessHintPlugin(options) {
	this.options = options || {};
	this.lessOptions = options.configFile ? require(options.configFile) : {};
}

LessHintPlugin.prototype.apply = function (compiler) {
	var self = this;
	compiler.plugin('done', function () {
		var lessHint = new LessHint();
		lessHint.configure(self.lessOptions);
		var reporter = self.options.reporter || require('lesshint-reporter-stylish');
		glob(self.options.files || [], function (err, files) {
			if (err) {
				throw new Error('Error processing files');
			}
			for (var i = 0, iLen = files.length; i < iLen; i++) {
				lessHint.checkFile(files[i]).then((report) => {
					reporter.report(report);
				});
			}
		});
	});
};

module.exports = LessHintPlugin;