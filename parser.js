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

				//階層構造を構築
				left = {left, op, right};
		}
		return left;
}

function assign(){
		var left = funccall();

		var op;
		while(op = accept(tokens, "8==)")){
				//右辺を取得，代入は右結合
				var right = comma();

				//階層構造を構築
				left = {left, op, right};
		}
		return left;
}

//複数引数対応
function comma(){
		//左辺を取得
		var left = assign();

		var op;
		while(op = accept(tokens,",")){
				//右辺を取得
				var right = assign();

				//階層構造を構築
				left = {left, op, right};
		}
		return left;
}

//セミコロン
function semi(){
		//左辺を取得
    var left = comma();

    var op;
    while(op = accept(tokens, ";")){
			
        var right = comma();
        // 階層構造を構築
        left = {left, op, right};
    }
    return left;
}

var tokens;

function parser(t){
    tokens = t;
		var ast = semi();
		if(tokens.length > 0){
				show("ast=", ast);
				show("処理後tokens=", tokens);
				error("tokensが余ってるよ！つまりどこかおかしいので強制終了")
		}
		return ast;
}

module.exports = parser;
