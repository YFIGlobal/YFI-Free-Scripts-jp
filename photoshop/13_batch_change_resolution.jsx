/**
 * @name        フォルダ内画像を一括解像度変更
 * @description フォルダ内の全画像の解像度（dpi）を変更します（ピクセル数は変えません）。
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

    var input = prompt("解像度 (dpi):", "350");
    if (input === null) return;
    var dpi = parseFloat(input);
    if (isNaN(dpi) || dpi <= 0) return;

    var files = srcFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|psd|webp|bmp)$/i);
    if (files.length === 0) {
        alert("画像が見つかりません。");
        return;
    }

    var displayDialogsOriginal = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    var count = 0;
    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            doc.resizeImage(undefined, undefined, dpi, ResampleMethod.NONE);

            var ext = files[i].name.match(/\.[^\.]+$/);
            ext = ext ? ext[0].toLowerCase() : ".jpg";
            var baseName = files[i].name.replace(/\.[^\.]+$/, "");
            var outFile = new File(dstFolder + "/" + baseName + ext);

            if (ext === ".psd") {
                var psdOpts = new PhotoshopSaveOptions();
                psdOpts.embedColorProfile = true;
                psdOpts.maximizeCompatibility = true;
                doc.saveAs(outFile, psdOpts, true, Extension.LOWERCASE);
            } else if (ext === ".png") {
                var pngOpts = new PNGSaveOptions();
                doc.saveAs(outFile, pngOpts, true, Extension.LOWERCASE);
            } else {
                var jpgOpts = new JPEGSaveOptions();
                jpgOpts.quality = 11;
                jpgOpts.embedColorProfile = true;
                doc.saveAs(outFile, jpgOpts, true, Extension.LOWERCASE);
            }
            doc.close(SaveOptions.DONOTSAVECHANGES);
            count++;
        } catch (e) {}
    }

    app.displayDialogs = displayDialogsOriginal;
    alert(count + " 枚の解像度を " + dpi + " dpi に変更しました。");
})();
