## プロジェクトのセットアップ手順

1. フォルダを作ります

```
mkdir myblog-test
```

2. フォルダに移動します

```
cd myblog-test
```

3. CLONE をもらいます

```
git clone <repo url>
```

4. CLONE の内部に移動します

```
cd myblog
```

5. フロントエンドのフォルダに移動します

```
cd vue-frontend
```

6. VIM を使って ENV ファイルを作ります

```
vim .env
```

7. 以下を記入します

```
VITE_API_URL=http://localhost:3001
```

8. DOCKER を使って起動します

```
docker-compose up --build -d
docker compose exec rails-backend rails db:drop db:create db:migrate
docker compose exec rails-backend rails db:seed
```

9. 以下の URL に接続します

```
http://localhost:3000
```

10. TEST を起動します

```
docker compose exec rails-backend bundle exec rspec
```

## 実装した機能の説明

### 1. 初期画面

![초기화면](https://github.com/user-attachments/assets/87adf5c4-83e3-455f-b285-4e081c4bb349)
会員登録またはログインをいずれかを選べます。

### 2. 会員登録とログイン

![회원가입](https://github.com/user-attachments/assets/274a2d6c-feeb-4f02-96f9-758d65fe1b52)
![로그인](https://github.com/user-attachments/assets/6ebcf9a8-0c8d-4855-8542-48d30679a639)
会員登録をすると自動的にログインのページに移動します。

### 3. 記事作成

![글쓰기](https://github.com/user-attachments/assets/606286f1-3a86-470d-b63d-3b3995756be0)
タイトルと内容を書き、カテゴリーを選べます。
カテゴリーは、生活、運動、料理、勉強があります。

### 4. フィルタリングと検索

![카테고리로 필터링](https://github.com/user-attachments/assets/f0b75c58-bd80-40d9-952f-1a39b80f97b0)
カテゴリーの生活で検索
![제목 검색](https://github.com/user-attachments/assets/54ff8efe-f922-4954-9c9b-f5a8be872065)
タイトルの NJZ で検索

### 4. 記事修正

### 5. ログアウト

## 任意で工夫したポイント

https://github.com/user-attachments/assets/5a6a8cc1-8e8f-4d21-88c5-b9ceaa980cda
