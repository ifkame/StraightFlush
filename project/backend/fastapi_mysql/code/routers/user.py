'''
ユーザーAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from db.models import User
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

# ユーザーの全件取得
@router.get("/users/",tags=["users"])
def read_users():
    #users = ds.Session.query(dm.User.mail).all()
    users = ds.Session.query(User).all()
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

@router.post("/users/",tags=["users"])
async def post_users(body:rm.User):
     # Userモデル変数
    #user = dm.User()
    session=ds.Session()
    with ds.session_scope() as session:
        dm.User.fcm_token=body.fcm_token
        dm.User.mail=body.mail
        dm.User.password=body.password