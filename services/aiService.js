// services/aiService.js
const fs = require('fs');
const path = require('path');

exports.getAIResponse = async (userMessage) => {
    try {
        console.log('🤖 Processing message:', userMessage);
        
        // Load FAQs for better responses
        const faqsPath = path.join(__dirname, '../data/faqs.json');
        let faqs = [];
        
        try {
            const data = fs.readFileSync(faqsPath, 'utf8');
            faqs = JSON.parse(data);
        } catch (err) {
            console.log('📁 No FAQs found, using default responses');
        }

        const lowerMessage = userMessage.toLowerCase();

        // Check if message matches any FAQ
        for (const faq of faqs) {
            if (lowerMessage.includes(faq.question.toLowerCase()) || 
                faq.question.toLowerCase().includes(lowerMessage)) {
                console.log('✅ Found matching FAQ:', faq.question);
                return faq.answer;
            }
        }

        // Keyword based responses
        const responses = {
            'leave': 'Leave Policy: We offer 20 days of annual leave, 10 sick days, and 5 casual leaves per year. Visit LeavePolicy.html for complete details.',
            'attendance': 'Attendance Policy: Office hours are 9:00 AM to 6:00 PM. Late arrival beyond 30 minutes requires prior approval.',
            'payroll': 'Payroll Policy: Salary is processed on the last working day of every month. Visit PyrollPolicy.html for details.',
            'wfh': 'Work From Home Policy: WFH is allowed 2 days per week with manager approval. Visit WorkFromHomePolicy.html for guidelines.',
            'benefit': 'Employee Benefits: Health insurance, retirement plans, paid time off, and professional development opportunities.',
            'dress': 'Dress Code: Smart casual is recommended. Formal attire required for client meetings.',
            'hr': 'HR Policy: All HR-related queries can be addressed through the HR Policy page or by contacting HR directly.',
            'office': 'Office Timing: 9:00 AM to 6:00 PM, Monday to Friday. Visit OfficeTiming.html for more details.',
            'help': 'I can help you with policies like Leave, Attendance, Payroll, WFH, Benefits, Dress Code, and HR policies. Just ask!',
            'hi': 'Hello! 👋 How can I help you today? You can ask about any company policy.',
            'hello': 'Hello! 👋 Welcome to AI Help Centre. How can I assist you?'
        };

        // Check for keyword matches
        for (const [key, value] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                console.log('✅ Keyword matched:', key);
                return value;
            }
        }

        // Default response
        return `I understand you're asking about "${userMessage}". For detailed information, please check our Policy pages or visit the Help & Support section. You can also ask me about Leave, Attendance, Payroll, WFH, Benefits, Dress Code, or HR policies.`;

    } catch (error) {
        console.error('❌ AI Service error:', error);
        return 'I apologize, but I am unable to process your request at the moment. Please try again or visit our Help & Support page.';
    }
};