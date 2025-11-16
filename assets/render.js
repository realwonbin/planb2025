// /assets/render.js
import { CHAPTERS } from "./chapters.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const ch = params.get("ch");
  const data = CHAPTERS[ch];

  if (!data) return;

  document.querySelector(".chapter-title").innerText = data.title;
  document.querySelector(".chapter-description").innerHTML = data.intro;

  const container = document.querySelector(".chapter-content");

  data.blocks.forEach(block => {
    if (block.type === "images") {
      const grid = document.createElement("section");
      grid.className = "img-grid";

      block.list.forEach(item => {
        const fig = document.createElement("figure");
        fig.className = "img-item";
        fig.innerHTML = `
          <img src="/images/${item.src}">
          <figcaption>${item.cap}</figcaption>
        `;
        grid.appendChild(fig);
      });

      container.appendChild(grid);
    }

    if (block.type === "text") {
      const txt = document.createElement("section");
      txt.className = "text-block";
      txt.innerHTML = `<p>${block.content}</p>`;
      container.appendChild(txt);
    }

    if (block.type === "installation") {
      const fig = document.createElement("figure");
      fig.className = "install-block";
      fig.innerHTML = `
        <img src="/images/${block.src}">
        <figcaption>${block.cap}</figcaption>
      `;
      container.appendChild(fig);
    }
  });
});
