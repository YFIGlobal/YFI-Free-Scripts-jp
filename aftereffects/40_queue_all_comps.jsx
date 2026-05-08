/**
 * @name        全コンポをレンダーキューに追加
 * @description プロジェクト内の全コンポをレンダーキューに追加します。
 * @target      aftereffects
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

(function () {
    if (app.project.numItems === 0) {
        alert("プロジェクトが空です。");
        return;
    }

    app.beginUndoGroup("Queue All Comps");
    var added = 0;
    for (var i = 1; i <= app.project.numItems; i++) {
        var item = app.project.item(i);
        if (item instanceof CompItem) {
            app.project.renderQueue.items.add(item);
            added++;
        }
    }
    app.endUndoGroup();

    alert(added + " コンポをキューに追加しました。");
})();
