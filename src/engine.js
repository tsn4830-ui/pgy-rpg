/* ======================= 讀書網站與參考文獻 ======================= */
const GAS_URL = ""; // PGY 職前加油站網址（待補）
const SITES = {
  pocket:{n:"2026 內科小手冊", u:"https://pocket.drtsengshihting.com/"},
  guide:{n:"內科指引索引", u:"https://guideline.drtsengshihting.com/"},
  review:{n:"內科 Review Hub", u:"https://imreview.drtsengshihting.com/"},
  gas:{n:"PGY 職前加油站", u:GAS_URL}
};
const STUDY = {
  sepsis:[["pocket","抗生素B：經驗性用藥（敗血症 SSC 2021）"],["guide","敗血症"]],
  curb:[["pocket","抗生素B：社區型肺炎 CAP"],["guide","肺炎"]],
  hyperk:[["pocket","電解質"]], hypona:[["pocket","電解質"]], kcl:[["pocket","電解質"]],
  hypogly:[["pocket","血糖/糖尿病"]], dka:[["pocket","血糖/糖尿病、內分泌急症"]],
  hypercal:[["pocket","內分泌急症"]], af:[["pocket","抗凝血"],["guide","心房顫動"]],
  inr:[["pocket","抗凝血"]], stemi:[["pocket","抗血小板"],["guide","急性冠心症"]],
  htn:[["pocket","高血壓"]], cam:[["pocket","鎮靜/譫妄/抗癲癇"]], delir:[["pocket","鎮靜/譫妄/抗癲癇"]],
  ugib:[["guide","上消化道出血"],["review","消化道出血文獻"]], beers:[["pocket","病房常用對症藥"]]
};
const SYS_REFS = [
  {k:"mohw", t:"衛生福利部。二年期醫師畢業後一般醫學訓練計畫（民國 115 年 6 月 24 日衛部醫字第 1151665161 號修正公告）。", u:"https://www.mohw.gov.tw/dl-100937-17468d96-d034-49a9-919f-771bbe96cba7.html"},
  {k:"cgmh", t:"長庚醫療財團法人。住院醫師納入勞基法之權益及相關配套措施（2019 年 8 月），整理衛福部《住院醫師勞動權益保障及工作時間指引》。", u:"https://www1.cgmh.org.tw/intr/intr6/c52000/files/R/201908住院醫師納入勞基法之權益及相關配套措施.pdf"},
  {k:"pts", t:"公視新聞網。受僱醫師納勞基法 僅限住院醫師部分（2018）。", u:"https://news.pts.org.tw/article/408695"},
  {k:"ntuh1", t:"臺大醫院教學部。PGY 學員基本課程說明。", u:"https://www.ntuh.gov.tw/ckfinder_file/EDU-education/files/PGY%E5%AD%B8%E5%93%A1%E5%9F%BA%E6%9C%AC%E8%AA%B2%E7%A8%8B%E8%AA%AA%E6%98%8E.pdf"},
  {k:"ntuh2", t:"臺大醫院。110 學年度 PGY 招生說明會簡報。", u:"https://www.ntuh.gov.tw/ckfinder_file/EDU-education/files/%E8%87%BA%E5%A4%A7%E9%86%AB%E9%99%A2110%E5%AD%B8%E5%B9%B4%E5%BA%A6PGY%E6%8B%9B%E7%94%9F%E8%AA%AA%E6%98%8E%E6%9C%83%E7%B0%A1%E5%A0%B1.pdf"},
  {k:"cch", t:"彰化基督教醫院。113 學年度 PGY 招募說明會公告（2023）。", u:"https://dpt.cch.org.tw/upload/site_news/3610/5149/彰化基督教醫院113學年度PGY招募說明會-1121217(公告).pdf"},
  {k:"law_hospice", t:"安寧緩和醫療條例，第 7 條。全國法規資料庫。", u:"https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0020066"},
  {k:"law_par", t:"病人自主權利法，第 8、9 條。全國法規資料庫。", u:"https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0020189"},
  {k:"law_osh", t:"職業安全衛生法，第 6 條第 2 項（預防執行職務遭受不法侵害）。全國法規資料庫。", u:"https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0060001"},
  {k:"ismp_abbr", t:"Institute for Safe Medication Practices. ISMP List of Error-Prone Abbreviations, Symbols, and Dose Designations (2021)."},
  {k:"gmc", t:"General Medical Council. Intimate examinations and chaperones (2024).", u:"https://www.gmc-uk.org/professional-standards/the-professional-standards/intimate-examinations-and-chaperones"},
  {k:"ltc1966", t:"衛生福利部。長照服務專線 1966。", u:"https://1966.gov.tw/"},
  {k:"mol1955", t:"勞動部。1955 勞工諮詢申訴專線（提供多語服務）。"},
  {k:"mohw1925", t:"衛生福利部。1925 安心專線（24 小時免付費心理諮詢）。"}
];
const REFS = []; const REF_NO = {};
SYS_REFS.forEach(r => { REFS.push(r); REF_NO[r.k] = REFS.length; });
Object.entries(QB).forEach(([id,q]) => { const k = "q:"+q.s; if(!REF_NO[k]){ REFS.push({k, t:q.s}); REF_NO[k] = REFS.length; } q.ref = REF_NO[k]; });

/* ======================= 狀態 ======================= */
const KEY = "pgy-rpg-v2";
let S = null;
function fresh(name){
  return {name, hosp:null, hp:100, maxhp:100, mood:70, know:0, hours:230, month:0,
    stage:-1, step:0, rel:{}, met:{}, cards:{}, right:0, total:0, burnout:0, electDone:[], electQueue:null,
    log:[], hourLog:[], note:""};
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
function load(){ try{ const v = localStorage.getItem(KEY); return v ? JSON.parse(v) : null; }catch(e){ return null; } }
function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const rich = s => esc(s).replace(/\[\[(\w+)\]\]/g, (m,k) => REF_NO[k] ? `<a class="ref" href="#ref-${REF_NO[k]}" data-ref="${REF_NO[k]}">[${REF_NO[k]}]</a>` : "");
const plain = s => String(s).replace(/\[\[(\w+)\]\]/g, "");

function monthLabel(){ const y = S.month < 12 ? 1 : 2; const m = S.month < 12 ? S.month+1 : S.month-11; return `Y${y}·${String(Math.min(m,12)).padStart(2,"0")}月`; }
function addLog(txt){ if(!S) return; S.log.unshift({w:monthLabel(), t:txt, s:0}); if(S.log.length>200) S.log.length=200; }

function applyFx(fx={}, rel={}){
  const out = [];
  if(fx.maxhp){ S.maxhp += fx.maxhp; S.hp = clamp(S.hp+fx.maxhp,0,S.maxhp); out.push(`體力上限 ${fx.maxhp>0?"+":""}${fx.maxhp}`); }
  if(fx.hp){ S.hp = clamp(S.hp+fx.hp,0,S.maxhp); out.push(`健康 ${fx.hp>0?"+":""}${fx.hp}`); }
  if(fx.mood){ S.mood = clamp(S.mood+fx.mood,0,100); out.push(`幸福 ${fx.mood>0?"+":""}${fx.mood}`); }
  if(fx.know){ S.know += fx.know; out.push(`知識 +${fx.know}`); }
  if(fx.hours){ S.hours += fx.hours*8; out.push(`工時 +${fx.hours*8} 小時`); }
  for(const [k,v] of Object.entries(rel||{})){ S.rel[k]=(S.rel[k]||0)+v; S.met[k]=1; out.push(`${CH[k].n} ${v>0?"+":""}${v}`); }
  return out.join("　");
}

/* ======================= 側欄：狀態／人生地圖／工時曲線／訓練紀錄 ======================= */
const DEPT_COL = [["內科","#2c6e5c"],["外科","#30506e"],["兒科","#c07a12"],["婦產","#8a3b5c"],["急診","#a3342e"],["社區","#1f7a6a"],["老年","#5b5ea6"],["選修","#7a5bb3"]];
const colOf = d => (DEPT_COL.find(([k]) => d.includes(k)) || ["","#888"])[1];
function socialScore(){ const ks = Object.keys(S.met).filter(k => CH[k] && MET_ORDER.includes(k)); if(!ks.length) return 50; const avg = ks.reduce((a,k)=>a+(S.rel[k]||0),0)/ks.length; return clamp(Math.round(50+avg*10),0,100); }
function renderSide(){
  const side = document.getElementById("side");
  if(!S || S.stage<0){ side.innerHTML = introSide(); return; }
  const st = STAGES[Math.min(S.stage, STAGES.length-1)];
  const bar = (lab,v,max,alert,txt) => `<div class="stat ${alert?"alert":""}"><span>${lab}</span><i><b style="width:${clamp(v/max*100,0,100)}%"></b></i><em>${txt ?? Math.round(v)}</em></div>`;
  const know100 = clamp(Math.round(S.know/2.5),0,100);
  // map
  let cells = [], m = 0;
  STAGES.forEach(s => { for(let k=0;k<s.m;k++){ cells.push({c:colOf(s.dept), d:s.dept, i:m}); m++; } });
  const mapHtml = cells.map(c => `<div title="${esc(c.d)}" class="${c.i===S.month?"now":""}" style="${c.i<S.month?`background:${c.c}`:""}"></div>`).join("");
  const legend = DEPT_COL.map(([k,c]) => `<span style="--c:${c}">${k}</span>`).join("");
  side.innerHTML = `
  <section class="panel" aria-label="狀態">
    <div class="panel-h"><h3>DR. ${esc(S.name)}</h3><span class="where">${S.month<12?"PGY1":"PGY2"} · ${esc(st.dept)}</span></div>
    ${bar("健康",S.hp,S.maxhp,S.hp<30)}${bar("幸福",S.mood,100,S.mood<25)}${bar("知識",know100,100,false)}${bar("人際關係",socialScore(),100,false)}
    ${bar("四週工時",S.hours,320,S.hours>280,S.hours+"h")}
  </section>
  <section class="panel" aria-label="人生地圖">
    <div class="panel-h"><h3>人生地圖</h3><span class="hint">1 格 = 1 個月 · ${S.month}/24</span></div>
    <div class="map">${mapHtml}</div><div class="legend">${legend}</div>
  </section>
  <section class="panel curve" aria-label="工時曲線">
    <div class="panel-h"><h3>工時曲線</h3><span class="hint">各科結束時的四週工時</span></div>${curve()}
  </section>
  <section class="panel" aria-label="訓練紀錄">
    <div class="panel-h"><h3>訓練紀錄</h3><span class="hint">新的在上 · 點一下加☆</span></div>
    ${S.log.length ? `<ul class="log">${S.log.map((l,i)=>`<li><button data-log="${i}"><span class="when">${esc(l.w)}</span><span>${esc(l.t)}</span><span class="star">${l.s?"☆":""}</span></button></li>`).join("")}</ul>` : `<p class="hint">做出第一個選擇後，這裡會留下紀錄。</p>`}
  </section>`;
  side.querySelectorAll("[data-log]").forEach(b => b.onclick = () => { const l = S.log[+b.dataset.log]; l.s = l.s?0:1; save(); renderSide(); });
}
function introSide(){
  return `<section class="panel"><div class="panel-h"><h3>這是什麼遊戲</h3></div>
   <p class="meta" style="margin:0">一款以真實制度為骨架的文字 RPG。兩年 24 格人生地圖，每一格是一個月的輪訓。題目答完會收進知識卡，並附參考文獻與讀書網站的延伸閱讀。</p></section>
   <section class="panel"><div class="panel-h"><h3>延伸讀書</h3></div>
   <div class="study">${Object.values(SITES).filter(s=>s.u).map(s=>`<a href="${s.u}" target="_blank" rel="noopener">${esc(s.n)} ↗</a>`).join("")}</div></section>`;
}
function curve(){
  const pts = S.hourLog;
  if(!pts.length) return `<p class="hint" style="margin:0">完成第一個科別後出現。上限 320 小時／四週[[cgmh]]。</p>`.replace("[[cgmh]]", `<a class="ref" href="#ref-${REF_NO.cgmh}" data-ref="${REF_NO.cgmh}">[${REF_NO.cgmh}]</a>`);
  const W=300,H=120,L=30,R=8,T=10,B=22, max=360;
  const x = i => L + (pts.length===1 ? (W-L-R)/2 : i*(W-L-R)/(pts.length-1));
  const y = v => T + (1-v/max)*(H-T-B);
  const line = pts.map((p,i)=>`${x(i).toFixed(1)},${y(p.h).toFixed(1)}`).join(" ");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="各科四週工時">
   ${[0,160,320].map(v=>`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1" ${v===320?'stroke-dasharray="4 3" stroke="var(--stamp)"':""}/><text x="${L-4}" y="${y(v)+3}" text-anchor="end">${v}</text>`).join("")}
   <text x="${W-R}" y="${y(320)-4}" text-anchor="end" style="fill:var(--stamp)">上限 320h</text>
   <polyline points="${line}" fill="none" stroke="var(--drape)" stroke-width="2"/>
   ${pts.map((p,i)=>`<circle cx="${x(i)}" cy="${y(p.h)}" r="${i===pts.length-1?4:2.5}" fill="${p.h>320?"var(--stamp)":"var(--drape)"}"/>`).join("")}
   <text x="${x(0)}" y="${H-6}" text-anchor="${pts.length===1?"middle":"start"}">${esc(pts[0].lab)}</text>
   ${pts.length>1?`<text x="${x(pts.length-1)}" y="${H-6}" text-anchor="end">${esc(pts[pts.length-1].lab)}</text>`:""}
  </svg>`;
}

/* ======================= 畫面 ======================= */
const V = () => document.getElementById("view");
function av(id){ const c = CH[id]||CH.sys; const ch = id==="me" ? (S?.name||"你")[0] : c.n[0]; return `<div class="av" style="background:${c.col}" aria-hidden="true">${esc(ch)}</div>`; }
function speaker(id, text){
  const c = CH[id]||CH.sys; const name = id==="me" ? (S?.name||"你") : c.n;
  return `<div class="speaker">${av(id)}<div class="says"><div class="who">${esc(name)}<small>${esc(c.role||"")}</small></div>${rich(text)}</div></div>`;
}
const nxBtn = (label="繼續") => `<button class="primary" id="nx" data-auto="1">${esc(label)}</button>`;
function stageBanner(st){
  const yr = st.y===1?"PGY1":"PGY2";
  return `<div class="banner"><span class="eyebrow">${yr} · ${esc(st.place)}</span><h2>${esc(st.dept)}</h2>${st.m?`<span class="meta">訓練期間 ${st.m} 個月（依衛福部二年期一般醫學訓練計畫）${rich("[[mohw]]")}</span>`:""}</div>`;
}
function show(html){
  if(V().hidden) setTab("game");
  const v=V(); v.classList.remove("enter"); void v.offsetWidth; v.classList.add("enter"); v.innerHTML = html;
  renderSide(); save(); afterRender();
  const r = v.getBoundingClientRect(); if(r.top < 0) window.scrollTo({top: window.scrollY + r.top - 8});
}
function afterRender(){
  document.getElementById("waiting").hidden = !V().querySelector(".opt:not([disabled]), #nm, .ad");
}
document.addEventListener("click", e => {
  const a = e.target.closest("a.ref"); if(!a) return;
  e.preventDefault(); setTab("refs");
  const li = document.getElementById("ref-"+a.dataset.ref); if(li){ li.scrollIntoView({block:"center"}); li.style.background="var(--surface-2)"; }
});

function titleScreen(){
  const saved = load();
  show(`<div class="hero"><span class="eyebrow">Taiwan Post-Graduate Year · 人生模擬</span>
   <h1>呆丸 <span>PGY</span> 物語</h1>
   <p>剛拿到醫師證書的你，要走完兩年期畢業後一般醫學訓練。內科、外科、兒科、婦產、急診、社區、老年醫學與選修，一格一個月，共 24 格。</p>
   <p>路上有搶功的同梯、凶巴巴的學長姐、管東管西的護理長，也有擋下你錯誤醫囑的護理師。每一道臨床題都附參考文獻，並連到內科小手冊與指引索引的對應章節。</p></div>
   <div class="field"><label for="nm">你的名字</label><input id="nm" maxlength="8" placeholder="例如：林小安" value="${esc(saved?.name||"")}"></div>
   <div class="row"><button class="primary" id="go">開始報到</button>${saved && saved.stage>=0 ? `<button class="ghost" id="cont">繼續上次進度（${saved.month<12?"PGY1":"PGY2"}，第 ${saved.month} 個月）</button>`:""}</div>
   <p class="meta">「跳到下一個決定」略過對話，「自動播放」會自動翻頁，但臨床題和選擇一定要你自己來。</p>`);
  document.getElementById("go").onclick = () => { const n = document.getElementById("nm").value.trim() || "小安"; S = fresh(n); chooseHospital(); };
  const c = document.getElementById("cont"); if(c) c.onclick = () => { S = saved; run(); };
}

function chooseHospital(){
  S.stage = -1;
  show(`<div class="banner"><span class="eyebrow">畢業前一年 · PGY 招募季</span><h2>選擇你的訓練醫院</h2>
   <span class="meta">各醫院會在前一年辦招募說明會，公告容額、課程特色、社區合作點與面試日期${rich("[[ntuh2]][[cch]]")}。以下三家醫院與廣告均為虛構，只借用說明會的格式。</span></div>
   <div class="ads">${HOSP.map((h,i)=>`<button class="ad" data-i="${i}"><span class="tag">${h.tag}</span><h3>${esc(h.n)}</h3><span class="meta">${esc(h.kind)}</span><ul>${h.pts.map(p=>`<li>${esc(p)}</li>`).join("")}</ul><span class="meta">${esc(h.note)}</span></button>`).join("")}</div>`);
  V().querySelectorAll(".ad").forEach(b => b.onclick = () => {
    const h = HOSP[+b.dataset.i]; S.hosp = h.id;
    const fx = applyFx(h.fx, h.fx.rel);
    S.stage = 0; S.step = 0; S.hours = 230;
    addLog(`錄取「${h.n}」`);
    show(`${speaker("sys",`你錄取了「${h.n}」！`)}<p class="fx">${fx}</p>${nxBtn("七月一日，報到")}`);
    document.getElementById("nx").onclick = run;
  });
}

/* ======================= 主流程 ======================= */
function run(){
  if(S.stage<0) return chooseHospital();
  const st = STAGES[S.stage];
  if(!st) return ending();
  if(st.elective && S.step >= st.steps.length){
    if(!S.electQueue) return pickElective(st);
    if(S.electQueue.length){
      const e = ELECTIVES[S.electQueue[0]];
      const idx = S.step - st.steps.length;
      if(idx < e.steps.length) return step(e.steps[idx], st);
      S.electQueue.shift(); S.step = st.steps.length; save();
      if(S.electQueue.length) return run();
      if(S.electCount < st.elective) return pickElective(st);
    }
    return endStage();
  }
  if(S.step >= st.steps.length) return endStage();
  step(st.steps[S.step], st);
}
function next(){ S.step++; save(); checkLimits() || run(); }

function checkLimits(){
  if(S.hours > 320){
    addLog(`四週工時 ${S.hours}h，超過上限被叫回家`);
    S.hours = 300;
    show(`${speaker("lin","林振宏護理長擋在你面前：「你這四週已經超過 320 小時了。住院醫師納入勞基法後總工時有上限，值班日單次勤務含延長最多 28 小時，兩次勤務之間至少休 10 小時。回去睡覺。」[[cgmh]]")}
     <div class="feedback"><strong>真實制度</strong><span>住院醫師自 2019 年 9 月 1 日起適用勞動基準法；《住院醫師勞動權益保障及工作時間指引》以四週為單位，總工時上限 320 小時${rich("[[cgmh]][[pts]]")}。</span></div>
     <p class="fx">${applyFx({hp:15,mood:-3},{lin:2})}</p>${nxBtn("去休息")}`);
    document.getElementById("nx").onclick = run; return true;
  }
  if(S.hp <= 0){
    S.burnout++; addLog("過勞倒下，休息兩天");
    show(`${speaker("rui","你在護理站眼前一黑。醒來時陳品睿正在幫你量血壓：「你今天幾點吃飯的？……沒吃？」")}
     <p>教學部安排你休息兩天。疲勞不是意志力問題，是病人安全問題。</p>
     <p class="fx">${applyFx({hp:60,mood:-8},{rui:2})}</p>${nxBtn("回到崗位")}`);
    document.getElementById("nx").onclick = run; return true;
  }
  if(S.mood <= 0){
    addLog("白芷晴陪你聊了一晚");
    show(`${speaker("bai","白芷晴坐到你旁邊：「你最近看起來很不好。醫院有員工協助方案可以約心理師；半夜撐不住也可以打 1925 安心專線。我也去過，真的有用。」[[mohw1925]]")}
     <p class="fx">${applyFx({mood:45},{bai:3})}</p>${nxBtn("謝謝你")}`);
    document.getElementById("nx").onclick = run; return true;
  }
  return false;
}

function choiceScreen(head, s, done){
  show(`${head}${speaker(s.who,s.text)}<div class="opts">${s.opts.map((o,i)=>`<button class="opt" data-i="${i}">${esc(o.l)}</button>`).join("")}</div>`);
  V().querySelectorAll(".opt").forEach(b => b.onclick = () => {
    const o = s.opts[+b.dataset.i];
    const fx = applyFx(o.fx, o.rel);
    addLog(`選擇：${o.l}`);
    show(`${speaker("sys", o.r)}<p class="fx">${fx}</p>${nxBtn()}`);
    document.getElementById("nx").onclick = done;
  });
}

function step(s, st){
  const head = (S.step===0) ? stageBanner(st) : "";
  if(s.who) S.met[s.who] = 1;
  if(s.t==="say"){
    show(`${head}${speaker(s.who,s.text)}${nxBtn()}`);
    document.getElementById("nx").onclick = next;
  } else if(s.t==="choice"){
    choiceScreen(head, s, next);
  } else if(s.t==="quiz"){
    askQuiz(head, s.who, s.lead, s.id, () => next());
  } else if(s.t==="boss"){
    runBoss(head, s);
  } else if(s.t==="night"){
    const ev = NIGHT[s.n % NIGHT.length];
    S.met.kui = 1; applyFx({hours:2}); addLog("夜班");
    runSeq(head + `<span class="stamp">夜班</span>`, ev, next);
  } else if(s.t==="yearEnd"){
    yearEnd();
  } else if(s.t==="ending"){
    ending();
  }
}

function runSeq(head, list, done, i=0){
  if(i>=list.length) return done();
  const s = list[i];
  const go = () => runSeq("", list, done, i+1);
  if(s.t==="say"){ show(`${head}${speaker(s.who,s.text)}${nxBtn()}`); document.getElementById("nx").onclick = go; }
  else if(s.t==="quiz"){ askQuiz(head, s.who, s.lead, s.id, go); }
  else if(s.t==="choice"){ choiceScreen(head, s, go); }
}

function shuffled(n){ const a=[...Array(n).keys()]; for(let i=n-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function studyLinks(id){
  const list = (STUDY[id]||[]).filter(([k]) => SITES[k].u);
  if(SITES.gas.u) list.push(["gas","PGY 職前準備"]);
  if(!list.length) return "";
  return `<div class="study"><span>延伸閱讀：</span>${list.map(([k,ch]) => `<a href="${SITES[k].u}" target="_blank" rel="noopener">${esc(SITES[k].n)}｜${esc(ch)} ↗</a>`).join("")}</div>`;
}

function askQuiz(head, who, lead, id, done){
  const q = QB[id]; const order = shuffled(q.o.length);
  S.met[who] = 1;
  const pre = lead ? lead+"\n" : "";
  show(`${head}${speaker(who, pre + q.q)}<div class="opts">${order.map(k=>`<button class="opt" data-k="${k}">${esc(q.o[k])}</button>`).join("")}</div>`);
  V().querySelectorAll(".opt").forEach(b => b.onclick = () => {
    const k = +b.dataset.k, ok = k===q.a;
    V().querySelectorAll(".opt").forEach(x => { x.disabled = true; const kk=+x.dataset.k; if(kk===q.a) x.classList.add("right"); else if(x===b) x.classList.add("wrong"); });
    S.total++; if(ok) S.right++;
    S.cards[id] = 1;
    addLog(`${ok?"✓":"✗"} ${q.t}`);
    const fx = applyFx(ok ? {know:4, mood:2, hours:0.5} : {know:1, hp:-8, mood:-3, hours:0.5});
    const fb = document.createElement("div");
    fb.className = "feedback" + (ok ? "" : " bad");
    fb.innerHTML = `<span class="stamp ${ok?"ok":""}">${ok?"答對":"再想想"}</span><strong>${esc(q.t)}</strong><span>${esc(q.e)}<a class="ref" href="#ref-${q.ref}" data-ref="${q.ref}">[${q.ref}]</a></span><span class="src">參考文獻 [${q.ref}]：${esc(q.s)}</span>${studyLinks(id)}<span class="fx">${fx}　｜已收入知識卡</span>`;
    const btn = document.createElement("button"); btn.className="primary"; btn.textContent="繼續"; btn.dataset.auto = "1";
    btn.onclick = () => done(ok);
    V().append(fb, btn); renderSide(); save(); afterRender(); btn.focus({preventScroll:true});
  });
}

function runBoss(head, s){
  let i = 0, score = 0;
  const intro = () => {
    show(`${head}<span class="stamp">關主</span>${speaker(s.who, s.intro)}<button class="primary" id="nx">接受挑戰</button>`);
    document.getElementById("nx").onclick = ask;
  };
  const ask = () => {
    if(i >= s.ids.length) return result();
    askQuiz("", s.who, `（第 ${i+1}／${s.ids.length} 題）`, s.ids[i], ok => { if(ok) score++; i++; ask(); });
  };
  const result = () => {
    const win = score >= s.pass;
    const fx = applyFx(win ? {know:5, mood:6} : {mood:-4}, win ? s.rel : {});
    addLog(`關主 ${CH[s.who].n}：${win?"過關":"補強"}（${score}/${s.ids.length}）`);
    show(`<span class="stamp ${win?"ok":""}">${win?"過關":"補強"}</span>${speaker(s.who, win ? s.win : s.lose)}<p class="fx">答對 ${score}／${s.ids.length}　${fx}</p>${nxBtn()}`);
    document.getElementById("nx").onclick = next;
  };
  intro();
}

function pickElective(st){
  if(S.electCount === undefined || S.electStage !== S.stage){ S.electCount = 0; S.electStage = S.stage; }
  const avail = Object.entries(ELECTIVES).filter(([k]) => !S.electDone.includes(k));
  show(`${S.electCount===0?stageBanner(st):""}${speaker("sys", `選擇第 ${S.electCount+1} 個選修科（共選 ${st.elective} 科）。PGY1 選修每月選一科、不可重複同科。[[mohw]]`)}
   <div class="opts">${avail.map(([k,e])=>`<button class="opt" data-k="${k}">${esc(e.n)}</button>`).join("")}</div>`);
  V().querySelectorAll(".opt").forEach(b => b.onclick = () => {
    const k = b.dataset.k; S.electDone.push(k); S.electCount++; S.electQueue = [k]; S.step = st.steps.length;
    addLog(`選修：${ELECTIVES[k].n}`); save(); run();
  });
}

function endStage(){
  const st = STAGES[S.stage];
  if(st.m){ S.hourLog.push({lab:st.dept.replace("一般醫學",""), h:S.hours}); addLog(`完成 ${st.dept}（${st.m} 個月）`); }
  S.month += st.m;
  const rest = st.m ? applyFx({hp:25, mood:5}) : "";
  S.hours = 230;
  S.stage++; S.step = 0; S.electQueue = null;
  const nx = STAGES[S.stage];
  if(!nx) return ending();
  if(st.m === 0){ return run(); }
  show(`<div class="banner"><span class="eyebrow">輪訓結束 · ${S.month}/24 個月</span><h2>${esc(st.dept)} 完成</h2></div>
   <p>換科前休了一天假，四週工時重新起算。人生地圖又填滿了 ${st.m} 格。</p><p class="fx">${rest}</p>${nxBtn("前往：" + nx.dept)}`);
  document.getElementById("nx").onclick = run;
}

function yearEnd(){
  const pct = S.total ? Math.round(S.right/S.total*100) : 0;
  addLog("PGY1 結業");
  show(`<div class="banner"><span class="eyebrow">PGY1 結業</span><h2>第一年，撐過來了</h2></div>
   <p>臨床題答對率 <strong>${pct}%</strong>（${S.right}／${S.total}），醫學知識 ${S.know}。</p>
   <p>第二年依計畫可選「分組」（內科、外科、兒科或婦產科組，含急診、社區醫院、安寧照護共 9 個月，加老年醫學 1 個月與選修 2 個月），或「不分組」（內科 3、外科 2、急診 1、老年醫學 1、選修 5 個月）${rich("[[mohw]]")}。本遊戲走「不分組」路線。</p>
   ${nxBtn("進入 PGY2")}`);
  document.getElementById("nx").onclick = next;
}

const SPECIALTIES = ["內科","外科","兒科","婦產科","急診醫學科","家庭醫學科","精神科","麻醉科","放射診斷科","皮膚科","眼科","老年醫學（經內科／家醫科）"];
function ending(){
  const pct = S.total ? S.right/S.total : 0;
  show(`<div class="banner"><span class="eyebrow">PGY 結訓 · 住院醫師招募</span><h2>兩年過去了，你想走哪一科？</h2>
   <span class="meta">完成 PGY 訓練後，才能申請進入各專科住院醫師訓練${rich("[[mohw]]")}。</span></div>
   <div class="opts">${SPECIALTIES.map((s,i)=>`<button class="opt" data-i="${i}">${esc(s)}</button>`).join("")}</div>`);
  V().querySelectorAll(".opt").forEach(b => b.onclick = () => {
    const sp = SPECIALTIES[+b.dataset.i];
    const rels = MET_ORDER.filter(k => (S.rel[k]||0) >= 5);
    let verdict;
    if(pct >= 0.75 && S.know >= 120) verdict = `面試時，主任翻著你的學習歷程說：「Mini-CEX 評語寫你『臨床推理清楚、尊重團隊』。歡迎加入${sp}。」你錄取了第一志願。`;
    else if(pct >= 0.55) verdict = `面試有點緊張，但你把 PGY 兩年的病人故事講得很真誠。你錄取了${sp}。`;
    else verdict = `今年${sp}名額很少，你沒有錄取。Kolas 主任打電話來：「要不要先來衛生所一年？很多好醫師都繞過路。」一年後你再申請，順利錄取。`;
    addLog(`申請 ${sp}`);
    S.stage = STAGES.length; S.spec = sp; S.verdict = verdict; save();
    finalScreen();
  });
}
function finalScreen(){
  const pct = S.total ? S.right/S.total : 0;
  const rels = MET_ORDER.filter(k => (S.rel[k]||0) >= 5);
  const epi = rels.length ? rels.map(k => `<li><strong>${esc(CH[k].n)}</strong>：${esc(CH[k].twist || "謝謝你這兩年的照顧。")}</li>`).join("") : "<li>這兩年你比較少跟人深交。醫療是團隊工作，下一段路試著多交幾個戰友吧。</li>";
  show(`<div class="banner"><span class="eyebrow">結局</span><h2>${esc(S.name)} 醫師，${esc(S.spec)}</h2></div>
   <p>${esc(S.verdict)}</p>
   <p>答對率 ${Math.round(pct*100)}%（${S.right}／${S.total}）· 醫學知識 ${S.know} · 知識卡 ${Object.keys(S.cards).length}／${Object.keys(QB).length} · 過勞倒下 ${S.burnout} 次</p>
   <h3>那些人後來</h3><ul>${epi}</ul>
   <div class="field"><label for="note">✎ 留下一句話（給兩年前的自己）</label><textarea id="note" rows="2" maxlength="120">${esc(S.note||"")}</textarea></div>
   <div class="row"><button class="primary" id="again">重新開始</button><button class="ghost" id="cards">看知識卡</button></div>`);
  const note = document.getElementById("note");
  note.oninput = () => { S.note = note.value; save(); };
  document.getElementById("again").onclick = () => { try{localStorage.removeItem(KEY);}catch(e){} S=null; titleScreen(); };
  document.getElementById("cards").onclick = () => setTab("cards");
}

/* ======================= 分頁 ======================= */
function setTab(tab){
  document.querySelectorAll("#ctrl [data-tab]").forEach(b => b.setAttribute("aria-pressed", b.dataset.tab===tab));
  const tv = document.getElementById("tabview");
  V().hidden = tab!=="game"; tv.hidden = tab==="game";
  if(tab==="people") tv.innerHTML = peopleView();
  if(tab==="cards") tv.innerHTML = cardsView();
  if(tab==="system") tv.innerHTML = systemView();
  if(tab==="refs") tv.innerHTML = refsView();
  if(tab!=="game") window.scrollTo({top:0});
}
function peopleView(){
  const list = S ? MET_ORDER.filter(k => S.met[k]) : [];
  if(!list.length) return `<h2>同事與團隊</h2><p>還沒遇到任何人。去病房走走吧。</p>`;
  return `<h2>同事與團隊</h2><p class="meta">第一印象常常不是全部。好感度高的角色，會揭露他們的另一面。</p><div class="people">${list.map(k => {
    const c = CH[k], r = S.rel[k]||0;
    return `<div class="person">${av(k)}<div style="min-width:0"><div class="who">${esc(c.n)}</div><div class="tag">${esc(c.role)}${c.tag?` · 「${esc(c.tag)}」`:""}</div><p>${esc(c.desc)}</p>${r>=5&&c.twist?`<p><em>${esc(c.twist)}</em></p>`:""}<div class="hearts">好感 ${r>0?"♥".repeat(Math.min(r,10)):r<0?"✕".repeat(Math.min(-r,10)):"—"}</div></div></div>`;
  }).join("")}</div>`;
}
function cardsView(){
  const ids = S ? Object.keys(S.cards) : [];
  return `<h2>知識卡 ${ids.length}／${Object.keys(QB).length}</h2><p class="meta">每答一題（不論對錯）就收入一張，可以當成 PGY 口袋書。</p>
   ${ids.length ? ids.map(id => { const q = QB[id]; return `<div class="kcard"><h3>${esc(q.t)}</h3><p><strong>答案：</strong>${esc(q.o[q.a])}</p><p>${esc(q.e)}<a class="ref" href="#ref-${q.ref}" data-ref="${q.ref}">[${q.ref}]</a></p>${studyLinks(id)}</div>`; }).join("") : "<p>還沒有知識卡。</p>"}`;
}
function refsView(){
  return `<h2>參考文獻</h2><p class="meta">制度內容與劇情中引用的規定列在前面，之後是各臨床題的出處。正文中的 [數字] 對應下列編號。</p>
   <ol class="refs">${REFS.map((r,i)=>`<li id="ref-${i+1}">${esc(r.t)}${r.u?` <a href="${esc(r.u)}" target="_blank" rel="noopener">連結 ↗</a>`:""}</li>`).join("")}</ol>`;
}
function systemView(){
  const R = k => rich(`[[${k}]]`);
  return `<h2>真實的臺灣 PGY 制度</h2>
  <p>「二年期醫師畢業後一般醫學訓練計畫」（PGY）自 2019 年 8 月起實施，對象是通過醫師國考第二階段、領有醫師證書的新科醫師，在進入專科住院醫師訓練前接受兩年一般醫學訓練${R("mohw")}。</p>
  <div class="tablebox"><table><thead><tr><th>年度</th><th>課程</th><th>月數</th></tr></thead><tbody>
  <tr><td rowspan="7">PGY1</td><td>一般醫學內科</td><td>3</td></tr><tr><td>一般醫學外科</td><td>2</td></tr><tr><td>一般醫學兒科</td><td>1</td></tr><tr><td>一般醫學婦產科</td><td>1</td></tr><tr><td>急診醫學</td><td>1</td></tr><tr><td>社區醫學（合作機構）</td><td>2</td></tr><tr><td>選修（每月一科，不可重複）</td><td>2</td></tr>
  <tr><td rowspan="2">PGY2</td><td>分組：內／外／兒／婦產組擇一（含急診、社區醫院、安寧照護）＋老年醫學＋選修</td><td>9＋1＋2</td></tr>
  <tr><td>不分組：內科 3、外科 2、急診 1、老年醫學 1、選修 5</td><td>12</td></tr></tbody></table></div>
  <p class="hint">表格整理自衛福部訓練計畫${R("mohw")}。</p>
  <h3>工時與照護量</h3>
  <ul><li>住院醫師自 2019 年 9 月 1 日起適用勞動基準法。依《住院醫師勞動權益保障及工作時間指引》，每四週總工時上限 320 小時；值班日單次勤務含延長工時不超過 28 小時；兩次勤務間隔至少 10 小時${R("cgmh")}${R("pts")}。</li>
  <li>PGY 急診月：每月約 168–192 小時、夜班不超過 8 班、每班不超過 13 小時${R("mohw")}。</li>
  <li>每日照護病人數原則：內科約 4–10 床、外科約 4–8 床、兒科約 3–8 床、婦產科約 4–10 床；社區醫學期間不需回原醫院值班${R("mohw")}。</li></ul>
  <h3>課程與評量</h3><p>基本課程含小組討論、案例分析、感控實地穿戴等，須於訓練期間完成${R("ntuh1")}。常用工作場所評量包括 Mini-CEX、DOPS、CbD，以及學習歷程與導師回饋${R("mohw")}。</p>
  <h3>招募</h3><p>各訓練醫院於前一年舉辦招募說明會，公告容額、課程特色、社區合作點與面試方式${R("ntuh2")}${R("cch")}。遊戲中的三家醫院為虛構。</p>
  <h3>延伸讀書</h3><div class="study">${Object.values(SITES).filter(s=>s.u).map(s=>`<a href="${s.u}" target="_blank" rel="noopener">${esc(s.n)} ↗</a>`).join("")}</div>`;
}

/* ======================= 控制列 ======================= */
document.getElementById("ctrl").addEventListener("click", e => { const b = e.target.closest("[data-tab]"); if(b) setTab(b.dataset.tab); });
function advanceOnce(){
  if(!V().hidden && !V().querySelector(".opt:not([disabled])")){
    const b = V().querySelector('button.primary[data-auto="1"]');
    if(b){ b.click(); return true; }
  }
  return false;
}
document.getElementById("skip").onclick = () => { setTab("game"); let n = 0; while(n++ < 40 && advanceOnce()){} };
let autoTimer = null;
document.getElementById("auto").onclick = e => {
  const on = e.currentTarget.getAttribute("aria-pressed") !== "true";
  e.currentTarget.setAttribute("aria-pressed", on);
  clearInterval(autoTimer); if(on) autoTimer = setInterval(advanceOnce, 2800);
};
document.getElementById("theme").onclick = () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme==="dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
};
/* 安靜的背景音：柔和的和弦循環 */
let audio = null;
document.getElementById("music").onclick = e => {
  const btn = e.currentTarget;
  if(audio){ audio.ctx.close(); audio = null; btn.setAttribute("aria-pressed", false); return; }
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const master = ctx.createGain(); master.gain.value = 0.035; master.connect(ctx.destination);
    const chords = [[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]];
    let i = 0;
    const play = () => {
      const t = ctx.currentTime;
      chords[i++ % chords.length].forEach(f => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine"; o.frequency.value = f/2;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t+1.2); g.gain.linearRampToValueAtTime(0, t+4.2);
        o.connect(g); g.connect(master); o.start(t); o.stop(t+4.3);
      });
    };
    play(); const timer = setInterval(play, 4000);
    audio = {ctx, timer}; ctx.addEventListener("statechange", () => { if(ctx.state==="closed") clearInterval(timer); });
    btn.setAttribute("aria-pressed", true);
  }catch(err){ btn.textContent = "♪ 無法播放"; }
};
if(GAS_URL){ const g = document.getElementById("gas"); g.href = GAS_URL; g.hidden = false; }

/* ======================= 啟動 ======================= */
function resume(d){
  S = d;
  if(S.stage >= STAGES.length && S.spec) return finalScreen();
  run();
}
function start(){ S = null; titleScreen(); }
window.claude?.hot?.snapshot?.(() => ({S}));
if(window.claude?.hot?.ready){ window.claude.hot.ready(d => { if(d && d.S){ resume(d.S); } else start(); }); }
else { const d = window.claude?.hot?.data; if(d && d.S){ resume(d.S); } else start(); }
