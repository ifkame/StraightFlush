'''
スタンプAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from dataclasses import dataclass
from datetime import datetime
from unicodedata import name
from db.models import Stamp
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

# スタンプの全件取得
@router.get("/stamps/",tags=["stamps"])
def read_stamps():
    stamps = dm.Stamp.query.all()
    return stamps

# IDと一致するスタンプの取得
@router.get("/stamps/{stamp_id}",tags=["stamps"])
def read_event(stamp_id: int):
    # first()で最初の一件を返す
    stamp = ds.Session.query(dm.Stamp).\
        filter(dm.Stamp.stamp_id == stamp_id).first()
    if(stamp == None ):
        raise HTTPException(status_code=404, detail="指定されたIDのスタンプは存在しません")
    return stamp

# stampsテーブルにデータの更新
@router.put("/stamps/{stamp_id}",tags=["stamps"])
async def update_stamps(stamp_id:int, body:rm.Stamp):

     # stampモデル変数
    stamp = dm.Stamp()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.Stamp.query.filter(dm.Stamp.stamp_id == stamp_id).first()
        entry.user_id = body.user_id
        entry.product_id = body.product_id
        entry.img_path = body.img_path
        # entry.created_at =body.created_at
    # return {"data":body}

#stampの新規作成
@router.post("/stamp/", tags=["stamps"])
async def create_stamps(body:rm.Stamp):
    stamp = dm.Stamp()
    session=ds.Session()
    stamp.user_id= body.user_id
    stamp.product_id = body.product_id
    stamp.img_path = body.img_path
    stamp. created_at = datetime.now()
    session.add(stamp)
    session.commit()
    
