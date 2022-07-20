'''
ユーザーAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from dataclasses import dataclass
from email.base64mime import body_decode
from unicodedata import name
from db.models import User
from fastapi import APIRouter
from fastapi import HTTPException

# dbモジュールインポート
from db import models as dm
from db import settings as ds

# リクエストボディ用のモデルインポート
from .request import models as rm

# ハッシュ化用ライブラリ
import hashlib

# Routerインスタンス生成
router = APIRouter()

############ エンドポイントの実装 ############

# ユーザーの全件取得
@router.get("/users/",tags=["users"])
def read_users():
    users = dm.User.query.all()
    return users

# IDと一致するユーザーの取得
@router.get("/users/{user_id}",tags=["users"])
def read_user(user_id: int):
    # first()で最初の一件を返す
    user = ds.Session.query(dm.User).\
        filter(dm.User.user_id == user_id).first()
    if(user == None ):
        raise HTTPException(status_code=404, detail="指定されたIDのユーザーは存在しません")
    return user

# 以下の部分が追加内容になります。
# usersテーブルにデータの更新
@router.put("/users/{user_id}",tags=["users"])
async def update_users(user_id:int, body:rm.User):

     # Userモデル変数
    user = dm.User()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.User.query.filter(dm.User.user_id == user_id).first()
        entry.fcm_token = body.fcm_token
        entry.mail =body.mail
        entry.password = body.password 
        
#userの新規作成
@router.post("/user/", tags=["users"])
async def create_users(body:rm.User):
    user = dm.User()
    session=ds.Session()
    hs_password = hashlib.sha256(body.password.encode()).hexdigest()
    user.fcm_token = body.fcm_token
    user.mail = body.mail
    user.password = hs_password 
    user.point = 0
    session.add(user)
    session.commit()

# IDと一致するユーザーの削除
@router.delete("/users/{user_id}", tags=["users"])
async def delete_users(user_id:int):
     # Userモデル変数
    user = dm.User()
    session=ds.Session()
    with ds.session_scope() as session:
        dm.User.query.filter(dm.User.user_id == user_id).delete()

# userのポイントを更新
@router.put("/users_point/{user_id}", tags=["users"])
def update_users_point(user_id:int, point:int):

     # Userモデル変数
    user = dm.User()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.User.query.filter(dm.User.user_id == user_id).first()
        entry.point += point







