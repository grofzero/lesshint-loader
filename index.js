const LessHint = require('lesshint').Lesshint;
function LessHintPlugin(options) {
	this.options = options || {};
	this.lessOptions = options.configFile || __dirname;
}

LessHintPlugin.prototype.apply = function (compiler) {
	compiler.hooks.done.tap('LessHintPlugin', params => {
		const lessHint = new LessHint();
		const config = lessHint.getConfig(this.lessOptions)
		lessHint.configure(config);
		const reporter = this.options.reporter || require('lesshint-reporter-stylish');
		const result = lessHint.checkFiles(this.options.files);
		
		result.then((report) => {
			reporter.report(report);
		}).catch((err) => {
			throw new Error(err)
		});
	});
};

module.exports = LessHintPlugin;