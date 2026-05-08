/**
 * @name        レイヤー連番リネーム
 * @description アクティブコンポの全レイヤーを連番でリネームします。
 * @target      aftereffects
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

(function () {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("コンポを選択してください。");
        return;
    }

    var base = prompt("ベース名:", "layer");
    if (base === null) return;

    function pad(n, len) {
        var s = String(n);
        while (s.length < len) s = "0" + s;
        return s;
    }
    var width = String(comp.numLayers).length;
    if (width < 3) width = 3;

    app.beginUndoGroup("Rename Layers");
    for (var i = 1; i <= comp.numLayers; i++) {
        comp.layer(i).name = base + "_" + pad(i, width);
    }
    app.endUndoGroup();

    alert(comp.numLayers + " 件のレイヤーをリネームしました。");
})();
