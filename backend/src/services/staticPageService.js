const { getPageBySlug } = require('../models/staticPageModel');

async function getPage(slug) {
    try {
        const page = await getPageBySlug(slug);
        if (!page) throw new Error('Page not found');
        return page;
    } catch (error) {
        throw new Error(`Failed to fetch page: ${error.message}`);
    }
}

module.exports = { getPage };