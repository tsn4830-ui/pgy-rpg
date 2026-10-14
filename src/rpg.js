
/* ======================= 角色扮演地圖 ======================= */
/* 15×9 格的病房地圖。角色、家具都用程式畫，不載入圖檔。 */
const TW = 32, COLS = 15, ROWS = 9;
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
  xiaoc: {coat:"#f4f6f5", shirt:"#e0662b", hair:"#141414", style:"shoulder", skin:"#f3cfb0", band:"#e0662b", shoes:"#ff8a3d"},
  gy:    {coat:"#3b3f58", shirt:"#f4f6f5", hair:"#6f6f6f", style:"short", skin:"#e8bf9a", glasses:1},
  cheng: {coat:"#f4f6f5", shirt:"#3f7f3a", hair:"#26201c", style:"spiky", skin:"#e5b38b", glasses:1},
  pt:    {coat:"#9fc3df", shirt:"#9fc3df", hair:"#d9d9d9", style:"short", skin:"#eac29c"},
  vis:   {coat:"#c98b4a", shirt:"#6b4a2a", hair:"#3b2b22", style:"long", skin:"#e1b088"}
};
function drawChar(c, x, y, id, dir="down", frame=0, s=2){
  const L = LOOK[id] || LOOK.pt;
  const r = (a,b,w,h,col) => { c.fillStyle = col; c.fillRect(x + a*s, y + b*s, w*s, h*s); };
  c.fillStyle = "rgba(0,0,0,.18)"; c.beginPath(); c.ellipse(x+8*s, y+19.5*s, 6*s, 1.6*s, 0, 0, 7); c.fill();
  const step = frame%2 ? 1 : 0, bob = frame%2 ? -0.5 : 0;
  r(4, 15, 3, 4 - step, "#2e3a40"); r(9, 15, 3, 3 + step, "#2e3a40");
  if(L.shoes){ r(3.5, 18 - step, 4, 1.4, L.shoes); r(8.5, 17 + step, 4, 1.4, L.shoes); }
  r(3, 8+bob, 10, 8, L.coat); r(6.5, 8+bob, 3, 7, L.shirt);
  if(L.coat === "#f4f6f5"){ r(3, 8+bob, 10, .6, "#d5dbd8"); r(10, 11+bob, 2, 1.5, "#9aa"); }
  r(1.6, 9+bob + (dir==="left"||dir==="right" ? 0 : step), 1.6, 5, L.coat); r(12.8, 9+bob + (dir==="left"||dir==="right" ? 0 : 1-step), 1.6, 5, L.coat);
  r(1.6, 13.6+bob, 1.6, 1.2, L.skin); r(12.8, 13.6+bob, 1.6, 1.2, L.skin);
  r(4, 1+bob, 8, 7, L.skin);
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
  }
  if(dir!=="up"){
    const dx = dir==="left" ? -1 : dir==="right" ? 1 : 0;
    r(5.8+dx, 4.4+bob, 1.2, 1.4, "#222"); r(9+dx, 4.4+bob, 1.2, 1.4, "#222");
    if(L.glasses){ r(5+dx, 4+bob, 2.8, .5, "#555"); r(8.2+dx, 4+bob, 2.8, .5, "#555"); }
    r(7+dx, 6.6+bob, 2, .6, "#b4685a");
  }
}
const PORTRAIT = {};
function portrait(id){
  if(PORTRAIT[id]) return PORTRAIT[id];
  try{
    const cv = document.createElement("canvas"); cv.width = 48; cv.height = 48;
    const c = cv.getContext("2d"); c.fillStyle = (CH[id]||CH.sys).col; c.fillRect(0,0,48,48);
    drawChar(c, 8, 6, LOOK[id] ? id : "pt", "down", 0, 2);
    PORTRAIT[id] = cv.toDataURL();
  }catch(e){ PORTRAIT[id] = ""; }
  return PORTRAIT[id];
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
    case "lobby": return [{k:"desk",x:5,y:1,w:5},{k:"sign",x:5,y:0,w:5,t:"呆丸醫院 · 教學部"},{k:"chair",x:1,y:6},{k:"chair",x:2,y:6},{k:"chair",x:12,y:6},{k:"chair",x:13,y:6},{k:"plant",x:1,y:1},{k:"plant",x:13,y:1},{k:"door",x:7,y:8}];
    case "er": return [{k:"resus",x:2,y:1},{k:"resus",x:5,y:1},{k:"resus",x:8,y:1},{k:"desk",x:1,y:6,w:3},{k:"cart",x:11,y:1},{k:"door",x:14,y:4,t:"救護車"},{k:"plant",x:13,y:7}];
    case "or": return [{k:"ortable",x:6,y:3},{k:"lamp",x:6,y:2},{k:"sink",x:1,y:1},{k:"sink",x:2,y:1},{k:"cart",x:10,y:2},{k:"monitor",x:9,y:3}];
    case "peds": return [...bedsTop.map(b => ({...b,k:"cot"})),{k:"desk",x:10,y:6,w:3},{k:"toy",x:2,y:6},{k:"toy",x:3,y:7},{k:"plant",x:13,y:7}];
    case "ob": return [{k:"bed",x:2,y:1},{k:"bed",x:5,y:1},{k:"crib",x:8,y:1},{k:"crib",x:10,y:1},{k:"desk",x:10,y:6,w:3},{k:"plant",x:1,y:7}];
    case "village": return [{k:"house",x:1,y:1,w:4,t:"衛生所"},{k:"tree",x:9,y:1},{k:"tree",x:12,y:2},{k:"tree",x:13,y:6},{k:"tree",x:2,y:7},{k:"path"}];
    case "office": return [{k:"desk",x:2,y:2,w:3},{k:"desk",x:9,y:2,w:3},{k:"shelf",x:6,y:0,w:3},{k:"plant",x:1,y:7},{k:"plant",x:13,y:7}];
    default: return [...bedsTop,{k:"desk",x:1,y:6,w:3,t:"護理站"},{k:"cart",x:13,y:1},{k:"plant",x:13,y:7},{k:"sink",x:7,y:7}];
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
    if(f.k==="path"||f.k==="sign"||f.k==="lamp") return;
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
  W.items = furniture(W.theme); W.npcs = []; buildBlock();
  stageWhos().forEach((id,i) => { const [x,y] = SPOTS[i]; if(!blocked(x,y)) W.npcs.push({id, x, y, dir:"down", ph:Math.random()*6}); });
  W.p = {x:7, y:7, fx:7, fy:7, dir:"up", path:[], moving:0};
  if(blocked(7,7)) W.p.y = W.p.fy = 8;
  W.walkers = W.theme==="village" || W.theme==="office" ? [] : [{id:W.theme==="lobby"?"vis":"pt", x:13, y:7, fx:13, fy:7, dir:"left", path:[], wait:0}];
  /* 跑跑小Ｃ：每張地圖都在跑 */
  if(!W.npcs.some(n => n.id==="xiaoc")) W.walkers.push({id:"xiaoc", fx:1, fy:blocked(1,7)?8:7, dir:"right", path:[], wait:.5, sp:3.6, run:1});
  W.fade = 1;
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
  const fire = () => { if(done) return; done = true; W.target = null; W.lastWho = who; bubble(n, "……", 1.2); go(); };
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
  const n = W.npcs.find(n => n.id===W.lastWho); if(n) bubble(n, ok ? "很好！" : "再想想。", 1.6);
}
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 繪製 */
function drawItem(c, f){
  const X = f.x*TW, Y = f.y*TW, r = (x,y,w,h,col) => { c.fillStyle = col; c.fillRect(X+x, Y+y, w, h); };
  const z = Math.sin(W.t*2)*2;
  switch(f.k){
    case "bed": case "cot": case "resus":
      r(2,4,TW*2-4,TW*2-10, f.k==="resus" ? "#c8d2da" : "#fafafa"); r(2,4,TW*2-4,6,"#9fb4c2");
      r(10,12,14,10,"#fff"); r(8,26,TW*2-16,24, f.k==="cot" ? "#f2c463" : f.k==="resus" ? "#7fa7c9" : "#8fb9a8");
      drawHead(c, X+17, Y+13); if(f.k!=="resus"){ c.fillStyle="#6b7c86"; c.font="bold 11px sans-serif"; c.fillText("z", X+34, Y+8+z); }
      if(f.k==="resus"){ r(TW*2-12,0,10,10,"#222"); c.strokeStyle="#4ef08a"; c.beginPath(); for(let i=0;i<9;i++){ const yy = (i===4? -3 : i===5 ? 3 : 0); c.lineTo(X+TW*2-12+i, Y+5+yy); } c.stroke(); }
      break;
    case "crib": r(4,8,24,18,"#f6efe4"); r(4,8,24,3,"#c79a6a"); drawHead(c, X+12, Y+12, 0.7); break;
    case "desk": r(0,8,(f.w||1)*TW,TW-8,"#b98b5e"); r(0,8,(f.w||1)*TW,5,"#d3a679"); r(8,0,14,10,"#33424c"); r(10,2,10,6,"#7fd0e0");
      if(f.t){ c.fillStyle="#fff"; c.font="bold 11px sans-serif"; c.fillText(f.t, X+30, Y+26); } break;
    case "sign": r(0,2,(f.w||1)*TW,22,"#2c6e5c"); c.fillStyle="#fff"; c.font="bold 13px sans-serif"; c.textAlign="center"; c.fillText(f.t, X+(f.w||1)*TW/2, Y+18); c.textAlign="left"; break;
    case "chair": r(6,10,20,14,"#4a7c9a"); r(6,6,20,6,"#3b6680"); break;
    case "plant": r(10,18,12,12,"#b06a3b"); c.fillStyle="#3f8f4a"; c.beginPath(); c.arc(X+16,Y+14+z*.3,10,0,7); c.fill(); break;
    case "door": r(0,TW-6,TW,6,"#7a8a94"); if(f.t){ c.fillStyle="#a3342e"; c.font="bold 10px sans-serif"; c.fillText(f.t, X-14, Y+12); } break;
    case "cart": r(4,6,24,20,"#c8483f"); r(4,6,24,4,"#e0675e"); r(6,26,4,4,"#333"); r(22,26,4,4,"#333"); break;
    case "sink": r(4,6,24,16,"#cfd8dc"); r(10,10,12,8,"#9ec5d6"); break;
    case "ortable": r(0,8,TW*3,16,"#5f8f9a"); r(4,10,TW*3-8,12,"#89b8c2"); break;
    case "lamp": c.fillStyle="rgba(255,250,210,.55)"; c.beginPath(); c.ellipse(X+48,Y+28,40,12,0,0,7); c.fill(); r(40,0,16,8,"#ddd"); break;
    case "monitor": r(4,2,24,18,"#222"); r(6,4,20,14,"#103"); c.strokeStyle="#4ef08a"; c.beginPath(); for(let i=0;i<20;i++){ c.lineTo(X+6+i, Y+11 + ((i+Math.floor(W.t*12))%10===0 ? -5 : 0)); } c.stroke(); break;
    case "toy": r(6,14,10,10,"#e05a47"); r(16,18,10,8,"#3b8bd0"); r(10,8,8,8,"#f2c230"); break;
    case "house": r(0,10,TW*4,TW*2-10,"#efe6d2"); c.fillStyle="#b2513b"; c.beginPath(); c.moveTo(X-4,Y+12); c.lineTo(X+TW*2,Y-6); c.lineTo(X+TW*4+4,Y+12); c.fill();
      r(TW*2-8,TW*2-22,16,22,"#7a5a3a"); c.fillStyle="#2c6e5c"; c.font="bold 12px sans-serif"; c.fillText(f.t, X+18, Y+30); break;
    case "tree": r(12,18,8,14,"#7a5432"); c.fillStyle="#3d7f3a"; c.beginPath(); c.arc(X+16,Y+12,14,0,7); c.fill(); break;
    case "shelf": r(0,0,(f.w||1)*TW,TW,"#8a6542"); for(let i=0;i<9;i++) r(4+i*10,6,7,20,["#c8483f","#3b8bd0","#f2c230","#2c6e5c"][i%4]); break;
  }
}
function drawHead(c, x, y, s=1){ c.fillStyle="#eac29c"; c.fillRect(x, y, 12*s, 10*s); c.fillStyle="#5b4a3f"; c.fillRect(x, y, 12*s, 3*s); }
function drawWorld(){
  const cv = W.cv, c = cv.getContext("2d");
  c.save();
  if(W.shake > 0) c.translate((Math.random()-.5)*8, 0);
  const [a,b] = FLOOR[W.theme];
  for(let y=0;y<ROWS;y++) for(let x=0;x<COLS;x++){ c.fillStyle = (x+y)%2 ? a : b; c.fillRect(x*TW, y*TW, TW, TW); }
  if(W.theme==="village"){ c.fillStyle="#d8c39a"; c.fillRect(0, 5*TW, COLS*TW, TW); c.fillRect(6*TW, 3*TW, TW, 6*TW); }
  else { c.fillStyle = "#b9c4c2"; c.fillRect(0,0,COLS*TW,TW); c.fillStyle="#a7b3b1"; c.fillRect(0,TW-4,COLS*TW,4); }
  W.items.forEach(f => drawItem(c, f));
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
  c.fillStyle = "rgba(20,30,34,.72)"; c.font = "bold 12px sans-serif"; const tw = c.measureText(W.title).width + 16; c.fillRect(6, 6, tw, 20); c.fillStyle="#fff"; c.fillText(W.title, 14, 20);
  if(W.fade > 0){ c.fillStyle = `rgba(10,16,18,${W.fade})`; c.fillRect(0,0,cv.width,cv.height); c.fillStyle = `rgba(255,255,255,${W.fade})`; c.font = "bold 20px sans-serif"; c.textAlign="center"; c.fillText(W.title, cv.width/2, cv.height/2); c.textAlign="left"; }
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
  W.cv = cv; cv.width = COLS*TW; cv.height = ROWS*TW;
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
    return [Math.floor((e.clientX - r.left) / r.width * COLS), Math.floor((e.clientY - r.top + 10*r.height/cv.height) / r.height * ROWS)];
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
    cheng:"開藥前先查腎功能。", hsu:"……應該沒事吧？開玩笑的。", gy:"診斷依據在哪裡？病歷沒寫，就等於沒做。", bai:"這週的班我們重新排過了。"};
  return lines[id] || "你好。";
}
