/**
 * @name        アートボード名を連番リネーム
 * @description 全アートボードを「ベース名_001」のように連番リネームします。
 * @target      illustrator
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target illustrator

(function () {
    if (app.documents.length === 0) { alert("ドキュメントを開いてください。"); return; }
    var doc = app.activeDocument;

    var base = prompt("ベース名:", "artboard");
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
    var width = String(doc.artboards.length + start).length;
    if (width < 3) width = 3;

    for (var i = 0; i < doc.artboards.length; i++) {
        doc.artboards[i].name = base + "_" + pad(start + i, width);
    }

    alert(doc.artboards.length + " 件のアートボードをリネームしました。");
})();
