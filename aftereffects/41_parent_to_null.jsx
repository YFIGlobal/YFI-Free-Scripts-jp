/**
 * @name        ヌルから親子関係を一括設定
 * @description 新規ヌルレイヤーを作成し、選択中のレイヤーをすべてその子にします。
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
        alert("親付けしたいレイヤーを選択してください。");
        return;
    }

    app.beginUndoGroup("Parent to Null");
    var nullLayer = comp.layers.addNull();
    nullLayer.name = "CTRL_NULL";
    nullLayer.label = 9;

    for (var i = 0; i < sel.length; i++) {
        sel[i].parent = nullLayer;
    }
    app.endUndoGroup();

    alert(sel.length + " 件を「" + nullLayer.name + "」に親付けしました。");
})();
