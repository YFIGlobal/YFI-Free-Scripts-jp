/**
 * @name        CSVから連絡先カード生成
 * @description CSVを読み込み、1行ごとに新規ページを作成し列ごとにテキストフレームを配置します。
 *              CSVの1行目はヘッダー（フレームの見出しに使われます）。
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

    var csvFile = File.openDialog("CSVファイル", "*.csv");
    if (!csvFile) return;

    csvFile.encoding = "UTF-8";
    csvFile.open("r");
    var lines = [];
    while (!csvFile.eof) {
        var line = csvFile.readln();
        if (line && line.length > 0) lines.push(line);
    }
    csvFile.close();

    if (lines.length < 2) {
        alert("CSVに2行以上必要です（1行目=ヘッダー）。");
        return;
    }

    function parseCSVLine(line) {
        var out = [], cur = "", inQ = false;
        for (var i = 0; i < line.length; i++) {
            var c = line.charAt(i);
            if (c === '"') { inQ = !inQ; continue; }
            if (c === "," && !inQ) { out.push(cur); cur = ""; continue; }
            cur += c;
        }
        out.push(cur);
        return out;
    }

    var headers = parseCSVLine(lines[0]);
    var doc = app.activeDocument;
    var created = 0;

    for (var r = 1; r < lines.length; r++) {
        var fields = parseCSVLine(lines[r]);
        var page = doc.pages.add();
        var b = page.bounds;
        var w = b[3] - b[1];

        for (var c = 0; c < fields.length && c < headers.length; c++) {
            var tf = page.textFrames.add();
            var top = b[0] + 30 + c * 30;
            var left = b[1] + 30;
            tf.geometricBounds = [top, left, top + 25, left + (w - 60)];
            tf.contents = headers[c] + ": " + fields[c];
        }
        created++;
    }

    alert(created + " ページを生成しました。");
})();
