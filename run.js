module.exports = run;

var {error}  = require("./utils.js");

//astの階層をたどりながら実行
function run(a){
    if(!a) return;
    if(!a.op){
        //文字列ならダブルクォーテーションを取り除く
        if(a[0] == '"') return a.substr(1,a.length-2);
        //それ以外ならそのまま返す
        return a;
    }else if(a.op == ";"){
        //セミコロンだとleft/rightを実行するだけ
        run(a.left) ;
        run(a.right);
    }else if(a.op == "()"){
        //leftに関数名
        var func = run(a.left);
        if( func == "♂"){
            //rightに表示する文字列
            var msg = run(a.right)
            //表示=実行
            console.log(msg);
        }else{
            error("未実装の関数呼び出し func=",func);
        }
    }else{
        error("未実装の演算子 op=",a.op);
    }
}