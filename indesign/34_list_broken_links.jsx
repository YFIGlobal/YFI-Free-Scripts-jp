/**
 * @name        リンク切れ一覧表示
 * @description リンク切れ・更新が必要なリンクを一覧表示します。
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
    var report = [];

    for (var i = 0; i < doc.links.length; i++) {
        var link = doc.links[i];
        var status = String(link.status);
        if (status.indexOf("MISSING") !== -1 || status.indexOf("MODIFIED") !== -1
            || status === "LinkStatus.LINK_MISSING" || status === "LinkStatus.LINK_OUT_OF_DATE") {
            report.push((report.length + 1) + ". [" + link.status + "] " + link.name);
        }
    }

    if (report.length === 0) {
        alert("すべてのリンクは正常です。");
    } else {
        alert("問題のあるリンク:\n\n" + report.join("\n"));
    }
})();
