const fs = require('fs');
const path = require('path');

const faqsPath = path.join(__dirname, '../data/faqs.json');

// Get all FAQs
exports.getAllFAQs = (req, res) => {
    try {
        const data = fs.readFileSync(faqsPath, 'utf8');
        const faqs = JSON.parse(data);
        res.json(faqs);
    } catch (error) {
        console.error('Error reading FAQs:', error);
        res.status(500).json({ error: 'Failed to load FAQs' });
    }
};

// Get FAQ by ID
exports.getFAQById = (req, res) => {
    try {
        const { id } = req.params;
        const data = fs.readFileSync(faqsPath, 'utf8');
        const faqs = JSON.parse(data);
        const faq = faqs.find(f => f.id === parseInt(id));
        
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        res.json(faq);
    } catch (error) {
        console.error('Error reading FAQ:', error);
        res.status(500).json({ error: 'Failed to load FAQ' });
    }
};

// Search FAQs
exports.searchFAQs = (req, res) => {
    try {
        const { q } = req.query;
        const data = fs.readFileSync(faqsPath, 'utf8');
        const faqs = JSON.parse(data);
        
        const results = faqs.filter(faq => 
            faq.question.toLowerCase().includes(q.toLowerCase()) ||
            faq.answer.toLowerCase().includes(q.toLowerCase())
        );
        
        res.json(results);
    } catch (error) {
        console.error('Error searching FAQs:', error);
        res.status(500).json({ error: 'Failed to search FAQs' });
    }
};