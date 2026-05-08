/**
 * @name        欠損フォントを検出
 * @description ドキュメント内で使われているフォントのうち、PCにインストールされていないものを一覧表示します。
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
    var usedFonts = {};
    var missing = {};

    for (var i = 0; i < doc.textFrames.length; i++) {
        var tf = doc.textFrames[i];
        try {
            var ranges = tf.textRanges;
            for (var r = 0; r < ranges.length; r++) {
                var attrs = ranges[r].characterAttributes;
                var fontName = attrs.textFont.name;
                if (!usedFonts[fontName]) usedFonts[fontName] = 0;
                usedFonts[fontName]++;
            }
        } catch (e) {}
    }

    var installed = {};
    for (var f = 0; f < app.textFonts.length; f++) {
        installed[app.textFonts[f].name] = true;
    }

    for (var name in usedFonts) {
        if (!installed[name]) missing[name] = usedFonts[name];
    }

    var missingList = [];
    for (var n in missing) missingList.push(n + " （" + missing[n] + " 箇所）");

    if (missingList.length === 0) {
        alert("使用中のフォントはすべてインストール済みです。");
    } else {
        alert("欠損フォント (" + missingList.length + " 種類):\n\n" + missingList.join("\n"));
    }
})();
