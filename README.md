## プロジェクトのセットアップ手順
0. 前提条件
- Dockerが必ず必要です！

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

8. myblog（上位フォルダー）に戻って、DOCKERを使って起動します

```
cd ..
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
両方を使って検索とフィルタリングが可能です。

### 4. 記事修正
![글수정](https://github.com/user-attachments/assets/7f47afd8-5e21-4bfb-8bb3-92078aaf7194)
記事修正が可能です。

### 5. 記事削除
![게시글 삭제](https://github.com/user-attachments/assets/fa855c50-8337-47fa-8937-cdb4476260a4)
削除機能もあります。

### 6. ログアウト
![로그아웃](https://github.com/user-attachments/assets/11187947-3c99-4b4d-8387-0fae34809e55)
ログアウト機能もあります。

### 7. モバイル対応のデザインを適用
![모바일 홈 화면](https://github.com/user-attachments/assets/7f91717b-e6d2-4ea4-b314-ea3ab88f8438)
![모바일 글쓰기](https://github.com/user-attachments/assets/202fc7f0-c649-4130-acb1-306012266368)

@mediaを使いレスポンシブデザインを実装しました。

## 任意で工夫したポイント
### 1. Deviseを利用したセッションログイン方式
- 初期の迅速な開発を考慮して、基本的なDeviseライブラリを使用したセッションログイン方式を採用しました。
- JWT方式とも検討しましたが、Deviseライブラリはセッションログイン方式を基本としているため、発行や検証などのカスタマイズ機能を実装するには負担が大きいと判断しました。

1. cookie_storeを使用して、ログインしたユーザーのセッションデータを暗号化し、クライアント側のクッキーに保存しています。  
クライアントは、この暗号化されたクッキーを毎回のリクエストで自動的にサーバーに送信します。

2. サーバー側では、`before_action :authenticate_user!`によって認証をフィルタリングし、  
このフィルターを通過した場合、`current_user`がクッキー内のセッションデータを復号してユーザー情報を復元し、必要に応じてデータベースからユーザー情報を取得して利用します。

### 2. ログイン状態ではないと指導的に移動させる機能
ログインしていないユーザーが内部サービスを利用できないように制御する機能を実装しました。
ログインせずに /home や /write、/posts/{id} などの認証が必要なページに直接アクセスした場合、自動的にログインページへ遷移させる仕組みです。
  
Pinia ライブラリを利用し、全てのコンポーネントから共通のログイン状態を参照できるようにしました。  
これにより、ページ遷移時に Pinia のストアからログイン状態を確認し、未ログインの場合はログインページへ、ログイン済みであれば目的のページへ遷移できるようにしました。
  
また、ログイン状態をブラウザのローカルストレージにも保存することで、ページをリロードした場合でもログイン状態が維持されるよう工夫しました。

https://github.com/user-attachments/assets/5a6a8cc1-8e8f-4d21-88c5-b9ceaa980cda



