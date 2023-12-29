const CleanCSS = require("clean-css");
module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("**/*.jpg");

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addCollection("winter2023", function (collection) {
		return collection
			.getFilteredByTag("winter2023")
			.sort((a, b) => a.data.index - b.data.index);
	});

	return {
		dir: {
			input: "content", // default: "."
			includes: "../_includes", // default: "_includes"
			data: "../_data", // default: "_data"
			output: "_site",
		},
	};
};
