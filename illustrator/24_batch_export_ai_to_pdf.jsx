/**
 * @name        フォルダ内のAIファイルを一括PDF書き出し
 * @description フォルダ内の全 .ai ファイルを開いて、複数ページPDF（1アートボード=1ページ）として出力フォルダに保存します。
 * @target      illustrator
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target illustrator

(function () {
    var srcFolder = Folder.selectDialog("入力フォルダ（.aiファイル）");
    if (!srcFolder) return;
    var dstFolder = Folder.selectDialog("出力フォルダ");
    if (!dstFolder) return;

    var files = srcFolder.getFiles(/\.ai$/i);
    if (files.length === 0) {
        alert(".aiファイルが見つかりません。");
        return;
    }

    var count = 0;
    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            var baseName = files[i].name.replace(/\.[^\.]+$/, "");
            var outFile = new File(dstFolder + "/" + baseName + ".pdf");

            var opts = new PDFSaveOptions();
            opts.compatibility = PDFCompatibility.ACROBAT5;
            opts.preserveEditability = false;
            opts.viewAfterSaving = false;
            if (doc.artboards.length > 1) {
                opts.saveMultipleArtboards = true;
                opts.artboardRange = "1-" + doc.artboards.length;
            }
            doc.saveAs(outFile, opts);
            doc.close(SaveOptions.DONOTSAVECHANGES);
            count++;
        } catch (e) {}
    }

    alert(count + " 件のPDFを書き出しました。");
})();
