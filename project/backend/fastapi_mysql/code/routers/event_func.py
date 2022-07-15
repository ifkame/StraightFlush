import requests
import json

user_id = 1
event_id = 1

# def event_func(user_id:int, event_id:int):
#JSON形式のデータ
json_data = {
    "user_id": user_id,
    "event_id": event_id
}   

#POST先URL
url = "http://localhost:8888/event_log/?user_id=" + str(user_id) + "&event_id=" + str(event_id)

print(requests.status_codes)

if(requests.status_codes == 200): 
    print("通信成功")
#POST送信
    response = requests.post(
        url,
        data = json.dumps(json_data)    #dataを指定する
        )
else:
    print("通信失敗")

# #テスト用
# user_id = int(input("ユーザーID"))
# event_id = int(input("イベントID"))

# event_func(1, 1)