const express = require('express');
const router = express.Router();
const { getPage } = require('../controllers/staticPageController');

router.get('/:slug', getPage);

module.exports = router;