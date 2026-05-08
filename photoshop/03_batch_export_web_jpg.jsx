/**
 * @name        フォルダ内画像を一括Web用JPG書き出し
 * @description 入力フォルダ内の全画像をWeb用JPGとして出力フォルダに保存します。
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

    var input = prompt("JPG品質 (1-100):", "80");
    if (input === null) return;
    var quality = parseInt(input, 10);
    if (isNaN(quality) || quality < 1 || quality > 100) quality = 80;

    var files = srcFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|psd|webp|bmp)$/i);
    if (files.length === 0) {
        alert("入力フォルダに画像がありません。");
        return;
    }

    var displayDialogsOriginal = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    var count = 0;
    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            var baseName = files[i].name.replace(/\.[^\.]+$/, "");
            var outFile = new File(dstFolder + "/" + baseName + ".jpg");

            var opts = new ExportOptionsSaveForWeb();
            opts.format = SaveDocumentType.JPEG;
            opts.quality = quality;
            opts.includeProfile = false;
            opts.optimized = true;
            doc.exportDocument(outFile, ExportType.SAVEFORWEB, opts);

            doc.close(SaveOptions.DONOTSAVECHANGES);
            count++;
        } catch (e) {}
    }

    app.displayDialogs = displayDialogsOriginal;
    alert(count + " 枚のJPGを書き出しました。");
})();
