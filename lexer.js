//------字句解析------//
module.exports = function(source){
    // 正規表現でトークンを抽出
    // "引用符で囲まれた文字列"、♂、丸括弧、セミコロン、
    // それ以外（空白文字以外）の連続する文字を対象とする
    var tokens = source.match(/"[^"]*"|♂|[();]|[^"♂();\s]+/g);
    return tokens;
}
