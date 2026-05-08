/**
 * @name        作業時間計測
 * @description 作業の開始・終了時刻を ~/Documents/work_log.csv に追記します。
 *              実行ごとに「START」「STOP」が交互に記録されます。
 * @target      photoshop, illustrator, indesign
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

(function () {
    var logFile = new File(Folder.myDocuments + "/work_log.csv");
    var d = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var stamp = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate())
              + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());

    var lastWasStart = false;
    if (logFile.exists) {
        logFile.encoding = "UTF-8";
        logFile.open("r");
        var content = logFile.read();
        logFile.close();
        var lines = content.split("\n");
        for (var i = lines.length - 1; i >= 0; i--) {
            if (lines[i].indexOf("START") !== -1) { lastWasStart = true; break; }
            if (lines[i].indexOf("STOP") !== -1)  { lastWasStart = false; break; }
        }
    }

    var event = lastWasStart ? "STOP" : "START";
    var docName = "(no doc)";
    try { docName = app.activeDocument.name; } catch (e) {}

    logFile.encoding = "UTF-8";
    if (logFile.exists) {
        logFile.open("e");
        logFile.seek(0, 2);
    } else {
        logFile.open("w");
    }
    logFile.writeln(stamp + "," + event + "," + docName);
    logFile.close();

    alert(event + " を " + stamp + " に記録しました。\n→ " + logFile.fsName);
})();
