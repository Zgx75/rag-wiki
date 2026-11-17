// 在 Node VM 執行離線 HTML 的路由與互動邏輯；不是瀏覽器或視覺測試。
import fs from 'node:fs';import vm from 'node:vm';
const html=fs.readFileSync('dist/index.html','utf8');const script=html.match(/<script>([\s\S]*)<\/script>/)[1];const main={innerHTML:''};let title='';const handlers={};const ctx={console,location:{hash:'#home'},document:{querySelector:s=>s==='#main'?main:null,querySelectorAll:()=>[],getElementById:()=>null,set title(t){title=t},get title(){return title}},window:{scrollTo(){},addEventListener:(t,fn)=>handlers[t]=fn},setTimeout(){}};
vm.createContext(ctx);vm.runInContext(script,ctx);
const checks=[];function check(name,ok){checks.push({name,status:ok?'pass':'fail'});}
check('首頁字串渲染',main.innerHTML.includes('有跡')||main.innerHTML.includes('跡可循'));
for(let i=1;i<=15;i++){ctx.location.hash=`#slides/${i}`;vm.runInContext('render()',ctx);check(`投影片 P${String(i).padStart(2,'0')} 字串渲染`,main.innerHTML.includes(`aria-label="P${String(i).padStart(2,'0')}`)&&main.innerHTML.includes('slide-evidence'));}
for(let i=1;i<=8;i++){ctx.location.hash=`#wiki/W${String(i).padStart(2,'0')}`;vm.runInContext('render()',ctx);check(`Wiki W${String(i).padStart(2,'0')} 字串渲染`,main.innerHTML.includes('wiki-article')&&main.innerHTML.includes('原始來源'));}
for(const route of ['wiki','flow','report','sources']){ctx.location.hash='#'+route;vm.runInContext('render()',ctx);check(`${route} 頁面渲染`,main.innerHTML.length>1000);}
check('關鍵詞搜尋可取得結果',vm.runInContext("searchResults('引用').includes('W05')",ctx));
check('無結果不生成內容',vm.runInContext("searchResults('zzzz-no-such-concept').includes('找不到符合')",ctx));
check('測驗答對回饋',vm.runInContext("quizAt=0;quizAnswers[0]=1;quizHTML().includes('答對了')",ctx));
check('測驗答錯回饋',vm.runInContext("quizAnswers[0]=0;quizHTML().includes('再看一次證據')",ctx));
ctx.location.hash='#slides/3';handlers.keydown({key:'ArrowRight',target:{tagName:'DIV'},preventDefault(){}});check('方向鍵路由邏輯',ctx.location.hash==='slides/4');
ctx.location.hash='#slides/6';handlers.keydown({key:'ArrowRight',target:{tagName:'INPUT'},preventDefault(){}});check('輸入欄不攔截方向鍵',ctx.location.hash==='#slides/6');
check('使用者文字 HTML escaping',vm.runInContext("esc('<img onerror=alert(1)>').includes('&lt;img')",ctx));
const result={at:new Date().toISOString(),type:'Node VM 字串渲染與互動邏輯，非瀏覽器視覺檢查',passed:checks.filter(x=>x.status==='pass').length,total:checks.length,checks};fs.writeFileSync('logs/render-check.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));if(result.passed!==result.total)process.exitCode=1;
