'use strict';
import style from './popup.scss';
import 'css-checkbox-library';
import $ from "jquery";
import { render as gbRender } from 'github-buttons'

const gbDefaultOption = { "data-size": "large", "data-color-scheme": "no-preference: dark; light: dark; dark: dark;" };
// GitHub Buttonsのアイコンを設定
gbRender(Object.assign(gbDefaultOption, { "href": "https://github.com/CoreNion/Ny0bi_Tool", "data-text": "Repository" }),
  (el) => $("#repoLink").append($(el)));
gbRender(Object.assign(gbDefaultOption, { "href": "https://github.com/CoreNion/Ny0bi_Tool/issues/", "data-text": "Issues", "data-icon": "octicon-issue-opened" }),
  (el) => $("#issuesLink").append($(el)));

style.use();

//ストレージから各種情報を取得
chrome.storage.local.get(["setDarkMode", "setHomeDark"], data => {
  //ダークモードが有効かどうか確認し、チェックボックスに反映
  if (data.setDarkMode) {
    $("input[name=darkmodeSwitcher]").prop("checked", true);
  } else {
    $("input[name=darkmodeSwitcher]").prop("checked", false);
  }

  if (data.setHomeDark) {
    $("input[name=homeDarkmodeSwitcher]").prop("checked", true);
  } else {
    $("input[name=homeDarkmodeSwitcher]").prop("checked", false);
  }
});

//バージョンを表示
$("#version").text(chrome.runtime.getManifest().version);

//ダークモードの有効・無効化ボタンが押された時の動作
$("input[name=darkmodeSwitcher]").on("change", data => {
  if ($("input[name=darkmodeSwitcher]").prop("checked")) {
    //有効化状態を保存
    chrome.storage.local.set({ 'setDarkMode': true });
  } else {
    //無効化状態を保存
    chrome.storage.local.set({ 'setDarkMode': false });
  }
  alert("変更を適用するにはページを再読み込みしてください。");
});

$("input[name=homeDarkmodeSwitcher]").on("change", data => {
  if ($("input[name=homeDarkmodeSwitcher]").prop("checked")) {
    //有効化状態を保存
    chrome.storage.local.set({ 'setHomeDark': true });
  } else {
    //無効化状態を保存
    chrome.storage.local.set({ 'setHomeDark': false });
  }
  alert("変更を適用するにはページを再読み込みしてください。");
});