# -*- coding: utf-8 -*-
'''
ORM用のモデルの定義ファイル 
'''
# SQLAlchemyから使用する型をインポート 
from ast import Store
from enum import unique
from time import time
from unicodedata import name
from sqlalchemy import Column, Integer, String,Time,Float,Date
from sqlalchemy.schema import UniqueConstraint
# データバリデーション用にpydanticインポート
from pydantic import BaseModel
# ORM設定ファイルインポート
from db import settings as ds

# Baseを継承しているのでqueryプロパティを持つ
# usersテーブルのモデルUserを定義
class User(ds.Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    fcm_token = Column(String(256), nullable=False,unique=True)
    mail = Column(String(50), nullable=False,unique=True)
    password = Column(String(64), nullable=True)
    point = Column(Integer , default=0,nullable=False)

class Store(ds.Base):
    __tablename__ = 'stores'
    __table_args__ = (UniqueConstraint('latitude','longitude'),{})
    store_id = Column(Integer,primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    start_at =  Column(Time, nullable=False)
    end_at = Column(Time, nullable=False)
    address = Column(String(50), nullable=False)
    content = Column(String(300), nullable=True)
    qr_path = Column(String(50), nullable=False,unique=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    opening_at = Column(Date, nullable=False)
