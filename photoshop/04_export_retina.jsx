/**
 * @name        Retina用 @2x / @1x 書き出し
 * @description 現状サイズを @2x として、50% 縮小した @1x も自動で書き出します。
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
    var folder = Folder.selectDialog("書き出し先");
    if (!folder) return;

    var baseName = doc.name.replace(/\.[^\.]+$/, "");

    var file2x = new File(folder + "/" + baseName + "@2x.png");
    var opts = new PNGSaveOptions();
    opts.interlaced = false;
    doc.saveAs(file2x, opts, true, Extension.LOWERCASE);

    var dup = doc.duplicate(baseName + "_1x", true);
    dup.resizeImage(
        UnitValue(dup.width.value / 2, "px"),
        UnitValue(dup.height.value / 2, "px"),
        dup.resolution,
        ResampleMethod.BICUBICSHARPER
    );
    var file1x = new File(folder + "/" + baseName + "@1x.png");
    dup.saveAs(file1x, opts, true, Extension.LOWERCASE);
    dup.close(SaveOptions.DONOTSAVECHANGES);

    alert("書き出し完了:\n" + file2x.fsName + "\n" + file1x.fsName);
})();
