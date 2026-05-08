/**
 * @name        フォルダ内画像を一括トリミング（透明部分）
 * @description フォルダ内の全画像の透明な余白を一括でトリミングします。
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

    var files = srcFolder.getFiles(/\.(png|tif|tiff|psd)$/i);
    if (files.length === 0) {
        alert("透明背景対応のファイル（PNG/TIFF/PSD）が見つかりません。");
        return;
    }

    var displayDialogsOriginal = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    var count = 0;
    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            try {
                doc.trim(TrimType.TRANSPARENT, true, true, true, true);
            } catch (e) {}

            var baseName = files[i].name.replace(/\.[^\.]+$/, "");
            var outFile = new File(dstFolder + "/" + baseName + ".png");
            var opts = new PNGSaveOptions();
            opts.interlaced = false;
            doc.saveAs(outFile, opts, true, Extension.LOWERCASE);
            doc.close(SaveOptions.DONOTSAVECHANGES);
            count++;
        } catch (e) {}
    }

    app.displayDialogs = displayDialogsOriginal;
    alert(count + " 枚をトリミングしました。");
})();
