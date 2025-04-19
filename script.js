function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}
const chatBox = document.getElementById("chatBox");
const chatBody = document.getElementById("chatBody");

const categories = {
  "M&A・事業承継": ["後継者不在で悩んでいる", "会社の売却を検討している", "買収を考えている", "第三者への承継を相談したい", "その他のM&A・事業承継に関すること"]
};

let selectedCategory = "";
let selectedSubcategory = "";

function startChat() {
  chatBox.style.display = "flex";
  chatBody.innerHTML = "";
  typeMessage("こんにちは！課題解決サポートチャットです 😊", () => {
    typeMessage("今日はどのようなご相談でしょうか？お気軽にご相談ください！", () => {
      Object.keys(categories).forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "category-button";
        btn.textContent = cat;
        btn.onclick = () => handleCategory(cat);
        chatBody.appendChild(btn);
      });
    });
  });
}

function typeMessage(text, callback) {
  const msg = document.createElement("div");
  msg.className = "message bot";
  chatBody.appendChild(msg);
  let i = 0;
  const interval = setInterval(() => {
    msg.textContent += text[i++];
    scrollToBottom();
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 60);
}

function handleCategory(cat) {
  selectedCategory = cat;
  typeMessage("ありがとうございます！もう少し詳しく教えてください😊", () => {
    categories[cat].forEach(sub => {
      const btn = document.createElement("button");
      btn.className = "subcategory-button";
      btn.textContent = sub;
      btn.onclick = () => handleSubcategory(sub);
      chatBody.appendChild(btn);
    });
  });
}

function handleSubcategory(sub) {
  selectedSubcategory = sub;
  typeMessage("承知しました！お役に立てるかもしれません！具体的なご相談内容の入力をお願いします！", () => {
    showForm();
  });
}

function showForm() {
  const fields = [
    { id: "message", label: "ご相談内容*", type: "textarea" },
    { id: "company", label: "会社名*", type: "text" },
    { id: "name", label: "お名前*", type: "text" },
    { id: "email", label: "メールアドレス*", type: "email" }
  ];

  fields.forEach(f => {
    const input = document.createElement(f.type === "textarea" ? "textarea" : "input");
    input.id = f.id;
    input.className = "form-input";
    input.placeholder = f.label;
    chatBody.appendChild(input);
  });

  const submit = document.createElement("button");
  submit.textContent = "送信する";
  submit.className = "submit-button";
  submit.onclick = submitForm;
  chatBody.appendChild(submit);
}

function submitForm() {
  const requiredFields = ["message", "company", "name", "email"];
  for (let id of requiredFields) {
    const val = document.getElementById(id).value.trim();
    if (!val) {
      alert("すべての項目を入力してください。");
      return;
    }
  }

  const payload = {
    category: selectedCategory,
    subcategory: selectedSubcategory,
    message: document.getElementById("message").value,
    company: document.getElementById("company").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value
  };

  fetch("https://script.google.com/macros/s/AKfycbxN8FTZ7xNGWazi-lAZIF8nKoU2_E2VjUS-_HasDFxJy_5rewyQb1quqgyhNaTKHDSD/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  typeMessage("ありがとうございます！内容を確認し、担当よりご連絡いたします。\n私たちは、貴社の益々の発展を応援しております！\n引き続きよろしくお願いいたします。", () => {
    const restart = document.createElement("button");
    restart.textContent = "🔁 もう一度相談する";
    restart.className = "restart-button";
    restart.onclick = startChat;
    chatBody.appendChild(restart);
  });
}

// 🔽 自動スタート
window.onload = () => startChat();
