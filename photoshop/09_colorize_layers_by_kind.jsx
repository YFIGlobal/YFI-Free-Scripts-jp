/**
 * @name        レイヤー種別ごとに色分け
 * @description レイヤーの種類（テキスト/シェイプ/スマート/通常）に応じてレイヤーカラーを設定します。
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
    var colored = 0;

    function setColor(layer, color) {
        var ref = new ActionReference();
        ref.putIdentifier(charIDToTypeID("Lyr "), layer.id);
        var desc = new ActionDescriptor();
        desc.putReference(charIDToTypeID("null"), ref);
        var props = new ActionDescriptor();
        props.putEnumerated(stringIDToTypeID("color"), stringIDToTypeID("color"), stringIDToTypeID(color));
        desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Lyr "), props);
        executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
    }

    function classify(layer) {
        if (layer.typename === "LayerSet") return "blue";
        if (layer.kind === LayerKind.TEXT) return "yellow";
        if (layer.kind === LayerKind.SOLIDFILL || layer.kind === LayerKind.SMARTOBJECT) return "violet";
        if (layer.kind === LayerKind.NORMAL) return "gray";
        return "none";
    }

    function walk(container) {
        for (var i = 0; i < container.layers.length; i++) {
            var ly = container.layers[i];
            try {
                var c = classify(ly);
                if (c !== "none") {
                    setColor(ly, c);
                    colored++;
                }
            } catch (e) {}
            if (ly.typename === "LayerSet") walk(ly);
        }
    }

    walk(doc);
    alert(colored + " 個のレイヤーに色を設定しました。");
})();
