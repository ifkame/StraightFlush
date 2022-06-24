# -*- coding: utf-8 -*-
'''
リクエストボディ用のモデルの定義ファイル 
'''
import mailbox
from typing import Optional
from unicodedata import name
from pydantic import BaseModel

class User(BaseModel):
    fcm_token: str
    mail: Optional[str]
    password: Optional[str]

class Stores(BaseModel):
    name :str

class Notification(BaseModel):
    user_id:int
    latitude:float
    longitude:float
    re_notification:int
    range:int

