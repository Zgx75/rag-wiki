# RAG 入門：讓 AI 查資料再回答

繳交標題：政大 ［學號於繳交平台填寫］ 資管四 ［姓名於繳交平台填寫］ RAG 入門：讓 AI 查資料再回答

## 1. LLM Wiki 主題與簡短介紹

這份 Wiki 為初學者介紹 RAG（檢索增強生成），用虛構校園公告說明 AI 如何先取得相關資料，再根據資料整理回答。教學重點包含檢索與生成的區別、引用支持關係、長上下文限制，以及遇到錯誤時如何回退。

本作業的 LLM Wiki 採用「LLM 協助整理、持久保存、概念互連、來源可追溯」的工作定義。生成前先提出三個方向，使用者選擇 RAG 入門後，才依主題建立內容。選題與教學規格記在 planning.md。

## 2. LLM Wiki 連結與成果

- Wiki：https://zgx75.github.io/rag-wiki/#wiki
- 本地成果：wiki/INDEX.md，包含 8 個概念頁。
- 離線閱讀：解壓縮後，以瀏覽器開啟 index.html，選「LLM Wiki」。
- 來源筆記：source-notes/S01.md 至 S06.md。

實際 ingest 六篇獨立第一手論文的「摘要與書目」，不是論文全文。AI 讀取原始頁後，整理來源筆記、適用範圍與證據位置，再綜整 Wiki。程式保存筆記雜湊及編號連結；雜湊只識別筆記版本，不證明內容正確。

| 編號 | 原始資料 | 對應 Wiki |
| --- | --- | --- |
| S01 | [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)，Lewis et al. · NeurIPS 2020 | W01、W04 |
| S02 | [Dense Passage Retrieval for Open-Domain Question Answering](https://aclanthology.org/2020.emnlp-main.550/)，Karpukhin et al. · EMNLP 2020 | W03 |
| S03 | [Enabling Large Language Models to Generate Text with Citations](https://aclanthology.org/2023.emnlp-main.398/)，Gao et al. · EMNLP 2023 | W04、W05、W07 |
| S04 | [Lost in the Middle: How Language Models Use Long Contexts](https://aclanthology.org/2024.tacl-1.9/)，Liu et al. · TACL 2024 | W06 |
| S05 | [RAGAs: Automated Evaluation of Retrieval Augmented Generation](https://aclanthology.org/2024.eacl-demo.16/)，Es et al. · EACL Demo 2024 | W07 |
| S06 | [Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection](https://arxiv.org/abs/2310.11511)，Asai et al. · arXiv 2023 | W08 |

## 3. 教學 HTML 簡報連結

https://zgx75.github.io/rag-wiki/#slides/1

共 15 頁：問題情境、學習目標、RAG 概念、Wiki 的角色、來源匯入、檢索示範、校園案例、引用查核、長上下文限制、分層評估、三題測驗、流程、執行、反思與回顧。每張投影片都有 Wiki、證據卡與原始來源編號，可點擊回查。

本次另以 GitHub Pages 提供網站入口；發布狀態以儲存庫 Pages 設定顯示為準。離線版仍可直接開啟。開啟 index.html 即可閱讀，無須安裝套件，只有論文原始連結需要網路。

## 4. loop / graph 的流程

取得資料 → 檢查可讀性與欄位 → 匯入來源筆記 → 綜整 Wiki → 依教學目標查 Wiki → 整理主張與證據卡 → 檢查支持與適用範圍 → 產生 HTML → 檢查顯示與互動 → 保存成果。

- 取得失敗：回到取得資料，改用同一篇論文的第一手備援版本，核對標題與作者。
- 證據不足：回到 Wiki 查詢，補相關來源；仍不足則刪除主張或標記資料不足。
- 說法過廣：回到主張整理，縮小到來源支持的模型、任務與條件，再檢查。
- 顯示或互動失敗：回到 HTML 輸出，修正後重新檢查。
- 設計停止條件：每類最多修正兩輪，仍未解決則記錄並移除不受支持的內容。這是設計規則，本次沒有聲稱已完整自動化重試器。

網站的「工作流程」頁包含可直接看的流程圖；workflow.mmd 提供 Mermaid 原始碼。

## 5. 一次實際執行與檢查紀錄

執行時間：2026-11-17T16:25:26.054Z（UTC）；作業查閱日為臺北時間 2026-11-18。

| 節點或檢查 | 實際觀察 | 紀錄 |
| --- | --- | --- |
| 取得來源 | Self-RAG 會議頁讀取逾時，改讀作者 arXiv 頁後成功 | logs/acquisition.json |
| 來源匯入與 Wiki 綜整 | 6 筆來源、8 個概念頁、6 張證據卡 | logs/run.json、source-notes/、wiki/ |
| 結構、來源鏈與語法 | 13/13 項通過，含兩個注入錯誤的負向測試 | logs/verification.json |
| Node VM 文字渲染與互動邏輯 | 35/35 項通過 | logs/render-check.json |
| 主張語意邊界案例 | 2 項過度概括退回，2 項有依據重述通過 | logs/claim-review.json |
| 瀏覽器視覺驗證 | 未完成，預覽連線與分頁建立受環境限制 | logs/browser-check.json |

四個邊界案例為明確設計的受控測試。AI 逐一對照摘要後記錄判斷理由，腳本重播判斷；這不是外部語意評估模型，也不是自然錯誤率。

被退回的兩個說法是：「有引用就一定正確」與「所有 LLM 都無法使用長上下文中段資訊」。修正分別為：正確性與引用品質要分別檢查；位置效應只描述原研究受測設定。逐頁來源對照保存在 logs/provenance.json。

程式測試通過不代表瀏覽器視覺已通過。手機實機、全螢幕與列印預覽尚未驗證。

## 6. 反思與調整

**哪個節點最常出錯？** 本次實際取得來源遇到一次讀取逾時。受控案例中，兩項退回都發生在「主張整理」，問題是把局部結果擴張成保證。對長期最常出錯的節點：【資料不足，無法確認】。單次執行與四個受控案例不足以推估長期頻率。

**發現問題後，把檢查往前移到哪裡？** 初版已把支持與適用範圍檢查放在證據卡整理後、HTML 生成前。本次新增調整是：在 ingest 前檢查來源可讀性與備援版本，先核對標題與作者再匯入。

**有沒有修改 workflow / graph？為什麼？** 有。在原本的證據與顯示檢查之外，加入來源可讀性與同篇備援版本的回退。實際讀取失敗使用同篇第一手備援版本；兩個過度概括案例則先縮小主張，再進入簡報。這次沒有量測節省工時或準確率提升。

## 實作與協作說明

本作業由 AI 協助閱讀來源、整理 Wiki、撰寫教學文字、產生 HTML 與進行查核。網頁內的搜尋是關鍵詞匹配。Wiki 是生成簡報時使用的知識來源，網頁本身不會呼叫線上 LLM，也沒有部署向量資料庫。Self-RAG 只提供流程設計的概念參考，沒有重現其訓練模型。

使用 Node.js 重跑：在 reproduce 資料夾依序執行 node build.mjs、node verify.mjs、node check-app.mjs、node server.mjs。開啟 http://127.0.0.1:4187。重跑只重新匯入已整理筆記、生成 HTML 與檢查結構，不會重新瀏覽來源或執行新的語意審查。
