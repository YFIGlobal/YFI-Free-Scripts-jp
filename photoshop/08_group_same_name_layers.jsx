/**
 * @name        同名レイヤーをグループ化
 * @description 同じ名前のレイヤーを名前ごとのグループにまとめます。
 * @target      photoshop
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target photoshop

(function () {
    if (app.documents.length === 0) {
        alert("ドキュメントを開いてください。");
        return;
    }

    var doc = app.activeDocument;

    var map = {};
    var names = [];
    for (var i = 0; i < doc.layers.length; i++) {
        var ly = doc.layers[i];
        if (ly.typename !== "ArtLayer") continue;
        if (!map[ly.name]) {
            map[ly.name] = [];
            names.push(ly.name);
        }
        map[ly.name].push(ly);
    }

    var groupsCreated = 0;
    for (var k = 0; k < names.length; k++) {
        var name = names[k];
        var arr = map[name];
        if (arr.length < 2) continue;
        var grp = doc.layerSets.add();
        grp.name = name;
        for (var j = 0; j < arr.length; j++) {
            arr[j].move(grp, ElementPlacement.PLACEATEND);
        }
        groupsCreated++;
    }

    alert(groupsCreated + " 個のグループを作成しました。");
})();
