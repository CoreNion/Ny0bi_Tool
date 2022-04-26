'use strict';

$(window).on("load", function () {
  //localのsetDarkMode値を取得
  chrome.storage.local.get("setDarkMode", function (data) {
    //初回起動などで設定したことが無いなどの理由でundefinedな場合は有効化
    if (data.setDarkMode == undefined) {
      chrome.storage.local.set({ 'setDarkMode': true });
      applyDarkMode();
    } else if (data.setDarkMode) {
      applyDarkMode();
    }
  });
});

/**
 * N予備校のページをダークモードにする関数
 */
function applyDarkMode() {
  //URlのパスを取得
  const path = location.pathname;

  if (path.match(/guides\/\d+\/content/)) {
    applyDarkTextPage(false);
  } else if (path.match(/guides|evaluation_tests|essay_tests|evaluation_reports|essay_reports/)) {
    applyDarkGuidePage(false);
  } else if (path.match(/references/)) {
    applyDarkGuidePage(true);
  } else if (path.match(/movies/)) {
    applyMovieDarkPage();
  } else if (path.match(/links/)) {
    applyDarkGuidePage(false);
  } else if (path.match(/chapters\/\d+/)) {
    applyDarkChapterPage();
  } else if (path.match(/lessons\/\d+/)) {
    applyDarkLessonPage();
  } else if (path.match(/short_tests/)) {
    applyDarkChapterPage();
  } else if (path.match(/short_test_sets/)) {
    applyDarkGuidePage(true);
  } else if (path.match(/short_test_sessions/)) {
    applyDarkTestPage();
  } else if (path.match(/setting\/profile/)) {
    applyDarkProfileSettingPage();
  } else if (path.match(/home|genres|my_course|lessons|questions|notices|setting|courses\/\d+\/chapters|packages|setting\/profile|courses/)) {
    //applyDarkNewHomeCentor();
    //URLTracker();
  }

  chrome.storage.local.set({ 'nowPage': path });
}