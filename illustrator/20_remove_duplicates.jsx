/**
 * @name        重複オブジェクトを削除
 * @description 位置とサイズが完全一致するオブジェクトを検出し、重複分を削除します。
 * @target      illustrator
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target illustrator

(function () {
    if (app.documents.length === 0) { alert("ドキュメントを開いてください。"); return; }
    var doc = app.activeDocument;

    var seen = {};
    var removed = 0;

    function key(o) {
        var p = o.position;
        return Math.round(p[0]) + "_" + Math.round(p[1]) + "_"
             + Math.round(o.width) + "_" + Math.round(o.height) + "_"
             + o.typename;
    }

    function walk(items) {
        var toRemove = [];
        for (var i = 0; i < items.length; i++) {
            var it = items[i];
            try {
                var k = key(it);
                if (seen[k]) {
                    toRemove.push(it);
                } else {
                    seen[k] = true;
                }
            } catch (e) {}
        }
        for (var j = 0; j < toRemove.length; j++) {
            try { toRemove[j].remove(); removed++; } catch (e) {}
        }
    }

    walk(doc.pageItems);
    alert(removed + " 件の重複を削除しました。");
})();
