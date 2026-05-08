/**
 * @name        アートボード番号ラベルを追加
 * @description 各アートボードの外側に番号ラベル（01, 02, ...）を配置します。
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
    var pad = function (n, len) {
        var s = String(n);
        while (s.length < len) s = "0" + s;
        return s;
    };
    var width = String(doc.artboards.length).length;
    if (width < 2) width = 2;

    var labelLayer;
    try {
        labelLayer = doc.layers.getByName("Artboard Numbers");
    } catch (e) {
        labelLayer = doc.layers.add();
        labelLayer.name = "Artboard Numbers";
    }

    for (var i = 0; i < doc.artboards.length; i++) {
        var ab = doc.artboards[i];
        var rect = ab.artboardRect;
        var label = labelLayer.textFrames.add();
        label.contents = pad(i + 1, width);
        label.position = [rect[0], rect[1] + 30];
        try {
            label.textRange.characterAttributes.size = 24;
        } catch (e) {}
    }

    alert(doc.artboards.length + " 個のアートボードにラベルを追加しました。");
})();
