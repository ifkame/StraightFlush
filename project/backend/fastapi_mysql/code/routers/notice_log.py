'''
ユーザーAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from datetime import datetime
from dataclasses import dataclass
from unicodedata import name

import click
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
@router.get("/notice_logs/{notice_log_id}",tags=["notice_logs"])
def read_notice_log(notice_log_id: int):
    # first()で最初の一件を返す
    notice_log = ds.Session.query(dm.Notice_log).\
        filter(dm.Notice_log.notice_log_id == notice_log_id).first()
    if(notice_log == None ):
        raise HTTPException(status_code=404, detail="指定されたIDの通知ログは存在しません")
    return notice_log

# notice_logsテーブルにデータの更新
@router.put("/notice_logs/{notice_log_id}",tags=["notice_logs"])
async def update_notice_log(notice_log_id:int, body:rm.Notice_log):

     # notice_logモデル変数
    notice_log = dm.Notice_log()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.Notice_log.query.filter(dm.Notice_log.notice_log_id == notice_log_id).first()
        entry.click_flg = body.click_flg
        entry.created_at = datetime.now()
    # return {"data":body}

#notice_logの新規作成
@router.post("/notice_log/", tags=["notice_logs"])
async def create_notices(body:rm.Notice_log):
    notice_log = dm.Notice_log()
    session=ds.Session()
    notice_log.user_id = body.user_id
    notice_log.store_id = body.store_id
    notice_log.click_flg = body.click_flg
    notice_log.created_at = datetime.now()
    session.add(notice_log)
    session.commit()


