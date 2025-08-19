const express = require('express');
const bodyParser = require('body-parser');
const { sendMessage } = require('./utils/telegram');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// GitHub webhook endpoint
app.post('/webhook', (req, res) => {
    const event = req.headers['x-github-event'];
    const payload = req.body;

    let message;

    switch (event) {
        case 'push':
            message = `New push to ${payload.repository.full_name} by ${payload.pusher.name}: ${payload.head_commit.message}`;
            break;
        case 'pull_request':
            message = `New pull request ${payload.action} in ${payload.repository.full_name} by ${payload.pull_request.user.login}: ${payload.pull_request.title}`;
            break;
        default:
            message = `Received event: ${event}`;
    }

    // Send message to Telegram
    sendMessage(message)
        .then(() => {
            res.status(200).send('Notification sent to Telegram');
        })
        .catch(err => {
            console.error('Error sending message to Telegram:', err);
            res.status(500).send('Error sending notification');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});