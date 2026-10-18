import re
d=open('data.js',encoding='utf-8').read()
rep=[
('都是 ISMP 列的易錯縮寫。你改得很快，不錯。」','都是 ISMP 列的易錯縮寫。你改得很快，不錯。」[[ismp_abbr]]'),
('教學部依程序處理並安排溝通。醫院依法須設申訴管道，也禁止報復。歐陽晉後來在 M&M 會議公開道歉。','教學部依程序處理並安排溝通。依《職業安全衛生法》，雇主應預防員工執行職務時遭受不法侵害，並建立申訴、調查及處理程序[[law_osh]]。歐陽晉後來在 M&M 會議公開道歉。'),
('這是保護病人，也保護你。」','這是保護病人，也保護你。」[[gmc]]'),
('睡眠是你的責任，也是病人安全。」','睡眠是你的責任，也是病人安全。」[[mohw]]'),
('社區醫學兩個月，不用回原醫院值班。今天去部落做居家訪視。」','社區醫學兩個月，不用回原醫院值班。今天去部落做居家訪視。」[[mohw]]'),
('（勞動部 1955 專線提供外籍工作者多語諮詢。）','（勞動部 1955 專線提供外籍工作者多語諮詢。）[[mol1955]]'),
('長照需求可以打 1966。醫療不只在醫院裡。」','長照需求可以打 1966。醫療不只在醫院裡。」[[ltc1966]]'),
# new QB items
('\n};\n\n/* ======================= 劇本工具', ',\n'+open('newqb.js',encoding='utf-8').read().strip()+'\n};\n\n/* ======================= 劇本工具'),
# skill stage after ED
(' {y:1,m:2,dept:"社區醫學"', open('skillstage.js',encoding='utf-8').read().strip()+'\n {y:1,m:2,dept:"社區醫學"'),
# PGY2 ED boss
('boss("wang","王宛如：「你今晚當資深。最後一題我來考。」",["op","ana"],1,',
 'quiz("brady","rui","監視器警報：心跳 34，血壓 78/40，病人說頭暈。"),\n  quiz("svt","wang"),\n  boss("wang","凌晨四點，院內 CPR 廣播。王宛如：「你今晚當資深，你帶 code。」",["pea","etco2cpr","rosc"],2,'),
# peds
('  quiz("ors","lee"),\n','  quiz("ors","lee"),\n  quiz("pedcpr","rui","兒科急救訓練，陳品睿來當教練："),\n'),
]
rep.append(('  quiz("compart","ouyang"),\n','  quiz("compart","ouyang"),\n  quiz("periop","cheng","明天要開刀的糖尿病病人，藥師鄭宇安問你："),\n'))
for a,b in rep:
    assert d.count(a)==1,a[:50]; d=d.replace(a,b)
for a,b in [(x.split('|||')[0],x.split('|||')[1]) for x in open('datapatch.txt',encoding='utf-8').read().strip().split('\n@@@\n')]:
    assert d.count(a)==1,a[:60]; d=d.replace(a,b)
e=open('engine.js',encoding='utf-8').read()
e=e.replace('if(c) c.onclick = () => { S = saved; run(); };','if(c) c.onclick = () => resume(saved);')
for a,b in [(x.split('|||')[0],x.split('|||')[1]) for x in open('engpatch.txt',encoding='utf-8').read().strip().split('\n@@@\n')]:
    assert e.count(a)==1,a[:60]; e=e.replace(a,b)
GAS=[
('  gas:{n:"PGY 職前加油站", u:GAS_URL}\n};','  gas:{n:"PGY 職前加油站", u:GAS_URL},\n  gas_acls:{n:"PGY職前加油站", u:"https://drive.google.com/file/d/17JVBn0DX4lUnHOVogluVhGuwibQtRf7N/view?usp=drivesdk", hide:true},\n  gas_glu:{n:"PGY職前加油站", u:"https://drive.google.com/file/d/1M8rVEmyVDHBEvMnPl_vlCQkMlxa71S7x/view?usp=drivesdk", hide:true}\n};\nconst GAS_ACLS = ["cpr","ratio","etco2cpr","pea","hts","rosc","brady","svt","vf","cprorder","lemon","preox","failed","intorder","etco2","succ","pedcpr","fbao","stemi","stroke","ecg10"];'),
('  {k:"mohw1925", t:"衛生福利部。1925 安心專線（24 小時免付費心理諮詢）。"}\n];','  {k:"mohw1925", t:"衛生福利部。1925 安心專線（24 小時免付費心理諮詢）。"},\n  {k:"gas_acls", t:"黃品叡。PGY 職前加油站：ACLS 破題解析（2026 版；依 2025 AHA ECC、2025 ACC/AHA ACS、2026 AHA/ASA Stroke 指引整理）。Google Drive 講義，需有檢視權限。", u:"https://drive.google.com/file/d/17JVBn0DX4lUnHOVogluVhGuwibQtRf7N/view?usp=drivesdk"},\n  {k:"gas_glu", t:"黃品叡。PGY 職前加油站：住院血糖值班生存講義（依 ADA Standards of Care 2026 整理）。Google Drive 講義，需有檢視權限。", u:"https://drive.google.com/file/d/1M8rVEmyVDHBEvMnPl_vlCQkMlxa71S7x/view?usp=drivesdk"}\n];\nGAS_ACLS.forEach(id => (STUDY[id] = STUDY[id] || []).push(["gas_acls","ACLS 破題解析 2026"]));\n["hypogly","dka","periop"].forEach(id => (STUDY[id] = STUDY[id] || []).push(["gas_glu","住院血糖值班生存講義"]));'),
]
GAS.append(('  gas_glu:{n:"PGY職前加油站", u:"https://drive.google.com/file/d/1M8rVEmyVDHBEvMnPl_vlCQkMlxa71S7x/view?usp=drivesdk", hide:true}\n};','  gas_glu:{n:"PGY職前加油站", u:"https://drive.google.com/file/d/1M8rVEmyVDHBEvMnPl_vlCQkMlxa71S7x/view?usp=drivesdk", hide:true},\n  gas_tx:{n:"PGY職前加油站", u:"https://drive.google.com/file/d/1JWHO6oeknX-4uJTcC_0u-CxbFPXaAoUn/view?usp=drivesdk", hide:true},\n  endo:{n:"內分泌代謝實證教室（需密碼）", u:"https://endoclass.drtsengshihting.com/"}\n};'))
GAS.append(('["hypogly","dka","periop"].forEach(id => (STUDY[id] = STUDY[id] || []).push(["gas_glu","住院血糖值班生存講義"]));','["hypogly","dka","periop"].forEach(id => (STUDY[id] = STUDY[id] || []).push(["gas_glu","住院血糖值班生存講義"]));\n["txunit","txstop","taco","ffp","dengueplt","ugib","mtp","inr"].forEach(id => (STUDY[id] = STUDY[id] || []).push(["gas_tx","輸血醫囑值班講義"]));\nObject.entries({hypogly:"低血糖",dka:"DKA 與 HHS",periop:"住院與圍術期血糖",hypercal:"高血鈣",hypona:"低血鈉",adrenal:"腎上腺功能不全"}).forEach(([id,ch]) => (STUDY[id] = STUDY[id] || []).push(["endo",ch]));'))
GAS.append(('Google Drive 講義，需有檢視權限。", u:"https://drive.google.com/file/d/1M8rVEmyVDHBEvMnPl_vlCQkMlxa71S7x/view?usp=drivesdk"}\n];','Google Drive 講義，需有檢視權限。", u:"https://drive.google.com/file/d/1M8rVEmyVDHBEvMnPl_vlCQkMlxa71S7x/view?usp=drivesdk"},\n  {k:"gas_tx", t:"黃品叡。PGY 職前加油站：輸血醫囑值班講義（依 AABB 2023 紅血球、AABB/ICTMG 2025 血小板指引與 ISBT 定義整理）。Google Drive 講義，需有檢視權限。", u:"https://drive.google.com/file/d/1JWHO6oeknX-4uJTcC_0u-CxbFPXaAoUn/view?usp=drivesdk"}\n];'))
for x in open('cloud.txt',encoding='utf-8').read().strip().split('\n@@@\n'):
    GAS.append((x.split('|||')[0], x.split('|||')[1]))
_e = e.index('/* 安靜的背景音：柔和的和弦循環 */'); _f = e.index('if(GAS_URL){ const g = document.getElementById("gas")')
e = e[:_e] + open('music.js',encoding='utf-8').read() + e[_f:]
assert e.count('function ending(){')==1; e = e.replace('function ending(){', 'function ending(){ BGM.end = true; musicTo("ending");')
# 版本更新後保留舊存檔：關卡步驟數變了也不會跳錯或卡住
_r = 'function resume(d){\n  S = d;'
assert e.count(_r)==1
e = e.replace(_r, _r + '\n  const _st = STAGES[S.stage]; if(_st && _st.steps && S.step >= _st.steps.length) S.step = Math.max(0, _st.steps.length - 1);')
RPG=[
('/* ======================= 啟動 ======================= */', open('rpg.js',encoding='utf-8').read()+'\n/* ======================= 啟動 ======================= */'),
('function start(){ S = null; titleScreen(); }','function start(){ S = null; titleScreen(); }\nworldInit();'),
('function step(s, st){\n  const head = (S.step===0) ? stageBanner(st) : "";','function step(s, st){\n  worldSync();\n  gate(s.t==="night" ? "kui" : s.who, (S.step===0) ? stageBanner(st) : "", () => step0(s, st));\n}\nfunction step0(s, st){\n  const head = (S.step===0) ? stageBanner(st) : "";'),
('function run(){\n  if(S.stage<0) return chooseHospital();','function run(){\n  worldSync();\n  if(S.stage<0) return chooseHospital();'),
('function av(id){ const c','function av(id){ if(id!=="sys" && LOOK[id]) return `<img class="av pav" src="${portrait(id)}" alt="">`; const c'),
]
RPG.append(('  V().querySelectorAll(".opt").forEach(b => b.onclick = () => {\n    const k = +b.dataset.k, ok = k===q.a;','  V().dataset.qid = id; delete V().dataset.read; worldPatient(id);\n  V().querySelectorAll(".opt").forEach(b => b.onclick = () => {\n    const k = +b.dataset.k, ok = k===q.a;'))
RPG.append(('  const v=V(); v.classList.remove("enter");','  const v=V(); delete v.dataset.qid; v.classList.remove("enter");'))
GAS += RPG
for a,c in GAS:
    assert e.count(a)==1,a[:60]; e=e.replace(a,c)
assert e.count('S.total++; if(ok) S.right++;')==2
e=e.replace('S.total++; if(ok) S.right++;','S.total++; if(ok) S.right++; worldReact(ok);')
assert e.count('Object.values(SITES).filter(s=>s.u)')==2
e=e.replace('Object.values(SITES).filter(s=>s.u)','Object.values(SITES).filter(s=>s.u&&!s.hide)')
# PGY職前加油站講義：只寫出處，不連 Google Drive；延伸閱讀一律導向 PGY學院
import re
PGY_URL = "https://www.facebook.com/rayhuangrapidsequence"  # PGY學院（阿婷提供，黃品叡的粉絲專頁）
e = e.replace('const GAS_URL = ""; // PGY 職前加油站網址（待補）', 'const GAS_URL = "'+PGY_URL+'"; // PGY學院')
e = e.replace('gas:{n:"PGY 職前加油站", u:GAS_URL}', 'gas:{n:"PGY學院", u:GAS_URL}')
e, n1 = re.subn(r'n:"PGY職前加油站", u:"https://drive\.google\.com/[^"]*", hide:true', 'n:"PGY學院", u:GAS_URL, hide:true', e)
e, n2 = re.subn(r'Google Drive 講義，需有檢視權限。", u:"https://drive\.google\.com/[^"]*"\}', '延伸閱讀請至 PGY學院。"}', e)
for a in ['ACLS 破題解析 2026','住院血糖值班生存講義','輸血醫囑值班講義']:
    assert e.count('"'+a+'"]')==1, a
    e = e.replace('"'+a+'"]', '"'+a+'（出處：黃品叡《PGY職前加油站》）"]')
k = 'const list = (STUDY[id]||[]).filter(([k]) => SITES[k].u);'
assert e.count(k)==1
e = e.replace(k, 'const list = (STUDY[id]||[]).filter(([k]) => SITES[k].u).filter(([k], i, a) => a.findIndex(([x]) => SITES[x].u === SITES[k].u) === i);')
k2 = '  if(SITES.gas.u) list.push(["gas","PGY 職前準備"]);'
assert e.count(k2)==1
e = e.replace(k2, '  if(SITES.gas.u && !list.some(([x]) => SITES[x].u === SITES.gas.u)) list.push(["gas","PGY 職前準備"]);')
assert n1==3 and n2==3 and 'drive.google' not in e, (n1,n2)
CSS='.jump{margin-top:12px}.jump summary{cursor:pointer;color:var(--accent,#2c6e5c);font-weight:600}.jumps{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.jumps button{font-size:13px}.world{padding:0;overflow:hidden;background:#1b2427}#map{display:block;width:100%;height:auto;cursor:pointer;touch-action:manipulation}.gate{display:flex;gap:12px;align-items:center;margin:4px 0 12px}.gate .meta{display:block;margin-top:4px}img.pav{width:48px;height:48px;border-radius:10px;image-rendering:pixelated;flex:none}img.av.pav{width:44px;height:44px}\n'
h=open('head.html',encoding='utf-8').read().replace('◐ v3.0','◐ v5.0').replace('<main class="card enter" id="view"></main>','<div class="card world" id="world"><canvas id="map" role="img" aria-label="病房地圖：可以走動的角色扮演場景"></canvas></div>\n      <main class="card enter" id="view"></main>').replace('</style>',CSS+'</style>',1).replace('<button id="theme">◐ 畫面明暗</button>','<button id="theme">◐ 畫面明暗</button>\n    <button id="login" hidden>☁ 用 Google 登入</button>').replace('PGY 職前加油站 ↗','PGY學院 ↗').replace('<a id="gas" hidden','<a href="https://endoclass.drtsengshihting.com/" target="_blank" rel="noopener">內分泌代謝實證教室 ↗</a>\n      <a id="gas" hidden')

# 以光田綜合醫院為藍圖：虛構的「光甜綜合醫院」，各科人物名字用科別諧音
KT_HOSP = [('{id:"mc",n:"呆丸大學附設醫院",kind:"醫學中心｜北部"', '{id:"mc",n:"光甜綜合醫院・香尚總院",kind:"總院｜臺中海線"'),
  ('{id:"rg",n:"港灣區域教學醫院",kind:"區域醫院｜南部"', '{id:"rg",n:"光甜綜合醫院・大佳院區",kind:"院區｜海線北端"'),
  ('{id:"rr",n:"山海地區教學醫院",kind:"地區醫院｜東部"', '{id:"rr",n:"光甜綜合醫院・通笑院區",kind:"院區｜山海之間"')]
for a,b in KT_HOSP:
    assert d.count(a)==1, a; d = d.replace(a,b)
KT_PUN = {"wang":"急診","lee":"兒科","tsai":"婦產","shih":"老年","cheng":"藥師","zhang":"內科","ouyang":"外科","lin":"護理"}
for k,p in KT_PUN.items():
    m = re.search(r'\n  '+k+r':\s*\{n:"[^"]*",[^}]*?desc:"', d)
    assert m, k
    d = d[:m.end()] + '名字諧音「'+p+'」。' + d[m.end():]
KT_NAMES = [("歐陽晉","歐陽偉柯"),("雅筑","乃珂"),("振宏","護禮"),("王宛如","王季真"),("李國棟","李爾柯"),("蔡文淵","蔡富燦"),("施雨萱","施樂年"),("鄭宇安","鄭耀詩")]
for a,b in KT_NAMES:
    d = d.replace(a,b); e = e.replace(a,b)
k3 = '以下三家醫院與廣告均為虛構，只借用說明會的格式。'
assert e.count(k3)==1; e = e.replace(k3, '以下以光田綜合醫院為藍圖，改成諧音的虛構「光甜綜合醫院」三個院區；廣告內容均為虛構，只借用說明會的格式。')
e = e.replace('<h2>選擇你的訓練醫院</h2>','<h2>選擇你的訓練院區</h2>')
MCREDIT = '<p class="foot">背景音樂：FreePD.com 公眾領域（CC0）曲目，每個科別一首。Slice of Life、Gotta Keep On Movin、Busybody、Inventing Flight（Bryan Teoh）；Kalimba Relaxation Music、Wisdom in the Sun、Still Pickin（Kevin MacLeod）；Happy Whistling Ukulele、Hopeful（Rafael Krux）；Journey of Hope（Alexander Nakarada）；Rush、Travelers Notebook、Inspiration。</p>'
_k = '臨床處置請以最新指引與院內規範為準。</p>'
assert h.count(_k)==1; h = h.replace(_k, _k + '\n  ' + MCREDIT)
assert h.count('醫院與人物皆為虛構')==1; h = h.replace('醫院與人物皆為虛構','醫院與人物皆為虛構（以光田綜合醫院為藍圖，院名與各科人物名字採諧音）')
for a,b2 in [x.split('|||') for fn in ('gender.txt','coffee.txt','polish.txt','polish2.txt','polish3.txt','polish4.txt','polish5.txt') for x in open(fn,encoding='utf-8').read().strip().split('\n@@@\n')]:
    n=[d.count(a),e.count(a),h.count(a)]; assert sum(n)==1,(a[:60],n)
    if n[0]: d=d.replace(a,b2)
    elif n[1]: e=e.replace(a,b2)
    else: h=h.replace(a,b2)
for a,_ in KT_NAMES: assert a not in d+e, a
out=h+'\n<script>\n"use strict";\n'+d+'\n'+e+'</script>\n'
open('/mnt/project-files/pgy-rpg/index.html','w',encoding='utf-8').write(out)
open('test.html','w',encoding='utf-8').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+out+'</body></html>')
assert 'drive.google' not in out
print('built',len(out))

# 公開網站版（GitHub Pages）：完整 HTML，並填入 Firebase 設定
import json, os
fb = json.load(open('fbconfig.json')) if os.path.exists('fbconfig.json') else None
pub = out.replace('const FB_CONFIG = null;', 'const FB_CONFIG = '+json.dumps(fb)+';') if fb else out
SITE='https://tsn4830-ui.github.io/pgy-rpg/'
DESC='台灣 PGY 醫師兩年訓練的像素角色扮演遊戲：值班、報告、錄音家屬、主任查房，每一道臨床題都附參考文獻。手機、電腦都能玩，免費。'
HEAD=('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
 '<title>呆丸 PGY 物語｜台灣 PGY 醫師生存 RPG</title>'
 f'<meta name="description" content="{DESC}"><link rel="canonical" href="{SITE}">'
 '<meta name="theme-color" content="#2c6e5c"><link rel="manifest" href="manifest.webmanifest">'
 '<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png"><link rel="apple-touch-icon" href="apple-touch-icon.png">'
 '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="PGY 物語">'
 f'<meta property="og:type" content="website"><meta property="og:site_name" content="呆丸 PGY 物語"><meta property="og:title" content="呆丸 PGY 物語｜台灣 PGY 醫師生存 RPG">'
 f'<meta property="og:description" content="{DESC}"><meta property="og:url" content="{SITE}"><meta property="og:image" content="{SITE}og.png">'
 '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:locale" content="zh_TW">'
 f'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="{SITE}og.png">')
SW='<script>if("serviceWorker" in navigator && location.protocol==="https:"){addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}</script>'
html = '<!doctype html>\n<html lang="zh-Hant"><head>'+HEAD+'</head><body>\n'+pub+'\n'+SW+'\n</body></html>\n'
os.makedirs('/mnt/project-files/pgy-rpg/deploy/pgy', exist_ok=True)
open('/mnt/project-files/pgy-rpg/deploy/pgy/index.html','w',encoding='utf-8').write(html)
open('standalone.html','w',encoding='utf-8').write(html)
print('standalone', len(html), 'firebase' if fb else 'no-firebase')
