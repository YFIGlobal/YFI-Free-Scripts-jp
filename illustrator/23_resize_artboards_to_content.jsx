/**
 * @name        全アートボードをコンテンツに合わせてサイズ調整
 * @description 各アートボードを、その上にあるアートワークの境界に合わせてリサイズします。
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
    var resized = 0;
    var skipped = 0;

    for (var i = 0; i < doc.artboards.length; i++) {
        var ab = doc.artboards[i];
        var rect = ab.artboardRect;

        var minX = Infinity, maxY = -Infinity, maxX = -Infinity, minY = Infinity;
        var found = false;

        for (var j = 0; j < doc.pageItems.length; j++) {
            var item = doc.pageItems[j];
            try {
                var b = item.geometricBounds;
                if (b[2] >= rect[0] && b[0] <= rect[2] && b[3] <= rect[1] && b[1] >= rect[3]) {
                    minX = Math.min(minX, b[0]);
                    maxY = Math.max(maxY, b[1]);
                    maxX = Math.max(maxX, b[2]);
                    minY = Math.min(minY, b[3]);
                    found = true;
                }
            } catch (e) {}
        }

        if (found) {
            ab.artboardRect = [minX, maxY, maxX, minY];
            resized++;
        } else {
            skipped++;
        }
    }

    alert(resized + " 個のアートボードをコンテンツに合わせました。\nスキップ: " + skipped + " 個（コンテンツなし）");
})();
