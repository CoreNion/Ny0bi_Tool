import $ from "jquery";
import ContentApplicator from "./dark-applicator/pages/content";
import CourceApplicator from "./dark-applicator/pages/cource";
import applyDarkHomePage from "./dark-applicator/pages/home";

$(window).on("load", function () {
  //localのsetDarkMode値を取得
  chrome.storage.local.get(["setDarkMode", "setHomeDark"], async data => {
    //初回起動などで設定したことが無いなどの理由でundefinedな場合は有効化
    if (data.setDarkMode == undefined) {
      await chrome.storage.local.set({ 'setDarkMode': true });
      await chrome.storage.local.set({ 'setHomeDark': true });
    }
    if (data.setDarkMode) {
      data.setHomeDark ? applyDarkMode(true) : applyDarkMode(false);
    }
  });
});

/**
 * N予備校のページをダークモードにする関数
 */
export function applyDarkMode(applyDarkHome: boolean) {
  //URlのパスを取得
  const path = location.pathname;

  if (path.match(/short_tests/)) {
    // テストページでは無効化(トラブル防止)
    return;
  } else if (path.match(/guides\/\d+\/content/)) {
    ContentApplicator.textPage(false);
  } else if (path.match(/guides|evaluation_tests|essay_tests|evaluation_reports|essay_reports/)) {
    ContentApplicator.guidePage(false);
  } else if (path.match(/references/)) {
    ContentApplicator.guidePage(true);
  } else if (path.match(/movies/)) {
    ContentApplicator.moviePage();
  } else if (path.match(/links/)) {
    ContentApplicator.guidePage(false);
  } else if (path.match(/lessons\/\d+/)) {
    CourceApplicator.lessonPage();
  } else if (path.match(/setting\/profile\/private|setting\/profile\/school/)) {
    CourceApplicator.profilePage();
  } else if (path.match(/home|genres|chapters|my_course|lessons|questions|notices|setting|courses\/\d+\/chapters|packages|setting\/profile|courses|kd-edu|study_plans/) && applyDarkHome) {
    applyDarkHomePage();
  } else {
    return;
  }

  console.log("\x1b[44m\x1b[33mDark mode by Ny0bi Tool\x1b[0m");

  chrome.storage.local.set({ 'nowPage': path });
}