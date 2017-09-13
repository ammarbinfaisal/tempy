'use strict';
const fs = require('fs');
const path = require('path');
const uniqueString = require('unique-string');
const pify = require('pify');
const tempDir = require('temp-dir');

const mkdir = pify(fs.mkdir);

const getPath = () => path.join(tempDir, uniqueString());

module.exports.file = opts => {
	opts = Object.assign({
		extension: ''
	}, opts);

	if (opts.name) {
		if (opts.extension) {
			throw new Error('The `name` and `extension` options are mutually exclusive');
		}

		return path.join(module.exports.directory(), opts.name);
	}

	return getPath() + (opts.extension ? `.${opts.extension.replace(/^\./, '')}` : '');
};

module.exports.directory = () => {
	const dir = getPath();
	fs.mkdirSync(dir);
	return dir;
};

module.exports.directoryAsync = () => {
	const dir = getPath();
	return mkdir(dir).then(() => dir);
};

module.exports.root = tempDir;
