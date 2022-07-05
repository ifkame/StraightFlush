'''
ユーザーAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from dataclasses import dataclass
from unicodedata import name
from db.models import Notice_log
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

# 通知ログの全件取得
@router.get("/notice_logs/",tags=["notice_logs"])
def read_notice_log():
    notice_logs = dm.Notice_log.query.all()
    return notice_logs

# IDと一致する通知ログの取得
@router.get("/notice_logs/{notice_id}",tags=["notice_logs"])
def read_notice_log(notice_id: int):
    # first()で最初の一件を返す
    notice_log = ds.Session.query(dm.Notice_log).\
        filter(dm.Notice_log.notice_id == notice_id).first()
    if(notice_log == None ):
        raise HTTPException(status_code=404, detail="指定されたIDの通知ログは存在しません")
    return notice_log

# notice_logsテーブルにデータの更新
@router.put("/notice_logs/{notice_id}",tags=["notice_logs"])
async def update_notice_log(notice_id:int, body:rm.Notice_log):

     # notice_logモデル変数
    notice_log = dm.Notice_log()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.Notice_log.query.filter(dm.Notice_log.notice_id == notice_id).first()
        # entry.store_id = body.store_id
        entry.click_flg = body.click_flg
        entry.created_at =body.created_at
    # return {"data":body}

