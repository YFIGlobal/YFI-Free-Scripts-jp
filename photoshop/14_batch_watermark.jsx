/**
 * @name        フォルダ内画像に一括ウォーターマーク追加
 * @description フォルダ内の全画像に半透明のテキストウォーターマークを追加して保存します。
 * @target      photoshop
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target photoshop

(function () {
    var srcFolder = Folder.selectDialog("入力フォルダ");
    if (!srcFolder) return;
    var dstFolder = Folder.selectDialog("出力フォルダ");
    if (!dstFolder) return;

    var text = prompt("ウォーターマーク文字:", "© YFI-Global");
    if (text === null || text === "") return;

    var files = srcFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|psd|webp|bmp)$/i);
    if (files.length === 0) {
        alert("画像が見つかりません。");
        return;
    }

    var oldUnits = preferences.rulerUnits;
    var oldTypeUnits = preferences.typeUnits;
    var displayDialogsOriginal = app.displayDialogs;
    preferences.rulerUnits = Units.PIXELS;
    preferences.typeUnits = TypeUnits.PIXELS;
    app.displayDialogs = DialogModes.NO;

    var count = 0;
    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            var w = doc.width.as("px");
            var h = doc.height.as("px");

            var layer = doc.artLayers.add();
            layer.kind = LayerKind.TEXT;
            layer.name = "Watermark";

            var ti = layer.textItem;
            ti.contents = text;
            ti.size = new UnitValue(Math.max(16, Math.round(w * 0.025)), "px");
            var c = new SolidColor();
            c.rgb.red = 255; c.rgb.green = 255; c.rgb.blue = 255;
            ti.color = c;
            ti.justification = Justification.RIGHT;

            var pad = w * 0.02;
            ti.position = [w - pad, h - pad];
            layer.opacity = 50;

            doc.flatten();

            var baseName = files[i].name.replace(/\.[^\.]+$/, "");
            var outFile = new File(dstFolder + "/" + baseName + ".jpg");
            var opts = new JPEGSaveOptions();
            opts.quality = 10;
            opts.embedColorProfile = true;
            doc.saveAs(outFile, opts, true, Extension.LOWERCASE);

            doc.close(SaveOptions.DONOTSAVECHANGES);
            count++;
        } catch (e) {}
    }

    preferences.rulerUnits = oldUnits;
    preferences.typeUnits = oldTypeUnits;
    app.displayDialogs = displayDialogsOriginal;
    alert(count + " 枚にウォーターマークを追加しました。");
})();
