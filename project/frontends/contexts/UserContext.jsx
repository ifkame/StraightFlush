import { string } from 'prop-types';
import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

const defaultContext = {
	email: string,
	SetEmail: React.Component,	
	password: string,
	SetPassword: React.Component,
	age: Date,
	SetAge: React.Component,
	gender: string,
	SetGender: React.Component,
	frequency: string,
	SetFrequency: React.Component,
	range: string,
	SetRange: React.Component,
}

const CreateContext = createContext(defaultContext);

export function userContext() {
	return useContext(CreateContext);
}

export function UserProvider({ children }) {
	const [ email, SetEmail ] = useState(''); //メール
	const [ password, SetPassword ] = useState(''); //パスワード
	const [ age, SetAge ] = useState(false); //誕生日
	const [ gender, SetGender ] = useState('女性'); //性別
	const [ frequency, SetFrequency ] = useState('１時間'); //通知間隔
	const [ range, SetRange ] = useState('１００m'); //通知範囲

	//Step１の値変更時の処理
	useEffect(
		() => {
			//Step１確認用コンソール
			console.log(`email: ${email}, password: ${password}`);
		},
		[ email, password ]
	);

	//Step２の値変更時の処理
	useEffect(
		() => {
			//Step２確認用コンソール
			console.log(`age: ${age}, gender: ${gender}`);
		},
		[ age, gender ]
	);

	//Step３の値変更時の処理
	useEffect(
		() => {
			//Step３確認用コンソール
			console.log(`frequency: ${frequency}, range: ${range}`);
		},
		[ frequency, range ]
	);

	//使用するコンテキストの値（関数を含む）
	const value = {
		email: email,
		SetEmail: SetEmail,
		password: password,
		SetPassword: SetPassword,
		age: age,
		SetAge: SetAge,
		gender: gender,
		SetGender: SetGender,
		frequency: frequency,
		SetFrequency: SetFrequency,
		range: range,
		SetRange: SetRange
	};

	return <CreateContext.Provider value={value}>{children}</CreateContext.Provider>;
}
