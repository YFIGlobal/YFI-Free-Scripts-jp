/**
 * @name        全テキストを.txtファイルに抽出
 * @description ドキュメント内の全テキストフレームの内容を1つの.txtファイルに書き出します。
 * @target      illustrator
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target illustrator

(function () {
    if (app.documents.length === 0) {
        alert("ドキュメントを開いてください。");
        return;
    }

    var doc = app.activeDocument;
    if (doc.textFrames.length === 0) {
        alert("テキストフレームが見つかりません。");
        return;
    }

    var folder = Folder.selectDialog("出力フォルダ");
    if (!folder) return;

    var baseName = doc.name.replace(/\.[^\.]+$/, "");
    var file = new File(folder + "/" + baseName + "_text.txt");

    file.encoding = "UTF-8";
    file.open("w");
    file.lineFeed = "Unix";

    var count = 0;
    for (var i = 0; i < doc.textFrames.length; i++) {
        try {
            var content = doc.textFrames[i].contents;
            if (content) {
                file.writeln("--- テキストフレーム " + (i + 1) + " ---");
                file.writeln(content);
                file.writeln("");
                count++;
            }
        } catch (e) {}
    }

    file.close();
    alert(count + " 件のテキストを書き出しました:\n" + file.fsName);
})();
