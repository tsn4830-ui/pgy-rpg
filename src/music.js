/* 背景音樂：每個科別一首公眾領域（CC0）曲子，來源 FreePD.com。按「♪ 音樂」才開始播放。 */
const MUSIC = {
  lobby:{f:"lobby", t:"Slice of Life", a:"Bryan Teoh"},
  med:{f:"med", t:"Study and Relax", a:"Kevin MacLeod"},
  surg:{f:"surg", t:"Gotta Keep On Movin", a:"Bryan Teoh"},
  peds:{f:"peds", t:"Happy Whistling Ukulele", a:"Rafael Krux"},
  ob:{f:"ob", t:"Kalimba Relaxation Music", a:"Kevin MacLeod"},
  er:{f:"er", t:"Rush", a:""},
  night:{f:"night", t:"Night Vigil", a:"Kevin MacLeod"},
  comm:{f:"comm", t:"Barnville", a:"Rafael Krux"},
  geri:{f:"geri", t:"Nostalgic Piano", a:""},
  elect:{f:"elect", t:"Travelers Notebook", a:""},
  eval:{f:"eval", t:"Think About It", a:""},
  match:{f:"match", t:"Hopeful", a:"Rafael Krux"},
  ending:{f:"ending", t:"Journey of Hope", a:"Alexander Nakarada"}
};
function musicKey(){
  if(!S || S.stage < 0){ BGM.end = false; return "lobby"; }
  if(BGM.end) return "ending";
  const st = STAGES[S.stage]; if(!st) return "ending";
  const d = st.dept || "";
  if(/夜班/.test(d)) return "night";
  if(/急診|技能/.test(d)) return "er";
  if(/外科/.test(d)) return "surg";
  if(/兒科/.test(d)) return "peds";
  if(/婦產/.test(d)) return "ob";
  if(/社區/.test(d)) return "comm";
  if(/老年/.test(d)) return "geri";
  if(/選修/.test(d)) return "elect";
  if(/評核/.test(d)) return "eval";
  if(/招募/.test(d)) return "match";
  return "med";
}
const BGM = {on:false, el:null, key:null, synth:null};
function musicLabel(){ const m = MUSIC[BGM.key]; const btn = document.getElementById("music");
  if(btn){ btn.textContent = BGM.on ? "♪ 音樂開" : "♪ 音樂"; btn.title = BGM.on && m ? `正在播放：${m.t}${m.a ? "（"+m.a+"）" : ""}・FreePD 公眾領域` : "播放各科別的背景音樂"; } }
function synthStart(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const master = ctx.createGain(); master.gain.value = 0.035; master.connect(ctx.destination);
    const chords = [[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]];
    let i = 0;
    const play = () => { const t = ctx.currentTime;
      chords[i++ % chords.length].forEach(f => { const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine"; o.frequency.value = f/2; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t+1.2); g.gain.linearRampToValueAtTime(0, t+4.2);
        o.connect(g); g.connect(master); o.start(t); o.stop(t+4.3); }); };
    play(); const timer = setInterval(play, 4000); BGM.synth = {ctx, timer};
  }catch(err){}
}
function synthStop(){ if(BGM.synth){ clearInterval(BGM.synth.timer); BGM.synth.ctx.close(); BGM.synth = null; } }
function fadeTo(el, v, ms, then){
  const from = el.volume, t0 = performance.now();
  const stepF = now => { const k = Math.min(1, (now - t0) / ms); el.volume = Math.max(0, Math.min(1, from + (v - from) * k)); if(k < 1) requestAnimationFrame(stepF); else if(then) then(); };
  requestAnimationFrame(stepF);
}
function musicTo(key){
  if(!MUSIC[key]) key = "med";
  if(!BGM.on){ BGM.key = key; return; }
  if(BGM.key === key && BGM.el && !BGM.el.paused) return;
  BGM.key = key; musicLabel();
  const start = () => {
    const el = new Audio(`music/${MUSIC[key].f}.mp3`); el.loop = true; el.volume = 0; el.preload = "auto";
    el.onerror = () => { if(BGM.el === el && BGM.on && !BGM.synth) synthStart(); };
    BGM.el = el;
    el.play().then(() => { synthStop(); fadeTo(el, .32, 900); }).catch(() => { if(BGM.on && !BGM.synth) synthStart(); });
  };
  const old = BGM.el;
  if(old && !old.paused){ fadeTo(old, 0, 500, () => { old.pause(); old.src = ""; if(BGM.key === key) start(); }); }
  else start();
}
function musicSync(){ musicTo(musicKey()); }
document.getElementById("music").onclick = e => {
  const btn = e.currentTarget;
  BGM.on = !BGM.on; btn.setAttribute("aria-pressed", BGM.on);
  if(BGM.on){ BGM.key = null; musicTo(musicKey()); }
  else { synthStop(); if(BGM.el){ const el = BGM.el; fadeTo(el, 0, 300, () => { el.pause(); }); } BGM.el = null; }
  musicLabel();
};
