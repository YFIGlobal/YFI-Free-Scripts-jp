/**
 * @name        未使用素材を一括削除
 * @description 未使用のスウォッチ・ブラシ・シンボルを削除します。
 *              使用中のものは通常 remove 時にエラーとなりスキップされますが、
 *              Illustratorのバージョンによっては動作が異なる場合があります。
 *              実行前に必ずファイルを保存してください。
 * @target      illustrator
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.1
 */

#target illustrator

(function () {
    if (app.documents.length === 0) {
        alert("ドキュメントを開いてください。");
        return;
    }

    var go = confirm(
        "未使用のスウォッチ・ブラシ・シンボルの削除を試みます。\n\n" +
        "Illustratorのバージョンによっては使用中のアイテムまで削除される場合があります。\n" +
        "実行前に必ずファイルを保存してください。\n\n" +
        "続行しますか？"
    );
    if (!go) return;

    try {
        var doc = app.activeDocument;
        var swDeleted = 0;
        for (var i = doc.swatches.length - 1; i >= 0; i--) {
            try {
                if (doc.swatches[i].name === "[Registration]" || doc.swatches[i].name === "[None]") continue;
                doc.swatches[i].remove();
                swDeleted++;
            } catch (e) {}
        }
        var brDeleted = 0;
        for (var j = doc.brushes.length - 1; j >= 0; j--) {
            try { doc.brushes[j].remove(); brDeleted++; } catch (e) {}
        }
        var syDeleted = 0;
        for (var k = doc.symbols.length - 1; k >= 0; k--) {
            try { doc.symbols[k].remove(); syDeleted++; } catch (e) {}
        }

        alert("削除しました:\n  スウォッチ: " + swDeleted + "\n  ブラシ: " + brDeleted + "\n  シンボル: " + syDeleted);
    } catch (e) {
        alert("エラー: " + e.message);
    }
})();
