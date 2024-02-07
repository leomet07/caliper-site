const CleanCSS = require("clean-css");
module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("**/*.jpg");
	eleventyConfig.addPassthroughCopy("**/*.png");
	eleventyConfig.addPassthroughCopy("**/*.ttf");
	eleventyConfig.addPassthroughCopy("**/*.pdf");

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addCollection("winter2023", function (collection) {
		return collection
			.getFilteredByTag("winter2023")
			.sort((a, b) => a.data.index - b.data.index);
	});
	eleventyConfig.addCollection("winter2024", function (collection) {
		return collection
			.getFilteredByTag("winter2024")
			.sort((a, b) => a.data.index - b.data.index);
	});

	eleventyConfig.addCollection("contributors", function (collectionApi) {
		const contributors = {};
		const elements = [
			...collectionApi.getFilteredByTag("winter2023"),
			...collectionApi.getFilteredByTag("spring2023"),
			...collectionApi.getFilteredByTag("winter2024"),
		]
		elements.forEach(element => {
			const author_slug = element.data.author_slug;
			if (!(author_slug in contributors)) {
				contributors[author_slug] = {
					author_slug: element.data.author_slug,
					author: element.data.author,
					pieces: []
				};
			}
			contributors[author_slug].pieces.push({
				slug: element.fileSlug, // piece slug
				url: element.url,
				title: element.data.title,
			}); // push the piece slug into pieces
		});
		const contributorsEntries = Object.entries(contributors);
		const sortedContributorEntries = contributorsEntries.sort((a, b) => a[0].localeCompare(b[0])).map(v => v[1]);
		return sortedContributorEntries;
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
