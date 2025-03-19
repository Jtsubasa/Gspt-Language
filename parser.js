var {expect,accept,show,error}  = require("./utils.js");

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
		var right = comma();

		op += expect(tokens, ")");

		left = {left, op, right};
	}
	return left;
}

//複数引数対応
function comma(){
	var left = funccall();

	var op;
	while(op = accept(tokens,",")){
		var right = funccall();

		left = {left, op, right};
	}
	return left;
}

//セミコロン
function semi(){
    // 最初の print 文をパース
    var left = comma();

    // セミコロンを処理しつつ、複数の print 文があれば続けてパースする
    var op;
    while(op = accept(tokens, ";")){
        // 次の print 文が存在する場合のみ右側をパース
        var right = comma();
        // 階層構造を構築
        left = {left, op, right};
    }
    return left;
}

var tokens;

//構文解析開始
function parser(t){
    tokens = t;
		var ast = semi();
		if(tokens.length > 0){
			show("ast=", ast);
			show("処理後tokens=", tokens);
			error("tokensが余ってるよ！つまりどこかおかしいので終了")
		}
		return ast;
}

module.exports = parser;
