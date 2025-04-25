const { connection } = require('../../config/db');

async function getPageBySlug(slug) {
    try {
        const conn = await connection();
        const [pages] = await conn.query('SELECT * FROM static_pages WHERE slug = ?', [slug]);
        await conn.end();
        return pages[0];
    } catch (error) {
        throw new Error(`Failed to fetch static page: ${error.message}`);
    }
}

module.exports = { getPageBySlug };