var loaderUtils = require('loader-utils');
var getDimensions = require('image-size');

module.exports = function(content) {
	this.cacheable && this.cacheable(true);
	if(!this.emitFile) throw new Error('emitFile is required from module system');

	this.addDependency(this.resourcePath);
	var query = loaderUtils.parseQuery(this.query);

	var url = loaderUtils.interpolateName(this, query.name || '[name].[ext]', {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});

	dimensions = getDimensions(this.resourcePath);
	
	var publicPath = "";
	if(this.options.output.publicPath) publicPath = this.options.output.publicPath;
	dimensions.url = publicPath + url;
	dimensions.geometry = dimensions.width + "x" + dimensions.height;

	this.emitFile(url, content);
	return "module.exports = " + JSON.stringify(dimensions);
};

module.exports.raw = true;