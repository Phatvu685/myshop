const { getPageBySlug: modelGetPageBySlug } = require('../model/staticPageModel');

async function getPage(slug) {
    try {
        const page = await modelGetPageBySlug(slug);
        if (!page) throw new Error('Page not found');
        return page;
    } catch (error) {
        throw new Error(`Failed to fetch page: ${error.message}`);
    }
}

module.exports = { getPage };
