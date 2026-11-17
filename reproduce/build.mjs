import fs from 'node:fs';
import crypto from 'node:crypto';
import {brief,sources,wiki,claims,auditCases,slides} from './content.mjs';
const dirs=['dist','wiki','source-notes','logs'];dirs.forEach(d=>fs.mkdirSync(d,{recursive:true}));
const events=[];const log=(node,status,detail)=>events.push({at:new Date().toISOString(),node,status,detail});
log('plan','pass','依作業需求完成範圍與教學目標規劃；見 planning.md。');
fs.writeFileSync('planning.md','# 生成前的範圍討論\n\n'+brief.discussion.map(x=>`## ${x.speaker}\n\n${x.text}`).join('\n\n')+'\n\n受眾：'+brief.audience+'\n\n界線：'+brief.scope+'\n');
for(const s of sources){
 if(!s.url.startsWith('https://')||!s.locator||!s.note||!s.limit)throw Error('來源欄位不完整 '+s.id);
 const hash=crypto.createHash('sha256').update(JSON.stringify(s)).digest('hex');
 fs.writeFileSync(`source-notes/${s.id}.md`,`# ${s.title}\n\n- 編號：${s.id}\n- 作者：${s.authors}\n- 出版：${s.venue}\n- 來源：${s.url}\n- 查閱日期：2026-11-18（Asia/Taipei）\n- 匯入範圍：摘要與書目，非全文\n- 證據位置：${s.locator}\n- 筆記 SHA-256：${hash}\n\n## AI 重述筆記\n\n${s.note}\n\n## 適用範圍與限制\n\n${s.limit}\n\n## 概念連結\n\n${s.concepts.map(id=>`[${id}](../wiki/${id}.md)`).join('、')}\n`);
 log('ingest','pass',{id:s.id,title:s.title,scope:'abstract_and_bibliography',sha256:hash});
}
for(const w of wiki){
 if(w.sources.some(id=>!sources.find(s=>s.id===id))||w.links.some(id=>!wiki.find(p=>p.id===id)))throw Error('Wiki 懸空連結 '+w.id);
 fs.writeFileSync(`wiki/${w.id}.md`,`# ${w.title}\n\n${w.summary}\n\n`+w.blocks.map(([h,t])=>`## ${h}\n\n${t}`).join('\n\n')+`\n\n## 原始資料\n\n${w.sources.length?w.sources.map(id=>`[${id}](../source-notes/${id}.md)`).join('、'):'本作業的操作定義與設計規格，無外部研究主張。'}\n\n## 相關概念\n\n${w.links.map(id=>`[${wiki.find(p=>p.id===id).title}](${id}.md)`).join('、')}\n`);
 log('wiki_synthesis','pass',{id:w.id,sources:w.sources,links:w.links});
}
for(const c of claims){const w=wiki.find(x=>x.id===c.wiki);if(!w||c.sources.some(s=>!w.sources.includes(s))||!c.support)throw Error('證據鏈錯誤 '+c.id);log('claim_gate','pass',{claim:c.id,wiki:c.wiki,sources:c.sources,mode:'AI_review_annotation_replayed',reason:c.support});}
for(const a of auditCases){log('controlled_boundary_test',a.verdict,{...a,mode:'AI 在本次會話已審查；腳本重播判斷，不是自動語意模型'});if(a.verdict==='reject')log('revision_route','pass',{test:a.id,route:'主張整理 → 查 Wiki 與來源範圍 → 縮小主張 → 證據閘門',repair:a.repair,max_revisions:2});}
for(const p of slides){
 for(const id of p.wiki)if(!wiki.find(w=>w.id===id))throw Error('投影片 Wiki 不存在 '+p.id);
 for(const id of p.claims){const c=claims.find(c=>c.id===id);if(!c||!p.wiki.includes(c.wiki))throw Error('投影片證據不在已查詢頁 '+p.id+' '+id);}
 log('wiki_query','pass',{slide:p.id,queried_pages:p.wiki,evidence_cards:p.claims,method:'依教學大綱指定概念頁，不把關鍵詞搜尋冒稱向量檢索'});
}
const actualFailure=fs.existsSync('logs/actual-failures.json')?JSON.parse(fs.readFileSync('logs/actual-failures.json','utf8')):null;
const browserCheck=fs.existsSync('logs/browser-check.json')?JSON.parse(fs.readFileSync('logs/browser-check.json','utf8')):null;
log('html_generate','pass','生成單檔 HTML；包含 Wiki、十五頁簡報、流程圖、反思與來源對照。');
const data={brief,sources,wiki,claims,auditCases,slides,actualFailure,browserCheck,run:{started:events[0].at,completed:new Date().toISOString(),sourceCount:sources.length,wikiCount:wiki.length,slideCount:slides.length,claimCount:claims.length,boundaryCount:auditCases.length,rejected:auditCases.filter(x=>x.verdict==='reject').length,events}};
const shell=fs.readFileSync('shell.html','utf8');const css=fs.readFileSync('style.css','utf8');const js=fs.readFileSync('app.js','utf8');
const html=shell.replace('/*__STYLE__*/',css).replace('/*__DATA__*/',`const DATA=${JSON.stringify(data).replaceAll('<','\\u003c')};`).replace('/*__APP__*/',js);
fs.writeFileSync('dist/index.html',html);fs.writeFileSync('logs/run.json',JSON.stringify(data.run,null,2));fs.writeFileSync('logs/claim-review.json',JSON.stringify({method:'本次 AI 逐卡審查摘要與書目；未執行外部語意判定模型',claims,auditCases},null,2));
fs.writeFileSync('wiki/INDEX.md','# RAG LLM Wiki\n\n'+wiki.map(w=>`- [${w.id} ${w.title}](${w.id}.md)`).join('\n')+'\n');
fs.writeFileSync('logs/provenance.json',JSON.stringify(slides.map(p=>({slide:p.id,title:p.title,wiki:p.wiki,claims:p.claims,sources:[...new Set(p.claims.flatMap(id=>claims.find(c=>c.id===id).sources))]})),null,2));
fs.writeFileSync('workflow.mmd',`flowchart TD\n A[取得資料] --> B{來源可讀性與欄位}\n B -- 失敗或不完整 --> A\n B -- 通過 --> C[匯入筆記與綜整 Wiki]\n C --> D[依教學目標查 Wiki]\n D --> E[整理主張與證據卡]\n E --> F{支持與範圍審查}\n F -- 證據不足 --> D\n F -- 說法過廣 --> E\n F -- 通過 --> G[產生 HTML 簡報]\n G --> H{操作與顯示檢查}\n H -- 失敗 --> G\n H -- 通過 --> I[發布成果與執行紀錄]\n`);
data.run.events=events;fs.writeFileSync('logs/run.json',JSON.stringify(data.run,null,2));
console.log(JSON.stringify({sources:sources.length,wiki:wiki.length,claims:claims.length,slides:slides.length,boundaryTests:auditCases.length,boundaryRejected:data.run.rejected,output:'dist/index.html'}));
