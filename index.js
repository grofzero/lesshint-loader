var LessHint = require('lesshint');
module.exports = function(source) {
    this.cacheable();
    var lessHint = new LessHint(); 
    var defaultReporter = lessHint.getReporter();
    defaultReporter.report(lessHint.checkString(source))
    return source;
};