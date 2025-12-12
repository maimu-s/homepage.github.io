# Maimu Homepage

鈴音舞夢の公式Webサイトプロジェクト

## 📁 プロジェクト構造

```
202512_maimu_hp/
├── src/                    # ソースファイル
│   ├── index.html         # メインHTML
│   ├── main.tsx           # Reactエントリーポイント
│   ├── App.tsx            # メインAppコンポーネント
│   ├── vite-env.d.ts      # TypeScript型定義
│   ├── components/        # Reactコンポーネント
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   ├── HeroSection.tsx
│   │   ├── HeroSection.css
│   │   ├── NewsSection.tsx
│   │   ├── NewsSection.css
│   │   ├── TalentSection.tsx
│   │   ├── TalentSection.css
│   │   ├── ScheduleSection.tsx
│   │   ├── ScheduleSection.css
│   │   ├── ContactSection.tsx
│   │   ├── ContactSection.css
│   │   ├── Footer.tsx
│   │   └── Footer.css
│   ├── utils/             # API統合ユーティリティ
│   │   ├── newsApi.ts
│   │   ├── youtubeApi.ts
│   │   ├── twitchApi.ts
│   │   └── scheduleApi.ts
│   ├── css/               # スタイルシート
│   │   └── style.css
│   └── assets/            # 画像などのアセット
│       └── images/
│           ├── hero/
│           ├── icon/
│           ├── logo/
│           └── talent/
├── .github/               # GitHub設定
│   └── copilot-instructions.md
├── .vscode/               # VSCode設定
│   └── settings.json
├── dist/                  # ビルド出力先
├── .env                   # 環境変数
├── .env.example           # 環境変数テンプレート
├── .editorconfig          # エディタ設定
├── tsconfig.json          # TypeScript設定
├── tsconfig.node.json     # Node用TypeScript設定
├── vite.config.ts         # Vite設定
└── package.json           # プロジェクト設定
```

## 🛠 セットアップ

### 必要な環境
- Node.js (v18以上推奨)
- npm (Node.jsに同梱)

### インストール手順

1. **依存関係のインストール**
```powershell
npm install
```

2. **開発サーバーの起動**
```powershell
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

3. **本番用ビルド**
```powershell
npm run build
```

ビルド結果は `dist/` フォルダに出力されます。

4. **ビルド結果のプレビュー**
```powershell
npm run preview
```

5. **distフォルダのクリーンアップ**
```powershell
npm run clean
```

## 📄 ライセンス

&copy; 鈴音舞夢 All rights reserved.
