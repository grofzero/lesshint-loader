module.exports = function(source) {
    this.cacheable();
    //var callback = this.async();
    console.log(source);
    return source;
};