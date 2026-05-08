/**
 * @name        キーフレーム等間隔配置
 * @description 選択中のキーフレームを最初と最後の間で等間隔に再配置します。
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

    var moved = 0;
    app.beginUndoGroup("Distribute Keyframes");

    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);
        var props = layer.selectedProperties;
        for (var p = 0; p < props.length; p++) {
            var prop = props[p];
            if (!prop.canVaryOverTime) continue;
            var sel = prop.selectedKeys;
            if (sel.length < 3) continue;

            // 変更前に各キーフレームのデータを保存しておく
            var keys = [];
            for (var k = 0; k < sel.length; k++) {
                var idx = sel[k];
                keys.push({
                    time: prop.keyTime(idx),
                    value: prop.keyValue(idx),
                    inInterp: prop.keyInInterpolationType(idx),
                    outInterp: prop.keyOutInterpolationType(idx)
                });
            }
            keys.sort(function (a, b) { return a.time - b.time; });

            var first = keys[0].time;
            var last = keys[keys.length - 1].time;
            var step = (last - first) / (keys.length - 1);

            // インデックスのずれを避けるため大きい順に削除
            var sortedSel = [];
            for (var s = 0; s < sel.length; s++) sortedSel.push(sel[s]);
            sortedSel.sort(function (a, b) { return b - a; });
            for (var r = 0; r < sortedSel.length; r++) {
                prop.removeKey(sortedSel[r]);
            }

            // 新しい等間隔の時刻で再追加
            for (var n = 0; n < keys.length; n++) {
                var newT = first + step * n;
                var newIdx = prop.addKey(newT);
                prop.setValueAtKey(newIdx, keys[n].value);
                try {
                    prop.setInterpolationTypeAtKey(newIdx, keys[n].inInterp, keys[n].outInterp);
                } catch (e) {}
                moved++;
            }
        }
    }

    app.endUndoGroup();
    alert(moved + " 個のキーフレームを再配置しました。");
})();
