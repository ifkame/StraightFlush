'''
ログインAPI
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート

import hashlib
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
@router.post("/login/",tags=["login"])
def login(body:rm.Login):
    users = ds.Session.query(User).filter(User.mail==body.mail).all()
    cnt = len(users)
    if(cnt == 0):
        raise HTTPException(status_code=404, detail="メールアドレスが存在しません")

    if(cnt > 0):
        # 解体
        for i in users:
            mail=i.mail
            password=i.password
        if(body.mail == mail and password == hashlib.sha256(body.password.encode()).hexdigest()):
            raise HTTPException(status_code=200)
        else:
            raise HTTPException(status_code=401, detail="認証情報が正しくありません")
    return HTTPException(status_code=500)