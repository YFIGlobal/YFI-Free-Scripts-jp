/**
 * @name        開いてる全ドキュメントを一括保存
 * @description 開いている全ドキュメントを上書き保存します。
 * @target      photoshop
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target photoshop

(function () {
    if (app.documents.length === 0) {
        alert("開いているドキュメントがありません。");
        return;
    }

    var saved = 0;
    var skipped = 0;

    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i];
        try {
            doc.path;
            doc.save();
            saved++;
        } catch (e) {
            skipped++;
        }
    }

    alert("保存: " + saved + " 件\nスキップ（未保存）: " + skipped + " 件");
})();
