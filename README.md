# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# ポイント

## 構成

create-react-app で作成、TypeScript, Prettieer 自動実行（.prettierrc.yaml）

- Assets:メディアファイルの置き場所
- Const:定数など
- Controls:ページ以外の画面部品。container なコンポーネントも混ざってます。
- Data:データ取得関連の機能と Model の定義。React-Query をアプリレイヤーから隠蔽したかったけど隠蔽すると嬉しさがなくなるので隠蔽諦めた。
- Lang:他言語対応
- Net:通信部分。意図としては Axios をアプリレイヤーから隠蔽したかった。
- Pages:ルーティングの単位
- Styles:グローバルに定義しているスタイル。Reset は TailWind からのコピペ。Styles/Theme は過去プロジェクトからのコピペ。Styles はだいたい TailWind からのコピペ。
- Utiles:将来的にユーティリティ機能を置く。

### コンポーネント

基本的に関数コンポーネント。一部クラスコンポーネントがありますが、過去プロジェクトからのコピペです。
作りや命名ルールが統一されてない箇所はコピペです。
異論は認めますが、それ単体で業務ロジックが完結していてそれ以上分解しても再利用性がないものはわざわざロジック・API 呼び出しと見た目を分解していません（Controls/Information の例）
そのため Page（ルーティングの単位）か Controls（それ以外）かの分離でしかフォルダわけしておらず、Controls 配下の粒度はまちまちです。

### スタイル

スタイルは SCSS, 全体的なスタイルと画面毎のスタイルの２種類, リセット CSS。
検索時にいまいちだけど記法としては BEM に近い書き方で`&__`の入れ子で定義。
一般的には Margin/Padding など他部品とのレイアウトについては presentational な部品には持たせるべきではありません。
Styles.scss にそのあたりは定義してるので利用コントロール側でレイアウトを制御した方が良いです。
/Styles 配下のものは過去プロジェクトのコピペがほとんどなので参考程度に（使われていない定義がたくさんあります）

### ビルド

cross-env を使って環境毎に設定値を設定できるようにしています。

```
    "start": "cross-env REACT_APP_ENV=development react-scripts start",
    "build": "cross-env REACT_APP_ENV=production react-scripts build",
    "build:stage": "cross-env REACT_APP_ENV=stage react-scripts build",
```

```typescript
const dev: Environment = {
  serverURL: '開発サーバーURL',
};

const stage: Environment = {
  serverURL: 'ステージングサーバーURL',
};

const prod: Environment = {
  serverURL: '本番サーバーURL',
};

let env: Environment = dev;

if (
  process.env.REACT_APP_ENV &&
  process.env.REACT_APP_ENV.trim() === 'production'
) {
  env = prod;
} else if (
  process.env.REACT_APP_ENV &&
  process.env.REACT_APP_ENV.trim() === 'stage'
) {
  env = stage;
}
```

### ルーティング

React Router でルーティングしています。
サーバーサイドで対応がいらないように HashRouter にしてます。
App.tsx にある PrivateRoute で認証必要なルーティングに対応しているが認証で再描画のトリガーはかからない手抜き実装（パッと思いつく範囲だと問題はないんじゃないかと思ったけど）。
画面遷移は Controls/ScreenSwitch が ContextAPI として提供しています。

```typescript
const { goto } = useRef(useContext(ScreenSwitchContext)).current;
useEffect(() => {
  if (login.isSuccess) {
    goto(PATH.TOP);
  }
}, [login.isSuccess, goto]);
```

### 通信

通信は react-query + axios です。
axios 部分は Context API 使って DI チックに設定可能（参考：Controls/Information/index.stories.tsx）
react-query はキャッシュを効かせてくれたり、リトライの制御などできるっぽいのでプロジェクトに合わせて設定すると良いかも（現状デフォルト）
通信エラー時のエラーハンドリングを App.tsx から設定しているが、要件として問題なければエラーハンドリングは共通処理にして画面個別に実装しない方が良いです。HTTP 的なエラーのみ設定しているが業務エラーも可能ならそうした方が良いです。
セッション周りもこのレイヤーで隠蔽した方が良いと思います。
`REACT_APP_ENV=local`みたいなのも作って、HTTP 通信せずに埋め込まれた JSON を読み込むような HttpClient を DI できるようにするとオフライン版のアプリが作れるのでお勧め（未実装）。

通信部分はアプリレイヤーには隠蔽していて、DataProvider 経由での取得になっていて React-Query のインターフェースになります。

```typescript
const informations = useInformation();
const rows = informations.data?.map((info, index) => (
  <div className="Annouce__item" key={info.informationId}>
    {info.headline}
  </div>
));
return (
  <div className="Annouce">
    <div className="Annouce__list">
      {informations.isLoading ? <Spinner></Spinner> : rows}
    </div>
  </div>
);
```

### フォーム

フォームのバリデーションを react-hook-form を利用しています。
個人的な過去実績は Formik ですが複雑なので今回変えてます。

### 他言語対応

i18next で他言語対応しています（文言一覧が自動的に作れることになるので）
動的な言語切り替えを実装してないけど調べたらわかるはず。

```typescript
const { t } = useTranslation();
return <div>{t('運営からのお知らせです')}</div>;
```

### StoryBook

xxx.stories.tsx でファイル名を定義すると取り込んでくれます。
だいたい Controls 配下は対応済みです。

### API

api フォルダで Swagger+Prism でローカルでモックサーバーが起動できるます。
`npm run start`で起動した場合はこのモックサーバーと通信するようにしています。
API 設計については言及しません。（が、画面単位で API を作るよりは意味のあるデータの単位で API を作った方がサーバー改修なしで画面修正ができるようになると思います）

### 状態管理

特に何も使ってなくて、React-Query からユーザーデータのキャッシュを取るか、Context API を使っています（画面遷移、BGM、背景画像、HTTPClient）
サンプルではユースケースがほぼないので実はバグってたり、作り込んでると機能不足にはなる可能性はあります。

### レスポンシブ

今回のサンプルではあまり例がありません。
`@include responsive`と書かれてる箇所や Styles.scss の下の方の定義を見てみてください。
（コピペの寄せ集めだったりするので細かい部分は気にしないでください）

### その他利用ライブラリ

- react-toast-notifications:トーストを表示する（特に必要ではないし、このライブラリもググってでてきただけ）
- classnames:CSS のクラス適用をやりやすくするもの

### どうでも良い話

- BGM は適当実装なので曲の切り替えができません（再生中の曲が止まらない）
- BGM 実装のために mp3 をバンドルに含むように`react-app-env.d.ts`を修正しています
- TypeScript を使うからには型パズルとはいかないまでもちゃんと定義したいところ（参考：Data/Models.ts の ResponseModel のようにユニオン型を使うとできてる感が増す）
- ロゴやアイコンは可能なら SVG にしましょう（IE11 でも問題なく表示できます）
- 割と CSS アニメーション使ってますが最近はあまり問題起きるイメージないのでどんどん使いたいところ（経験上、過去問題が起きたのは animationend のイベントを待ってると Chrome のバージョンアップで死んだりました）
- prism だとディレイを入れれないっぽいのでローディングの確認ができなくて不便（過去プロジェクトだとモックサーバーにわざと 1 秒ディレイをいれて開発してた）
- eslint の自動実行はパースエラーになるのでとりあえず動かないようにしてます
