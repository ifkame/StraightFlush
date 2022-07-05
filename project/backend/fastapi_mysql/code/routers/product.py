'''
商品API
FastAPIのサブインスタンスを使っエンドポイントを実装しているファイル 
'''
# FastAPIからRouterインスタンスインポート
from dataclasses import dataclass
from unicodedata import name
from db.models import Product
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

# 商品の全件取得
@router.get("//",tags=["products"])
def read_products():
    products = dm.Product.query.all()
    return products

# IDと一致する商品の取得
@router.get("/products/{product_id}",tags=["products"])
def read_product(product_id: int):
    # first()で最初の一件を返す
    product = ds.Session.query(dm.Product).\
        filter(dm.Product.product_id == product_id).first()
    if(product == None ):
        raise HTTPException(status_code=404, detail="指定されたIDの商品は存在しません")
    return product

# productテーブルにデータの更新
@router.put("/products/{product_id}",tags=["products"])
async def update_products(product_id:int, body:rm.Product):

     # productモデル変数
    product = dm.Product()
    session=ds.Session()
    with ds.session_scope() as session:
        entry = dm.Product.query.filter(dm.Product.product_id == product_id).first()
        # entry.store_id = body.store_id
        entry.name = body.name
        entry.img_path =body.img_path
    # return {"data":body}
