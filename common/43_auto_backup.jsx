/**
 * @name        別名保存バックアップ
 * @description アクティブドキュメントを「backups/元名_YYYYMMDD-HHMMSS.psd」として保存します。
 *              ※ 自動繰り返しはOSのスケジューラ等と組み合わせてください。
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
    var folder;
    try {
        folder = new Folder(doc.path + "/backups");
    } catch (e) {
        folder = new Folder(Folder.myDocuments + "/backups");
    }
    if (!folder.exists) folder.create();

    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var stamp = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate())
              + "-" + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());

    var baseName = doc.name.replace(/\.[^\.]+$/, "");
    var file = new File(folder + "/" + baseName + "_" + stamp + ".psd");

    var opts = new PhotoshopSaveOptions();
    opts.embedColorProfile = true;
    opts.maximizeCompatibility = true;
    doc.saveAs(file, opts, true, Extension.LOWERCASE);

    alert("バックアップ保存:\n" + file.fsName);
})();
