
/* ======================= 角色扮演地圖 ======================= */
/* 15×9 格的病房地圖。角色、家具都用程式畫，不載入圖檔。 */
const TW = 32, COLS = 15, ROWS = 9, SC = 2; /* SC：高解析度倍率 */
const HASH = id => [...String(id)].reduce((h,ch) => (h*31 + ch.charCodeAt(0)) % 997, 7);
const LOOK = {
  me:    {coat:"#f4f6f5", shirt:"#2c6e5c", hair:"#2a211c", style:"short", skin:"#f1c8a5"},
  hsu:   {coat:"#f4f6f5", shirt:"#6d4bb3", hair:"#5a3a22", style:"spiky", skin:"#e9bf98", glasses:1},
  bai:   {coat:"#f4f6f5", shirt:"#9a5a2a", hair:"#1d1a1a", style:"long", skin:"#f3d0b0"},
  zhang: {coat:"#f4f6f5", shirt:"#a3342e", hair:"#2b1d18", style:"bun", skin:"#eec4a0", glasses:1},
  ouyang:{coat:"#3f7d6e", shirt:"#3f7d6e", hair:"#3f7d6e", style:"cap", skin:"#d9a77f"},
  lin:   {coat:"#30506e", shirt:"#30506e", hair:"#8c8c8c", style:"short", skin:"#e2b48c"},
  kui:   {coat:"#e78fae", shirt:"#e78fae", hair:"#3a2a22", style:"bob", skin:"#f6d2b8"},
  rui:   {coat:"#2a8a9a", shirt:"#2a8a9a", hair:"#141414", style:"short", skin:"#d7a47a"},
  wang:  {coat:"#f4f6f5", shirt:"#7a3f8f", hair:"#1f1714", style:"pony", skin:"#e6b994"},
  lee:   {coat:"#f4f6f5", shirt:"#c07a12", hair:"#bdbdbd", style:"short", skin:"#efc39e", glasses:1},
  tsai:  {coat:"#f4f6f5", shirt:"#8a3b5c", hair:"#6b6b6b", style:"bob", skin:"#e9bb94"},
  kolas: {coat:"#4c7a3a", shirt:"#e9e1c9", hair:"#111", style:"short", skin:"#b9835c"},
  shih:  {coat:"#f4f6f5", shirt:"#5b5ea6", hair:"#2c2320", style:"long", skin:"#f0c9a6"},
  xiaoc: {coat:"#2f3b52", shirt:"#e0662b", hair:"#141414", style:"shoulder", skin:"#f3cfb0", band:"#e0662b", shoes:"#ff8a3d"},
  gy:    {coat:"#3b3f58", shirt:"#f4f6f5", hair:"#6f6f6f", style:"short", skin:"#e8bf9a", glasses:1},
  cheng: {coat:"#f4f6f5", shirt:"#3f7f3a", hair:"#26201c", style:"spiky", skin:"#e5b38b", glasses:1},
  tbxz:  {coat:"#2b3242", shirt:"#f4f4f2", hair:"#2a211c", style:"short", skin:"#e6b994", tie:"#b42318", shoes:"#15171c", suitcase:"#2f7fb8"},
  yan:   {coat:"#e9ebe6", shirt:"#7d8590", hair:"#3a3634", style:"spiky", skin:"#e8c3a0", tired:1, coffee:"#8a5a3b"},
  wan:   {coat:"#f4f6f5", shirt:"#1f3a68", hair:"#c8c8c8", style:"short", skin:"#e9bf98", glasses:1, tie:"#c9a227", chief:1},
  luyin: {coat:"#3d3d46", shirt:"#c94f4f", hair:"#1f1a18", style:"short", skin:"#e3b48f", frown:1, phone:1, shoes:"#f4f4f2"},
  chunpu:{coat:"#f2f5f7", shirt:"#f2f5f7", hair:"#5e5a58", style:"bun", skin:"#e6b994", glasses:1, cap:1},
  zhen:  {coat:"#f4f6f5", shirt:"#2d5d7b", hair:"#4a4440", style:"bob", skin:"#ecc3a0", glasses:1},
  pt:    {coat:"#9fc3df", shirt:"#9fc3df", hair:"#d9d9d9", style:"short", skin:"#eac29c"},
  vis:   {coat:"#c98b4a", shirt:"#6b4a2a", hair:"#3b2b22", style:"long", skin:"#e1b088"}
};
/* 玩家自選外觀：男生、女生、無性別（舊存檔沒有這個欄位，就是無性別） */
function playerGender(){ return (typeof S === "object" && S && S.gender) || "x"; }
/* 劇情標記 outfit 的段落：米白毛呢短外套、黑洋裝、珍珠耳環、手鍊 */
const OUTFIT = {coat:"#ece6d6", shirt:"#1a1a1e", shoes:"#111", legs:"#e9bf98", skirt:"#1a1a1e", tweed:1, pearls:1, bangle:"#d8b55a"};
function inOutfit(){ try{ const st = STAGES[S.stage].steps[S.step]; return !!(st && st.outfit); }catch(e){ return false; } }
function meLook(){ const b = meBase(); return inOutfit() ? {...b, ...OUTFIT} : b; }
function meBase(){ const g = playerGender(); return g==="m" ? LOOK.me : g==="f" ? {...LOOK.me, style:"shoulder", hair:"#2a1d18"} : {...LOOK.me, style:"bob", hair:"#3b2a22"}; }
function drawChar(c, x, y, id, dir="down", frame=0, s=2){
  const L = id==="me" ? meLook() : (LOOK[id] || LOOK.pt);
  const r = (a,b,w,h,col) => { c.fillStyle = col; c.fillRect(x + a*s, y + b*s, w*s, h*s); };
  c.fillStyle = "rgba(0,0,0,.18)"; c.beginPath(); c.ellipse(x+8*s, y+19.5*s, 6*s, 1.6*s, 0, 0, 7); c.fill();
  const step = frame%2 ? 1 : 0, bob = frame%2 ? -0.5 : 0, OL = "rgba(28,32,44,.55)";
  /* 外框，讓角色在任何地板上都清楚 */
  r(3.4, 14.6, 4.2, 4.8 - step, OL); r(8.4, 14.6, 4.2, 3.8 + step, OL);
  r(2.4, 7.4+bob, 11.2, 8.8, OL); r(1, 8.6+bob, 2.8, 6.6, OL); r(12.2, 8.6+bob, 2.8, 6.6, OL);
  r(3.2, -0.4+bob, 9.6, 8.8, OL);
  r(4, 15, 3, 4 - step, L.legs || "#2e3a40"); r(9, 15, 3, 3 + step, L.legs || "#2e3a40"); r(4, 15, 1, 3, "rgba(255,255,255,.12)");
  if(L.shoes){ r(3.5, 18 - step, 4, 1.4, L.shoes); r(8.5, 17 + step, 4, 1.4, L.shoes); }
  r(3, 8+bob, 10, 8, L.coat); r(6.5, 8+bob, 3, 7, L.shirt);
  r(3, 8+bob, 1.2, 8, "rgba(255,255,255,.22)"); r(11.4, 8+bob, 1.6, 8, "rgba(0,0,0,.13)"); r(3, 15.2+bob, 10, .8, "rgba(0,0,0,.12)");
  if(L.coat === "#f4f6f5"){ r(3, 8+bob, 10, .6, "#d5dbd8"); r(10, 11+bob, 2, 1.5, "#9aa"); r(6, 8.4+bob, .6, 3.2, "#56606a"); r(9.4, 8.4+bob, .6, 3.2, "#56606a"); r(5.6, 11.4+bob, 1.4, 1.4, "#8a949c"); }
  if(L.skirt){ r(3.2, 14.6+bob, 9.6, 2, L.skirt); r(3.2, 16.2+bob, 3, .6, L.skirt); }
  if(L.tweed){ [[3.6,9],[5,11.5],[4,13.6],[11,9.4],[10.6,12],[11.8,14],[3.4,11],[12,11]].forEach(([a,b]) => r(a, b+bob, .6, .6, "#bfb39a")); r(6.2, 8+bob, .5, 7, "#d7cfb8"); r(9.3, 8+bob, .5, 7, "#d7cfb8"); }
  if(L.bangle){ r(12.6, 13.2+bob, 2, .5, L.bangle); }
  if(L.tie){ r(5.6, 8+bob, 1.4, 3.6, "rgba(0,0,0,.28)"); r(9, 8+bob, 1.4, 3.6, "rgba(0,0,0,.28)");
    r(7.3, 8.2+bob, 1.4, 1, L.tie); r(7.1, 9.2+bob, 1.8, 4.2, L.tie); r(7.5, 13.4+bob, 1, .7, L.tie); r(7.3, 9.4+bob, .5, 3.6, "rgba(255,255,255,.2)");
    r(5.2, 13.2+bob, .7, .7, "#c9ced6"); }
  if(L.tired){ r(4.4, 12.4+bob, 1.2, .4, "rgba(0,0,0,.12)"); r(10.4, 10+bob, 1.2, .4, "rgba(0,0,0,.12)"); }
  if(L.coffee && dir!=="up"){ const cx = dir==="left" ? 0 : 12.6;
    r(cx-.2, 11.4+bob, 2.4, 3.2, OL); r(cx, 11.6+bob, 2, 2.8, "#f4efe6"); r(cx, 12.4+bob, 2, .9, L.coffee); r(cx, 11.2+bob, 2, .5, "#3b3f46");
    if((typeof W === "object" ? W.t : 0) % 1.6 < .8) r(cx+.6, 10.2+bob, .4, .8, "rgba(255,255,255,.55)"); }
  if(L.phone && dir!=="up"){ const px = dir==="left" ? 4 : 9.6;
    r(px-.3, 9.2+bob, 3, 4.6, OL); r(px, 9.4+bob, 2.4, 4.2, "#e4c34a"); r(px+.3, 9.8+bob, 1.8, 3, "#1c2433");
    r(px+.5, 10.1+bob, 1, 1, ((typeof W === "object" ? W.t : 0) || 0) % 1.2 < .7 ? "#ff3b30" : "#a3241e"); }
  if(L.suitcase && dir!=="up" && !c.canvas.noBag){ const sx = dir==="left" ? -4.6 : 14.2;
    r(sx+1, 9.6, .6, 2.4, "#3b3f46"); r(sx+3.4, 9.6, .6, 2.4, "#3b3f46"); r(sx+1, 9.4, 3, .6, "#3b3f46");
    r(sx-.3, 11.7, 5.6, 7, OL); r(sx, 12, 5, 6.4, L.suitcase); r(sx, 12, 5, .7, "rgba(255,255,255,.25)");
    r(sx+1.4, 12.6, .6, 5.4, "rgba(0,0,0,.18)"); r(sx+3, 12.6, .6, 5.4, "rgba(0,0,0,.18)");
    r(sx+.4, 15, 1.4, 1, "#f2b630"); r(sx+.4, 18.4, 1, .9, "#222"); r(sx+3.6, 18.4, 1, .9, "#222"); }
  r(1.6, 9+bob + (dir==="left"||dir==="right" ? 0 : step), 1.6, 5, L.coat); r(12.8, 9+bob + (dir==="left"||dir==="right" ? 0 : 1-step), 1.6, 5, L.coat);
  r(1.6, 13.6+bob, 1.6, 1.2, L.skin); r(12.8, 13.6+bob, 1.6, 1.2, L.skin);
  r(4, 1+bob, 8, 7, L.skin); r(4, 6.6+bob, 8, .9, "rgba(0,0,0,.07)");
  const h = L.hair;
  if(L.style==="cap"){ r(3.4, 0+bob, 9.2, 3, h); r(3.4, 3+bob, 1, 1.4, h); r(11.6, 3+bob, 1, 1.4, h); }
  else {
    r(3.6, 0+bob, 8.8, 2.6, h);
    if(dir==="up") r(3.6, 2+bob, 8.8, 5, h);
    if(L.style==="spiky"){ r(4, -0.8+bob, 1.5, 1, h); r(7, -1+bob, 1.5, 1.2, h); r(10, -0.8+bob, 1.5, 1, h); }
    if(L.style==="long"){ r(3, 2+bob, 1.4, 8, h); r(11.6, 2+bob, 1.4, 8, h); }
    if(L.style==="shoulder"){ r(3, 2+bob, 1.6, 7, h); r(11.4, 2+bob, 1.6, 7, h); r(2.6, 8+bob, 1.4, 1.2, h); r(12, 8+bob, 1.4, 1.2, h); }
    if(L.style==="bob"){ r(3, 2+bob, 1.6, 5, h); r(11.4, 2+bob, 1.6, 5, h); }
    if(L.style==="bun"){ r(6.5, -2+bob, 3, 2.2, h); r(3.4, 2+bob, 1, 2, h); r(11.6, 2+bob, 1, 2, h); }
    if(L.style==="pony"){ r(3.4, 2+bob, 1, 2, h); r(11.6, 2+bob, 1, 2, h); if(dir!=="down") r(dir==="left"?11.8:2.2, 3+bob, 1.8, 5, h); else r(12, 2.4+bob, 1.4, 4, h); }
    if(L.style==="short"){ r(3.4, 2+bob, 1, 2, h); r(11.6, 2+bob, 1, 2, h); }
    if(L.band) r(3.6, 1.6+bob, 8.8, 1.1, L.band);
    if(L.cap && dir!=="up"){ r(5, -1+bob, 6, 1.6, "#ffffff"); r(5, -.2+bob, 6, .5, "#3b6ea8"); }
    r(5, 0.5+bob, 3.4, .6, "rgba(255,255,255,.28)");
  }
  if(dir!=="up"){
    const dx = dir==="left" ? -1 : dir==="right" ? 1 : 0;
    const tt = typeof W === "object" ? W.t : 0, blink = ((tt + HASH(id)*.37) % 4.2) < .13;
    if(blink){ r(5.6+dx, 5+bob, 1.8, .45, "#222"); r(8.8+dx, 5+bob, 1.8, .45, "#222"); }
    else { r(5.5+dx, 4.2+bob, 1.8, 1.8, "#fff"); r(8.7+dx, 4.2+bob, 1.8, 1.8, "#fff"); r(5.9+dx+dx*.3, 4.4+bob, 1.2, 1.5, "#222"); r(9.1+dx+dx*.3, 4.4+bob, 1.2, 1.5, "#222"); r(6+dx, 4.5+bob, .45, .45, "#fff"); r(9.2+dx, 4.5+bob, .45, .45, "#fff"); }
    if(L.tired && !blink){ r(5.4+dx, 4.1+bob, 2, .9, L.skin); r(8.6+dx, 4.1+bob, 2, .9, L.skin); r(5.4+dx, 4.9+bob, 2, .25, "#5a4a44"); r(8.6+dx, 4.9+bob, 2, .25, "#5a4a44"); }
    if(L.tired){ r(5.3+dx, 6.0+bob, 2.2, .9, "rgba(80,55,105,.62)"); r(8.5+dx, 6.0+bob, 2.2, .9, "rgba(80,55,105,.62)"); }
    r(4.6+dx, 5.9+bob, 1.2, .7, "rgba(232,120,120,.4)"); r(10.2+dx, 5.9+bob, 1.2, .7, "rgba(232,120,120,.4)");
    if(L.pearls){ r(3.3+dx, 5.6+bob, .9, .9, "#f6f1e4"); r(11.8+dx, 5.6+bob, .9, .9, "#f6f1e4"); }
    if(L.frown){ r(5.2+dx, 3.4+bob, 1.2, .5, "#1d1714"); r(6.2+dx, 3.7+bob, 1.2, .5, "#1d1714"); r(8.6+dx, 3.7+bob, 1.2, .5, "#1d1714"); r(9.6+dx, 3.4+bob, 1.2, .5, "#1d1714"); }
    if(L.glasses){ r(5+dx, 4+bob, 2.8, .5, "#555"); r(8.2+dx, 4+bob, 2.8, .5, "#555"); }
    r(7+dx, 6.6+bob, 2, .6, "#b4685a");
  }
}
const PORTRAIT = {};
function portrait(id){
  const pk = id==="me" ? "me" + playerGender() + (inOutfit() ? "o" : "") : id;
  if(PORTRAIT[pk]) return PORTRAIT[pk];
  try{
    const cv = document.createElement("canvas"); cv.width = 96; cv.height = 96;
    const c = cv.getContext("2d"); c.scale(2,2); cv.noBag = 1;
    const g = c.createLinearGradient(0,0,0,48), col = (CH[id]||CH.sys).col; g.addColorStop(0, col); g.addColorStop(1, "rgba(0,0,0,.25)");
    c.fillStyle = col; c.fillRect(0,0,48,48); c.fillStyle = g; c.fillRect(0,0,48,48);
    drawChar(c, 8, 6, LOOK[id] ? id : "pt", "down", 0, 2);
    PORTRAIT[pk] = cv.toDataURL();
  }catch(e){ PORTRAIT[pk] = ""; }
  return PORTRAIT[pk];
}

/* 場景：依科別換地板與家具 */
function themeOf(dept){
  if(!dept) return "lobby";
  if(/急診|技能/.test(dept)) return "er";
  if(/外科/.test(dept)) return "or";
  if(/兒科/.test(dept)) return "peds";
  if(/婦產/.test(dept)) return "ob";
  if(/社區/.test(dept)) return "village";
  if(/評核|招募/.test(dept)) return "office";
  return "ward";
}
const FLOOR = {lobby:["#e8e2d4","#e1dacb"], ward:["#dfe9e5","#d6e2dd"], er:["#dcdfe3","#d2d6db"], or:["#cfe3e0","#c4dbd7"],
  peds:["#f3ead0","#ece1c3"], ob:["#f2e1e6","#ead6dc"], village:["#9cc77f","#93bf76"], office:["#e6dccb","#ddd2be"]};
function furniture(theme){
  const bedsTop = [2,5,8,11].map(x => ({k:"bed", x, y:1}));
  switch(theme){
    case "lobby": return [{k:"desk",x:5,y:1,w:5},{k:"sign",x:4,y:0,w:7,t:"光甜綜合醫院 · 教學部"},{k:"chair",x:1,y:6},{k:"chair",x:2,y:6},{k:"chair",x:12,y:6},{k:"chair",x:13,y:6},{k:"plant",x:1,y:1},{k:"plant",x:13,y:1},{k:"door",x:7,y:8}];
    case "er": return [{k:"sign",x:10,y:0,w:4,t:"急診 ER",red:1},{k:"resus",x:2,y:1},{k:"resus",x:5,y:1},{k:"resus",x:8,y:1},{k:"desk",x:1,y:6,w:3},{k:"cart",x:11,y:1},{k:"door",x:14,y:4,t:"救護車"},{k:"plant",x:13,y:7}];
    case "or": return [{k:"sign",x:9,y:0,w:5,t:"5F 外科 · 手術室"},{k:"ortable",x:6,y:3},{k:"lamp",x:6,y:2},{k:"sink",x:1,y:1},{k:"sink",x:2,y:1},{k:"cart",x:10,y:2},{k:"monitor",x:9,y:3}];
    case "peds": return [{k:"sign",x:4,y:0,w:6,t:"7F 內兒科病房"},...bedsTop.map(b => ({...b,k:"cot"})),{k:"desk",x:10,y:6,w:3},{k:"toy",x:2,y:6},{k:"toy",x:3,y:7},{k:"plant",x:13,y:7}];
    case "ob": return [{k:"sign",x:9,y:0,w:5,t:"2F 產房 · 嬰兒室"},{k:"bed",x:2,y:1},{k:"bed",x:5,y:1},{k:"crib",x:8,y:1},{k:"crib",x:10,y:1},{k:"desk",x:10,y:6,w:3},{k:"plant",x:1,y:7}];
    case "village": return [{k:"house",x:1,y:1,w:4,t:"衛生所"},{k:"tree",x:9,y:1},{k:"tree",x:12,y:2},{k:"tree",x:13,y:6},{k:"tree",x:2,y:7},{k:"path"}];
    case "office": return [{k:"sign",x:10,y:0,w:4,t:"教學研究部"},{k:"desk",x:2,y:2,w:3},{k:"desk",x:9,y:2,w:3},{k:"shelf",x:6,y:0,w:3},{k:"plant",x:1,y:7},{k:"plant",x:13,y:7}];
    default: return [{k:"sign",x:5,y:0,w:5,t:"8F 內科病房"},...bedsTop,{k:"curtain",x:4,y:1},{k:"curtain",x:7,y:1},{k:"curtain",x:10,y:1},{k:"desk",x:1,y:6,w:3,t:"護理站"},{k:"cart",x:13,y:1},{k:"plant",x:13,y:7},{k:"sink",x:7,y:7}];
  }
}
const SPOTS = [[4,4],[9,5],[12,4],[6,6],[2,4],[11,6],[7,4],[13,5],[5,5],[10,3],[3,6],[8,6]];
const W = {key:null, theme:"lobby", items:[], block:new Set(), npcs:[], walkers:[], p:{x:7,y:6,fx:7,fy:6,dir:"up",path:[],moving:0},
  target:null, onArrive:null, lastWho:null, bubbles:[], parts:[], shake:0, fade:0, title:"", t:0, raf:0, cv:null};
function blocked(x,y){ return x<0||y<0||x>=COLS||y>=ROWS||W.block.has(x+","+y)||W.npcs.some(n=>n.x===x&&n.y===y); }
function buildBlock(){
  W.block = new Set();
  for(let x=0;x<COLS;x++){ W.block.add(x+",0"); }
  W.items.forEach(f => {
    if(f.k==="path"||f.k==="sign"||f.k==="lamp"||f.k==="curtain") return;
    const w = f.w || (f.k==="bed"||f.k==="resus"||f.k==="cot"?2:f.k==="ortable"?3:f.k==="house"?4:1);
    const h = f.k==="bed"||f.k==="resus"||f.k==="cot"||f.k==="house"?2:1;
    if(f.k==="door") return;
    for(let i=0;i<w;i++) for(let j=0;j<h;j++) W.block.add((f.x+i)+","+(f.y+j));
  });
}
function stageWhos(){
  if(!S || S.stage<0) return ["zhang","rui","kui","ouyang","bai","hsu","lin"];
  const st = STAGES[S.stage]; if(!st) return [];
  let list = st.steps.slice();
  if(st.elective && S.electQueue && S.electQueue.length) list = list.concat(ELECTIVES[S.electQueue[0]].steps);
  const out = [];
  list.forEach(s => { const w = s.t==="night" ? "kui" : s.who; if(w && CH[w] && w!=="sys" && w!=="me" && !out.includes(w)) out.push(w); });
  return out.slice(0, SPOTS.length);
}
function worldSync(){
  const st = S && S.stage>=0 ? STAGES[S.stage] : null;
  const key = S ? `${S.stage}:${S.electQueue&&S.electQueue[0]||""}` : "title";
  if(key === W.key) return;
  W.key = key; W.lastWho = null; W.target = null;
  const elect = st && st.elective && S.electQueue && S.electQueue.length ? ELECTIVES[S.electQueue[0]] : null;
  W.theme = themeOf(elect ? elect.n : st && st.dept);
  W.title = !S ? "畢業典禮後 · 醫院大廳" : S.stage<0 ? "招募季 · 醫院大廳" : st ? `${st.y===1?"PGY1":"PGY2"} · ${elect ? elect.n : st.dept}` : "";
  W.items = furniture(W.theme); W.npcs = []; buildBlock(); W.patient = null;
  stageWhos().forEach((id,i) => { const [x,y] = SPOTS[i]; if(!blocked(x,y)) W.npcs.push({id, x, y, dir:"down", ph:Math.random()*6}); });
  W.p = {x:7, y:7, fx:7, fy:7, dir:"up", path:[], moving:0};
  if(blocked(7,7)) W.p.y = W.p.fy = 8;
  W.walkers = W.theme==="village" || W.theme==="office" ? [] : [{id:W.theme==="lobby"?"vis":"pt", x:13, y:7, fx:13, fy:7, dir:"left", path:[], wait:0}];
  /* 跑跑小Ｃ：每張地圖都在跑 */
  if(!W.npcs.some(n => n.id==="xiaoc")) W.walkers.push({id:"xiaoc", fx:1, fy:blocked(1,7)?8:7, dir:"right", path:[], wait:.5, sp:3.6, run:1});
  W.fade = 1;
  if(typeof musicSync === "function") musicSync();
}
function npcOf(id){
  let n = W.npcs.find(n => n.id===id);
  if(!n){
    const spot = SPOTS.find(([x,y]) => !blocked(x,y) && !(W.p.x===x && W.p.y===y)) || [7,4];
    n = {id, x:spot[0], y:spot[1], dir:"down", ph:0}; W.npcs.push(n);
    W.walkers = W.walkers.filter(w => w.id !== id);
  }
  return n;
}
function bfs(sx,sy,goals){
  const k = (x,y) => x+","+y, prev = new Map([[k(sx,sy),null]]), q = [[sx,sy]];
  while(q.length){
    const [x,y] = q.shift();
    if(goals.some(([gx,gy]) => gx===x && gy===y)){
      const path = []; let cur = k(x,y);
      while(cur && cur !== k(sx,sy)){ const [a,b] = cur.split(",").map(Number); path.unshift([a,b]); cur = prev.get(cur); }
      return path;
    }
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const nx = x+dx, ny = y+dy, kk = k(nx,ny);
      if(!prev.has(kk) && !blocked(nx,ny)){ prev.set(kk, k(x,y)); q.push([nx,ny]); }
    }
  }
  return null;
}
function walkTo(n, then){
  const goals = [[n.x,n.y+1],[n.x-1,n.y],[n.x+1,n.y],[n.x,n.y-1]];
  if(goals.some(([x,y]) => x===W.p.x && y===W.p.y)){ face(n); return then && then(); }
  const path = bfs(W.p.x, W.p.y, goals);
  W.p.path = path || []; W.onArrive = () => { face(n); then && then(); };
  if(!path || !path.length){ const f = W.onArrive; W.onArrive = null; f(); }
}
function face(n){
  const dx = n.x - W.p.x, dy = n.y - W.p.y;
  W.p.dir = Math.abs(dx) > Math.abs(dy) ? (dx>0?"right":"left") : (dy>0?"down":"up");
  n.dir = {left:"right", right:"left", up:"down", down:"up"}[W.p.dir];
}
function bubble(n, text, t=2.6){ W.bubbles = W.bubbles.filter(b => b.n!==n); W.bubbles.push({n, text, t}); }

/* 走到 NPC 身邊才開始對話 */
function gate(who, head, go){
  if(!who || !CH[who] || who==="sys" || who==="me" || who===W.lastWho) { W.lastWho = who && who!=="sys" ? who : W.lastWho; return go(); }
  const n = npcOf(who); W.target = who;
  let done = false;
  const fire = () => { if(done) return; done = true; W.target = null; W.lastWho = who; bubble(n, {tbxz:"全部都要救！", yan:"（呵欠）來…查房…", wan:"今天誰報告？", luyin:"（錄音中●）你講啊。", chunpu:"這裡不是伸展台。", zhen:"先講你的 PICO。"}[who] || "……", (who==="tbxz"||who==="yan"||who==="wan"||who==="luyin"||who==="chunpu"||who==="zhen") ? 2.4 : 1.2); go(); };
  W.fire = () => walkTo(n, fire);
  const c = CH[who];
  show(`${head}<div class="gate"><img class="pav" src="${portrait(who)}" alt=""><div><strong>${esc(c.n)}</strong>在等你（頭上有「！」）。<span class="meta">用方向鍵或 WASD 走過去按空白鍵，也可以直接點地圖上的人物。</span></div></div><button class="primary" id="nx" data-auto="1">走過去說話</button>`);
  const wr = document.getElementById("world").getBoundingClientRect(); if(wr.top < 0) window.scrollTo({top: window.scrollY + wr.top - 8});
  document.getElementById("nx").onclick = e => { if(!e.isTrusted || REDUCED) fire(); else { W.fire(); setTimeout(fire, 1800); } };
}
function worldReact(ok){
  const px = W.p.fx*TW + TW/2, py = W.p.fy*TW;
  if(ok){ for(let i=0;i<18;i++) W.parts.push({x:px, y:py, vx:(Math.random()-.5)*160, vy:-60-Math.random()*120, t:1, col:["#2c6e5c","#f2b630","#e78fae","#4aa3c7"][i%4]}); }
  else { W.shake = .35; }
  patientReact(ok);
  const n = W.npcs.find(n => n.id===W.lastWho); if(n) bubble(n, n.id==="luyin" ? (ok ? "……嗯，講得算清楚。" : "這段我會留著。") : n.id==="tbxz" ? (ok ? "……好，我聽你說。" : "我要告你們！") : (ok ? "很好！" : "再想想。"), 1.6);
}
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;


/* 病人場景：臨床題出現時，地圖上真的有一位病人出狀況；答對會好轉，答錯會惡化 */
const PT_RE = /病人|歲|男性|女性|嬰|孩|新生兒|產婦|孕婦|阿公|阿嬤|爺爺|奶奶|床|傷患|BP|血壓|血氧|心跳|發燒|意識|昏迷|休克|胸痛|喘|抽搐|出血/;
function vitalsOf(t){
  const v = [], m = (re) => { const x = t.match(re); return x && x[1]; };
  const bp = m(/(?:BP|血壓)[^\d]{0,3}(\d{2,3}\/\d{2,3})/); if(bp) v.push(["BP", bp]);
  const hr = m(/(?:HR|心跳|脈搏|心率)[^\d]{0,3}(\d{2,3})/); if(hr) v.push(["HR", hr]);
  const sp = m(/(?:SpO2|SpO₂|血氧)[^\d]{0,4}(\d{2,3})/); if(sp) v.push(["SpO₂", sp+"%"]);
  const tp = m(/(?:體溫|發燒|BT)[^\d]{0,3}(\d{2}(?:\.\d)?)/); if(tp && +tp > 34 && +tp < 43) v.push(["BT", tp+"°C"]);
  const gl = m(/(?:血糖|glucose)[^\d]{0,4}(\d{2,4})/i); if(gl) v.push(["血糖", gl]);
  const k = m(/\bK\s*(\d(?:\.\d)?)/); if(k) v.push(["K", k]);
  const hb = m(/\bHb\s*(\d{1,2}(?:\.\d)?)/); if(hb) v.push(["Hb", hb]);
  return v.slice(0, 4);
}
function worldPatient(qid){
  const q = QB[qid]; W.patient = null;
  if(!q || !PT_RE.test(q.q || "")) return;
  const beds = W.items.filter(f => /bed|cot|resus|ortable|crib/.test(f.k));
  const who = W.npcs.find(n => n.id === W.lastWho);
  let spot;
  if(beds.length){
    const b = beds.slice().sort((a,c) => (who ? Math.abs(a.x-who.x)+Math.abs(a.y-who.y) - Math.abs(c.x-who.x)-Math.abs(c.y-who.y) : 0))[0];
    spot = b.k==="ortable" ? {x:b.x*TW+48, y:b.y*TW+14, lie:1} : b.k==="crib" ? {x:b.x*TW+16, y:b.y*TW+16, baby:1} : {x:b.x*TW+27, y:b.y*TW+21};
  } else spot = {x:7*TW+16, y:3*TW+12, gurney:1};
  const text = (q.q || "").replace(/[「」]/g, "");
  const cut = text.split(/[。？?]/)[0];
  W.patient = {...spot, st:"crit", t:0, vit:vitalsOf(text), say: cut.length > 16 ? cut.slice(0,15)+"…" : cut};
  W.parts.push(...Array.from({length:6}, (_, i) => ({x:spot.x, y:spot.y, vx:Math.cos(i)*40, vy:-40, t:.8, col:"#e5484d"})));
}
function patientReact(ok){
  const P = W.patient; if(!P || P.st !== "crit") return;
  P.st = ok ? "ok" : "worse"; P.t = 0; P.age = 0;
  if(ok){ for(let i=0;i<14;i++) W.parts.push({x:P.x, y:P.y-6, vx:(Math.random()-.5)*90, vy:-50-Math.random()*70, t:1.2, col:["#3fbf7f","#f2b630","#e78fae"][i%3]}); }
  else W.shake = .5;
}
function drawPatient(c){
  const P = W.patient; if(!P) return;
  P.t += 1/60;
  if(P.st !== "crit" && P.t > 6){ W.patient = null; return; }
  const pulse = (Math.sin(W.t*6)+1)/2, col = P.st==="ok" ? "63,191,127" : "229,72,77";
  if(P.gurney){ c.fillStyle="rgba(0,0,0,.15)"; c.fillRect(P.x-26, P.y+14, 56, 4); c.fillStyle="#c9d3da"; c.fillRect(P.x-28, P.y-2, 56, 16); c.fillStyle="#fafafa"; c.fillRect(P.x-26, P.y, 52, 12); c.fillStyle="#555"; c.fillRect(P.x-24, P.y+14, 3, 6); c.fillRect(P.x+20, P.y+14, 3, 6); }
  /* 躺著的病人：臉、蓋被 */
  const s = P.baby ? .7 : 1, X = P.x - 10*s, Y = P.y - 8*s;
  c.fillStyle = P.st==="crit" ? "#e2c2a6" : P.st==="worse" ? "#c9b2a0" : "#f1c8a5"; c.fillRect(X, Y, 12*s, 10*s);
  c.fillStyle = "#4a3a30"; c.fillRect(X, Y, 12*s, 3*s);
  c.fillStyle = "#222";
  if(P.st==="ok"){ c.fillRect(X+3*s, Y+5*s, 2*s, 1*s); c.fillRect(X+7*s, Y+5*s, 2*s, 1*s); c.fillStyle="#b4685a"; c.fillRect(X+4*s, Y+8*s, 4*s, 1*s); }
  else { c.fillRect(X+3*s, Y+5*s, 2*s, .6*s); c.fillRect(X+7*s, Y+5*s, 2*s, .6*s); c.fillStyle="#7a4a40"; c.fillRect(X+5*s, Y+8*s, 2*s, 1.2*s); }
  if(P.st!=="ok"){ c.fillStyle = "rgba(120,170,230,.8)"; c.fillRect(X+12*s, Y+2*s + (W.t*8 % 4), 1.5, 2.5); }
  /* 警示光圈 */
  c.strokeStyle = `rgba(${col},${P.st==="ok" ? .7 : .35 + pulse*.5})`; c.lineWidth = 2;
  c.beginPath(); c.ellipse(P.x, P.y, 26 + (P.st==="crit" ? pulse*4 : 0), 16 + (P.st==="crit" ? pulse*3 : 0), 0, 0, 7); c.stroke(); c.lineWidth = 1;
  if(P.st!=="ok"){ c.fillStyle = `rgba(229,72,77,${.6+pulse*.4})`; c.beginPath(); c.arc(P.x+20, P.y-18, 7, 0, 7); c.fill(); c.fillStyle="#fff"; c.font="bold 10px sans-serif"; c.textAlign="center"; c.fillText("!", P.x+20, P.y-14.5); c.textAlign="left"; }
  else { c.fillStyle="#3fbf7f"; c.font="bold 12px sans-serif"; c.fillText("♥", P.x+15, P.y-14 - Math.sin(W.t*3)*2); }
}
function drawVitals(c){
  const P = W.patient; if(!P) return;
  const crit = P.st!=="ok", rows = P.vit.length ? P.vit : [["狀態", crit ? "不穩定" : "穩定"]];
  const w = 150, h = 24 + rows.length*15, x0 = COLS*TW - w - 6, y0 = 30;
  c.fillStyle = "rgba(10,18,22,.86)"; c.fillRect(x0, y0, w, h);
  c.strokeStyle = P.st==="ok" ? "#3fbf7f" : `rgba(229,72,77,${.5+((Math.sin(W.t*6)+1)/4)})`; c.lineWidth = 2; c.strokeRect(x0, y0, w, h); c.lineWidth = 1;
  c.font = "bold 11px sans-serif"; c.fillStyle = P.st==="ok" ? "#7fe0a8" : "#ff8a8a";
  c.fillText(P.st==="ok" ? "生命徵象：改善中" : P.st==="worse" ? "生命徵象：惡化！" : "病人狀況：警示", x0+8, y0+15);
  c.font = "11px ui-monospace, monospace";
  rows.forEach(([k,v], i) => { c.fillStyle = "#9fb3bb"; c.fillText(k, x0+8, y0+31+i*15); c.fillStyle = P.st==="ok" ? "#c9f2da" : "#fff"; c.fillText(P.st==="ok" && k!=="狀態" ? v+" → 好轉" : v, x0+50, y0+31+i*15); });
  /* 心電圖線 */
  c.strokeStyle = P.st==="ok" ? "#3fbf7f" : "#e5484d"; c.beginPath();
  for(let i=0;i<w-16;i++){ const ph = (i + W.t*60) % (P.st==="worse" ? 22 : 34); const yy = ph<2 ? -7 : ph<4 ? 5 : 0; c.lineTo(x0+8+i, y0+h-5+yy*.5); }
  c.stroke();
}

/* 病人臉部特寫：出狀況時放大顯示哭哭的臉，好轉後變笑臉 */
function drawCloseup(c){
  const P = W.patient; if(!P) return;
  const ok = P.st==="ok", worse = P.st==="worse";
  const R = 34, pop = Math.min(1, (P.age = (P.age||0) + 1/60) / .25), k = .6 + .4*pop + (ok ? 0 : Math.sin(W.t*10)*.02);
  const cx = 52, cy = ROWS*TW - 64;
  c.save(); c.translate(cx, cy); c.scale(k, k);
  /* 外框 */
  c.fillStyle = "rgba(10,18,22,.82)"; c.beginPath(); c.arc(0, 0, R+10, 0, 7); c.fill();
  c.strokeStyle = ok ? "#3fbf7f" : `rgba(229,72,77,${.6+(Math.sin(W.t*6)+1)/5})`; c.lineWidth = 3; c.stroke(); c.lineWidth = 1;
  /* 臉 */
  c.fillStyle = worse ? "#d9c3b6" : ok ? "#f6d2b0" : "#efcfb4"; c.beginPath(); c.arc(0, 2, R, 0, 7); c.fill();
  if(worse){ c.fillStyle = "rgba(110,140,200,.25)"; c.beginPath(); c.arc(0, 2, R, 0, 7); c.fill(); }
  c.fillStyle = "#4a3a30"; c.beginPath(); c.arc(0, -4, R, Math.PI*1.05, Math.PI*1.95); c.fill(); c.fillRect(-R+2, -12, 8, 10); c.fillRect(R-10, -12, 8, 10);
  c.strokeStyle = "#2a2220"; c.lineCap = "round"; c.lineWidth = 3;
  if(ok){
    c.beginPath(); c.arc(-12, 2, 6, Math.PI*1.1, Math.PI*1.9); c.stroke(); c.beginPath(); c.arc(12, 2, 6, Math.PI*1.1, Math.PI*1.9); c.stroke();
    c.fillStyle = "rgba(240,120,130,.5)"; c.beginPath(); c.ellipse(-20, 12, 6, 3.5, 0, 0, 7); c.ellipse(20, 12, 6, 3.5, 0, 0, 7); c.fill();
    c.beginPath(); c.arc(0, 12, 10, Math.PI*.15, Math.PI*.85); c.stroke();
    c.fillStyle = "#f2b630"; [[-30,-28],[30,-24],[26,26]].forEach(([x,y],i) => { const s = 3 + Math.sin(W.t*5+i)*1.5; c.fillRect(x-s/2, y-.8, s, 1.6); c.fillRect(x-.8, y-s/2, 1.6, s); });
  } else {
    /* 八字眉、緊閉的哭哭眼 */
    c.beginPath(); c.moveTo(-20, -10); c.lineTo(-7, -15); c.moveTo(20, -10); c.lineTo(7, -15); c.stroke();
    c.beginPath(); c.arc(-12, 0, 6, Math.PI*.15, Math.PI*.85, true); c.stroke(); c.beginPath(); c.arc(12, 0, 6, Math.PI*.15, Math.PI*.85, true); c.stroke();
    /* 張嘴大哭 */
    c.fillStyle = "#6b2a2a"; c.beginPath(); c.ellipse(0, 17 + Math.sin(W.t*8)*1, 8, 6 + Math.sin(W.t*8)*1.5, 0, 0, 7); c.fill();
    c.fillStyle = "#e88a8a"; c.beginPath(); c.ellipse(0, 21, 5, 2.4, 0, 0, 7); c.fill();
    /* 眼淚：兩條淚流加上往下掉的淚珠 */
    c.fillStyle = "rgba(110,180,240,.85)"; c.fillRect(-15, 4, 4, 14); c.fillRect(11, 4, 4, 14);
    for(let i=0;i<3;i++){ const ph = (W.t*1.6 + i/3) % 1; c.globalAlpha = 1 - ph;
      c.beginPath(); c.arc(-13, 18 + ph*22, 2.6, 0, 7); c.arc(13, 18 + ((ph+.5)%1)*22, 2.6, 0, 7); c.fill(); }
    c.globalAlpha = 1;
    if(worse){ c.fillStyle = "rgba(120,190,240,.9)"; c.beginPath(); c.moveTo(26, -22); c.quadraticCurveTo(32, -12, 26, -8); c.quadraticCurveTo(20, -12, 26, -22); c.fill(); }
  }
  c.lineCap = "butt"; c.lineWidth = 1;
  c.restore();
  const msg = ok ? "好多了，謝謝醫師！" : worse ? "嗚嗚…更不舒服了…" : "嗚嗚…好難受…";
  c.font = "bold 12px sans-serif"; const w = c.measureText(msg).width + 14, bx = cx + 40, by = cy - 40;
  c.fillStyle = "#fff"; c.strokeStyle = ok ? "#3fbf7f" : "#e5484d"; c.lineWidth = 1.5; c.beginPath(); c.roundRect ? c.roundRect(bx, by, w, 22, 8) : c.rect(bx, by, w, 22); c.fill(); c.stroke(); c.lineWidth = 1;
  c.fillStyle = "#223"; c.fillText(msg, bx + 7, by + 15);
}
/* 繪製 */
function drawItem(c, f){
  const X = f.x*TW, Y = f.y*TW, r = (x,y,w,h,col) => { c.fillStyle = col; c.fillRect(X+x, Y+y, w, h); };
  const z = Math.sin(W.t*2)*2;
  switch(f.k){
    case "bed": case "cot": case "resus":
      r(2,4,TW*2-4,TW*2-10, f.k==="resus" ? "#c8d2da" : "#fafafa"); r(2,4,TW*2-4,6,"#9fb4c2");
      r(2,TW*2-8,TW*2-4,3,"rgba(0,0,0,.12)"); r(1,4,2,TW*2-10,"#aab7bf"); r(TW*2-3,4,2,TW*2-10,"#aab7bf");
      r(10,12,14,10,"#fff"); r(10,20,14,2,"#e3e7ea"); r(8,26,TW*2-16,24, f.k==="cot" ? "#f2c463" : f.k==="resus" ? "#7fa7c9" : "#8fb9a8");
      r(8,26,TW*2-16,4,"rgba(255,255,255,.35)"); r(8,36,TW*2-16,1,"rgba(0,0,0,.08)"); r(8,44,TW*2-16,1,"rgba(0,0,0,.08)");
      if(f.k==="bed"){ r(TW*2-6,-14,2,40,"#9aa6ad"); r(TW*2-11,-16,12,3,"#9aa6ad"); r(TW*2-11,-13,7,11,"rgba(190,225,245,.85)"); r(TW*2-10,-6,5,4,"rgba(140,190,225,.9)");
        const dp = (W.t*1.3 + f.x) % 1; c.fillStyle="rgba(120,170,210,.9)"; c.fillRect(X+TW*2-8, Y-2+dp*8, 1.5, 2); }
      drawHead(c, X+17, Y+13); if(f.k!=="resus"){ c.fillStyle="#6b7c86"; c.font="bold 11px sans-serif"; c.fillText("z", X+34, Y+8+z); }
      if(f.k==="resus"){ r(TW*2-12,0,10,10,"#222"); c.strokeStyle="#4ef08a"; c.beginPath(); for(let i=0;i<9;i++){ const yy = (i===4? -3 : i===5 ? 3 : 0); c.lineTo(X+TW*2-12+i, Y+5+yy); } c.stroke(); }
      break;
    case "crib": r(4,8,24,18,"#f6efe4"); r(4,8,24,3,"#c79a6a"); drawHead(c, X+12, Y+12, 0.7); break;
    case "desk": r(0,TW-2,(f.w||1)*TW,3,"rgba(0,0,0,.15)"); r(0,8,(f.w||1)*TW,TW-8,"#b98b5e"); r(0,8,(f.w||1)*TW,5,"#d3a679"); r(0,13,(f.w||1)*TW,1,"rgba(0,0,0,.15)");
      r(8,0,14,10,"#33424c"); r(10,2,10,6, (Math.floor(W.t*1.5+f.x)%5) ? "#7fd0e0" : "#a8e6f0"); r(11,3,6,1,"rgba(255,255,255,.6)"); r(13,10,4,2,"#33424c");
      if((f.w||1) > 2){ r(TW+8,2,10,8,"#f4f1e8"); r(TW+9,4,8,1,"#bbb"); r(TW+9,6,6,1,"#bbb"); r(TW*2+4,4,6,6,"#e05a47"); r(TW*2+5,2,4,2,"#fff"); }
      if(f.t){ c.fillStyle="#fff"; c.font="bold 11px sans-serif"; c.fillText(f.t, X+30, Y+26); } break;
    case "sign": r(1,4,(f.w||1)*TW,22,"rgba(0,0,0,.18)"); r(0,2,(f.w||1)*TW,22, f.red ? "#a3342e" : "#2c6e5c"); r(0,2,(f.w||1)*TW,3,"rgba(255,255,255,.18)");
      if(f.red && Math.floor(W.t*2)%2){ r(-8,6,6,6,"#ff5a4f"); r((f.w||1)*TW+2,6,6,6,"#ff5a4f"); }
      c.fillStyle="#fff"; c.font="bold 13px sans-serif"; c.textAlign="center"; c.fillText(f.t, X+(f.w||1)*TW/2, Y+18); c.textAlign="left"; break;
    case "chair": r(7,24,18,3,"rgba(0,0,0,.15)"); r(6,10,20,14,"#4a7c9a"); r(6,6,20,6,"#3b6680"); r(6,10,20,2,"rgba(255,255,255,.2)"); r(8,24,2,4,"#333"); r(22,24,2,4,"#333"); break;
    case "plant": c.fillStyle="rgba(0,0,0,.15)"; c.beginPath(); c.ellipse(X+16,Y+30,10,3,0,0,7); c.fill(); r(10,18,12,12,"#b06a3b"); r(10,18,12,3,"#c98250");
      [["#2f7a3c",16,12,10],["#3f8f4a",11,15,7],["#4ea85a",21,14,7],["#62bd6b",16,8,5]].forEach(([col,cx,cy,rr]) => { c.fillStyle=col; c.beginPath(); c.arc(X+cx+z*.2,Y+cy+z*.3,rr,0,7); c.fill(); }); break;
    case "door": r(0,TW-6,TW,6,"#7a8a94"); if(f.t){ c.fillStyle="#a3342e"; c.font="bold 10px sans-serif"; c.fillText(f.t, X-14, Y+12); } break;
    case "cart": r(4,6,24,20,"#c8483f"); r(4,6,24,4,"#e0675e"); r(6,26,4,4,"#333"); r(22,26,4,4,"#333"); break;
    case "sink": r(4,6,24,16,"#cfd8dc"); r(10,10,12,8,"#9ec5d6"); break;
    case "ortable": r(0,8,TW*3,16,"#5f8f9a"); r(4,10,TW*3-8,12,"#89b8c2"); break;
    case "lamp": c.fillStyle="rgba(255,250,210,.55)"; c.beginPath(); c.ellipse(X+48,Y+28,40,12,0,0,7); c.fill(); r(40,0,16,8,"#ddd"); break;
    case "monitor": r(4,2,24,18,"#222"); r(6,4,20,14,"#103"); c.strokeStyle="#4ef08a"; c.beginPath(); for(let i=0;i<20;i++){ c.lineTo(X+6+i, Y+11 + ((i+Math.floor(W.t*12))%10===0 ? -5 : 0)); } c.stroke(); break;
    case "toy": r(6,14,10,10,"#e05a47"); r(16,18,10,8,"#3b8bd0"); r(10,8,8,8,"#f2c230"); break;
    case "house": r(0,10,TW*4,TW*2-10,"#efe6d2"); c.fillStyle="#b2513b"; c.beginPath(); c.moveTo(X-4,Y+12); c.lineTo(X+TW*2,Y-6); c.lineTo(X+TW*4+4,Y+12); c.fill();
      r(TW*2-8,TW*2-22,16,22,"#7a5a3a"); r(10,TW+4,18,12,"#9fd3ea"); r(TW*3-4,TW+4,18,12,"#9fd3ea"); r(10,TW+9,18,1,"#7a5a3a"); r(TW*3-4,TW+9,18,1,"#7a5a3a");
      c.fillStyle="#2c6e5c"; c.font="bold 12px sans-serif"; c.fillText(f.t, X+18, Y+30); break;
    case "curtain": { const sway = Math.sin(W.t*1.2+f.x)*1.2; r(0,-2,4,2,"#9aa6ad"); c.fillStyle="rgba(150,200,215,.75)"; c.beginPath(); c.moveTo(X,Y); c.lineTo(X+4,Y); c.lineTo(X+4+sway,Y+TW*1.6); c.lineTo(X+sway,Y+TW*1.6); c.fill();
      c.fillStyle="rgba(255,255,255,.35)"; c.fillRect(X+1, Y, 1, TW*1.5); break; }
    case "tree": c.fillStyle="rgba(0,0,0,.18)"; c.beginPath(); c.ellipse(X+18,Y+31,14,4,0,0,7); c.fill(); r(12,18,8,14,"#7a5432"); r(12,18,3,14,"#8f6a45");
      [["#2e6b2c",16,13,14],["#3d7f3a",12,10,10],["#4f9447",20,8,9],["#68ad5c",15,5,6]].forEach(([col,cx,cy,rr]) => { c.fillStyle=col; c.beginPath(); c.arc(X+cx+z*.3,Y+cy,rr,0,7); c.fill(); }); break;
    case "shelf": r(0,0,(f.w||1)*TW,TW,"#8a6542"); for(let i=0;i<9;i++) r(4+i*10,6,7,20,["#c8483f","#3b8bd0","#f2c230","#2c6e5c"][i%4]); break;
  }
}
function drawHead(c, x, y, s=1){ c.fillStyle="#eac29c"; c.fillRect(x, y, 12*s, 10*s); c.fillStyle="#5b4a3f"; c.fillRect(x, y, 12*s, 3*s); }
const WALL = {lobby:"#cdbfa6", ward:"#b9cdc8", er:"#bcc3cc", or:"#a9cbc6", peds:"#e9d39a", ob:"#e4c3cd", office:"#cbb79a"};
function isNight(){ return /夜班/.test(W.title); }
function drawFloor(c){
  const [a,b] = FLOOR[W.theme], V2 = W.theme==="village";
  for(let y=0;y<ROWS;y++) for(let x=0;x<COLS;x++){
    const X = x*TW, Y = y*TW;
    c.fillStyle = (x+y)%2 ? a : b; c.fillRect(X, Y, TW, TW);
    if(V2){ const h = (x*7+y*13)%5; c.fillStyle="rgba(40,100,30,.35)"; if(h<3){ c.fillRect(X+6+h*5, Y+10+h*3, 2, 4); c.fillRect(X+8+h*5, Y+9+h*3, 2, 5); } if(h===4){ c.fillStyle="#f6e27a"; c.fillRect(X+20,Y+20,3,3); } continue; }
    c.fillStyle = "rgba(255,255,255,.28)"; c.fillRect(X, Y, TW, 1); c.fillRect(X, Y, 1, TW);
    c.fillStyle = "rgba(0,0,0,.05)"; c.fillRect(X, Y+TW-1, TW, 1); c.fillRect(X+TW-1, Y, 1, TW);
    if((x*5+y*3)%7===0){ c.fillStyle="rgba(0,0,0,.035)"; c.fillRect(X+9, Y+14, 3, 2); c.fillRect(X+21, Y+6, 2, 2); }
  }
  if(V2){ c.fillStyle="#d8c39a"; c.fillRect(0, 5*TW, COLS*TW, TW); c.fillRect(6*TW, 3*TW, TW, 6*TW);
    c.fillStyle="rgba(120,90,50,.18)"; for(let i=0;i<COLS*4;i++){ c.fillRect((i*37)%(COLS*TW), 5*TW + (i*11)%TW, 3, 2); } return; }
  /* 牆面：踢腳板、窗戶（白天看得到雲，夜班是星空）、時鐘 */
  const wall = WALL[W.theme] || WALL.ward, g = c.createLinearGradient(0,0,0,TW);
  g.addColorStop(0, wall); g.addColorStop(1, "rgba(0,0,0,.08)");
  c.fillStyle = wall; c.fillRect(0,0,COLS*TW,TW); c.fillStyle = g; c.fillRect(0,0,COLS*TW,TW);
  c.fillStyle = "rgba(0,0,0,.18)"; c.fillRect(0,TW-5,COLS*TW,5); c.fillStyle = "rgba(255,255,255,.25)"; c.fillRect(0,TW-6,COLS*TW,1);
  const used = new Set(); W.items.forEach(f => { if(f.y===0) for(let i=0;i<(f.w||1);i++) used.add(f.x+i); });
  const night = isNight();
  [1,13].forEach(wx => { if(used.has(wx)) return;
    const X = wx*TW+3, sky = c.createLinearGradient(0,3,0,24);
    sky.addColorStop(0, night ? "#0d1a3a" : "#7cc3f0"); sky.addColorStop(1, night ? "#25335e" : "#cfeaf9");
    c.fillStyle = "#8a969c"; c.fillRect(X-2,1,TW-2,25); c.fillStyle = sky; c.fillRect(X,3,TW-6,21);
    if(night){ c.fillStyle="#fff"; [[5,7],[16,12],[21,5],[10,17]].forEach(([sx,sy],i) => { if((Math.floor(W.t*2)+i)%5) c.fillRect(X+sx,sy,1.5,1.5); }); c.fillStyle="#f6e9b0"; c.beginPath(); c.arc(X+20,9,3.5,0,7); c.fill(); }
    else { const cx = (W.t*4 + wx*9) % (TW+10) - 8; c.fillStyle="rgba(255,255,255,.9)"; c.beginPath(); c.arc(X+cx,11,3.5,0,7); c.arc(X+cx+4,9,4.5,0,7); c.arc(X+cx+9,11,3.5,0,7); c.fill(); }
    c.fillStyle = "#8a969c"; c.fillRect(X+(TW-6)/2-1,3,2,21); c.fillRect(X,13,TW-6,2);
    c.fillStyle = "rgba(255,255,255,.18)"; c.fillRect(X+2,4,3,18);
  });
  if(!used.has(3)){ const X = 3*TW+16, Y = 13; c.fillStyle="#fff"; c.beginPath(); c.arc(X,Y,8,0,7); c.fill(); c.strokeStyle="#334"; c.lineWidth=1.5; c.stroke();
    const tm = W.t*0.4; c.beginPath(); c.moveTo(X,Y); c.lineTo(X+Math.sin(tm)*5, Y-Math.cos(tm)*5); c.moveTo(X,Y); c.lineTo(X+Math.sin(tm*12)*6.5, Y-Math.cos(tm*12)*6.5); c.stroke(); c.lineWidth=1; }
  /* 天花板燈在地板上的光暈 */
  [[3,4],[7.5,4],[12,4]].forEach(([lx,ly]) => { const rg = c.createRadialGradient(lx*TW, ly*TW, 4, lx*TW, ly*TW, TW*3);
    rg.addColorStop(0, night ? "rgba(255,230,170,.16)" : "rgba(255,255,240,.22)"); rg.addColorStop(1, "rgba(255,255,240,0)"); c.fillStyle = rg; c.fillRect(lx*TW-TW*3, ly*TW-TW*3, TW*6, TW*6); });
}
function drawLight(c){
  const w = COLS*TW, h = ROWS*TW, night = isNight();
  if(night){ c.fillStyle = "rgba(16,24,60,.28)"; c.fillRect(0,0,w,h); }
  const v = c.createRadialGradient(w/2, h/2, h*.45, w/2, h/2, w*.62);
  v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, night ? "rgba(5,8,25,.42)" : "rgba(20,24,30,.2)");
  c.fillStyle = v; c.fillRect(0,0,w,h);
  if(!REDUCED && W.theme!=="village"){ c.fillStyle = "rgba(255,255,255,.35)"; for(let i=0;i<10;i++){ const t = W.t*.15 + i*.61; c.fillRect((i*97 + Math.sin(t*3)*20) % w, (h - (t*40 % h)), 1.5, 1.5); } }
}
function drawWorld(){
  const cv = W.cv, c = cv.getContext("2d");
  c.setTransform(SC,0,0,SC,0,0);
  c.save();
  if(W.shake > 0) c.translate((Math.random()-.5)*8, 0);
  drawFloor(c);
  W.items.forEach(f => drawItem(c, f));
  drawPatient(c);
  const actors = [...W.npcs.map(n => ({id:n.id, x:n.x, y:n.y, dir:n.dir, frame:Math.floor((W.t+n.ph)*1.5)%2 && 0, npc:n})),
    ...W.walkers.map(w => ({id:w.id, x:w.fx, y:w.fy, dir:w.dir, frame:w.path.length ? Math.floor(W.t*(w.run?14:8)) : 0})),
    {id:"me", x:W.p.fx, y:W.p.fy, dir:W.p.dir, frame:W.p.path.length ? Math.floor(W.t*8) : 0, me:1}].sort((p,q) => p.y-q.y);
  actors.forEach(a => {
    const bx = a.x*TW, by = a.y*TW - 10 + (a.npc ? Math.sin(W.t*2+a.npc.ph)*1 : 0);
    drawChar(c, bx, by, a.id, a.dir, a.frame, 2);
    if(a.npc || a.id==="xiaoc"){
      const nm = CH[a.id].n.replace(/（.*）/,"");
      c.font = "11px sans-serif"; const w = c.measureText(nm).width + 8;
      c.fillStyle = "rgba(255,255,255,.85)"; c.fillRect(bx+16-w/2, by+42, w, 13);
      c.fillStyle = "#223"; c.textAlign = "center"; c.fillText(nm, bx+16, by+52); c.textAlign = "left";
      if(W.target === a.id){
        const jy = by - 14 + Math.sin(W.t*6)*3;
        c.fillStyle = "#f2b630"; c.fillRect(bx+10, jy, 12, 14); c.fillStyle = "#222"; c.font = "bold 12px sans-serif"; c.textAlign = "center"; c.fillText("！", bx+16, jy+12); c.textAlign = "left";
      }
    }
  });
  W.bubbles.forEach(b => {
    const bx = (b.n.fx ?? b.n.x)*TW+16, by = (b.n.fy ?? b.n.y)*TW - 22; c.font = "12px sans-serif";
    const w = Math.min(220, c.measureText(b.text).width + 14);
    const x0 = Math.max(4, Math.min(COLS*TW - w - 4, bx - w/2));
    c.fillStyle = "#fff"; c.strokeStyle = "#334"; c.lineWidth = 1.5; c.beginPath(); c.roundRect ? c.roundRect(x0, by-18, w, 20, 6) : c.rect(x0, by-18, w, 20); c.fill(); c.stroke();
    c.fillStyle = "#223"; c.fillText(b.text.length > 18 ? b.text.slice(0,17)+"…" : b.text, x0+7, by-4);
  });
  W.parts.forEach(p => { c.globalAlpha = Math.max(0,p.t); c.fillStyle = p.col; c.fillRect(p.x, p.y, 5, 5); }); c.globalAlpha = 1;
  drawLight(c);
  drawVitals(c);
  drawCloseup(c);
  c.fillStyle = "rgba(20,30,34,.72)"; c.font = "bold 12px sans-serif"; const tw = c.measureText(W.title).width + 16; c.fillRect(6, 6, tw, 20); c.fillStyle="#fff"; c.fillText(W.title, 14, 20);
  if(W.fade > 0){ c.fillStyle = `rgba(10,16,18,${W.fade})`; c.fillRect(0,0,COLS*TW,ROWS*TW); c.fillStyle = `rgba(255,255,255,${W.fade})`; c.font = "bold 20px sans-serif"; c.textAlign="center"; c.fillText(W.title, COLS*TW/2, ROWS*TW/2); c.textAlign="left"; }
  c.restore();
}
function tick(dt){
  W.t += dt;
  const sp = REDUCED ? 99 : 7;
  const p = W.p;
  if(p.path.length){
    const [tx,ty] = p.path[0];
    p.dir = tx>p.x ? "right" : tx<p.x ? "left" : ty>p.y ? "down" : "up";
    const dx = tx - p.fx, dy = ty - p.fy, d = Math.hypot(dx,dy), m = sp*dt;
    if(d <= m){ p.fx = p.x = tx; p.fy = p.y = ty; p.path.shift(); if(!p.path.length && W.onArrive){ const f = W.onArrive; W.onArrive = null; f(); } }
    else { p.fx += dx/d*m; p.fy += dy/d*m; }
  }
  W.walkers.forEach(w => {
    if(w.path.length){ const [tx,ty] = w.path[0]; w.dir = tx>w.fx?"right":tx<w.fx?"left":ty>w.fy?"down":"up";
      const dx=tx-w.fx, dy=ty-w.fy, d=Math.hypot(dx,dy), m=(w.sp||1.6)*dt; if(d<=m){ w.fx=tx; w.fy=ty; w.path.shift(); } else { w.fx+=dx/d*m; w.fy+=dy/d*m; } }
    else if((w.wait -= dt) < 0){
      w.wait = w.run ? .4 + Math.random() : 2 + Math.random()*3; const gx = 1+Math.floor(Math.random()*13), gy = 2+Math.floor(Math.random()*6);
      if(!blocked(gx,gy)){ const path = (() => { const tmp = {x:Math.round(w.fx), y:Math.round(w.fy)}; return bfs(tmp.x, tmp.y, [[gx,gy]]); })(); w.path = (path||[]).slice(0, w.run ? 14 : 6); }
    }
  });
  W.npcs.forEach(n => { if(n.id !== W.target && Math.random() < dt*.15) n.dir = ["down","left","right","down"][Math.floor(Math.random()*4)]; });
  W.bubbles.forEach(b => b.t -= dt); W.bubbles = W.bubbles.filter(b => b.t > 0);
  W.parts.forEach(q => { q.x += q.vx*dt; q.y += q.vy*dt; q.vy += 260*dt; q.t -= dt*1.2; }); W.parts = W.parts.filter(q => q.t > 0);
  if(W.shake > 0) W.shake -= dt;
  if(W.fade > 0) W.fade = Math.max(0, W.fade - dt*(REDUCED ? 9 : 0.9));
}
function worldInit(){
  const wrap = document.getElementById("world"), cv = document.getElementById("map");
  if(!cv || !cv.getContext) return;
  W.cv = cv; cv.width = COLS*TW*SC; cv.height = ROWS*TW*SC;
  worldSync();
  let last = performance.now();
  const loop = now => {
    const dt = Math.min(.05, (now-last)/1000); last = now;
    const hide = V().hidden; if(wrap.hidden !== hide) wrap.hidden = hide;
    if(!hide){ tick(dt); drawWorld(); }
    W.raf = requestAnimationFrame(loop);
  };
  W.raf = requestAnimationFrame(loop);
  const tapTile = e => {
    const r = cv.getBoundingClientRect();
    return [Math.floor((e.clientX - r.left) / r.width * COLS), Math.floor((e.clientY - r.top + 10*r.height/(ROWS*TW)) / r.height * ROWS)];
  };
  cv.addEventListener("click", e => {
    const [x,y] = tapTile(e);
    const xc = W.walkers.find(w => w.id==="xiaoc" && Math.abs(w.fx-x)<1 && (Math.abs(w.fy-y)<1 || Math.abs(w.fy-y-1)<1));
    if(xc) return mindRead(xc);
    const n = W.npcs.find(n => n.x===x && (n.y===y || n.y===y+1));
    if(n){
      if(n.id === W.target && W.fire) return W.fire();
      if(n.id === "xiaoc") return mindRead(n);
      return walkTo(n, () => bubble(n, idleLine(n.id)));
    }
    if(!blocked(x,y)){ const path = bfs(W.p.x, W.p.y, [[x,y]]); if(path){ W.p.path = path; W.onArrive = null; } }
  });
  document.addEventListener("keydown", e => {
    if(V().hidden || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    const d = {ArrowUp:[0,-1,"up"],KeyW:[0,-1,"up"],ArrowDown:[0,1,"down"],KeyS:[0,1,"down"],ArrowLeft:[-1,0,"left"],KeyA:[-1,0,"left"],ArrowRight:[1,0,"right"],KeyD:[1,0,"right"]}[e.code];
    if(d){
      e.preventDefault(); W.p.dir = d[2];
      if(!W.p.path.length && !blocked(W.p.x+d[0], W.p.y+d[1])) W.p.path = [[W.p.x+d[0], W.p.y+d[1]]];
      return;
    }
    if(e.code==="Space" && !(e.target.closest && e.target.closest("button"))){
      const [fx,fy] = {up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[W.p.dir];
      const near = W.npcs.filter(n => Math.abs(n.x-W.p.x)+Math.abs(n.y-W.p.y)===1);
      const n = near.find(n => n.x===W.p.x+fx && n.y===W.p.y+fy) || near.find(n => n.id===W.target) || near[0];
      if(n){ e.preventDefault(); face(n); if(n.id===W.target && W.fire) W.fire(); else bubble(n, idleLine(n.id)); }
    }
  });
}
function mindRead(xc){
  const live = [...V().querySelectorAll(".opt[data-k]:not([disabled])")];
  const qid = V().dataset.qid, q = qid && QB[qid];
  if(q && !q.ord && live.length > 2 && V().dataset.read !== qid){
    const wrong = live.filter(b => +b.dataset.k !== q.a);
    const b = wrong[Math.floor(Math.random()*wrong.length)];
    b.disabled = true; b.style.opacity = ".35"; b.style.textDecoration = "line-through";
    V().dataset.read = qid;
    return bubble(xc, "讀心術！不是這一個～", 2.4);
  }
  bubble(xc, XIAOC_LINES[Math.floor(Math.random()*XIAOC_LINES.length)], 2.4);
}
const XIAOC_LINES = ["跑起來！今天也辛苦了！","病人安全第一，你的安全也第一！","累了就說，不用硬撐。","吃飯了沒？口袋有巧克力。","有問題就問，沒有笨問題！","我看得出來你在想什麼喔。","答題卡關時點我，我幫你讀心一下。"];
function idleLine(id){
  const lines = {zhang:"病人不會等你準備好。", ouyang:"交班單 NPO 那欄寫了沒？", lin:"手部衛生五時機，背一次。", kui:"給藥前我會再核對一次喔。", rui:"叫我護理師就好。",
    wang:"急診的夜很長，記得喝水。", lee:"小朋友不是縮小版的大人。", tsai:"先驗孕，再說別的。", kolas:"醫療不只在醫院裡。", shih:"先跟阿公平視再說話。",
    cheng:"開藥前先查腎功能。", hsu:"……應該沒事吧？開玩笑的。", gy:"診斷依據在哪裡？病歷沒寫，就等於沒做。", bai:"這週的班我們重新排過了。", tbxz:"我大老遠趕回來，你們要負責！", yan:"……我查完就讓你走，真的。", wan:"你說得很好。我們再往下想一步。", luyin:"我都有錄喔。你再講一次。", chunpu:"手腕以下，什麼都不要戴。", zhen:"這個數字，換成病人聽得懂的話是什麼？"};
  return lines[id] || "你好。";
}
