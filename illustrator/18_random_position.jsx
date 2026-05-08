/**
 * @name        オブジェクトをランダム配置
 * @description 選択中のオブジェクトをアクティブなアートボード内にランダム配置します。
 * @target      illustrator
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target illustrator

(function () {
    if (app.documents.length === 0) { alert("ドキュメントを開いてください。"); return; }
    var doc = app.activeDocument;
    var sel = doc.selection;
    if (!sel || sel.length === 0) {
        alert("オブジェクトを選択してください。");
        return;
    }

    var ab = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var rect = ab.artboardRect;
    var x1 = rect[0], y1 = rect[1], x2 = rect[2], y2 = rect[3];
    var minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    var minY = Math.min(y1, y2), maxY = Math.max(y1, y2);

    for (var i = 0; i < sel.length; i++) {
        var obj = sel[i];
        var w = obj.width, h = obj.height;
        var rx = minX + Math.random() * Math.max(1, (maxX - minX - w));
        var ry = maxY - Math.random() * Math.max(1, (maxY - minY - h));
        obj.position = [rx, ry];
    }

    alert(sel.length + " 件をランダム配置しました。");
})();
