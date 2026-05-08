/**
 * @name        レイヤーを連番リネーム
 * @description トップレベルの全レイヤーを「ベース名_001」のように連番リネームします。
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
    var base = prompt("ベース名:", "layer");
    if (base === null) return;
    var startInput = prompt("開始番号:", "1");
    if (startInput === null) return;
    var start = parseInt(startInput, 10);
    if (isNaN(start)) start = 1;

    var pad = function (n, len) {
        var s = String(n);
        while (s.length < len) s = "0" + s;
        return s;
    };

    var n = start;
    var total = doc.layers.length;
    var width = String(total + start).length;
    if (width < 3) width = 3;

    for (var i = doc.layers.length - 1; i >= 0; i--) {
        doc.layers[i].name = base + "_" + pad(n, width);
        n++;
    }

    alert((n - start) + " 枚のレイヤーをリネームしました。");
})();
