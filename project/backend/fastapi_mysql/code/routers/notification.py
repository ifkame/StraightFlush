'''
通知送信API
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from re import S
from unicodedata import name
from fastapi import APIRouter

# 緯度経度から距離を求める用にGeoyインポート
from geopy.distance import geodesic
# リクエストボディ用のモデルインポート
from .request import models as rm

# dbモジュールインポート
from db import models as dm
from db import settings as ds




# Routerインスタンス生成
router = APIRouter()

############ エンドポイントの実装 ############

@router.post("/notification",tags=["notification"])
def push_notification(data:rm.Notification):
    # JSONで受け取ったユーザーの経度、緯度
    user_position = (data.latitude,data.longitude)
    # モデル変数
    store = dm.Store
    # 店舗情報を取得
    stores = ds.Session.query(store.store_id, store.latitude, store.longitude).all()

    # print(stores[0].store_id)
    # 取得数のカウンタ変数
    count = (len(stores))

    # 取得数だけループ
    #for num in range(count):
    dis = stores.apply(lambda x:geodesic((x["latitude"], x["longitude"]), location), axis=1)

    # TokyoStation = (35.681382, 139.76608399999998)
    # NagoyaStation = (35.170915, 136.881537)
    # dis = geodesic(TokyoStation, NagoyaStation).km
    #print(dis)



    return {"msg":count}
