'''
イベントAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from dataclasses import dataclass
from unicodedata import name
from db.models import Event
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

# イベントの全件取得
@router.get("/events/",tags=["events"])
def read_events():
    events = dm.Event.query.all()
    return events

# IDと一致するイベントの取得
@router.get("/events/{event_id}",tags=["events"])
def read_event(event_id: int):
    # first()で最初の一件を返す
    event = ds.Session.query(dm.Event).\
        filter(dm.Event.event_id == event_id).first()
    if(event == None ):
        raise HTTPException(status_code=404, detail="指定されたIDのイベントは存在しません")
    return event

# eventsテーブルにデータの更新
@router.put("/events/{event_id}",tags=["events"])
async def update_events(event_id:int, body:rm.Event):

     # eventモデル変数
    event = dm.Event()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.Event.query.filter(dm.Event.event_id == event_id).first()
        entry.name = body.name
        entry.start_at =body.start_at
        entry.end_at =body.end_at
        entry.func_name =body.func_name
        entry.point = body.point
    # return {"data":body}
