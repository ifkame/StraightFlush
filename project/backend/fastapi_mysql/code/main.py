# -*- coding: utf-8 -*-
'''
FastAPIのメインインスタンスが記述された実行ファイル 
'''

# FastAPIインポート
from fastapi import FastAPI
# 作成したRouter1インスタンスが存在するファイルをインポート
from routers import user,store,notification
# CORSを回避するために必要
from starlette.middleware.cors import CORSMiddleware

# FastAPIのメインインスタンス生成
app = FastAPI()

# CORSを回避するために設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routerインスタンスで作成したエンドポイントを追加
app.include_router(user.router)
app.include_router(store.router)
app.include_router(notification.router)

