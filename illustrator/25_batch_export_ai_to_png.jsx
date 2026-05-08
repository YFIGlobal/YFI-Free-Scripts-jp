/**
 * @name        フォルダ内のAIファイルを一括PNG書き出し
 * @description フォルダ内の全 .ai ファイルを開いて、各アートボードをPNGとして出力フォルダに保存します。
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

    var totalPngs = 0;
    var docsProcessed = 0;

    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);
            var baseName = files[i].name.replace(/\.[^\.]+$/, "");

            for (var a = 0; a < doc.artboards.length; a++) {
                doc.artboards.setActiveArtboardIndex(a);
                var ab = doc.artboards[a];
                var safeName = ab.name.replace(/[\\\/:\*\?"<>\|]/g, "_");
                var suffix = doc.artboards.length > 1 ? "_" + safeName : "";
                var outFile = new File(dstFolder + "/" + baseName + suffix + ".png");

                var opts = new ExportOptionsPNG24();
                opts.artBoardClipping = true;
                opts.transparency = true;
                opts.antiAliasing = true;
                doc.exportFile(outFile, ExportType.PNG24, opts);
                totalPngs++;
            }

            doc.close(SaveOptions.DONOTSAVECHANGES);
            docsProcessed++;
        } catch (e) {}
    }

    alert(docsProcessed + " 件のファイルを処理しました。\n合計 " + totalPngs + " 枚のPNGを書き出しました。");
})();
