INSERT INTO users (fcm_token,mail,password) VALUES ("xxxxxxxxxx", "hogehoge@gmail.com","xxxxxxxxxx");

INSERT INTO stores (name,start_at,end_at,address,content,qr_path,latitude,longitude,opening_at) VALUES ('test', '00:00:00', '00:00:00', 'hogehoge@gmail.com', 'コメント', 'http://qr.co.jp', '34.741612', '135.637207', '2019-04-17');

INSERT INTO products (store_id, name,img_path) VALUES ('3', 'xxxxxxxxxx', 'http://img.co.jp');

INSERT INTO events (name, start_at, end_at, func_name, point) VALUES ('xxxxxxxxxx', '2014-08-06 21:15:49', '2014-08-06 21:15:49', 'xxxxxxxxxx', '0');

INSERT INTO  event_logs (user_id, event_id) VALUES("1", "1");

INSERT INTO stamps (user_id, img_path) VALUES("1", "http://image.co.jp");

INSERT INTO notice_logs (user_id, store_id, click_flg) VALUES("1", "3", False);

INSERT INTO payment_logs (user_id, store_id, user_point) VALUES("1", "3", "100");
