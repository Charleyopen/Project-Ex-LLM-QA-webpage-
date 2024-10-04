const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        appendMessage('用户: ' + message);
        userInput.value = '';
        getAIResponse(message);
    }
}

function appendMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function getAIResponse(message) {
    const apiUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    const apiKey = 'b584d523cfde4650a87050b0b9039a81.ndngcm25RQLcuQCa'; // 请替换为您的实际API密钥

    const requestBody = {
        model: "glm-4",
        messages: [
            {
                role: "user",
                content: message
            }
        ],
        stream: false
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('API请求失败');
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        appendMessage('AI: ' + aiResponse);
    } catch (error) {
        console.error('错误:', error);
        appendMessage('AI: 抱歉,出现了一些问题,请稍后再试。');
    }
}