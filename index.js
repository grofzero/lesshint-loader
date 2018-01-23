var LessHint = require('lesshint').Lesshint;
function LessHintPlugin(options) {
	this.options = options || {};
	this.lessOptions = options.configFile || __dirname;
}

LessHintPlugin.prototype.apply = function (compiler) {
	var self = this;
	compiler.plugin('done', function () {
		var lessHint = new LessHint();
		const config = lessHint.getConfig(self.lessOptions)
		lessHint.configure(config);
		var reporter = self.options.reporter || require('lesshint-reporter-stylish');
		const result = lessHint.checkFiles(self.options.files);
		result.then((report) => {
			reporter.report(report);
		}).catch((err) => {
			throw new Error(err)
		});
	});
};

module.exports = LessHintPlugin;