/**
 * @name        CMYK→RGB 一括変換
 * @description フォルダ内のCMYK画像をsRGBに変換して別フォルダへ保存します。
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

    var files = srcFolder.getFiles(/\.(jpg|jpeg|tif|tiff|psd|png)$/i);
    var converted = 0;

    var displayDialogsOriginal = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            if (doc.mode === DocumentMode.CMYK) {
                doc.changeMode(ChangeMode.RGB);
            }
            var baseName = files[i].name.replace(/\.[^\.]+$/, "");
            var outFile = new File(dstFolder + "/" + baseName + ".jpg");
            var opts = new JPEGSaveOptions();
            opts.quality = 11;
            opts.embedColorProfile = true;
            doc.saveAs(outFile, opts, true, Extension.LOWERCASE);
            doc.close(SaveOptions.DONOTSAVECHANGES);
            converted++;
        } catch (e) {}
    }

    app.displayDialogs = displayDialogsOriginal;
    alert(converted + " 枚を変換しました。");
})();
