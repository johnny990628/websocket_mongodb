# websocket_mongodb

奇異鳥好心肝報告系統-websocket<br/>
這是一項用來使所有裝置上的Kiwi報告系統<br/>
能及時同步系統(網頁)前端的資料之微服務

<img src="https://github.com/johnny990628/GHL_Frontend/blob/master/public/logo.png" width="30%" />

## 相依好心肝專案專案列表

👍 您需同時於local端設定好並部署以下兩項專案
方能看到本專案的實際作用

### 奇異鳥好心肝報告系統-前端
+ https://github.com/johnny990628/GHL_Frontend

### 奇異鳥好心肝報告系統-後端
+ https://github.com/johnny990628/GHL_Backend

## 本專案採用之資料庫架構

### 此專案相依於Mongo-Replica資料庫架構
可透過本專案資料夾[MongoReplica-for-GLC](./MongoReplica-for-GLC/)內<br/>
所提供的範例`docker-compose.yaml` 快速建置起
<br/>本專案所使用的MongoDB (Mongo-Replica架構)

⚠️本專案所提供的範例`docker-compose.yaml`是基於<br/>
⚠️[GLC_Docker-compose_plus_Dockerfiles](https://github.com/luckypig3400/GLC_Docker-compose_plus_Dockerfiles)專案的[commit e32f325](https://github.com/luckypig3400/GLC_Docker-compose_plus_Dockerfiles/commit/e32f3256fde9d98ea8ed81f95d1d18cc93ddd679)<br/>
⚠️所複製出來的，功能上**僅有建置MongoReplica**<br/>
⚠️並且**此份docker-compose後續不再更新及維護**<br/>
⚠️本專案及報告系統前後端需要在local端自行部署


### MongoReplica docker-compose 啟動指令
```
cd MongoReplica-for-GLC
docker compose up -d
```