'''
決済ログAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from dataclasses import dataclass
from unicodedata import name
from db.models import Payment_log
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

# 決済ログの全件取得
@router.get("/payment_logs/",tags=["payment_logs"])
def read_payment_log():
    payment_logs = dm.Payment_log.query.all()
    return payment_logs

# IDと一致する決済ログの取得
@router.get("/payment_logs/{payment_id}",tags=["payment_logs"])
def read_payment_log(payment_id: int):
    # first()で最初の一件を返す
    payment_log = ds.Session.query(dm.Payment_log).\
        filter(dm.Payment_log.payment_id == payment_id).first()
    if(payment_log == None ):
        raise HTTPException(status_code=404, detail="指定されたIDの決済ログは存在しません")
    return payment_log

# payment_logsテーブルにデータの更新
@router.put("/payment_logs/{payment_id}",tags=["payment_logs"])
async def update_payment_log(payment_id:int, body:rm.Payment_log):

     # payment_logモデル変数
    payment_log = dm.Payment_log()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.Payment_log.query.filter(dm.Payment_log.payment_id == payment_id).first()
        # entry.store_id = body.store_id
        entry.user_point = body.user_point
        entry.created_at =body.created_at
    # return {"data":body}



