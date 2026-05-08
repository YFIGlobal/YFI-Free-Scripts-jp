/**
 * @name        トンボ・裁ち落としを設定
 * @description 裁ち落とし3mm を設定し、PDF書き出し時のトンボをONにします。
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
    var bleed = 3;

    var oldUnits = doc.viewPreferences.horizontalMeasurementUnits;
    doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;

    doc.documentPreferences.documentBleedTopOffset = bleed;
    doc.documentPreferences.documentBleedBottomOffset = bleed;
    doc.documentPreferences.documentBleedInsideOrLeftOffset = bleed;
    doc.documentPreferences.documentBleedOutsideOrRightOffset = bleed;

    app.pdfExportPreferences.cropMarks = true;
    app.pdfExportPreferences.bleedMarks = false;
    app.pdfExportPreferences.useDocumentBleedWithPDF = true;

    doc.viewPreferences.horizontalMeasurementUnits = oldUnits;

    alert("裁ち落とし " + bleed + "mm + トンボを設定しました。");
})();
