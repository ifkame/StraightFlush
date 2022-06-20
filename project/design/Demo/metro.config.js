const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

//assetExts: さらに「指定した」ファイル拡張子を追加する
defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;