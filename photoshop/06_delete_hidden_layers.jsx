/**
 * @name        非表示レイヤーを削除
 * @description 非表示になっている全レイヤー・グループを削除します。
 * @target      photoshop
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target photoshop

(function () {
    if (app.documents.length === 0) {
        alert("ドキュメントを開いてください。");
        return;
    }

    var doc = app.activeDocument;
    var deleted = 0;

    function walk(container) {
        for (var i = container.layers.length - 1; i >= 0; i--) {
            var layer = container.layers[i];
            if (!layer.visible) {
                try {
                    layer.remove();
                    deleted++;
                } catch (e) {}
            } else if (layer.typename === "LayerSet") {
                walk(layer);
            }
        }
    }

    walk(doc);
    alert(deleted + " 個の非表示レイヤーを削除しました。");
})();
