const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Send message
router.post('/send', chatController.sendMessage);

// Get chat history
router.get('/history', chatController.getChatHistory);

module.exports = router;