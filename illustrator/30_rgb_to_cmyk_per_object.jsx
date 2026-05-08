/**
 * @name        オブジェクト単位でRGB→CMYK変換
 * @description 各オブジェクトの塗り・線をRGB→CMYKに変換します。
 *              ドキュメントのカラーモードは変えず、各色オブジェクトのみ変換します。
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

    var go = confirm(
        "ドキュメント内の全RGBの塗り・線をCMYKに変換します。\n\n" +
        "RGBとCMYKの色域差により色が若干変わります。実行前に必ずファイルを保存してください。\n\n" +
        "続行しますか？"
    );
    if (!go) return;

    var doc = app.activeDocument;

    function rgbToCmyk(r, g, b) {
        var rN = r / 255, gN = g / 255, bN = b / 255;
        var k = 1 - Math.max(rN, gN, bN);
        if (k >= 1) {
            var black = new CMYKColor();
            black.cyan = 0; black.magenta = 0; black.yellow = 0; black.black = 100;
            return black;
        }
        var c = (1 - rN - k) / (1 - k);
        var m = (1 - gN - k) / (1 - k);
        var y = (1 - bN - k) / (1 - k);
        var col = new CMYKColor();
        col.cyan = c * 100;
        col.magenta = m * 100;
        col.yellow = y * 100;
        col.black = k * 100;
        return col;
    }

    function convertColor(color) {
        if (color && color.typename === "RGBColor") {
            return rgbToCmyk(color.red, color.green, color.blue);
        }
        return null;
    }

    var converted = 0;
    for (var i = 0; i < doc.pathItems.length; i++) {
        var item = doc.pathItems[i];
        try {
            if (item.filled) {
                var newFill = convertColor(item.fillColor);
                if (newFill) { item.fillColor = newFill; converted++; }
            }
            if (item.stroked) {
                var newStroke = convertColor(item.strokeColor);
                if (newStroke) { item.strokeColor = newStroke; converted++; }
            }
        } catch (e) {}
    }

    alert(converted + " 個の色値をCMYKに変換しました。");
})();
