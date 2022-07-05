'''
店舗API
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from dataclasses import dataclass
from unicodedata import name
from db.models import Store
from fastapi import APIRouter
from fastapi import HTTPException

# dbモジュールインポート
from db import models as dm
from db import settings as ds

# リクエストボディ用のモデルインポート
from .request import models as rm

# Routerインスタンス生成
router = APIRouter()

############ エンドポイントの実装 ############

# 店舗の全件取得
@router.get("/stores/",tags=["stores"])
def read_stores():
    stores = dm.Store.query.all()
    return stores

# IDと一致する店舗の取得
@router.get("/stores/{store_id}",tags=["stores"])
def read_store(store_id: int):
    # first()で最初の一件を返す
    store = ds.Session.query(dm.Store).\
        filter(dm.Store.store_id == store_id).first()
    if(store == None ):
        raise HTTPException(status_code=404, detail="指定されたIDの店舗は存在しません")
    return store

# storesテーブルにデータの更新
@router.put("/stores/{store_id}",tags=["stores"])
async def update_stores(store_id:int, body:rm.Store):

     # storeモデル変数
    store = dm.Store()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.Store.query.filter(dm.Store.store_id == store_id).first()
        entry.name = body.name
        entry.start_at = body.start_at 
        entry.end_at = body.end_at 
        entry.address = body.address
        entry.content = body.address
        entry.qr_path = body.qr_path
        entry.latitude = body.latitude
        entry.longitude = body.longitude
        entry.opening_at = body.opening_at
    # return {"data":body}


#storeの新規作成
@router.post("/stores", tags=["stores"])
async def create_stores(body:rm.Store):
    store = dm.Store()
    session=ds.Session()

    store.name = body.name
    store.start_at = body.start_at
    store.end_at = body.end_at
    store.address = body.address
    store.content = body.content
    store.qr_path = body.qr_path
    store.latitude = body.latitude
    store.longitude = body.longitude
    store.opening_at = body.opening_at

    session.add(store)
    session.commit()

# IDと一致する店舗の削除
@router.delete("/stores/{store_id}")
async def delete_stores(store_id:int):
     # storeモデル変数
    store = dm.Store()
    session=ds.Session()
    with ds.session_scope() as session:
        dm.Store.query.filter(dm.Store.store_id == store_id).delete()