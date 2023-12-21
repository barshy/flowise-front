const form = document.querySelector("form");
const messageInput = document.getElementById("message");
const messageBtn = document.getElementById("message-btn");
const chatContainer = document.getElementById("chat-container"); // Chat container element

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = messageInput.value.trim();
  if (userMessage) {
    appendMessageToChat('user', userMessage);

    messageBtn.disabled = true;
    messageBtn.innerHTML = "Sending...";

    try {
      const res = await fetch("/api/flowise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      appendMessageToChat('bot', data.message); // Assuming the response has a 'message' property
    } catch (error) {
      appendMessageToChat('bot', 'An error occurred.');
    } finally {
      messageBtn.disabled = false;
      messageBtn.innerHTML = "Send";
      messageInput.value = "";
    }
  }
});

function appendMessageToChat(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("p-2", "rounded", "mb-2", "text-white");
  
  if (sender === 'user') {
    messageDiv.classList.add("bg-black", "self-end");
  } else {
    messageDiv.classList.add("bg-gray-500", "self-start");
  }

  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}
