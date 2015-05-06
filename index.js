var loaderUtils = require('loader-utils');
var getDimensions = require('image-size');

module.exports = function(content) {
	this.cacheable && this.cacheable(true);
	if(!this.emitFile) throw new Error('emitFile is required from module system');

	var query = loaderUtils.parseQuery(this.query);

	var url = loaderUtils.interpolateName(this, query.name || '[name].[ext]', {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});

	getDimensions(this.resourcePath, function(err, dimensions) {
		if(err) return err;
		
		this.emitFile(url, content);
		return "module.exports = " + JSON.stringify(dimensions);
	});
};

module.exports.raw = true;