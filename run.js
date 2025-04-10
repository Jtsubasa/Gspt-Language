module.exports = run;

var {error}  = require("./utils.js");

//グローバル変数用オブジェクト
var global = {};

//astの階層をたどりながら実行
function run(a){
    if(!a) return;
    if(!a.op){
        //文字列ならダブルクォーテーションを取り除く
        if(a[0] == '"') return a.substr(1,a.length-2);
				//数値なら数値化(1倍)して返す
				if(/\d/.test(a[0])) return a*1;
				//グローバル変数なら中身を返す
				if(global.hasOwnProperty(a)) return global[a];
        //それ以外ならそのまま返す
        return a;
    }else if(a.op == ";"){
        //セミコロンだとleft/rightを実行するだけ
        run(a.left) ;
        run(a.right);
    }else if(a.op == ","){
				//カンマ区切りを配列に．複数個の引数に対応できる
				return [run(a.left), run(a.right)].flat();
    }else if(a.op == "8==)"){
				//変数に格納
				return global[run(a.left)] = run(a.right);
    }else if(a.op == "()"){
        //leftに関数名
        var func = run(a.left);
        if( func == "♂"){
            //rightに表示する文字列
            var msg = [run(a.right)].flat().join("");
            //表示=実行
            console.log(msg);
        }else{
            error("未実装の関数呼び出し func=",func);
        }
    }else{
        error("未実装の演算子 op=",a.op);
    }
}
