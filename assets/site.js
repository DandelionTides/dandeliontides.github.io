"use strict";
// Everything here runs in the visitor's browser.
const theme = document.getElementById("theme-toggle");
theme?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  theme.textContent = document.body.classList.contains("dark") ? "☀ 亮色" : "◐ 主题";
});
const ideas = [
  "每一个小项目，都从第一次点击开始。",
  "The best projects grow one commit at a time.",
  "保持好奇，把想法写成代码。",
  "世界很大，先把自己的主页做好。",
  "遇到不懂的东西，是最好的学习入口。",
  "Hello world. Hello future.",
  "其实大部分轮换内容是ai写的哦？但这句不是ovo",
  "大模型越狱（×）让ai更听话（√）",
  "其实并没想好要往idea里写什么？",
  "有人在晚上数星星",
  "一颗圆滚滚的橘子🍊"
];
const ideaButton = document.getElementById("idea-button");
ideaButton?.addEventListener("click", () => {
  document.getElementById("idea-text").textContent =
    ideas[Math.floor(Math.random() * ideas.length)];
});
const apiButton = document.getElementById("github-button");
apiButton?.addEventListener("click", async () => {
  const status = document.getElementById("github-status");
  const detail = document.getElementById("github-detail");
  const output = document.getElementById("json-output");
  apiButton.disabled = true;
  status.textContent = "正在请求 GitHub…";
  detail.textContent = "已发送 GET 请求";
  try {
    const response = await fetch("https://api.github.com/users/dandeliontides", {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
    const data = await response.json();
    const selected = {
      login: data.login,
      name: data.name,
      public_repos: data.public_repos,
      followers: data.followers,
      profile_url: data.html_url
    };
    status.textContent = `${data.login} · ${data.public_repos} 个公开仓库`;
    detail.textContent = `关注者 ${data.followers} 人 · HTTP ${response.status}`;
    output.textContent = JSON.stringify(selected, null, 2);
  } catch (err) {
    status.textContent = "请求失败";
    detail.textContent = "检查网络，或稍后再试";
    output.textContent = String(err);
  } finally {
    apiButton.disabled = false;
  }
});


/*
 * Optional homepage background photo.
 * 1) Place your image in assets/images/, e.g. assets/images/my-background.jpg
 * 2) Replace "" with "assets/images/my-background.jpg" below.
 * 3) Save, commit and push — no server needed.
 * Leave this empty to retain the original soft green illustration.
 */
const HERO_BACKGROUND = "assets/images/my-background.jpg";
const homeHero = document.querySelector(".hero");
if (homeHero && HERO_BACKGROUND) {
  homeHero.style.setProperty("--hero-photo", `url("${HERO_BACKGROUND}")`);
  homeHero.classList.add("hero--photo");
}
