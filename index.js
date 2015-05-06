var loaderUtils = require('loader-utils');
var getDimensions = require('image-size');

module.exports = function(content) {
	this.cacheable && this.cacheable(true);
	if(!this.emitFile) throw new Error('emitFile is required from module system');

	this.addDependency(this.resourcePath);

	var query = loaderUtils.parseQuery(this.query);
	var filename = "[name].[ext]";

	if (this.options.output.imageFilename) {
		filename = this.options.output.imageFilename
	}
	// query.name overrides imageFilename
	if ('string' === typeof query.name) {
		filename = query.name;
	}

	var url = loaderUtils.interpolateName(this, filename, {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});

	var dimensions = getDimensions(this.resourcePath);

	dimensions.src = this.options.output.publicPath
		? this.options.output.publicPath + url
		: url;

	this.emitFile(url, content);
	return 'module.exports = ' + JSON.stringify(dimensions);
};

module.exports.raw = true;
