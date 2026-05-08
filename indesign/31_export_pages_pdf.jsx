/**
 * @name        全ページPDF個別書き出し
 * @description 全ページをそれぞれ個別のPDFとして書き出します。
 * @target      indesign
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target indesign

(function () {
    if (app.documents.length === 0) {
        alert("ドキュメントを開いてください。");
        return;
    }

    var doc = app.activeDocument;
    var folder = Folder.selectDialog("出力フォルダ");
    if (!folder) return;

    var preset = app.pdfExportPresets.itemByName("[High Quality Print]");
    if (!preset.isValid) preset = app.pdfExportPresets[0];

    var baseName = doc.name.replace(/\.[^\.]+$/, "");
    var count = 0;

    for (var i = 0; i < doc.pages.length; i++) {
        var page = doc.pages[i];
        var pageName = page.name;
        var safeName = pageName.replace(/[\\\/:\*\?"<>\|]/g, "_");
        var file = new File(folder + "/" + baseName + "_p" + safeName + ".pdf");

        app.pdfExportPreferences.pageRange = pageName;
        doc.exportFile(ExportFormat.PDF_TYPE, file, false, preset);
        count++;
    }

    alert(count + " ページを書き出しました。");
})();
