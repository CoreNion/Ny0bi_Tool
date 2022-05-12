import $ from "jquery";
import ContentApplicator from "./dark-applicator/pages/content";
import CourceApplicator from "./dark-applicator/pages/cource";
import HomeApplicator from "./dark-applicator/pages/home";
import { applyDarkTopBar, URLTracker } from "./dark-applicator/utilities";

$(window).on("load", function () {
  //localのsetDarkMode値を取得
  chrome.storage.local.get("setDarkMode", function (data: any) {
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
  console.log("\x1b[44m\x1b[33mDark mode by Ny0bi Tool\x1b[0m");

  //URlのパスを取得
  const path = location.pathname;

  if (path.match(/guides\/\d+\/content/)) {
    ContentApplicator.textPage(false);
  } else if (path.match(/guides|evaluation_tests|essay_tests|evaluation_reports|essay_reports/)) {
    ContentApplicator.guidePage(false);
  } else if (path.match(/references/)) {
    ContentApplicator.guidePage(true);
  } else if (path.match(/movies/)) {
    ContentApplicator.moviePage();
  } else if (path.match(/links/)) {
    ContentApplicator.guidePage(false);
  } else if (path.match(/chapters\/\d+/)) {
    CourceApplicator.chapterPage();
  } else if (path.match(/lessons\/\d+/)) {
    CourceApplicator.lessonPage();
  } else if (path.match(/short_tests/)) {
    CourceApplicator.chapterPage();
  } else if (path.match(/short_test_sets/)) {
    ContentApplicator.guidePage(true);
  } else if (path.match(/short_test_sessions/)) {
    CourceApplicator.testPage();
  } else if (path.match(/setting\/profile/)) {
    CourceApplicator.profilePage();
  } else if (path.match(/home|genres|my_course|lessons|questions|notices|setting|courses\/\d+\/chapters|packages|setting\/profile|courses/)) {
    $("body").css({ "background-color": "#000", "color": "#e8e8e8" });

    if (path.match(/home/)) {
      HomeApplicator.topPage();
    } else if (path.match(/genres/)) {
      HomeApplicator.genrePage();
    } else if (path.match(/my_course/)) {
      HomeApplicator.myCourcePage();
    } else if (path.match(/courses/)) {
      HomeApplicator.courcePage();
    } else if (path.match(/questions/)) {
      HomeApplicator.forumPage();
    } else if (path.match(/lessons/)) {
      HomeApplicator.lessonListPage();
    } else if (path.match(/notices/)) {
      HomeApplicator.noticesPage();
    } else if (path.match(/setting/)) {
      HomeApplicator.settingPage();
    }
    applyDarkTopBar();
    URLTracker();
  }

  chrome.storage.local.set({ 'nowPage': path });
}