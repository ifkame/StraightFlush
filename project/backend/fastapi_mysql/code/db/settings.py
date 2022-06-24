# -*- coding: utf-8 -*-
'''
ORM (SQLAlchemy) の設定ファイル
'''
# SQLAlchemyのインポート
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.orm import Session

from contextlib import contextmanager


# MySQLへの接続情報
user_name = "db_user" # ユーザー名
password = "ecc" # ユーザーパスワード
host = "straight_flush_db"  # MySQLのサービス名
database_name = "straight_flush" #DB名

# バインディング 
DATABASE = 'mysql://%s:%s@%s/%s?charset=utf8' % (
    user_name,
    password,
    host,
    database_name,
)

# DB接続するためのEngineインスタンス
ENGINE = create_engine(
    DATABASE,
    encoding="utf-8",
    echo=True
)


# セッションクラスの作成
Session = scoped_session(
    # ORMの設定
    sessionmaker(
        autocommit=False,
        autoflush=True,
        bind=ENGINE
    )
)



# modelで使用する変数
Base = declarative_base()
# 予めテーブル定義の継承元クラスにqueryプロパティを仕込んでおく
Base.query = Session.query_property()


@contextmanager
def session_scope():
    session = Session()  # def __enter__
    try:
        yield session  # with asでsessionを渡す
        session.commit()  # 何も起こらなければcommit()
        print("Transaction Commit")
    except:
        session.rollback()  # errorが起こればrollback()
        print("Transaction Rollback")
        raise
    finally:
        session.close()  # どちらにせよ最終的にはclose()
        print("Transaction Close")
