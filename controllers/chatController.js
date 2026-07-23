const aiService = require('../services/aiService');

exports.sendMessage = async (req, res) => {
    try {
        console.log('📩 Received message:', req.body); // Debug log
        
        const { message } = req.body;
        
        if (!message) {
            console.log('❌ No message provided');
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('🤖 Getting AI response for:', message);
        const reply = await aiService.getAIResponse(message);
        console.log('✅ AI Response:', reply);
        
        res.json({ 
            success: true,
            reply: reply,
            message: message
        });
    } catch (error) {
        console.error('❌ Chat error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            details: error.message 
        });
    }
};

exports.getChatHistory = (req, res) => {
    try {
        const history = [
            { id: 1, user: 'Hello', bot: 'Hi! How can I help you?' },
            { id: 2, user: 'What is the leave policy?', bot: 'Please visit the Leave Policy page for complete details.' }
        ];
        res.json({ success: true, history });
    } catch (error) {
        console.error('Error getting history:', error);
        res.status(500).json({ success: false, error: 'Failed to get history' });
    }
};