# Copilot Instructions

このファイルは、GitHub Copilotがプロジェクト固有のコンテキストとガイドラインを理解するための指示書です。

## プロジェクト概要

このプロジェクトはVTuber鈴音舞夢の公式ウェブサイトです。

主な目的:
- github.ioを使った静的サイトを構築すること
- 鈴音舞夢の活動情報やコンテンツを提供すること

## 技術スタック

- **言語**: TypeScript, HTML, CSS
- **フレームワーク**: React 19.2.1
- **ビルドツール**: Vite 5.0
- **プラグイン**: @vitejs/plugin-react 5.1.2
- **TypeScript関連**: @types/react, @types/react-dom, @types/node
- **API統合**: microcms-js-sdk 3.2.0
- **パッケージマネージャー**: npm

## コーディング規約

### 命名規則
- **変数名**: camelCase (例: `userName`, `itemCount`)
- **定数**: UPPER_SNAKE_CASE (例: `MAX_SIZE`, `API_URL`)
- **関数名**: camelCase (例: `getUserData`, `calculateTotal`)
- **クラス名**: PascalCase (例: `UserService`, `DataModel`)

### コードスタイル
- **インデント**: スペース4個 (TypeScript/CSS共通)
- **行の長さ**: 100文字以内を推奨
- **セミコロン**: 必須
- **クォート**: シングルクォートを使用(TSX属性ではダブルクォート可)
- **空行**: 関数間やセクション間に1行の空行を挿入
- **中括弧の位置**: 開始中括弧は同じ行に配置
- **スペース**: 演算子の前後にスペースを入れる
- **配列とオブジェクト**: 最後の要素の後にカンマを付ける
- **プライベートメンバー**: 末尾にアンダースコアを付ける (例: `privateVar_`)
- **プライベートメソッド**: 末尾にアンダースコアを付ける (例: `privateMethod_`)

### ファイルエンコーディング
- **文字コード**: UTF-8 (BOMなし)
- **改行コード**: LF (Line Feed)
- **.editorconfig**: プロジェクトルートに配置済み
- **VSCode設定**: `.vscode/settings.json`で統一設定済み

### コメント
- 複雑なロジックには必ずコメントを記載
- 関数やクラスにはJSDoc/Docstring形式のドキュメントを記載
- TODOコメントには日付を含める

## ファイル構造

```
プロジェクトルート/
├── .github/            # GitHub設定 (copilot-instructions.md)
├── .vscode/            # VSCode設定
├── src/                # ソースコード
│   ├── assets/         # 画像などの静的アセット
│   │   └── images/     # 画像ファイル
│   │       ├── hero/   # ヒーローセクション画像
│   │       ├── icon/   # アイコン画像
│   │       ├── logo/   # ロゴ画像
│   │       └── talent/ # タレント画像
│   ├── components/     # Reactコンポーネント (.tsx + .css)
│   │   ├── Header.tsx/css
│   │   ├── HeroSection.tsx/css
│   │   ├── NewsSection.tsx/css
│   │   ├── TalentSection.tsx/css
│   │   ├── ScheduleSection.tsx/css
│   │   ├── ContactSection.tsx/css
│   │   └── Footer.tsx/css
│   ├── utils/          # API統合ユーティリティ
│   │   ├── newsApi.ts
│   │   ├── youtubeApi.ts
│   │   ├── twitchApi.ts
│   │   └── scheduleApi.ts
│   ├── css/            # グローバルCSS
│   │   └── style.css
│   ├── App.tsx
│   ├── main.tsx        # エントリーポイント
│   ├── vite-env.d.ts   # TypeScript型定義
│   └── index.html
├── dist/               # ビルド出力 (gitignore)
├── .env                # 環境変数 (gitignore)
├── .env.example        # 環境変数テンプレート
├── vite.config.ts      # Vite設定 (envDir: '..')
├── tsconfig.json       # TypeScript設定
├── tsconfig.node.json  # Node用TypeScript設定
├── .editorconfig       # エディタ設定
└── package.json        # 依存関係とスクリプト
```

## 開発ガイドライン

### コード品質
- DRY原則(Don't Repeat Yourself)を遵守
- 単一責任の原則を意識
- 関数は小さく、一つのことだけを行う
- エラーハンドリングを適切に実装

### テスト
- 新機能には必ずテストを追加
- テストカバレッジ: 80%以上
- テスト命名: `test_[機能]_[条件]_[期待結果]`

### パフォーマンス
- コードの最適化を常に意識
- 不要な再レンダリングを避ける
- ウェブページの読み込み速度を考慮

## AI支援の注意点

### Copilotに期待すること
- コーディング規約に準拠したコード生成
- 既存のパターンやアーキテクチャに沿った実装
- 適切なエラーハンドリングとバリデーション
- 保守性の高いコードの提案
- 拡張性を考慮した設計
- セキュリティベストプラクティスの遵守
- レスポンシブデザインの考慮
- 可愛いデザイン要素の提案(フォント、カラー、レイアウトなど)
- 必要な画像の提案(画像は開発者が用意する)

### Copilotに避けてほしいこと
- 未検証のライブラリの使用
- セキュリティリスクのあるコード
- 過度に複雑な実装
- プロジェクトのパターンから逸脱した実装

## プロジェクト固有のルール

### カラースキーム
- **プライマリカラー**: #F5B3B8 (ピンク)
- **セカンダリカラー**: #F6D462 (イエロー)
- **背景色**: #ffffff (ホワイト)
- **テキスト**: #333333 (ダークグレー)

### レスポンシブブレークポイント
- **モバイル**: ~767px
- **タブレット**: 768px~1023px
- **デスクトップ**: 1024px~

### コピーライト
- &copy; 鈴音舞夢 All rights reserved.

### デザインガイドライン
- 可愛らしいデザインを心がける
- レスポンシブデザインを優先し、モバイルファーストで設計する
- マウス操作に対するインタラクティブなエフェクトを追加する(3D傾斜など)

## API統合ガイドライン (フェーズ3完了)

### microCMS API (実装済み)
- **CMS**: ヘッドレスCMS
- **認証情報**: Service Domain + API Key (VITE_MICROCMS_SERVICE_DOMAIN, VITE_MICROCMS_API_KEY)
- **エンドポイント**: news
- **取得件数**: 10件
- **ソート順**: publishedAt降順（新しい順）
- **実装ファイル**: `src/utils/newsApi.ts`
- **キャッシュ**: LocalStorage 15分間
- **フォールバック**: モックデータ（API未設定時）
- **JSDoc**: モジュールコメント完備

### YouTube Data API v3 (実装済み)
- **無料枠制限**: 10,000ユニット/日
- **主要操作コスト**:
  - `search.list`: 100ユニット
  - `videos.list`: 1ユニット (×動画数)
- **1回の更新コスト**: 約110ユニット (検索+動画詳細10件)
- **同期間隔**: **15分ごと** (約90回/日)
- **認証情報**: API Key (VITE_YOUTUBE_API_KEY)
- **実装ファイル**: `src/utils/youtubeApi.ts`
- **キャッシュ**: LocalStorage 15分間
- **JSDoc**: モジュールコメント完備

### Twitch RSS (実装済み・認証不要)
- **使用サービス**: https://twitchrss.appspot.com/
- **認証**: 不要
- **CORS対策**: Viteプロキシ (`/api/twitch-rss/*`)
- **同期間隔**: **15分ごと**
- **配信中判定**: 最新動画が5分以内 (LIVE_THRESHOLD_MINUTES)
- **実装ファイル**: `src/utils/twitchApi.ts`
- **キャッシュ**: LocalStorage 15分間
- **本番環境**: 直接アクセス (CORS許可済み)

### スケジュール統合 (実装済み)
- **実装ファイル**: `src/utils/scheduleApi.ts`
- **表示順**: 投稿時系列 (新しい順)
- **最大件数**: 10件
- **ステータス判定**: 現在時刻と比較
  - 配信中: isLive === true または最新5分以内
  - 配信予定: scheduledStartTime > 現在時刻
  - アーカイブ: それ以外

### 自動更新戦略 (実装済み)
1. **通常時**: 15分間隔で自動更新
2. **深夜帯** (3:00-9:00): 30分間隔に延長
3. **キャッシング**: LocalStorage 15分間
4. **エラーハンドリング**: APIエラー時はキャッシュデータを表示

### セキュリティ
- API Keyは`.env`で管理 (VITE_プレフィックス)
- `.env`ファイルは`.gitignore`に追加済み
- `vite.config.ts`に`envDir: '..'`設定
- 本番環境: 静的サイトのため問題なし (GitHub Pages対応)

### 環境変数
```bash
# .env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxx
VITE_TWITCH_CHANNEL_NAME=suzunemaimu
VITE_MICROCMS_SERVICE_DOMAIN=your_service_domain
VITE_MICROCMS_API_KEY=your_api_key_here
```

## 開発コマンド

```powershell
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルドプレビュー
npm run preview

# distフォルダクリーンアップ
npm run clean

# GitHub Pagesデプロイ
npm run deploy
```

## 更新履歴

- 2025-12-11: 初版作成
- 2025-12-12: 指示書を正しいフォルダに移動、実際のプロジェクト構成に合わせて修正
- 2025-12-12: TypeScriptへ移行・インデントをスペース4個に変更
- 2025-12-12: UTF-8(BOMなし)・改行コードLFに統一
- 2025-12-12: API統合ガイドライン追加 (YouTube/Twitch API制限と推奨同期間隔)
- 2025-12-12: フェーズ2完了 (API統合、リファクタリング)、指示書を最新ソースコードに合わせて更新
- 2025-12-13: フェーズ3完了 (microCMS統合、NewsSection/ContactSection追加)

---

**Note**: このファイルは定期的に更新し、プロジェクトの現状を反映させてください。
npm run clean
```

## 更新履歴

- 2025-12-11: 初版作成
- 2025-12-12: 指示書を正しいフォルダに移動、実際のプロジェクト構成に合わせて修正、TypeScriptへ移行・インデントをスペース4個に変更、UTF-8(BOMなし)・改行コードLFに統一
- 2025-12-12: API統合ガイドライン追加 (YouTube/Twitch API制限と推奨同期間隔)

---

**Note**: このファイルは定期的に更新し、プロジェクトの現状を反映させてください。
