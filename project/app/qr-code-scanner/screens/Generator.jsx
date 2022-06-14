import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Generator() {
    //QRコードになるリンク
    const [qrCodeValue, setQrCodeValue] = useState("");
    //入力されたテキスト
    const [inputText, onChangeInputText] = useState("");

    //inputTextが空白ではなければ、
    //qrCodeValueを入力されたテキストに設定する
    const generateQrCode = () => {
        if (!inputText) {
            alert("リンクを入力してください");
            return;
        }
        setQrCodeValue(inputText);
    };

    return (
        <View style={styles.container}>
            <Text>リンクを入力してください</Text>
            <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={onChangeInputText}
            />
            <Pressable style={styles.button} onPress={generateQrCode}>
                <Text style={styles.buttonText}>バーコードを生成する</Text>
            </Pressable>
            {/* qrCodeValueは空文字列でなければ、QRコードを表示する */}
            {qrCodeValue ? <QRCode value={qrCodeValue} /> : <Text></Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 40,
        marginHorizontal: 12,
        marginVertical: 20,
        borderWidth: 1,
        padding: 10,
        width: 200,
        backgroundColor: "white",
    },
    button: {
        backgroundColor: "cyan",
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 40,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "whitesmoke",
    },
});