const form = document.getElementById('input-form');
const input = document.getElementById('input-field');
const conversation = document.getElementById('conversation');

function appendMessage(text, isUser = false) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('chatbot-message');
  if (isUser) msgDiv.classList.add('user-message');
  const p = document.createElement('p');
  p.classList.add('chatbot-text');
  p.innerText = text;
  msgDiv.appendChild(p);
  conversation.appendChild(msgDiv);
  conversation.scrollTop = conversation.scrollHeight;
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;
  appendMessage(userMsg, true);
  input.value = '';

  // Send message to backend
  try {
    const response = await fetch('http://localhost:3000/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg })
    });
    const data = await response.json();
    appendMessage(data.reply, false);
  } catch (error) {
    appendMessage("Could not reach server. Is backend running?", false);
  }
});
