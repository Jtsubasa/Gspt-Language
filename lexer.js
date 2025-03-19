//------字句解析------//
module.exports = function(source){
    // 正規表現でトークンを抽出
    // "引用符で囲まれた文字列"、♂、丸括弧、セミコロン、
    // それ以外（空白文字以外）の連続する文字を対象とする
		//var tokens = source.match(/"[^"]*"|♂|[();]|[^"♂();\s]+/g);


		//コメント|(小数|整数|文字列リテラル|単語)|空白文字|任意の一文字/複数行
		//$ を使ってるからフラグにgを付けると死ぬ．代わりにmを付ける
		var tokens = source.split(/@@.*$|(\d+\.\d+|\d+|".*?"|\w+)|\s|(.)/m);
		tokens = tokens.filter(a=>a);
		
    return tokens;
}
