# notion-db-to-spreadsheet

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

NotionDBからスプレッドシートにデータを連携する。

## Setup

### Build
```
docker-compose build
```

### コンテナを起動
コンテナのログを監視したい場合はこちら。  
別タブから操作する。
```
docker-compose up
```

デーモンとして起動する場合はこちら。
```
docker-compose up -d
```

### 起動したコンテナに入る
サービス名を指定してコンテナに入る。
```
docker-compose exec gas-build bash
```

### clasp login
claspにGoogleアカウントへのアクセス権限を付与する（認可）。  
localhostではなくDockerコンテナからの実行なので、`--no-localhost`を付けて実行する。
```
clasp login --no-localhost
```
認可用のURLが表示されるので、アクセスする。  
Googleアカウントを選択し、認可を進める。  
認可用のコードが表示されるので、コピーして所定の場所に入力する。

### clasp create
`https://drive.google.com/drive/folders/{GoogleDriveのフォルダID}`
にGASファイルを作成する。
```
clasp create --title notion-db-to-spreadsheet --parentId {GoogleDriveのフォルダID} --rootDir ./
```

### npm init
```
npm init
```

### パッケージのインストール
```
npm install @types/google-apps-script
```
`@types/google-apps-script`はコーディング時にGASの関数を表示してくれるようになるパッケージ。

### 環境変数の設定
GASファイルのプロジェクトの設定から、スクリプトプロパティとして登録。

| プロパティ名 | 内容 |
| ------------ | - |
| NOTION_DB_ID | NotionDBのID <br> `https://www.notion.so/{workspace name}/{NOTION_DB_ID}?v=...` |
| NOTION_TOKEN | NotionAPIのトークン |
| SHEET_ID     | スプレッドシートのID <br> `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit#gid=...` |
| SHEET_NAME   | シート名 |
| PROPERTIES   | NotionDBから取得するプロパティ名をカンマ区切りで指定する <br> 例: `Name,Tags` |

## Command

### コンテナ一覧（状態を確認）
```
docker-compose ps
```

### コンテナの停止
```
docker-compose stop
```

### clasp push
コンテナが起動している状態で、コンテナの外から実行。
```
docker-compose exec gas-build bash -c "clasp push"
```
