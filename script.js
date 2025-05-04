
function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}
const chatBox = document.getElementById("chatBox");
const chatBody = document.getElementById("chatBody");

const categories = {
  "M&A・事業承継": ["後継者不在で悩んでいる", "会社の売却を検討している", "買収を考えている", "第三者への承継を相談したい", "その他のM&A・事業承継に関すること"],
  "補助金・助成金": ["新規事業や設備投資の予定がある", "どの補助金・助成金が使えるか知りたい", "専門家に申請手続きをサポートしてほしい", "事業計画書の作成を相談したい", "その他の補助金・助成金に関すること"],
  "資金調達・財務・税務": ["融資や資金繰りで悩んでいる", "節税や税務対策について相談したい", "財務改善や分析をしたい", "出資や投資の相談をしたい", "その他の資金調達・財務・税務に関すること"],
  "採用・組織・労務": ["人材の採用で困っている", "定着率や離職率を改善したい", "組織体制を見直したい", "労務管理の相談がしたい", "その他の採用・組織・労務に関すること"],
  "新規事業・パートナー": ["新しい事業の立ち上げを考えている", "パートナー・協業先を探している", "補助金や設備投資減税について詳しくしりたい", "専門家を紹介してほしい", "その他の新規事業・パートナーに関すること"],
  "コスト削減・DX・AI活用": ["業務の効率化を進めたい", "DXやITツール導入の相談をしたい", "AIの導入事例を知りたい", "コスト削減の方法を見直したい", "その他のDX・AI活用・コスト削減に関すること"],
  "その他のご相談": ["経営全般の相談をしたい", "何から相談してよいか分からない", "自社の現状に合う支援を知りたい", "外部専門家の紹介を受けたい", "その他のご相談"]
};

let selectedCategory = "";
let selectedSubcategory = "";

function startChat() {
  chatBox.style.display = "flex";
  chatBody.innerHTML = "";
  typeMessage("こんにちは！\n課題解決サポートチャットです 😊", () => {
    typeMessage("このチャットでは、あなたの「経営に関する悩み・気になること」を整理し、\n例えば専門家のご紹介など最適な支援をご案内できます！", () => {
      typeMessage("✔ ご相談＆専門家の紹介は完全無料です！\n✔ チャットボット×人（チームAUU）で最適な対応をします！\n✔ 話すだけで、課題の整理ができます！", () => {
        typeMessage("まずは以下から、気になる分野を選んでみてください 😊", () => {
          Object.keys(categories).forEach(cat => {
            const btn = document.createElement("button");
            btn.className = "category-button";
            btn.textContent = cat;
            btn.onclick = () => handleCategory(cat);
            chatBody.appendChild(btn);
          });
        });
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
    const char = text[i++];
    msg.innerHTML += (char === "\n") ? "<br>" : char;
    scrollToBottom();
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 100);
}

function handleCategory(cat) {
  selectedCategory = cat;
  typeMessage("ありがとうございます！もう少し詳しく教えてください😊 ↓", () => {
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
  typeMessage("承知しました！お役に立てるかもしれません！具体的なご相談内容の入力をお願いします！ ↓", () => {
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
    if (f.id === "message") {
      input.addEventListener("input", () => {
        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";
      });
    }
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

window.onload = startChat;
