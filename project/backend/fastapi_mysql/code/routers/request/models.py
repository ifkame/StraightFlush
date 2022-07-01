# -*- coding: utf-8 -*-
'''
リクエストボディ用のモデルの定義ファイル 
'''
from datetime import datetime, date, time
import mailbox
# from time import time
from typing import Optional
from unicodedata import name
from pydantic import BaseModel

class User(BaseModel):
    fcm_token: str
    mail: Optional[str]
    password: Optional[str]

class Store(BaseModel):
    name: str
    start_at: time #エラーが起こる
    end_at: time
    address: str
    content: str
    qr_path: str
    latitude: float
    longitude: float
    opening_at: date

class Product(BaseModel):
    name: str
    img_path: str

class Event(BaseModel):
    name: str
    start_at: datetime
    end_at: datetime
    func_name: str
    point: int

class Event_log(BaseModel):
    created_at: datetime

class Stamp(BaseModel):
    img_path: str
    created_at: datetime

class Notice_log(BaseModel):
    click_flg: bool
    created_at: datetime

class Payment_log(BaseModel):
    user_point: int
    created_at: datetime