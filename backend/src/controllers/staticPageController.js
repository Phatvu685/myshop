const { getPage: serviceGetPage } = require('../services/staticPageService');

async function getPage(req, res) {
    try {
        const page = await serviceGetPage(req.params.slug);
        res.json({ success: true, page });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

module.exports = { getPage };
