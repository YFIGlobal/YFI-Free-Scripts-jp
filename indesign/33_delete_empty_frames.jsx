/**
 * @name        空テキストフレームを削除
 * @description 文字が入っていない空テキストフレームを削除します。
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
    var deleted = 0;
    var frames = doc.textFrames.everyItem().getElements();

    for (var i = frames.length - 1; i >= 0; i--) {
        try {
            var content = frames[i].contents;
            if (!content || /^\s*$/.test(content)) {
                frames[i].remove();
                deleted++;
            }
        } catch (e) {}
    }

    alert(deleted + " 件の空フレームを削除しました。");
})();
