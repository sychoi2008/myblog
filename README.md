## プロジェクトのセットアップ手順
1. フォルダを作ります
```
mkdir myblog-test
```
2. フォルダに移動します
```
cd myblog-test
```
3. CLONEをもらいます
```
git clone <repo url>
```
4. CLONEの内部に移動します
```
cd myblog
```
5. フロントエンドのフォルダに移動します
```
cd vue-frontend
```
6. VIMを使ってENVファイルを作ります
```
vim .env
```
7. 以下を記入します
```
VITE_API_URL=http://localhost:3001
```
8. DOCKERを使って起動します
```
docker-compose up --build -d 
docker compose exec rails-backend rails db:drop db:create db:migrate
docker compose exec rails-backend rails db:seed
```
9. 以下のURLに接続します
```
http://localhost:3000
```
10. TESTを起動します
```
docker compose exec rails-backend bundle exec rspec
```

## 実装した機能の説明


## 任意で工夫したポイント

https://github.com/user-attachments/assets/5a6a8cc1-8e8f-4d21-88c5-b9ceaa980cda

