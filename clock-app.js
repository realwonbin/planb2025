/* ===================== 데이터 편집 영역 ===================== */
// 이미지 갤러리
const ITEMS = [
  { id:"wonju-musil-park", title:"원주 무실 체육공원 시계탑", img:"images/clock/wonju-musil-park.jpg", thumb:"images/clock/wonju-musil-park_640.jpg", note:"야간 조명 약함" },
  { id:"yanggu-rotary",    title:"양구 로터리 시계",           img:"images/clock/yanggu-rotary.jpg",                          note:"교차로 중앙" },
  { id:"danyang-susan",    title:"단양 수산면 시계탑",         img:"images/clock/danyang-susan.jpg",                          note:"작동 미확인" },
  { id:"gangneung-univ",   title:"강릉 ○○대 교정 시계",        img:"images/clock/gangneung-univ.jpg",                         note:"다면형" },
  // 추가 …
];

// 게시판(글/링크). url 없으면 순수 노트 글.
const POSTS = [
  { date:"2025-10-01", title:"작업노트: 강원권 답사", desc:"원주–양구 구간 동선 체크 및 야간광량 기록.", url:null, archive:null, tag:"노트" },
  { date:"2023-11-15", title:"빅벤 보수 완료·정규 타종 재개", desc:"해외 레퍼런스 수집용.", url:"https://www.parliament.uk/bigben", archive:"https://web.archive.org/web/20221115/https://www.parliament.uk/bigben", tag:"링크" },
  // 추가 …
];
/* ========================================================== */

const $  = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>Array.from(el.querySelectorAll(s));
const byDateDesc = (a,b)=> (b.date||"").localeCompare(a.date||"");

// ---------- 탭 전환 ----------
function setPage(page){
  const isGallery = page==="gallery";
  $("#sec-gallery").classList.toggle("hidden", !isGallery);
  $("#sec-board").classList.toggle("hidden", isGallery);
  document.querySelectorAll(".tab").forEach(t=>{
    t.setAttribute("aria-selected", (t.dataset.page===page)?"true":"false");
  });
  history.replaceState(null,"", isGallery ? "#gallery" : "#board");
}
function initTabs(){
  const hash = location.hash.replace("#","");
  setPage(hash==="board" ? "board" : "gallery");
  $$(".tab").forEach(t=> t.addEventListener("click",(e)=>{
    e.preventDefault();
    setPage(t.dataset.page);
  }));
  window.addEventListener("hashchange",()=>{
    const h = location.hash.replace("#","");
    setPage(h==="board"?"board":"gallery");
  });
}

// ---------- 갤러리 렌더 ----------
function card(it){
  const el = document.createElement("article");
  el.className="card"; el.setAttribute("role","listitem");
  const im = document.createElement("img");
  im.className="thumb"; im.loading="lazy"; im.decoding="async";
  im.src = it.thumb || it.img; im.alt = it.title||"";
  const meta = document.createElement("div"); meta.className="meta";
  meta.innerHTML = `<h3 class="title">${it.title||"Untitled"}</h3><div class="note">${it.note||""}</div>`;
  el.appendChild(im); el.appendChild(meta);
  el.addEventListener("click", ()=>openModalById(it.id));
  return el;
}
function renderGallery(){
  const grid = $("#grid"); grid.innerHTML="";
  ITEMS.forEach(it=> grid.appendChild(card(it)));
}

// ---------- 게시판 렌더 ----------
function row(p){
  const el = document.createElement("div");
  el.className="row";
  const left = document.createElement("span");
  left.className="badge"; left.textContent = p.tag || "노트";
  const mid = document.createElement("div");
  mid.innerHTML = `<div class="titleL">${p.title}</div>${p.desc? `<div class="desc">${p.desc}</div>`: ""}`;
  const right = document.createElement("div");
  right.className="links";
  if(p.url){ const a=document.createElement("a"); a.className="btn"; a.href=p.url; a.target="_blank"; a.rel="noopener"; a.textContent="원문"; right.appendChild(a); }
  if(p.archive){ const a=document.createElement("a"); a.className="btn"; a.href=p.archive; a.target="_blank"; a.rel="noopener"; a.textContent="아카이브"; right.appendChild(a); }
  const date = document.createElement("div");
  date.className="muted"; date.style.marginLeft="8px"; date.textContent = p.date || "";
  const wrapR = document.createElement("div");
  wrapR.style.display="flex"; wrapR.style.alignItems="center"; wrapR.style.gap="6px";
  wrapR.appendChild(right); wrapR.appendChild(date);
  el.appendChild(left); el.appendChild(mid); el.appendChild(wrapR);
  return el;
}
function renderBoard(){
  const box = $("#board"); box.innerHTML="";
  POSTS.sort(byDateDesc).forEach(p=> box.appendChild(row(p)));
}

// ---------- 이미지 모달 ----------
let current = -1; // ITEMS index
const modal=$("#modal"), mImg=$("#mImg"), mTitle=$("#mTitle"), mNote=$("#mNote"), mIndex=$("#mIndex");
function openModalById(id){
  const idx = ITEMS.findIndex(x=>x.id===id);
  openModalIndex(idx>=0?idx:0);
}
function openModalIndex(i){
  const it = ITEMS[i]; if(!it) return;
  current = i;
  mImg.src = it.img; mImg.alt = it.title||"";
  mTitle.textContent = it.title||""; mNote.textContent = it.note||"";
  mIndex.textContent = `${i+1} / ${ITEMS.length}`;
  modal.classList.add("open");
  document.body.style.overflow="hidden";
}
function closeModal(){
  modal.classList.remove("open");
  document.body.style.overflow="";
}
function next(step=1){
  if(!ITEMS.length) return;
  const i = ( (current<0?0:current) + step + ITEMS.length ) % ITEMS.length;
  openModalIndex(i);
}
function wireModalButtons(){
  $("#close").onclick = closeModal;
  $("#next").onclick = ()=>next(1);
  $("#prev").onclick = ()=>next(-1);
  window.addEventListener("keydown",(e)=>{
    if(e.key==="Escape") closeModal();
    if(e.key==="ArrowRight") next(1);
    if(e.key==="ArrowLeft") next(-1);
  });
}

// ---------- init ----------
function init(){
  initTabs();
  renderGallery();
  renderBoard();
  const id = new URLSearchParams(location.search).get("id");
  if(id){ openModalById(id); }
}

// DOM 준비 후 실행(타이밍 보장)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ()=>{ wireModalButtons(); init(); });
} else {
  wireModalButtons(); init();
}
