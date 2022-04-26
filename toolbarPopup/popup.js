//DOMがロードされた後に実行するもの
$(function () {
  //ストレージから各種情報を取得
  chrome.storage.local.get(["setDarkMode"], function (data) {
    //拡張機能が有効かどうか確認し、チェックボックスに反映
    if (data.setDarkMode) {
      $("input[name=darkmodeSwitcher]").prop("checked", true);
    } else {
      $("input[name=darkmodeSwitcher]").prop("checked", false);
    }
  });

  //バージョンを表示
  $("#version").html(chrome.runtime.getManifest().version);
});

//拡張機能の有効/無効化ボタンが押された時の動作
$("input[name=darkmodeSwitcher]").on("change", function () {
  if ($("input[name=darkmodeSwitcher]").prop("checked")) {
    //有効化状態を保存
    chrome.storage.local.set({ 'setDarkMode': true });
  } else {
    //無効化状態を保存
    chrome.storage.local.set({ 'setDarkMode': false });
  }
  alert("変更を適用するにはページを再読み込みしてください。");
})
