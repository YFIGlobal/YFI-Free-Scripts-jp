/**
 * @name        見開きを単ページに分割
 * @description ドキュメントページのシャッフルを許可しない設定にして見開きを単ページに分けます。
 * @target      indesign
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target indesign

(function () {
    if (app.documents.length === 0) {
        alert("ドキュメントを開いてください。");
        return;
    }

    var doc = app.activeDocument;
    try {
        doc.documentPreferences.allowPageShuffle = false;
        for (var i = 0; i < doc.spreads.length; i++) {
            doc.spreads[i].allowPageShuffle = false;
        }
        alert("見開きを単ページに分割しました。");
    } catch (e) {
        alert("エラー: " + e.message);
    }
})();
