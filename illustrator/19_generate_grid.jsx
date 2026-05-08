/**
 * @name        グリッド線を自動生成
 * @description 新規レイヤー上にグリッド線を描画します（補助線色のストローク）。
 * @target      illustrator
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target illustrator

(function () {
    if (app.documents.length === 0) { alert("ドキュメントを開いてください。"); return; }
    var doc = app.activeDocument;

    var cInput = prompt("列数:", "12");
    if (cInput === null) return;
    var rInput = prompt("行数:", "8");
    if (rInput === null) return;

    var cols = parseInt(cInput, 10);
    var rows = parseInt(rInput, 10);
    if (isNaN(cols) || isNaN(rows) || cols < 1 || rows < 1) return;

    var ab = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var rect = ab.artboardRect;
    var x1 = rect[0], y1 = rect[1], x2 = rect[2], y2 = rect[3];
    var w = x2 - x1, h = y1 - y2;

    var layer = doc.layers.add();
    layer.name = "Grid";

    var stroke = new RGBColor();
    stroke.red = 200; stroke.green = 200; stroke.blue = 200;

    for (var i = 0; i <= cols; i++) {
        var x = x1 + (w * i / cols);
        var line = layer.pathItems.add();
        line.setEntirePath([[x, y1], [x, y2]]);
        line.filled = false;
        line.stroked = true;
        line.strokeColor = stroke;
        line.strokeWidth = 0.25;
    }
    for (var j = 0; j <= rows; j++) {
        var y = y1 - (h * j / rows);
        var line2 = layer.pathItems.add();
        line2.setEntirePath([[x1, y], [x2, y]]);
        line2.filled = false;
        line2.stroked = true;
        line2.strokeColor = stroke;
        line2.strokeWidth = 0.25;
    }

    alert("グリッドを生成しました。");
})();
