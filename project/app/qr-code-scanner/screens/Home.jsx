import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* QRコードスキャナー画面に移動 */}
            <Pressable
                onPress={() => navigation.navigate("スキャナー")}
                style={styles.button}
            >
                <Text style={styles.text}>QRコードを読み取る</Text>
            </Pressable>
            {/* QRコード生成画面に移動 */}
            <Pressable
                onPress={() => navigation.navigate("生成")}
                style={styles.button}
            >
                <Text style={styles.text}>QRコードを生成する</Text>
            </Pressable>
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
    button: {
        backgroundColor: "cyan",
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 20,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "whitesmoke",
    },
});