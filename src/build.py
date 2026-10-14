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
RPG=[
('/* ======================= 啟動 ======================= */', open('rpg.js',encoding='utf-8').read()+'\n/* ======================= 啟動 ======================= */'),
('function start(){ S = null; titleScreen(); }','function start(){ S = null; titleScreen(); }\nworldInit();'),
('function step(s, st){\n  const head = (S.step===0) ? stageBanner(st) : "";','function step(s, st){\n  worldSync();\n  gate(s.t==="night" ? "kui" : s.who, (S.step===0) ? stageBanner(st) : "", () => step0(s, st));\n}\nfunction step0(s, st){\n  const head = (S.step===0) ? stageBanner(st) : "";'),
('function run(){\n  if(S.stage<0) return chooseHospital();','function run(){\n  worldSync();\n  if(S.stage<0) return chooseHospital();'),
('function av(id){ const c','function av(id){ if(id!=="sys" && LOOK[id]) return `<img class="av pav" src="${portrait(id)}" alt="">`; const c'),
]
GAS += RPG
for a,c in GAS:
    assert e.count(a)==1,a[:60]; e=e.replace(a,c)
assert e.count('S.total++; if(ok) S.right++;')==2
e=e.replace('S.total++; if(ok) S.right++;','S.total++; if(ok) S.right++; worldReact(ok);')
assert e.count('Object.values(SITES).filter(s=>s.u)')==2
e=e.replace('Object.values(SITES).filter(s=>s.u)','Object.values(SITES).filter(s=>s.u&&!s.hide)')
CSS='.world{padding:0;overflow:hidden;background:#1b2427}#map{display:block;width:100%;height:auto;cursor:pointer;touch-action:manipulation}.gate{display:flex;gap:12px;align-items:center;margin:4px 0 12px}.gate .meta{display:block;margin-top:4px}img.pav{width:48px;height:48px;border-radius:10px;image-rendering:pixelated;flex:none}img.av.pav{width:44px;height:44px}\n'
h=open('head.html',encoding='utf-8').read().replace('◐ v3.0','◐ v5.0').replace('<main class="card enter" id="view"></main>','<div class="card world" id="world"><canvas id="map" role="img" aria-label="病房地圖：可以走動的角色扮演場景"></canvas></div>\n      <main class="card enter" id="view"></main>').replace('</style>',CSS+'</style>',1).replace('<button id="theme">◐ 畫面明暗</button>','<button id="theme">◐ 畫面明暗</button>\n    <button id="login" hidden>☁ 用 Google 登入</button>').replace('<a id="gas" hidden','<a href="https://endoclass.drtsengshihting.com/" target="_blank" rel="noopener">內分泌代謝實證教室 ↗</a>\n      <a id="gas" hidden')
out=h+'\n<script>\n"use strict";\n'+d+'\n'+e+'</script>\n'
open('/mnt/project-files/pgy-rpg/index.html','w',encoding='utf-8').write(out)
open('test.html','w',encoding='utf-8').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+out+'</body></html>')
print('built',len(out))

# 公開網站版（GitHub Pages）：完整 HTML，並填入 Firebase 設定
import json, os
fb = json.load(open('fbconfig.json')) if os.path.exists('fbconfig.json') else None
pub = out.replace('const FB_CONFIG = null;', 'const FB_CONFIG = '+json.dumps(fb)+';') if fb else out
html = '<!doctype html>\n<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="臺灣 PGY 兩年訓練的角色扮演遊戲，每題附參考文獻。"></head><body>\n'+pub+'\n</body></html>\n'
os.makedirs('/mnt/project-files/pgy-rpg/deploy/pgy', exist_ok=True)
open('/mnt/project-files/pgy-rpg/deploy/pgy/index.html','w',encoding='utf-8').write(html)
open('standalone.html','w',encoding='utf-8').write(html)
print('standalone', len(html), 'firebase' if fb else 'no-firebase')
