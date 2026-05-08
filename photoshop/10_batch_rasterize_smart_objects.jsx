/**
 * @name        フォルダ内PSDのスマートオブジェクトを一括ラスタライズ
 * @description フォルダ内の全PSDを開き、各ファイル内のスマートオブジェクトをラスタライズして出力フォルダに保存します。
 * @target      photoshop
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

#target photoshop

(function () {
    var srcFolder = Folder.selectDialog("入力フォルダ（PSD）");
    if (!srcFolder) return;
    var dstFolder = Folder.selectDialog("出力フォルダ");
    if (!dstFolder) return;

    var files = srcFolder.getFiles(/\.psd$/i);
    if (files.length === 0) {
        alert("PSDファイルが見つかりません。");
        return;
    }

    var displayDialogsOriginal = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    var processed = 0;
    var rasterized = 0;

    for (var i = 0; i < files.length; i++) {
        try {
            var doc = app.open(files[i]);

            (function walk(container) {
                for (var j = 0; j < container.layers.length; j++) {
                    var ly = container.layers[j];
                    if (ly.typename === "LayerSet") {
                        walk(ly);
                    } else if (ly.kind === LayerKind.SMARTOBJECT) {
                        try {
                            doc.activeLayer = ly;
                            ly.rasterize(RasterizeType.ENTIRELAYER);
                            rasterized++;
                        } catch (e) {}
                    }
                }
            })(doc);

            var baseName = files[i].name.replace(/\.[^\.]+$/, "");
            var outFile = new File(dstFolder + "/" + baseName + ".psd");
            var opts = new PhotoshopSaveOptions();
            opts.embedColorProfile = true;
            opts.maximizeCompatibility = true;
            doc.saveAs(outFile, opts, true, Extension.LOWERCASE);
            doc.close(SaveOptions.DONOTSAVECHANGES);
            processed++;
        } catch (e) {}
    }

    app.displayDialogs = displayDialogsOriginal;
    alert(processed + " ファイル処理完了。\n合計 " + rasterized + " 個のスマートオブジェクトをラスタライズしました。");
})();
