# バックグラウンド通知の設定

Version 5.23では、アプリを閉じている端末にもFirebase Cloud Messagingで未完了クエストを通知できます。

## Firebase

1. Firebase Consoleの「プロジェクトの設定」から「Cloud Messaging」を開く。
2. Web Push証明書を作成し、公開鍵を控える。
3. FCM Registration APIとFirebase Cloud Messaging APIを有効にする。
4. FirebaseのサービスアカウントJSONを作成する。JSONはリポジトリへ保存しない。

## Vercel

ProductionのEnvironment Variablesに次を登録します。

- `FIREBASE_WEB_PUSH_VAPID_KEY`: Web Push証明書の公開鍵
- `FIREBASE_SERVICE_ACCOUNT_KEY`: サービスアカウントJSON全体
- `CRON_SECRET`: 16文字以上のランダムな文字列
- `APP_URL`: `https://sora-guild-app.vercel.app`

登録後に再デプロイします。無料枠のCron Jobが毎日18時台に一度実行されます。

通知本文にはクエスト名を含めず、残り件数だけを表示します。同じ日の二重送信は`pushReminderLastSentDate`で防止します。
