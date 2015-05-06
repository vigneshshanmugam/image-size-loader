var loaderUtils = require('loader-utils');
var sizeOf = require('image-size');

module.exports = function(content) {
	this.cacheable && this.cacheable(true);
	if(!this.emitFile) throw new Error('emitFile is required from module system');

	var query = loaderUtils.parseQuery(this.query);

	var url = loaderUtils.interpolateName(this, query.name || '[name].[ext]', {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});

	var result = [];

	sizeOf(this.resourcePath, function(err, size) {
		if(err) return err;

		result.push('exports.src = __webpack_public_path__ + ' + JSON.stringify(url) + ';');
		result.push('exports.width = ' + JSON.stringify(size.width) + ';');
		result.push('exports.height = ' + JSON.stringify(size.height) + ';');

		this.emitFile(url, content);
		return result;
	});
};

module.exports.raw = true;