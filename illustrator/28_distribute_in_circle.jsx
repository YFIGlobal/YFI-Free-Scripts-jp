/**
 * @name        オブジェクトを円周上に配置
 * @description 選択オブジェクトを円周上に等間隔配置します（中心は選択範囲の中央）。
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
    var sel = doc.selection;
    if (!sel || sel.length < 2) {
        alert("2つ以上のオブジェクトを選択してください。");
        return;
    }

    var rInput = prompt("円の半径 (px):", "200");
    if (rInput === null) return;
    var radius = parseFloat(rInput);
    if (isNaN(radius) || radius <= 0) return;

    var sumX = 0, sumY = 0;
    for (var i = 0; i < sel.length; i++) {
        sumX += sel[i].position[0] + sel[i].width / 2;
        sumY += sel[i].position[1] - sel[i].height / 2;
    }
    var cx = sumX / sel.length;
    var cy = sumY / sel.length;

    var angleStep = (Math.PI * 2) / sel.length;
    for (var j = 0; j < sel.length; j++) {
        var angle = -Math.PI / 2 + j * angleStep;
        var x = cx + radius * Math.cos(angle) - sel[j].width / 2;
        var y = cy - radius * Math.sin(angle) + sel[j].height / 2;
        sel[j].position = [x, y];
    }

    alert(sel.length + " 個のオブジェクトを円周上に配置しました。");
})();
