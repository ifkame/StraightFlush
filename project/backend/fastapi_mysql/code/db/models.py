# -*- coding: utf-8 -*-
'''
ORM用のモデルの定義ファイル 
'''
# SQLAlchemyから使用する型をインポート 
from datetime import date
from email.headerregistry import UniqueAddressHeader
from enum import unique
from sqlite3 import Timestamp
import string
# from sqlite3 import Time
from tokenize import Double
from xmlrpc.client import Boolean
from sqlalchemy import Column, ForeignKey, Integer, String, Time, Float, Date, DateTime, Boolean
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
    point = Column(Integer , default=0)

class Store(ds.Base):
    __tablename__ = 'stores'
    store_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    start_at = Column(Time, nullable=False)
    end_at = Column(Time, nullable=False)
    address = Column(String(30), nullable=False)
    content = Column(String(300))
    qr_path = Column(String(50), nullable=False, unique=True)
    latitude = Column(Float, nullable=False, unique=True)
    longitude = Column(Float, nullable=False, unique=True)
    opening_at = Column(Date, nullable=False)

class Product(ds.Base):
    __tablename__ = 'products'
    product_id = Column(Integer, primary_key=True, autoincrement=True)
    store_id = Column(Integer, ForeignKey('stores.store_id'), nullable=False)
    name = Column(String(30), nullable=False)
    img_path = Column(String(50), nullable=False, unique=True)

class Event(ds.Base):
    __tablename__ = 'events'
    event_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256), nullable=False)
    start_at = Column(DateTime, nullable=False)
    end_at = Column(DateTime)
    func_name = Column(String(30), nullable=False)
    point =  Column(Integer,nullable=False)

class Stamp(ds.Base):
    __tablename__ = 'stamps'
    stamp_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer,  ForeignKey('users.user_id'), nullable=False)
    product_id = Column(Integer,  ForeignKey('products.product_id'), nullable=False)
    img_path = Column(String(50),  unique=True)
    created_at = Column(DateTime, nullable=False)

class Event_log(ds.Base):
    __tablename__ = 'event_logs'
    event_log_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer,  ForeignKey('users.user_id'), nullable=False)
    event_id = Column(Integer, ForeignKey('events.event_id'), nullable=True)
    created_at = Column(DateTime, nullable=False)

class Notice_log(ds.Base):
    __tablename__ = 'notice_logs'
    notice_log_id = Column(Integer,  primary_key=True, autoincrement=True)
    user_id = Column(Integer,  ForeignKey('users.user_id'), nullable=False)
    store_id = Column(Integer,  ForeignKey('stores.store_id'), nullable=False)
    click_flg = Column(Boolean, nullable=False)
    created_at = Column(DateTime, nullable=False)

class Payment_log(ds.Base):
    __tablename__ = 'payment_logs'
    payment_log_id = Column(Integer,  primary_key=True, autoincrement=True)
    user_id = Column(Integer,  ForeignKey('users.user_id'), nullable=False)
    store_id = Column(Integer,  ForeignKey('stores.store_id'), nullable=False)
    user_point = (Integer)
    created_at = Column(DateTime, nullable=False)