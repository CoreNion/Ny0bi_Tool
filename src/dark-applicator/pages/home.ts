import { updateInjectStyle } from "../utilities";
import topPageCSS from "./home-common-css/top.scss";
import genresCSS from "./home-common-css/genres.scss";
import chaperCSS from "./home-common-css/cource/chapter.scss";
import myCourceCSS from "./home-common-css/my-cource.scss";
import courceCSS from "./home-common-css/cource.scss";
import commonCSS from "./home-common-css/common.scss";
import forumCommonCSS from "./home-common-css/forum/common.scss";
import forumListCSS from "./home-common-css/forum/list.scss";
import forumQuestCSS from "./home-common-css/forum/question.scss";
import forumNewQuestCSS from "./home-common-css/forum/new.scss";
import lessonCSS from "./home-common-css/lesson.scss";
import noticesCSS from "./home-common-css/notices.scss";
import accountSettingCSS from "./home-common-css/setting/account.scss";
import profileSettingCSS from "./home-common-css/setting/profile.scss";
import kdEduCSS from "./home-common-css/kd-edu.scss";
import studyPlans from "./home-common-css/study-plans.scss";

export default function applyDarkHomePage() {
  // 全てのページで必要なcssを読み込む
  commonCSS.use();

  const branch = () => {
    const path = location.pathname;
    if (path.match(/home/)) {
      HomeApplicator.topPage();
    } else if (path.match(/short_tests/)) {
      // テストページでは無効化(トラブル防止)
      location.reload();
    } else if (path.match(/genres/)) {
      HomeApplicator.genrePage();
    } else if (path.match(/chapters/)) {
      HomeApplicator.chapterPage();
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
    } else if (path.match(/kd-edu/)) {
      HomeApplicator.kdEduPage();
    } else if (path.match(/study_plans/)) {
      HomeApplicator.studyPlans();
    }
  }
  branch();

  // URLの変化の検知
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      branch();
    }
  }).observe(document, { subtree: true, childList: true });
}

/**
 * ホーム系のページにダークモードを適用するクラス
 */
class HomeApplicator {
  static topPage() {
    console.log("Ny0bi_Tool: Detect top page");
    topPageCSS.use();
    updateInjectStyle(topPageCSS, true);
  }

  static genrePage() {
    console.log("Ny0bi_Tool: Detect genre page");
    genresCSS.use();
    updateInjectStyle(genresCSS, true);
  }

  static chapterPage() {
    console.log("Ny0bi_Tool: Detect chapter page");
    chaperCSS.use();
    updateInjectStyle(chaperCSS, true);
  }

  static myCourcePage() {
    console.log("Ny0bi_Tool: Detect my cource page");
    myCourceCSS.use();
    updateInjectStyle(myCourceCSS, true);
  }

  static courcePage() {
    console.log("Ny0bi_Tool: Detect cource page");
    courceCSS.use();
    updateInjectStyle(courceCSS, true);
  }

  static forumPage() {
    console.log("Ny0bi_Tool:Detect forum page");
    const path = location.pathname;

    forumCommonCSS.use();
    updateInjectStyle(forumCommonCSS, true);

    if (path.match(/questions\/\d+/)) {
      console.log("Ny0bi_Tool:Detect questions page");

      forumQuestCSS.use();
      updateInjectStyle(forumQuestCSS, false);
    } else if (path.match(/new/)) {
      console.log("Ny0bi_Tool:Detect new page");

      forumNewQuestCSS.use();
      updateInjectStyle(forumNewQuestCSS, false);
    } else {
      console.log("Ny0bi_Tool:Detect list page");

      forumListCSS.use();
      updateInjectStyle(forumListCSS, false);
    }
  }

  static lessonListPage() {
    console.log("Ny0bi_Tool: Detect lesson list page");

    lessonCSS.use();
    updateInjectStyle(lessonCSS, false);
  }

  static noticesPage() {
    console.log("Ny0bi_Tool: Detect notices page");

    noticesCSS.use();
    updateInjectStyle(noticesCSS, false);
  }

  static settingPage() {
    console.log("Ny0bi_Tool: Detect home setting page");
    const path = location.pathname;

    if (path.match(/profile/)) {
      console.log("Ny0bi_Tool: Detect profile page");

      profileSettingCSS.use();
      updateInjectStyle(profileSettingCSS, true);
    } else {
      console.log("Ny0bi_Tool: Detect account page");

      accountSettingCSS.use();
      updateInjectStyle(accountSettingCSS, true);
    }
  }

  static kdEduPage() {
    console.log("Ny0bi_Tool: Detect kd-edu page");

    kdEduCSS.use();
    updateInjectStyle(kdEduCSS, false)
  }

  static studyPlans() {
    console.log("Ny0bi_Tool: Detect study-plans page");

    studyPlans.use();
    updateInjectStyle(studyPlans, false)
  }
}