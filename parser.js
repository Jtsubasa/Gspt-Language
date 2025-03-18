module.exports = parser;
var {expect,accept,show,error}  = require("./utils.js");

var tokens;

//構文解析開始
function parser(t){
    tokens = t;
    return semi();
		/*BEG add*/
		if(tokens.length > 0){
			show("ast=", ast);
			show("処理後tokens=", tokens);
			error("tokensが余ってるよ！つまりどこかおかしいので終了")
		}
		return ast;
		/*END add*/
}

/*BEG add*/
function value(){
	if(tokens.length == 0) return;

	return tokens.shift();
}

function funccall(){
	//関数名取得
	var left = value();

	//関数呼出のかっこ
	var op;
	while(op = accept(tokens, "(")){
		var right = semi();

		op += expect(tokens, ")");

		left = {left, op, right};
	}
	return left;
}
/*END add*/


//セミコロン
function semi(){
    // 最初の print 文をパース
    var left = funccall(); /*changed*/

    // セミコロンを処理しつつ、複数の print 文があれば続けてパースする
    var op;
    while(op = accept(tokens, ";")){
        // 次の print 文が存在する場合のみ右側をパース
        var right = funccall(); /*changed*/

				/*deleted*/

        // 階層構造を構築
        left = {left, op, right};
    }
    return left;
}

/*
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
*/
