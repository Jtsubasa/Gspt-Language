module.exports = parser;
var {expect,accept,show,error}  = require("./utils.js");

var tokens;

//構文解析開始
function parser(t){
    tokens = t;
    return semi();
}

//セミコロン
function semi(){
    // 最初の print 文をパース
    var left = callprint();

    // セミコロンを処理しつつ、複数の print 文があれば続けてパースする
    var op;
    while(op = accept(tokens, ";")){
        // 次の print 文が存在する場合のみ右側をパース
        var right = callprint();
        if (!right) break;  // 右側が無い場合はループを終了

        // 階層構造を構築
        left = {left, op, right};
    }
    return left;
}

//♂関数呼び出しの構文解析
function callprint(){
    if(tokens.length == 0) return;

    // 関数名が "♂" であることを確認
    var left = expect(tokens, "♂");

    // 関数呼び出しの丸カッコであること
    expect(tokens, "(");

    // 文字列を取得
    var msg = tokens.shift();
    if (!msg) error("文字列が見つかりませんでした");

    // ダブルクォーテーションを取り除く
    var right = msg.substr(1, msg.length-2);

    // 閉じカッコであること
    expect(tokens, ")");

    // opは固定値 "()" にする
    var op = "()";

    // 新しいオブジェクト(tree構造でのノード)を作成
    return {left, op, right};
}
