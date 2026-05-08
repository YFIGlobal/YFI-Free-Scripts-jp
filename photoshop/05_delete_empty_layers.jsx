/**
 * @name        空レイヤーを削除
 * @description ピクセルのない空レイヤーと空グループを削除します。
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

    function isEmpty(layer) {
        if (layer.typename === "LayerSet") return layer.layers.length === 0;
        try {
            var b = layer.bounds;
            return b[0].value === b[2].value || b[1].value === b[3].value;
        } catch (e) {
            return false;
        }
    }

    function walk(container) {
        for (var i = container.layers.length - 1; i >= 0; i--) {
            var layer = container.layers[i];
            if (layer.typename === "LayerSet") walk(layer);
            if (isEmpty(layer)) {
                try {
                    layer.remove();
                    deleted++;
                } catch (e) {}
            }
        }
    }

    walk(doc);
    alert(deleted + " 個の空レイヤーを削除しました。");
})();
