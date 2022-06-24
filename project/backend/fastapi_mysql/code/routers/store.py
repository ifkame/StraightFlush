'''
ユーザーAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート



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
@router.get("/stores/",tags=["stores"])
def read_store():
    st = dm.Store()
    store = st.query.all()
    return store

#  IDと一致する店舗の取得
@router.get("/stores/{store_id}",tags=["stores"])
def read_store(id: int):
    store = ds.Session.query(dm.Store).\
        filter(dm.Store.store_id == id).first()
    if(store == None ):
        raise HTTPException(status_code=404, detail="指定されたIDの店舗は存在しません")
    return store
