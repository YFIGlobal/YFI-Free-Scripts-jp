/**
 * @name        日付付きで別名保存
 * @description アクティブドキュメントを「ファイル名_YYYYMMDD-HHMM.psd」で別名保存します。
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
    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var stamp = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate())
              + "-" + pad(d.getHours()) + pad(d.getMinutes());

    var folder, baseName;
    try {
        folder = doc.path;
        baseName = doc.name.replace(/\.[^\.]+$/, "");
    } catch (e) {
        folder = Folder.selectDialog("保存先フォルダ");
        if (!folder) return;
        baseName = doc.name.replace(/\.[^\.]+$/, "");
    }

    var file = new File(folder + "/" + baseName + "_" + stamp + ".psd");
    var opts = new PhotoshopSaveOptions();
    opts.embedColorProfile = true;
    opts.maximizeCompatibility = true;
    doc.saveAs(file, opts, true, Extension.LOWERCASE);

    alert("保存しました:\n" + file.fsName);
})();
