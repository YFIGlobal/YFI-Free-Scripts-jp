# YFI フリースクリプト集

Photoshop / Illustrator / InDesign / After Effects 用のExtendScript（.jsx）44本セット。
無料・MITライセンス・商用利用OK。

> English: **[YFI-Free-Scripts](https://github.com/YFIGlobal/YFI-Free-Scripts)**

---

## ダウンロード

<p>
  <a href="https://github.com/YFIGlobal/YFI-Free-Scripts-jp/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/%E4%B8%80%E6%8B%AC%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89-ZIP_(44%E6%9C%AC)-2ea44f?style=for-the-badge&logo=adobe" alt="ZIPダウンロード" />
  </a>
  <a href="https://github.com/YFIGlobal/YFI-Free-Scripts-jp/releases/latest">
    <img src="https://img.shields.io/badge/%E6%9C%80%E6%96%B0%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9-blue?style=for-the-badge&logo=github" alt="最新リリース" />
  </a>
</p>

1本だけ欲しいときは、下の表のファイル名をクリック → GitHub上で右上の **Download raw file**（⬇）ボタン。

---

## 使い方

**Photoshop / Illustrator / InDesign**：ファイル → スクリプト → 参照... から `.jsx` を選択。

**After Effects**：`Adobe After Effects/Scripts/ScriptUI Panels/` に配置するか、ファイル → スクリプト → スクリプトファイルを実行...

メニューに常駐させたい場合は、アプリの `Presets/Scripts` フォルダに入れて再起動してください。

---

## Photoshop（16本）

| # | ファイル | 機能 |
|---|---|---|
| 01 | [save_all_documents.jsx](photoshop/01_save_all_documents.jsx) | 開いてる全ドキュメントを一括保存 |
| 02 | [save_with_date.jsx](photoshop/02_save_with_date.jsx) | アクティブドキュメントを `_YYYYMMDD-HHMM` 付きで別名保存 |
| 03 | [batch_export_web_jpg.jsx](photoshop/03_batch_export_web_jpg.jsx) | フォルダ内画像をWeb用JPGに一括変換 |
| 04 | [export_retina.jsx](photoshop/04_export_retina.jsx) | アクティブドキュメントを@2xと@1xで書き出し |
| 05 | [delete_empty_layers.jsx](photoshop/05_delete_empty_layers.jsx) | 空レイヤーを一括削除 |
| 06 | [delete_hidden_layers.jsx](photoshop/06_delete_hidden_layers.jsx) | 非表示レイヤーを一括削除 |
| 07 | [rename_layers_sequential.jsx](photoshop/07_rename_layers_sequential.jsx) | レイヤー名を `ベース名_001` 形式で連番リネーム |
| 08 | [group_same_name_layers.jsx](photoshop/08_group_same_name_layers.jsx) | 同名レイヤーをグループ化 |
| 09 | [colorize_layers_by_kind.jsx](photoshop/09_colorize_layers_by_kind.jsx) | レイヤー種別ごとに色分け |
| 10 | [batch_rasterize_smart_objects.jsx](photoshop/10_batch_rasterize_smart_objects.jsx) | フォルダ内のPSDのスマートオブジェクトを一括ラスタライズ |
| 11 | [batch_resize_long_edge.jsx](photoshop/11_batch_resize_long_edge.jsx) | フォルダ内画像を長辺指定で一括リサイズ |
| 12 | [batch_cmyk_to_rgb.jsx](photoshop/12_batch_cmyk_to_rgb.jsx) | フォルダ内のCMYK画像をsRGBに一括変換 |
| 13 | [batch_change_resolution.jsx](photoshop/13_batch_change_resolution.jsx) | フォルダ内画像の解像度を一括変更 |
| 14 | [batch_watermark.jsx](photoshop/14_batch_watermark.jsx) | フォルダ内画像にウォーターマークを一括追加 |
| 15 | [batch_trim_transparent.jsx](photoshop/15_batch_trim_transparent.jsx) | フォルダ内の透明余白を一括トリミング |
| 16 | [batch_square_canvas.jsx](photoshop/16_batch_square_canvas.jsx) | フォルダ内画像を正方形カンバスに一括調整 |

## Illustrator（14本）

| # | ファイル | 機能 |
|---|---|---|
| 17 | [cleanup_unused.jsx](illustrator/17_cleanup_unused.jsx) | 未使用スウォッチ・ブラシ・シンボルを削除 |
| 18 | [random_position.jsx](illustrator/18_random_position.jsx) | 選択オブジェクトをアートボード内にランダム配置 |
| 19 | [generate_grid.jsx](illustrator/19_generate_grid.jsx) | グリッド線を新規レイヤーに自動生成 |
| 20 | [remove_duplicates.jsx](illustrator/20_remove_duplicates.jsx) | 同じ位置・サイズの重複オブジェクトを削除 |
| 21 | [rename_artboards.jsx](illustrator/21_rename_artboards.jsx) | アートボード名を連番リネーム |
| 22 | [find_missing_fonts.jsx](illustrator/22_find_missing_fonts.jsx) | プリフライト：未インストールのフォントを一覧表示 |
| 23 | [resize_artboards_to_content.jsx](illustrator/23_resize_artboards_to_content.jsx) | 全アートボードをアートワーク境界に合わせてリサイズ |
| 24 | [batch_export_ai_to_pdf.jsx](illustrator/24_batch_export_ai_to_pdf.jsx) | フォルダ内の.aiファイルを複数ページPDFに一括変換 |
| 25 | [batch_export_ai_to_png.jsx](illustrator/25_batch_export_ai_to_png.jsx) | フォルダ内の.aiファイルをアートボードごとに一括PNG書き出し |
| 26 | [extract_text_to_file.jsx](illustrator/26_extract_text_to_file.jsx) | 全テキストを.txtファイルに抽出 |
| 27 | [text_case_change.jsx](illustrator/27_text_case_change.jsx) | 選択テキストを大文字/小文字/タイトルケースに変換 |
| 28 | [distribute_in_circle.jsx](illustrator/28_distribute_in_circle.jsx) | 選択オブジェクトを円周上に等間隔配置 |
| 29 | [add_artboard_numbers.jsx](illustrator/29_add_artboard_numbers.jsx) | 各アートボードに `01`、`02`... のラベルを配置 |
| 30 | [rgb_to_cmyk_per_object.jsx](illustrator/30_rgb_to_cmyk_per_object.jsx) | RGB塗り・線をCMYKに変換 |

## InDesign（6本）

| # | ファイル | 機能 |
|---|---|---|
| 31 | [export_pages_pdf.jsx](indesign/31_export_pages_pdf.jsx) | 全ページをPDF個別書き出し |
| 32 | [split_spreads.jsx](indesign/32_split_spreads.jsx) | 見開きを単ページに分割 |
| 33 | [delete_empty_frames.jsx](indesign/33_delete_empty_frames.jsx) | 空テキストフレームを削除 |
| 34 | [list_broken_links.jsx](indesign/34_list_broken_links.jsx) | リンク切れ・更新が必要な画像を一覧表示 |
| 35 | [cards_from_csv.jsx](indesign/35_cards_from_csv.jsx) | CSVから1行=1ページのカードを生成 |
| 36 | [set_bleed_marks.jsx](indesign/36_set_bleed_marks.jsx) | 裁ち落とし3mm + トンボを設定 |

## After Effects（5本）

| # | ファイル | 機能 |
|---|---|---|
| 37 | [rename_layers_ae.jsx](aftereffects/37_rename_layers_ae.jsx) | アクティブコンポの全レイヤーを連番リネーム |
| 38 | [distribute_keyframes.jsx](aftereffects/38_distribute_keyframes.jsx) | 選択キーフレームを等間隔配置 |
| 39 | [random_time_offset.jsx](aftereffects/39_random_time_offset.jsx) | 選択レイヤーの開始時刻をランダムオフセット |
| 40 | [queue_all_comps.jsx](aftereffects/40_queue_all_comps.jsx) | 全コンポをレンダーキューに追加 |
| 41 | [parent_to_null.jsx](aftereffects/41_parent_to_null.jsx) | 新規ヌルを作成して選択レイヤーを親付け |

## 共通（3本）

| # | ファイル | 機能 |
|---|---|---|
| 42 | [work_timer.jsx](common/42_work_timer.jsx) | START/STOPを切替えてDocumentsフォルダのCSVに記録 |
| 43 | [auto_backup.jsx](common/43_auto_backup.jsx) | タイムスタンプ付きでbackupsフォルダにPSDを保存 |
| 44 | [sanitize_filename.jsx](common/44_sanitize_filename.jsx) | フォルダ内のファイル名から日本語・特殊文字を除去 |

---

MIT License · YFI-Global · バグ報告・要望はIssuesまで
