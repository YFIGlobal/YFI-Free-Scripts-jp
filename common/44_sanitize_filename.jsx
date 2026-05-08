/**
 * @name        ファイル名から日本語・特殊文字を除去
 * @description 指定フォルダ内のファイル名から日本語・特殊文字をアンダースコアに置換します。
 * @target      photoshop, illustrator, indesign
 * @author      YFI-Global
 * @license     MIT
 * @version     1.0.0
 */

(function () {
    var folder = Folder.selectDialog("対象フォルダ");
    if (!folder) return;

    var files = folder.getFiles(function (f) { return f instanceof File; });
    var renamed = 0;
    var report = [];

    for (var i = 0; i < files.length; i++) {
        var f = files[i];
        var oldName = decodeURI(f.name);
        var newName = oldName.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_");
        if (newName !== oldName) {
            try {
                var newFile = new File(folder + "/" + newName);
                if (newFile.exists) {
                    var i2 = 1;
                    while (newFile.exists) {
                        var dot = newName.lastIndexOf(".");
                        var stem = dot > 0 ? newName.substring(0, dot) : newName;
                        var ext = dot > 0 ? newName.substring(dot) : "";
                        newFile = new File(folder + "/" + stem + "_" + i2 + ext);
                        i2++;
                    }
                }
                f.rename(newFile.name);
                report.push(oldName + " → " + newFile.name);
                renamed++;
            } catch (e) {}
        }
    }

    var preview = report.slice(0, 20).join("\n");
    if (report.length > 20) preview += "\n... 他 " + (report.length - 20) + " 件";
    alert(renamed + " 件をリネームしました。\n\n" + preview);
})();
