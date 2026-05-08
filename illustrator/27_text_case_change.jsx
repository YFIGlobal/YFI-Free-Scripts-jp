/**
 * @name        テキストの大小文字変換
 * @description 選択中のテキストフレーム（または全フレーム）の内容を大文字／小文字／タイトルケースに変換します。
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
    var mode = prompt("変換モード (upper / lower / title):", "upper");
    if (mode === null) return;
    mode = mode.toLowerCase();
    if (mode !== "upper" && mode !== "lower" && mode !== "title") {
        alert("upper / lower / title のいずれかを入力してください。");
        return;
    }

    var frames = [];
    if (doc.selection && doc.selection.length > 0) {
        for (var i = 0; i < doc.selection.length; i++) {
            if (doc.selection[i].typename === "TextFrame") frames.push(doc.selection[i]);
        }
    }
    if (frames.length === 0) {
        for (var j = 0; j < doc.textFrames.length; j++) frames.push(doc.textFrames[j]);
    }

    if (frames.length === 0) {
        alert("テキストフレームが見つかりません。");
        return;
    }

    function transform(text) {
        if (mode === "upper") return text.toUpperCase();
        if (mode === "lower") return text.toLowerCase();
        return text.toLowerCase().replace(/\b([a-z])/g, function (m) { return m.toUpperCase(); });
    }

    var changed = 0;
    for (var k = 0; k < frames.length; k++) {
        try {
            var orig = frames[k].contents;
            var transformed = transform(orig);
            if (transformed !== orig) {
                frames[k].contents = transformed;
                changed++;
            }
        } catch (e) {}
    }

    alert(changed + " 件のテキストを " + mode + " に変換しました。");
})();
