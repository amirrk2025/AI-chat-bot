const chatForm = document.getElementById("chatForm");
const messagesDiv = document.getElementById("messages");

let messages = [
    { role: "system", content: "You are a helpful assistant." }
];

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userInput = document.getElementById("userInput");
    const userMessage = userInput.value;

    if (!userMessage.trim()) return;

    messages.push({ role: "user", content: userMessage });

    // نمایش پیام کاربر با انیمیشن
    addMessage(userMessage, "user-message");

    userInput.value = "";

    // نمایش پیام "در حال تایپ..."
    const typingIndicator = addMessage("Typing...", "assistant-message", true);

    // ارسال پیام به سرور
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
    });

    const data = await response.json();

    // حذف تایپینگ
    typingIndicator.remove();

    // نمایش پاسخ
    messages.push({ role: "assistant", content: data.content });
    addMessage(data.content, "assistant-message");
});

function addMessage(content, className, isTemporary = false) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = content;
    messageDiv.className = `message ${className}`;
    messagesDiv.appendChild(messageDiv);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    if (isTemporary) return messageDiv;
}
