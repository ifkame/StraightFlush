# システム開発 ストレートフラッシュ 共有ノート(FastAPI編)
## バックエンド開発に必要な知識や情報を共有するファイルです。

<BR>

# 目次
<!-- 目次部分(リンクになるところ) -->
1. [FastAPIとは](#anchor1)
1. [Hello Word](#anchor2)
1. [パスパラメータとクエリパラメータ](#anchor3)

<BR>

<a id="anchor1"></a>
# FastAPIとは
Python3.6で動作するAPI作成に特化したフレームワークです。

型安全かつWebSocketなどもサポートされているので、FastAPIを学ぶことで、ある程度API開発に必要なところを抑えれると思います。

<BR>

公式のドキュメントが充実しているので、時間があれば見てみると勉強になるかも。

[FastAPI](https://fastapi.tiangolo.com/ja/)

<BR>

<div style="page-break-before:always"></div>

<a id="anchor2"></a>
# Hello World
**前提条件**

Dockerが動く環境

<BR>

ビルド
```
cd /docker/fastapi_helloworld
docker build -t hello_word .
docker run -d --name fastapi_helloword -p 8081:80 hello_word
```
すべてのコンテナ情報出力
```
docker ps -a 
```

実行結果

```
CONTAINER ID    IMAGE        COMMAND        CREATED         STATUS          PORTS
3cbee53d6aab    hello_word   "/start.sh"    8 seconds ago   Up 6 seconds    0.0.0.0:8081->80/tcp, :::8081->80/tcp 
NAMES
fastapi_helloword
```

以下のリンクにアクセスしてみましょう。



[localhost:8081/](http://localhost:8081/)

以下のようなレスポンスが帰ってきてればOKです。

```
{
Hello: "World"
}
```



FstaAPIではSwaggerというツールからAPIのドキュメントを自動生成してくれます。
生成されるUIからAPIのテストもできて便利なのでぜひ使ってみましょう。

[localhost:8081/docs](http://localhost:8081/docs)

<BR>

<div style="page-break-before:always"></div>

<a id="anchor3"></a>

# パスパラメータとクエリパラメータ
**パスパラメータ** : URLのパスとして表現されるパラメータの事です。

例  hogehoge.com/api/products/1

上記の例であれば
productsの後のパスに **1** という値が値が入っていますこれが**パスパラメータ**です。

*どういう場合に使うのか*    : 一意なリソースを表す場合に使います。
(ユーザーIDや商品IDなど)

<BR>

**クエリパラメータ** : URLに付け加えて表現されるパラメータの事です。

PHPでいう $_GET['key名']に入っているやつです！

<BR>

例  hogehoge.com/api/products?name="コーヒー"

上記の例であれば
productsの後に**name**というキーに対してコーヒーというが**値**が入っていますこれが**クエリパラメータ**です。

*どういう場合に使うのか* : リソースを一意に表す必要がなく省略可能な項目を指定するときに使います。
(何件検索するのか、検索ワードの指定など)

<BR>

## 簡単なAPIを叩いてみる。

クエリパラメータとパスパラメータを体験できるエンドポイントを用意しているのでアクセスして動作を確認してみてください。

※今回は配列の値を返しているだけです。実際の開発だとDBなどからデータを取ってきて返します。

ユーザーを全件返す  :
[localhost:8081/users](http://localhost:8081/users)

ユーザー名から文字列を検索して一致するユーザー名を返す  :
[localhost:8081/users?word=吉](http://localhost:8081/users?word=吉)

指定されたユーザーIDのユーザー名を返す  :
[localhost:8081/users/1](http://localhost:8081/users/1)










