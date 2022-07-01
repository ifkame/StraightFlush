'''
イベントログAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from dataclasses import dataclass
from unicodedata import name
from db.models import Event_log
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

# イベントログの全件取得
@router.get("/event_logs/",tags=["event_logs"])
def read_event_logs():
    event_logs = dm.Event_log.query.all()
    return event_logs

# IDと一致するイベントログの取得
@router.get("/event_logs/{user_id}",tags=["event_logs"])
def read_event_log(user_id: int):
    # first()で最初の一件を返す
    event_log = ds.Session.query(dm.Event_log).\
        filter(dm.Event_log.user_id == user_id).first()
    if(event_log == None ):
        raise HTTPException(status_code=404, detail="指定されたIDのイベントログは存在しません")
    return event_log

# event_logsテーブルにデータの更新
@router.put("/event_logs/{user_id}",tags=["event_logs"])
async def update_event_logs(user_id:int, body:rm.Event_log):

     # event_logモデル変数
    event_log = dm.Event_log()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.Event_log.query.filter(dm.Event_log.user_id == user_id).first()
        # entry.event_id = body.event_id
        entry.created_at =body.created_at
    # return {"data":body}


