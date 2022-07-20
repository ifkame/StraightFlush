import requests
import json

#今まで来店履歴がないお店に訪問する
#報酬: 300ポイント
def event_func1(user_id:int, store_id, event_id:int):
    
    #付与ポイント    
    point = 300
    #GET先URL
    check_stamp_url = "http://localhost:8888/store_stamps/?user_id=" + str(user_id) + "&store_id=" + str(store_id)

    r = requests.get(check_stamp_url)

    if(r.status_code == 200): 
        print("通信成功")

        #行った店が初めてか
        if(int(r.text) == 1):
            #ポイントの登録
            add_point(user_id, point)
            #イベントログの登録
            log(user_id, event_id)
    #POST送信
    else:
        print("通信失敗")

#開業30日以内のお店
# 5店舗で食事する
# 報酬 : 800ポイント
def event_func2(user_id:int, store_id, event_id:int):
    print()

# 2022年5月中に10店舗で食事する
# 報酬 : 500ポイント
def event_func3(user_id:int, event_id:int):
    
    #付与ポイント    
    point = 500
    #GET先URL
    store_count_url = "http://localhost:8888/count_stamps/?user_id=" + str(user_id)

    r = requests.get(store_count_url)

    if(r.status_code == 200): 
        print("通信成功")
        #7月中に10店舗行ったか
        if(int(r.text) >= 10):
           #ポイントの登録
            add_point(user_id, point)
            #ログの登録
            log(user_id, event_id)
    else:
        print("通信失敗")

#logの登録
def log(user_id:int, event_id:int):
        
    #JSON形式のデータ
    json_data = {
        "user_id": user_id,
        "event_id": event_id
    }   

    #POST先URL
    log_url = "http://localhost:8888/event_log/?user_id=" + str(user_id) + "&event_id=" + str(event_id)

    r = requests.post(log_url)

    if(r.status_code == 200): 
        print("通信成功")
    #POST送信
        response = requests.post(
            log_url,
            data = json.dumps(json_data)    #dataを指定する
            )
    else:
        print("通信失敗")

#pointの追加
def add_point(user_id:int, point:int):
        
    #POST先URL
    point_url = "http://localhost:8888/users_point/" + str(user_id) + "?point=" + str(point)

    r = requests.put(point_url)

    if(r.status_code == 200): 
        print("通信成功")
    else:
        print("通信失敗")

#テスト用
# event_func1(1, 1, 1)
# event_func2(1, 1) 
# event_func3(1, 1) 
