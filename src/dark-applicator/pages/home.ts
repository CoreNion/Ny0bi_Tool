import $ from "jquery";
import { classCSSPatcher, headStyleInjector, updateInjectStyle } from "../utilities";
import topPageCSS from "./home-common-css/top.scss";
import genresCSS from "./home-common-css/genres.scss";
import myCourceCSS from "./home-common-css/my-cource.scss";
import courceCSS from "./home-common-css/cource.scss";
import commonCSS from "./home-common-css/common.scss";
import forumCommonCSS from "./home-common-css/forum/common.scss";
import forumListCSS from "./home-common-css/forum/list.scss";
import forumQuestCSS from "./home-common-css/forum/question.scss";
import forumNewQuestCSS from "./home-common-css/forum/new.scss";
import lessonCSS from "./home-common-css/lesson.scss";
import noticesCSS from "./home-common-css/notices.scss"

export default function applyDarkHomePage() {
  // 全てのページで必要なcssを読み込む
  commonCSS.use();

  const branch = () => {
    const path = location.pathname;
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
    console.log("Ny0bi_Tool: Detect setting page");

    //ページタイトルの文字色を変更
    classCSSPatcher($("[role=main] > div:nth-child(2) > h1"), "color: #e8e8ff;", null, null);

    //中央部のメインの設定の色を変更
    const contentPath = "[role=main] > div:nth-child(3)";
    classCSSPatcher($(contentPath), "background-color: #222222; color: #FFFFFF;", null, 2);
    //設定一覧の部分の文字色を変更
    classCSSPatcher($(contentPath + " > ul:nth-child(1) > li > a"), "color: #FFFFFF !important;", null, null);
    //所属先の部分の色を変更
    classCSSPatcher($(contentPath + " > div:nth-child(3) > div:nth-child(2) > div > ul > li:nth-child(2)"), "background-color: #b8fdac; color: #000000;", null, null);
    //右側のボタンの色を変更
    classCSSPatcher($(contentPath + " > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a > button"), "background-color: #4f73e3; color: #FFF; border: 0px", null, null);
    classCSSPatcher($(contentPath + " > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a > button"), "color: #FFF;", "hover", null);
  }
}