/**
 * @name        フォルダ内画像を一括で正方形カンバスに調整
 * @description フォルダ内の全画像のカンバスを長辺基準で正方形に拡張します（中央配置）。
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

    var files = srcFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|psd|webp|bmp)$/i);
    if (files.length === 0) {
        alert("画像が見つかりません。");
        return;
    }

    var oldUnits = preferences.rulerUnits;
    var displayDialogsOriginal = app.displayDialogs;
    preferences.rulerUnits = Units.PIXELS;
    app.displayDialogs = DialogModes.NO;

    var count = 0;
    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            var w = doc.width.as("px");
            var h = doc.height.as("px");
            var size = Math.max(w, h);
            doc.resizeCanvas(UnitValue(size, "px"), UnitValue(size, "px"), AnchorPosition.MIDDLECENTER);

            var ext = files[i].name.match(/\.[^\.]+$/);
            ext = ext ? ext[0].toLowerCase() : ".jpg";
            var baseName = files[i].name.replace(/\.[^\.]+$/, "");
            var outFile = new File(dstFolder + "/" + baseName + ext);

            if (ext === ".png") {
                doc.saveAs(outFile, new PNGSaveOptions(), true, Extension.LOWERCASE);
            } else if (ext === ".psd") {
                var psdOpts = new PhotoshopSaveOptions();
                psdOpts.maximizeCompatibility = true;
                doc.saveAs(outFile, psdOpts, true, Extension.LOWERCASE);
            } else {
                var jpgOpts = new JPEGSaveOptions();
                jpgOpts.quality = 10;
                doc.saveAs(outFile, jpgOpts, true, Extension.LOWERCASE);
            }
            doc.close(SaveOptions.DONOTSAVECHANGES);
            count++;
        } catch (e) {}
    }

    preferences.rulerUnits = oldUnits;
    app.displayDialogs = displayDialogsOriginal;
    alert(count + " 枚を正方形カンバスに調整しました。");
})();
