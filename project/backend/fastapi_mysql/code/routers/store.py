'''
ユーザーAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from ast import Store
from turtle import st
from unicodedata import name



from fastapi import APIRouter

# dbモジュールインポート
from db import models as dm
from db import settings as ds
# リクエストボディ用のモデルインポート
from .request import models as rm


# Routerインスタンス生成
router = APIRouter()

############ エンドポイントの実装 ############
@router.get("/stores/",tags=["stores"])
def read_store():
    store=ds.Session.query(dm.Store.name).all()
    return store


