-- ユーザー
CREATE TABLE users(
    user_id INT AUTO_INCREMENT,
    fcm_token VARCHAR(256) NOT NULL,
    mail VARCHAR(50),
    password VARCHAR(64),
    point INT DEFAULT 0 NOT NULL,
    PRIMARY KEY(user_id),
    UNIQUE(fcm_token)
);

-- 店舗 緯度経度が複合ユニークになっていたので別々にしました
CREATE TABLE stores(
     store_id INT AUTO_INCREMENT,
     name VARCHAR(30) NOT NULL,
     start_at TIME NOT NULL,
     end_at TIME NOT NULL,
     address VARCHAR(50) NOT NULL,
     content VARCHAR(300),
     qr_path VARCHAR(50) NOT NULL,
     latitude DOUBLE(9,6) NOT NULL,
     longitude DOUBLE(9,6) NOT NULL,
     opening_at DATE NOT NULL,
     PRIMARY KEY(store_id),
	UNIQUE(qr_path),
     UNIQUE(latitude),
	UNIQUE(longitude)
);

-- 商品
CREATE TABLE products(
     product_id INT AUTO_INCREMENT,
     store_id INT NOT NULL,
     name VARCHAR(30) NOT NULL,
     img_path VARCHAR(50) NOT NULL,
     PRIMARY KEY(product_id),
     CONSTRAINT fk_products_stores
     FOREIGN KEY (store_id) 
     REFERENCES stores(store_id),
     UNIQUE(img_path)
);

-- イベント
CREATE TABLE events(
	event_id INT AUTO_INCREMENT,
	name VARCHAR(256) NOT NULL,
     start_at DATETIME NOT NULL,
     end_at DATETIME,
     func_name VARCHAR(30) NOT NULL,
     point INT NOT NULL,
     PRIMARY KEY(event_id),
     UNIQUE(name)
);

-- スタンプ 主キーを追加
CREATE TABLE stamps(
	stamp_id INT AUTO_INCREMENT,
	user_id INT NOT NULL,
	product_id INT NOT NULL,
	img_path VARCHAR(50),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
				ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(stamp_id),
	CONSTRAINT fk_stamps_users
    	FOREIGN KEY (user_id)
    	REFERENCES users(user_id),
	CONSTRAINT fk_stamps_product
    	FOREIGN KEY (product_id) 
    	REFERENCES products(product_id),
	UNIQUE(img_path)
);

-- イベントログ 主キーを追加
CREATE TABLE event_logs(
	event_log_id INT AUTO_INCREMENT,
     user_id INT NOT NULL,
     event_id INT NOT NULL,
     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
                ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(event_log_id),
     CONSTRAINT fk_eventLg_users
     FOREIGN KEY (user_id) 
     REFERENCES users(user_id),
     CONSTRAINT fk_eventLg_events
     FOREIGN KEY (event_id) 
     REFERENCES events(event_id)
);

-- 通知ログ 主キーを追加
CREATE TABLE notice_logs(
     notice_log_id INT AUTO_INCREMENT,
     user_id INT NOT NULL,
     store_id INT NOT NULL,
     click_flg BOOLEAN NOT NULL DEFAULT FALSE,
     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
                ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY(notice_log_id),
     CONSTRAINT fk_noticeLg_users
     FOREIGN KEY (user_id) 
     REFERENCES users(user_id), 
     CONSTRAINT fk_noticeLg_stores
     FOREIGN KEY (store_id) 
     REFERENCES stores(store_id)
);


-- 決算ログ　主キーを追加
CREATE TABLE payment_logs(
	payment_log_id INT AUTO_INCREMENT,
     user_id INT NOT NULL,
     store_id INT NOT NULL,
     user_point INT,
     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
                ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(payment_log_id),
     CONSTRAINT fk_paymentLg_users
     FOREIGN KEY (user_id) 
     REFERENCES users(user_id),
     CONSTRAINT fk_paymentLg_stores
     FOREIGN KEY (store_id) 
     REFERENCES stores(store_id)
);


