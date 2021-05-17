const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');
const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;
