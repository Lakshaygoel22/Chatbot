const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const botReplies = [
  { keywords: ['hello', 'hi', 'hey'], responses: ["Hello there! 👋", "Hi! How can I help you?"] },
  { keywords: ['how are you'], responses: ["I'm just a bot, but I'm doing well!", "All systems operational."] },
  { keywords: ['name'], responses: ["I'm your friendly chatbot.", "Call me Bot!"] },
  { keywords: ['bye', 'goodbye'], responses: ["Goodbye! Have a nice day!", "See you soon! 👋"] },
];

function getBotReply(message) {
  message = message.toLowerCase();
  for (let item of botReplies) {
    for (let keyword of item.keywords) {
      if (message.includes(keyword)) {
        return item.responses[Math.floor(Math.random() * item.responses.length)];
      }
    }
  }
  return "Sorry, I don't understand. Try asking something else!";
}

app.post('/api/message', (req, res) => {
  const { message } = req.body;
  const reply = getBotReply(message);
  res.json({ reply });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
