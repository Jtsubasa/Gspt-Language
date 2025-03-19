//------字句解析------//
module.exports = function(source){
    // 正規表現でトークンを抽出
    // "引用符で囲まれた文字列"、♂、丸括弧、セミコロン、
		// 数値，8==)
    // それ以外（空白文字以外）の連続する文字を対象とする

		//コメントアウトを，ちかんで表現
		cleanedSource = source.replace(/@@.*$/gm, "");

		//代入演算子|任意の文字列|小数|整数|単語|();♂,のどれか
		//splitを使うと代入演算子の実装がめんどいからmatch使う
		var tokens = cleanedSource.match(/8==\)|"[^"]*"|\d+\.\d+|\d+|\w+|[();♂\,]|/g);

		//空文字列を除去．これがないと死ぬ
		tokens = tokens.filter(Boolean);


    return tokens;
}
