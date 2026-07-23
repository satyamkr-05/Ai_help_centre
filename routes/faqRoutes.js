const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Get all FAQs
router.get('/', faqController.getAllFAQs);

// Get FAQ by ID
router.get('/:id', faqController.getFAQById);

// Search FAQs
router.get('/search', faqController.searchFAQs);

module.exports = router;