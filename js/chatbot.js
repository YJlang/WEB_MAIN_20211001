document.getElementById('send-button').addEventListener('click', sendMessage);

async function sendMessage() {
  const inputField = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-box');
  const backup = document.getElementById('back_index');
  const userMessage = inputField.value;
  
  if (!userMessage) return;

  // 사용자 메시지를 채팅 박스에 추가
  chatBox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
  inputField.value = '';

  const apiKey = 'API KEY 넣어야 함';

  // OpenAI API 요청
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: userMessage }]
    })
  });

  const data = await response.json();
  const botMessage = data.choices[0].message.content;

  // 챗봇 응답을 채팅 박스에 추가
  chatBox.innerHTML += `<div><strong>Bot:</strong> ${botMessage}</div>`;

  // 채팅 박스를 스크롤하여 최신 메시지가 보이도록 설정
  chatBox.scrollTop = chatBox.scrollHeight;

  backup.addEventListener('click', function(){
    window.location.href = '../index.html';
  });
}
