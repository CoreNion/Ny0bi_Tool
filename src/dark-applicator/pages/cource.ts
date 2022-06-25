import $ from "jquery";
import { classCSSPatcher } from "../utilities";

/**
 * コース系のページにダークモードを適用するクラス
 */
export default class CourceApplicator {
  /**
 * コースのページとテスト開始前のページにダークモードを適用する関数
 */
  static chapterPage() {
    console.log("Ny0bi_Tool: Detect chapter page");

    const body = $("body");
    body.css({ "background-color": "#000000", "color": "#e8e8e8" });

    //上部のバーにダークモードを設定する
    const topBar = body.find(".u-global-navigation");
    topBar.css("background-color", "#222222");
    const top_li = topBar.find(".u-global-navigation-pages *");
    top_li.css("color", "#e8e8e8");
    //設定に触ったときの色を変更
    $("head").append('<style>.l-header .u-global-navigation>.u-global-navigation-pages li.u-global-navigation-account-menu>ul li.setting>.menu .menu-items li a:hover { background-color: #383838; }</style>')

    //タイトルを黒くする
    body.find(".typo-page-title").css("color", "#FFF");
    body.find(".u-breadcrumbs>li.current > a").css("color", "#dcdcdc");

    //習熟度テストの開始前のページで、中のiframeの背景色をグレーにする
    body.find(".p-short-test-cover").css("background-color", "#202124");

    //教材・授業の一覧にダークモードを適用する
    //全体の色をダークにし、コースとコースの境界線のボーダー色を変更する
    body.find(".u-card").css({ "background-color": "#202124", "color": "#FFF", "border": "none" });
    $("head").append('<style>.u-list.has-linked-children>li { border: solid 1px #2f2f2f} </style>');
    //フィルターを適用するボタンの色にダークモード適用
    body.find(".u-filter").css({ "background-color": "#353535", "border": "solid 1px #929292;" });
    body.find(".u-button").css({ "background-color": "#505050", "border": "#505050" });
    //教材名の文字色を白に
    $("head").append('<style>.u-list.has-linked-children>li>a { color: #e8e8e8 } </style>');
    //教材や授業を触ったときの色を変更
    $("head").append('<style>.u-list.has-linked-children>li>a:hover { background-color: #383838; }</style>');
    //進行度のバーの色を調整
    $("head").append('<style>.u-progress { background-color: rgb(191 191 191); }</style>');
    //必修授業でまだ見れない授業の色を調整
    $("head").append('<style>.p-chapter-show .l-column-common.section .u-list li a.is-gate-closed::after { filter: invert(1); }</style>');
    $("head").append('<style>.p-chapter-show .l-column-common.section .u-list li.supplement>a.is-gate-closed { filter: invert(1); }</style>');
  }

  /**
 * 授業のページにダークモードを適用する関数
 */
  static lessonPage() {
    console.log("Ny0bi_Tool: Detect lesson page");

    const body = $("body");
    body.css({ "background-color": "#000000", "color": "#e8e8e8" });

    //上部のバーにダークモードを設定する
    const topBar = $("[role=banner]");
    topBar.css("background-color", "#292A2D");
    //「N予備校とは」などと書かれている部分の文字/背景色の設定
    topBar.find("ul *,ul").css({ "color": "#8AB4F8", "background-color": "#292A2D" });

    //コメビューを黒くする
    $("head").append('<style>textarea { background-color: #202124; color: #e8e8e8; }</style>');

    //タイトルなどが書かれている部分にダークモードを設定する
    const titleArea = $("[role=main] > aside > div:nth-child(1) > article");
    titleArea.css("background-color", "#202124");
    titleArea.find("li").css({ "background-color": "rgb(255 255 255 / 17%)", "color": "#cccccc" });

    //コメント欄を黒くする
    let interval = setInterval(function () {
      if (body.find("#root > div > div > div > div > div > div").eq(2).find("div > div").eq(0).length) {
        body.find("#root > div > div > div > div > div > div").eq(2).find("div > div").eq(0).css("background-color", "#202124");
        clearInterval(interval);
      }
    }, 3)
    //コメント欄が出ない場合(録画等)
    setTimeout(function () {
      clearInterval(interval);
    }, 3000);
  }

  /**
 * プロフィール設定のページをダークモードにする関数(profile系のページはsettingと仕様が異なるため別関数化)
 */
  static profilePage() {
    console.log("Ny0bi_Tool: Detect profile page");
    const body = $("body").css({ "background-color": "#000000", "color": "#e8e8e8" });

    //上部のバーにダークモード適用
    const topBar = $(".u-global-navigation");
    topBar.css("background-color", "#222222");
    const top_li = $(".u-global-navigation-pages *");
    top_li.css("color", "#e8e8e8");
    //設定に触ったときの色を変更
    $("head").append('<style>.l-header .u-global-navigation>.u-global-navigation-pages li.u-global-navigation-account-menu>ul li.setting>.menu .menu-items li a:hover { background-color: #383838; }</style>');

    //ページタイトルをダークモードに
    $(".typo-page-title").css("color", "#FFF");
    $(".u-breadcrumbs>li.current > a").css("color", "#dcdcdc");

    //中身の部分をダークモードにする
    $(".u-card").css({ "background-color": "#202124", "color": "#FFF", "border": "none" });
    $(".u-tabs>.u-tabs-item>a").css("color", "#e8e8e8");
    $(".typo-caption, .u-form-input-captions .u-form-input-caption, .u-form .u-form-caption-wrapper>p").css("color", "#e8e8e8");
    $("input[type='text'], textarea, .u-form-select, .u-form-input").css({ "color": "#FFFFFF", "background-color": "#222222", "border-color": "#404040" });
    $(".bg-warning").css("background-color", "#a21c00");
  }
}