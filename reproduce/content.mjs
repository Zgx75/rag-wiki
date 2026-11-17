// 本次對話經使用者選題後，由 AI 閱讀六篇第一手摘要與書目整理。
export const brief={
  "topic": "RAG 入門：讓 AI 查資料再回答",
  "audience": "第一次接觸 RAG 的大學生",
  "goals": [
    "用自己的話解釋 RAG",
    "分辨檢索失敗與生成失敗",
    "檢查引用是否支持回答"
  ],
  "scope": "用校園問答說明基礎概念、檢索與證據追溯；不提供真實校務規章。",
  "discussion": [
    {
      "speaker": "AI 主題與範圍提案",
      "text": "以你做過的 RAG 專案為背景，建議 RAG 入門，用校園問答說明檢索、生成與引用，以六篇原始論文建立 Wiki。其他選項是 AI Agents 入門與 LLM 幻覺查核。"
    },
    {
      "speaker": "使用者選擇（生成前）",
      "text": "使用者於本次對話的主題選單選擇「RAG 入門（Recommended）」。"
    },
    {
      "speaker": "採用的教學規格",
      "text": "對象為初學者。先閱讀六篇第一手論文的摘要與書目，建立來源筆記與八個概念頁，再從 Wiki 產生十五頁 HTML 簡報。保留來源對照、流程、實際紀錄與反思。"
    },
    {
      "speaker": "生成前檢查重點",
      "text": "研究主張必須回到原始來源，虛構校園公告須明確標示。結構檢查與語意審查分開；四個邊界案例屬受控測試，不當成自然錯誤率。"
    }
  ]
};
export const sources=[
  {
    "id": "S01",
    "short": "Lewis et al. · NeurIPS 2020",
    "title": "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    "url": "https://arxiv.org/abs/2005.11401",
    "year": 2020,
    "venue": "NeurIPS 2020；arXiv v4 修訂於 2021",
    "authors": "Patrick Lewis et al.",
    "locator": "arXiv Abstract，關於 parametric / non-parametric memory 的句子",
    "note": "RAG 將參數式語言模型與外部非參數式記憶結合；原論文使用 Wikipedia 稠密向量索引與神經檢索器。",
    "limit": "原始 RAG 有特定訓練配方；本作業的查資料比喻用來入門，不等同重現原模型。",
    "concepts": [
      "W01",
      "W04"
    ],
    "checkedDate": "2026-11-18"
  },
  {
    "id": "S02",
    "short": "Karpukhin et al. · EMNLP 2020",
    "title": "Dense Passage Retrieval for Open-Domain Question Answering",
    "url": "https://aclanthology.org/2020.emnlp-main.550/",
    "year": 2020,
    "venue": "EMNLP 2020",
    "authors": "Vladimir Karpukhin et al.",
    "locator": "ACL Abstract，第一段的 dual-encoder framework",
    "note": "DPR 以雙編碼器學習問題與段落的稠密表示，利用表示進行段落檢索。",
    "limit": "段落檢索的相似性與最終回答正確性是不同問題；論文結果有指定資料集與比較基準。",
    "concepts": [
      "W03"
    ],
    "checkedDate": "2026-11-18"
  },
  {
    "id": "S03",
    "short": "Gao et al. · EMNLP 2023",
    "title": "Enabling Large Language Models to Generate Text with Citations",
    "url": "https://aclanthology.org/2023.emnlp-main.398/",
    "year": 2023,
    "venue": "EMNLP 2023",
    "authors": "Tianyu Gao, Howard Yen, Jiatong Yu, Danqi Chen",
    "locator": "ACL Abstract，第二段的 fluency, correctness, citation quality",
    "note": "ALCE 將含引用文字的評估拆成流暢度、正確性與引用品質；引用需要對應支持內容。",
    "limit": "附上引用本身不是正確性的證明；本作業沒有重跑 ALCE 基準。",
    "concepts": [
      "W04",
      "W05",
      "W07"
    ],
    "checkedDate": "2026-11-18"
  },
  {
    "id": "S04",
    "short": "Liu et al. · TACL 2024",
    "title": "Lost in the Middle: How Language Models Use Long Contexts",
    "url": "https://aclanthology.org/2024.tacl-1.9/",
    "year": 2024,
    "venue": "TACL 12, 157–173",
    "authors": "Nelson F. Liu et al.",
    "locator": "ACL Abstract，第一及第二段的任務與位置效應",
    "note": "在論文的多文件問答與鍵值檢索測試中，相關資訊的位置影響受測模型表現；資訊位於長上下文中段時表現下降。",
    "limit": "不能由此宣稱所有模型、任務和長度都有相同結果；本作業使用正式出版年 2024，預印本為 2023。",
    "concepts": [
      "W06"
    ],
    "checkedDate": "2026-11-18"
  },
  {
    "id": "S05",
    "short": "Es et al. · EACL Demo 2024",
    "title": "RAGAs: Automated Evaluation of Retrieval Augmented Generation",
    "url": "https://aclanthology.org/2024.eacl-demo.16/",
    "year": 2024,
    "venue": "EACL 2024, System Demonstrations",
    "authors": "Shahul Es, Jithin James, Luis Espinosa Anke, Steven Schockaert",
    "locator": "ACL Abstract，第一至第三段的評估面向",
    "note": "RAGAs 提出無參考答案的 RAG 評估框架，關注檢索情境、忠實使用情境與生成品質等面向。",
    "limit": "自動評估的分數不等同人工確認所有事實。本作業未安裝或執行 RAGAs。",
    "concepts": [
      "W07"
    ],
    "checkedDate": "2026-11-18"
  },
  {
    "id": "S06",
    "short": "Asai et al. · arXiv 2023",
    "title": "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection",
    "url": "https://arxiv.org/abs/2310.11511",
    "year": 2023,
    "venue": "arXiv 預印本 2310.11511（2023）",
    "authors": "Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi",
    "locator": "arXiv Abstract，第三段的 reflection tokens",
    "note": "Self-RAG 以訓練過的反思 token，讓模型按需檢索，並反思取得的段落與生成內容。",
    "limit": "在普通提示詞加上請反思，不等同實作 Self-RAG；本作業只借鏡檢查與回退的設計概念。",
    "concepts": [
      "W08"
    ],
    "checkedDate": "2026-11-18"
  }
];
export const wiki=[
  {
    "id": "W01",
    "title": "RAG 是什麼？",
    "tag": "起點",
    "summary": "把外部資料帶入生成過程，讓回答能依據取得的內容。",
    "sources": [
      "S01"
    ],
    "links": [
      "W02",
      "W03",
      "W04"
    ],
    "blocks": [
      [
        "核心概念",
        "RAG 是 Retrieval-Augmented Generation，中文為檢索增強生成。入門可把它理解為先找到相關資料，再把問題與資料一起交給語言模型。原始研究結合參數式與非參數式記憶。"
      ],
      [
        "教學比喻（本作業設計）",
        "像開書考試：查到正確章節後，仍要讀懂題目並寫對答案。開書不是滿分保證。"
      ],
      [
        "辨識界線",
        "本成果是一個以 LLM 整理的 Wiki 與教學簡報；網頁本身沒有呼叫線上 LLM，也沒有部署向量資料庫。"
      ]
    ]
  },
  {
    "id": "W02",
    "title": "LLM Wiki 如何建立？",
    "tag": "資料整理",
    "summary": "將來源轉成可更新、可連結、可追溯的知識頁。",
    "sources": [],
    "links": [
      "W01",
      "W05",
      "W08"
    ],
    "blocks": [
      [
        "本作業定義",
        "LLM Wiki 指由 LLM 協助整理的持久知識頁；這是本作業採用的工作定義。它不等同把網址存進清單。"
      ],
      [
        "Ingest 規格",
        "讀取六篇第一手論文的摘要與書目，保留 URL、出版年、擷取位置、重述筆記與限制，再綜整成八個概念頁。未宣稱擷取論文全文。"
      ],
      [
        "更新規則",
        "每筆資料一個 S 編號；每個概念頁一個 W 編號；新資料改變說法時，同步更新頁面、證據卡與受影響投影片。腳本只執行已整理內容的匯入與檢查，不重新呼叫 LLM。"
      ]
    ]
  },
  {
    "id": "W03",
    "title": "如何找到相關段落？",
    "tag": "檢索",
    "summary": "問題與段落的表示可用於找出候選資料；候選仍需檢查。",
    "sources": [
      "S02"
    ],
    "links": [
      "W01",
      "W06",
      "W07"
    ],
    "blocks": [
      [
        "研究概念",
        "DPR 使用雙編碼器，分別把問題與段落轉成稠密表示，再進行段落檢索。"
      ],
      [
        "本頁的互動示範",
        "教學網頁用關鍵詞匹配來演示篩選相關筆記，並非 DPR、embedding 或語意檢索。搜尋不到時顯示無結果，不捏造答案。"
      ],
      [
        "本作業的檢查規則",
        "檢索後核對主題、來源與使用範圍。Top-k 的 k 只是取幾個候選，不代表有幾個正確答案。"
      ]
    ]
  },
  {
    "id": "W04",
    "title": "從證據到回答",
    "tag": "生成",
    "summary": "先建立主張與證據對照，再改寫成新手看得懂的文字。",
    "sources": [
      "S01",
      "S03"
    ],
    "links": [
      "W03",
      "W05",
      "W07"
    ],
    "blocks": [
      [
        "概念",
        "生成器使用問題與取得的內容產生回答；引用評估還要檢查輸出與證據之間的關係。"
      ],
      [
        "本作業操作",
        "每張投影片先選 Wiki 頁，再選證據卡 C 編號；研究說法附來源，自創類比、操作規則與虛構案例另行標示。"
      ],
      [
        "虛構校園案例",
        "問題：圖書館週末開到幾點？假設公告 K01 寫星期六 18:00 閉館、K02 寫星期日 17:00 閉館，回答就依兩筆公告整理並引用；不能新增 24 小時開放的說法。這些時間是教學虛構資料，並非政大規章。"
      ]
    ]
  },
  {
    "id": "W05",
    "title": "有引用不等於有支持",
    "tag": "查核",
    "summary": "引用存在、引用正確、證據涵蓋完整，是不同檢查。",
    "sources": [
      "S03"
    ],
    "links": [
      "W04",
      "W07",
      "W08"
    ],
    "blocks": [
      [
        "研究依據",
        "ALCE 分開評估流暢度、正確性與引用品質，因此讀起來順暢和附有來源都不足以單獨證明內容正確。"
      ],
      [
        "本作業三個問題",
        "來源編號存在嗎？原文是否支持這句話？句子的適用範圍是否超過原文？"
      ],
      [
        "回退規則",
        "沒有支持就刪除主張或標記資料不足；不能為了湊投影片，把不相關來源接在句尾。"
      ]
    ]
  },
  {
    "id": "W06",
    "title": "資料更多就更好嗎？",
    "tag": "限制",
    "summary": "長上下文中的資訊位置，是受測模型表現的影響因素。",
    "sources": [
      "S04"
    ],
    "links": [
      "W03",
      "W05",
      "W07"
    ],
    "blocks": [
      [
        "研究結果",
        "Lost in the Middle 在多文件問答及鍵值檢索任務中，觀察到相關資訊位置造成表現差異，中段資訊的使用較差。"
      ],
      [
        "適用範圍",
        "此結果描述論文受測的模型、資料與設定；不能推出所有當代模型都一定有同幅度下降。"
      ],
      [
        "本作業設計推論",
        "因此在簡報產生前，先選擇相關證據並去除重複筆記。這是設計選擇，沒有在本作業中量測其效能提升。"
      ]
    ]
  },
  {
    "id": "W07",
    "title": "怎麼評估 RAG？",
    "tag": "評估",
    "summary": "分開看找得對、用得對、答得好，才知道該修哪個節點。",
    "sources": [
      "S03",
      "S05"
    ],
    "links": [
      "W03",
      "W05",
      "W08"
    ],
    "blocks": [
      [
        "研究依據",
        "RAGAs 關注檢索情境、忠實使用資料與生成品質；ALCE 則針對含引用文字評估流暢度、正確性及引用品質。"
      ],
      [
        "本作業檢查",
        "結構檢查驗證編號與連結；證據審查檢查主張是否超出來源；瀏覽器檢查操作、手機版與頁面顯示。"
      ],
      [
        "限制",
        "本次檢查不是研究基準測試。編號全通過不代表語意已被程式自動證實，語意仍由本次 AI 審查並保留判斷理由。"
      ]
    ]
  },
  {
    "id": "W08",
    "title": "為什麼需要 loop？",
    "tag": "工作流程",
    "summary": "把錯誤送回能修正它的節點，並設停止條件。",
    "sources": [
      "S06"
    ],
    "links": [
      "W02",
      "W05",
      "W07"
    ],
    "blocks": [
      [
        "研究啟發",
        "Self-RAG 的模型按需檢索並反思段落與生成；本作業借鏡其回饋精神，沒有重現該模型訓練。"
      ],
      [
        "本作業 graph",
        "來源檢查失敗回取得資料；證據不足回 Wiki 查詢或縮小主張；顯示問題回 HTML 版面。每類最多修正兩輪，仍無支持就移除主張並記錄。"
      ],
      [
        "為何往前移",
        "先通過證據卡審查再排版，避免把同一個錯誤散佈到投影片、講稿和作業報告。這是本次採用的設計理由。"
      ]
    ]
  }
];
export const claims=[
  {
    "id": "C01",
    "wiki": "W01",
    "sources": [
      "S01"
    ],
    "text": "RAG 結合語言模型與外部知識檢索。",
    "support": "S01 摘要說明參數式與非參數式記憶的結合。"
  },
  {
    "id": "C02",
    "wiki": "W03",
    "sources": [
      "S02"
    ],
    "text": "DPR 使用問題與段落的稠密表示來檢索段落。",
    "support": "S02 摘要明示雙編碼器與 dense representations。"
  },
  {
    "id": "C03",
    "wiki": "W05",
    "sources": [
      "S03"
    ],
    "text": "引用的品質與回答的正確性需要分別檢查。",
    "support": "S03 摘要將 correctness 與 citation quality 列為不同評估面向。"
  },
  {
    "id": "C04",
    "wiki": "W06",
    "sources": [
      "S04"
    ],
    "text": "在該研究的受測設定中，相關資訊的位置影響模型表現。",
    "support": "S04 摘要說明位置變動及兩個受測任務，保留研究範圍。"
  },
  {
    "id": "C05",
    "wiki": "W07",
    "sources": [
      "S05"
    ],
    "text": "RAG 評估要兼顧檢索、忠實使用情境與生成品質。",
    "support": "S05 摘要列出這三類評估考量。"
  },
  {
    "id": "C06",
    "wiki": "W08",
    "sources": [
      "S06"
    ],
    "text": "Self-RAG 使用訓練過的反思 token 進行按需檢索與反思。",
    "support": "S06 摘要說明訓練與 reflection tokens；本作業未實作其模型。"
  }
];
export const auditCases=[
  {
    "id": "T01",
    "stage": "主張整理",
    "candidate": "只要加上引用，回答就一定正確。",
    "source": "S03",
    "verdict": "reject",
    "reason": "ALCE 分別評估正確性及引用品質；摘要不支持正確性保證。",
    "repair": "改為 C03，區分引用與正確性。"
  },
  {
    "id": "T02",
    "stage": "主張整理",
    "candidate": "所有 LLM 都無法使用長上下文中段的資訊。",
    "source": "S04",
    "verdict": "reject",
    "reason": "把特定模型與任務的觀察，擴張成所有模型皆無法使用，超出摘要支持範圍。",
    "repair": "改為 C04，保留受測設定與位置影響。"
  },
  {
    "id": "T03",
    "stage": "主張整理",
    "candidate": "DPR 使用問題與段落的稠密表示來檢索段落。",
    "source": "S02",
    "verdict": "pass",
    "reason": "S02 摘要明示雙編碼器與 dense representations。",
    "repair": "保留 C02。"
  },
  {
    "id": "T04",
    "stage": "主張整理",
    "candidate": "Self-RAG 使用訓練過的反思 token 進行按需檢索與反思。",
    "source": "S06",
    "verdict": "pass",
    "reason": "S06 摘要說明訓練與 reflection tokens；本作業未實作其模型。",
    "repair": "保留 C06；註明未實作 Self-RAG。"
  }
];
export const slides=[
  {
    "id": "P01",
    "type": "hero",
    "label": "從一個問題開始",
    "title": "AI 回答得很流暢，\n你怎麼知道有根據？",
    "subtitle": "RAG 入門：讓 AI 查資料再回答",
    "wiki": [
      "W01"
    ],
    "claims": [
      "C01"
    ],
    "notes": "請同學先想一個 AI 答得很肯定，但自己無法核對的例子。這堂課的目標是理解證據如何進入回答，不是記住工具名稱。"
  },
  {
    "id": "P02",
    "type": "objectives",
    "label": "學習目標",
    "title": "這堂課，學會三件事",
    "items": [
      [
        "說清楚",
        "RAG 如何把資料帶進回答。"
      ],
      [
        "找問題",
        "分辨找錯資料與讀錯資料。"
      ],
      [
        "看證據",
        "核對引用是否支持主張。"
      ]
    ],
    "wiki": [
      "W01",
      "W07"
    ],
    "claims": [
      "C01",
      "C05"
    ],
    "notes": "學習順序是概念、操作、查核。三項目標也是後面小測驗的判斷標準。"
  },
  {
    "id": "P03",
    "type": "rag",
    "label": "01 / 基本概念",
    "title": "先查資料，再組織回答",
    "subtitle": "RAG = Retrieval-Augmented Generation",
    "wiki": [
      "W01",
      "W03",
      "W04"
    ],
    "claims": [
      "C01",
      "C02"
    ],
    "notes": "先把問題交給檢索器找候選資料，再由生成器使用問題與資料作答。這是入門流程；原始 RAG 論文有特定訓練方式。"
  },
  {
    "id": "P04",
    "type": "compare",
    "label": "02 / 知識庫",
    "title": "Wiki 管知識，RAG 用知識",
    "wiki": [
      "W01",
      "W02"
    ],
    "claims": [
      "C01"
    ],
    "notes": "LLM Wiki 是這份作業對知識整理方式的定義。Wiki 持久保存來源與概念；RAG 描述把檢索結果帶進生成。兩者能配合，但不是同一件事。"
  },
  {
    "id": "P05",
    "type": "ingest",
    "label": "03 / 建立 Wiki",
    "title": "六篇資料，整理成八個概念",
    "wiki": [
      "W02",
      "W05"
    ],
    "claims": [
      "C03"
    ],
    "notes": "實際 ingest 的是六篇論文的摘要與書目，不是下載全文。每篇都有來源編號、重述摘要和限制，之後才跨來源整理。"
  },
  {
    "id": "P06",
    "type": "retrieve",
    "label": "04 / 動手找資料",
    "title": "找得到，不代表用得對",
    "subtitle": "試著搜尋「引用」「長上下文」或「檢索」。",
    "wiki": [
      "W03",
      "W06"
    ],
    "claims": [
      "C02",
      "C04"
    ],
    "notes": "這裡是關鍵詞匹配示範，沒有 embedding 或線上 LLM。找出候選頁以後，仍需閱讀原始來源的適用範圍。"
  },
  {
    "id": "P07",
    "type": "example",
    "label": "05 / 從資料到回答",
    "title": "只說紀錄支持的事情",
    "subtitle": "教學用虛構校園公告，並非政大規章或實際系統評估。",
    "wiki": [
      "W04",
      "W05"
    ],
    "claims": [
      "C03"
    ],
    "notes": "請指出：週六 18:00、週日 17:00 是虛構公告中的資料；24 小時開放是沒有證據的新增細節。案例說明忠實使用來源，並非真實圖書館營業時間。"
  },
  {
    "id": "P08",
    "type": "citation",
    "label": "06 / 引用查核",
    "title": "有連結，還不夠",
    "items": [
      [
        "存在",
        "來源編號真的存在嗎？"
      ],
      [
        "支持",
        "來源真的說了這件事嗎？"
      ],
      [
        "範圍",
        "有沒有把局部結果說成通則？"
      ]
    ],
    "wiki": [
      "W05",
      "W06"
    ],
    "claims": [
      "C03",
      "C04"
    ],
    "notes": "正確的網址也能被接在錯誤的主張後面。結構檢查只處理存在；支持與範圍需要語意審查。"
  },
  {
    "id": "P09",
    "type": "limit",
    "label": "07 / 常見誤解",
    "title": "更多資料 ≠ 更好的回答",
    "wiki": [
      "W06"
    ],
    "claims": [
      "C04"
    ],
    "notes": "研究在指定模型與任務中觀察到資訊位置的影響，不能推論所有模型都無法利用中段資訊。本作業選擇先篩選證據，但沒有量測這樣做的改善幅度。"
  },
  {
    "id": "P10",
    "type": "evaluation",
    "label": "08 / 分開評估",
    "title": "錯在哪一層，就修哪一層",
    "items": [
      [
        "找得對",
        "檢索：取得的資料與問題相關嗎？"
      ],
      [
        "用得對",
        "忠實：回答有沒有超出資料？"
      ],
      [
        "答得好",
        "輸出：是否回答問題、便於理解？"
      ]
    ],
    "wiki": [
      "W07",
      "W05"
    ],
    "claims": [
      "C05",
      "C03"
    ],
    "notes": "這三個教學問題參考 RAGAs 的評估面向；網頁未執行 RAGAs，也沒有提供未量測的準確率。"
  },
  {
    "id": "P11",
    "type": "quiz",
    "label": "09 / 檢查理解",
    "title": "這個回答，問題在哪裡？",
    "wiki": [
      "W05",
      "W06",
      "W07"
    ],
    "claims": [
      "C03",
      "C04",
      "C05"
    ],
    "notes": "完成三個小題後再看解說。如果錯在引用範圍，回 W05；如果混淆找不到與編造，回 W07。"
  },
  {
    "id": "P12",
    "type": "flow",
    "label": "10 / 本次工作流程",
    "title": "先審證據，再做投影片",
    "wiki": [
      "W02",
      "W08"
    ],
    "claims": [
      "C06"
    ],
    "notes": "這是本作業設計的工作流程，不是 Self-RAG 的實作。失敗分流回最接近根因的節點，最多修兩輪，仍不通過就移除主張。"
  },
  {
    "id": "P13",
    "type": "run",
    "label": "11 / 實際執行",
    "title": "留下可追溯的檢查紀錄",
    "wiki": [
      "W02",
      "W05",
      "W07"
    ],
    "claims": [
      "C03",
      "C05"
    ],
    "notes": "本頁由執行產物讀取數量。四個主張邊界案例是受控測試；不能當成模型日常錯誤率。正式六張證據卡另有逐卡判斷理由。"
  },
  {
    "id": "P14",
    "type": "reflection",
    "label": "12 / 反思與修正",
    "title": "最值得提前的，是範圍檢查",
    "wiki": [
      "W05",
      "W06",
      "W08"
    ],
    "claims": [
      "C03",
      "C04",
      "C06"
    ],
    "notes": "本次實際取得來源時遇到一個會議頁逾時，改用作者 arXiv 頁後完成。受控測試中兩項過度概括都在主張整理被退回；樣本不足以推論長期錯誤頻率。"
  },
  {
    "id": "P15",
    "type": "end",
    "label": "帶走這個判斷方法",
    "title": "先問：這句話的證據在哪裡？",
    "subtitle": "問題 → 相關資料 → 有根據的回答 → 引用與範圍檢查",
    "wiki": [
      "W01",
      "W05",
      "W07"
    ],
    "claims": [
      "C01",
      "C03",
      "C05"
    ],
    "notes": "請同學用一句話解釋 RAG，再用另一句說明為什麼有引用不等於正確。最後可開啟 Wiki 逐頁查詢六篇原始來源。"
  }
];