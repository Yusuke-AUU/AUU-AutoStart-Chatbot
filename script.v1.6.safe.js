window.onload = function startChat() {
  const chatBox = document.getElementById("chatBox");
  const chatBody = document.getElementById("chatBody");

  if (!chatBox || !chatBody) {
    console.error("chatBox または chatBody が見つかりません。HTMLに正しくIDが設定されているか確認してください。");
    return;
  }

  chatBox.style.display = "flex";
  chatBody.innerHTML = "";

  typeMessage("こんにちは！\n課題解決サポートチャットです 😊", () => {
    typeMessage("このチャットでは、あなたの「経営に関する悩み・気になること」を整理し、例えば専門家のご紹介など最適な支援をご案内できます！", () => {
      typeMessage(
        "✔ ご相談＆専門家の紹介は完全無料です！\n✔ チャットボット×人（チームAUU）で最適な対応をします！\n✔ 話すだけで、課題の整理ができます！",
        () => {
          typeMessage("まずは以下から、気になる分野を選んでみてください 😊", () => {
            Object.keys(categories).forEach(cat => {
              const btn = document.createElement("button");
              btn.className = "category-button";
              btn.textContent = cat;
              btn.onclick = () => handleCategory(cat);
              chatBody.appendChild(btn);
            });
          });
        }
      );
    });
  });
};
