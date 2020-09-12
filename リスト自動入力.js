//リスト自動入力
// 2020/07/10 by.朱桜花鈴
// 2020/09/12 オートインデントが邪魔しないように修正。

// 現在行が以下の構文を含む場合、改行して行頭に開始記号を追加する
// （順序ありリストの場合は数値を1加算する）
//
// 順序なしリスト: '-','－','+','･','・','*','＊','■','□'
// 順序あり数字リスト: '1.','2.'... 全角/半角対応
// 順序あり英字リスト: 'a.','b.'... 大文字/小文字対応
// カッコつき英数字： '(x)','（y）'
//
// マクロの文字コードはSJISかUTF-8BOM付き（UTF-8として読み込まれる）で保存
//
// Shift+Enterに登録して使用

// リスト用記号
var reg = /^([\t 　]*)(?:([(（]*)([a-zA-Z]+|[0-9]+|[０-９]+)([)）.． ]+)|([-－+･・*＊■□]))/;

// 現在行の内容を取得
var s = Editor.GetLineStr(0);
// 指定構文を取得
var s_syntax = reg.exec(s);

// まずは改行
//Editor.Char(13);
Editor.InsText(["\r\n","\r","\n"][Editor.GetLineCode()]);
// 指定構文があれば処理開始
if(s_syntax != null){
	// 配列[0]：一致文字列
	// 配列[1]：インデント
	// 配列[2]：始括弧
	// 配列[3]：英数字
	// 配列[4]：閉括弧またはコンマ＆半角スペース
	// 配列[5]：リスト記号
	
	// 英数字の処理
	if(s_syntax[3]){
		if(s_syntax[3] == '９'){
			s_syntax[3] = 10;
		}else if(s_syntax[3] > 8){
			s_syntax[3] = Number(s_syntax[3]);
			s_syntax[3]++;
		}else{
			var i = (s_syntax[3] == "z" || s_syntax[3] == "Z")? -25 : 1;
			s_syntax[3] = String.fromCharCode(s_syntax[3].charCodeAt(s_syntax[3].length - 1) + i);
		}
	}
	
	// 一致文字列[0]を削除
	s_syntax.shift();
	// 配列を文字列に変換して出力
	Editor.InsText(s_syntax.join(''));
}
