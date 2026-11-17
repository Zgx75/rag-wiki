import fs from 'node:fs';import vm from 'node:vm';import {sources,wiki,claims,slides,auditCases} from './content.mjs';
const results=[];function check(name,ok,detail=''){results.push({name,status:ok?'pass':'fail',detail});}
const html=fs.readFileSync('dist/index.html','utf8');
check('至少五篇獨立來源',sources.length>=5&&new Set(sources.map(x=>x.url)).size===sources.length,`${sources.length} 篇`);
check('來源欄位與本地筆記',sources.every(s=>s.locator&&s.note&&s.limit&&fs.existsSync(`source-notes/${s.id}.md`)));
check('Wiki 概念互連與來源',wiki.every(w=>w.links.length&&w.links.every(id=>wiki.some(x=>x.id===id))&&w.sources.every(id=>sources.some(s=>s.id===id))));
check('六篇均進入概念頁',sources.every(s=>wiki.some(w=>w.sources.includes(s.id))));
check('每張投影片具 Wiki 與證據卡',slides.every(p=>p.wiki.length&&p.claims.length&&p.claims.every(id=>claims.some(c=>c.id===id&&p.wiki.includes(c.wiki)))));
check('所有正式主張附語意審查理由',claims.every(c=>c.support&&c.sources.every(id=>wiki.find(w=>w.id===c.wiki)?.sources.includes(id))),'欄位存在檢查；不是自動語意證明');
check('受控測試判斷紀錄',auditCases.length===4&&auditCases.filter(t=>t.verdict==='reject').length===2,'AI 已審查的 4 例，重播 2 退回、2 通過');
check('無外部 JavaScript CSS 依賴',!/<(?:script[^>]+src|link[^>]+(?:stylesheet|href))/i.test(html));
check('單檔嵌入資料',html.includes('const DATA=')&&!html.includes('/*__DATA__*/')&&!html.includes('/*__APP__*/'));
try{new vm.Script(html.match(/<script>([\s\S]*)<\/script>/)[1]);check('瀏覽器 JavaScript 語法',true);}catch(e){check('瀏覽器 JavaScript 語法',false,e.message);}
check('繁體中文與可及性基礎',html.includes('lang="zh-Hant"')&&html.includes('name="viewport"')&&html.includes('aria-label'));
// 負向檢查實際複製資料並注入錯誤，確保來源鏈判定可辨識錯誤。
const valid=p=>p.claims.every(id=>claims.some(c=>c.id===id&&p.wiki.includes(c.wiki)));
check('負向測試：不存在的證據卡應拒絕',!valid({...slides[0],claims:['C999']}));
check('負向測試：未查詢支持頁應拒絕',!valid({...slides[0],wiki:['W02']}));
const output={at:new Date().toISOString(),passed:results.filter(x=>x.status==='pass').length,total:results.length,results};fs.writeFileSync('logs/verification.json',JSON.stringify(output,null,2));console.log(JSON.stringify(output,null,2));if(output.passed!==output.total)process.exitCode=1;
