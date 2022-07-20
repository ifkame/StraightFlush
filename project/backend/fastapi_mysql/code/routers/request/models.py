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
    # point: int

class Store(BaseModel):
    name: str
    start_at: time
    end_at: time
    address: str
    content: str
    qr_path: str
    latitude: float
    longitude: float
    opening_at: date

class Product(BaseModel):
    store_id: int
    name: str
    img_path: str

class Event(BaseModel):
    name: str
    start_at: datetime
    end_at: datetime
    func_name: str
    point: int

class Stamp(BaseModel):
    user_id: int
    product_id: int
    store_id: int
    img_path: str

class Event_log(BaseModel):
    user_id: int
    event_id: int

class Notice_log(BaseModel):
    user_id: int
    store_id: int
    click_flg: bool

class Payment_log(BaseModel):
    user_id: int
    store_id: int
    user_point: int