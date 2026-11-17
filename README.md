# RAG 入門：讓 AI 查資料再回答

以 6 篇第一手論文摘要與書目建立 8 個互連 Wiki 頁面，再由 Wiki 整理成 15 頁教學 HTML 簡報。

- [教學簡報](https://zgx75.github.io/rag-wiki/#slides/1)
- [LLM Wiki](https://zgx75.github.io/rag-wiki/#wiki)
- [流程圖](https://zgx75.github.io/rag-wiki/#flow)
- [執行紀錄與反思](https://zgx75.github.io/rag-wiki/#report)
- [完整繳交說明](submission.md)

網站入口需於 Settings → Pages 啟用 main 分支、根目錄 / 後使用。也可下載 index.html 直接離線閱讀。

## 成果對照

| 資料夾或檔案 | 內容 |
| --- | --- |
| index.html | 單檔 HTML，含簡報、Wiki、來源與流程 |
| wiki/ | 8 個互連概念頁 |
| source-notes/ | 6 份來源筆記，保留來源網址與限制 |
| planning.md | 生成前討論與主題選擇 |
| logs/ | 執行與檢查紀錄 |
| reproduce/ | 可重跑的 Node.js 程式 |
| workflow.mmd | 可編輯流程圖 |

13 項結構檢查與 35 項 Node VM 渲染、互動邏輯檢查通過。原始瀏覽器視覺驗證未完成；通過程式檢查不等同通過實際瀏覽器檢查。四個語意邊界案例是受控測試，並非自然錯誤率。

AI 協助閱讀摘要、整理 Wiki、生成 HTML 與查核。搜尋採關鍵詞匹配，網站不呼叫線上 LLM，也沒有向量資料庫。
