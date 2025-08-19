function sendMessage(chatId, message) {
    const axios = require('axios');
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    return axios.post(url, {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
    })
    .then(response => {
        if (response.data.ok) {
            console.log('Message sent successfully:', response.data.result);
        } else {
            console.error('Error sending message:', response.data.description);
        }
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
}

module.exports = {
    sendMessage
};