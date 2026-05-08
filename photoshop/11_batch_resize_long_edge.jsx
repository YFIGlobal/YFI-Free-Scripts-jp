/**
 * @name        フォルダ内画像を一括リサイズ（長辺指定）
 * @description フォルダ内の全画像を長辺指定でリサイズしてJPGで保存します。
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

    var input = prompt("長辺 (px):", "1920");
    if (input === null) return;
    var maxEdge = parseInt(input, 10);
    if (isNaN(maxEdge) || maxEdge < 1) return;

    var files = srcFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|psd|webp|bmp)$/i);
    if (files.length === 0) {
        alert("画像が見つかりません。");
        return;
    }

    var displayDialogsOriginal = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    var oldUnits = preferences.rulerUnits;
    preferences.rulerUnits = Units.PIXELS;

    var count = 0;
    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            var w = doc.width.as("px");
            var h = doc.height.as("px");
            var ratio = (w >= h) ? maxEdge / w : maxEdge / h;
            if (ratio < 1) {
                doc.resizeImage(
                    UnitValue(w * ratio, "px"),
                    UnitValue(h * ratio, "px"),
                    null,
                    ResampleMethod.BICUBICSHARPER
                );
            }
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
    app.displayDialogs = displayDialogsOriginal;
    alert(count + " 枚をリサイズしました。");
})();
