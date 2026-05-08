/**
 * @name        ランダム時間オフセット
 * @description 選択中のレイヤーの開始時刻を 0〜指定秒 のランダム値でずらします。
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

    var sel = comp.selectedLayers;
    if (sel.length === 0) {
        alert("レイヤーを選択してください。");
        return;
    }

    var input = prompt("最大オフセット秒数:", "1.0");
    if (input === null) return;
    var maxOffset = parseFloat(input);
    if (isNaN(maxOffset) || maxOffset <= 0) return;

    app.beginUndoGroup("Random Time Offset");
    for (var i = 0; i < sel.length; i++) {
        sel[i].startTime += Math.random() * maxOffset;
    }
    app.endUndoGroup();

    alert(sel.length + " 件のレイヤーをずらしました。");
})();
