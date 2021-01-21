'use strict';

//ページがロードされた後に実行するもの
$(window).on("load", function () {
  const body = $("body");
  //URlのパスを取得
  const path = location.pathname;

  if (path.match(/guides\/\d+\/content/)) {
    applyDarkTextPage(body, false);
  } else if (path.match(/guides/)) {
    applyDarkGuidePage(body, false);
  } else if (path.match(/movies/)) {
    applyMovieDarkPage();
  } else if (path.match(/links/)) {
    applyDarkGuidePage(body, true);
  } else if (path.match(/references/)) {
    applyDarkGuidePage(body, false);
  } else if (path.match(/chapters\/\d+/)) {
    applyDarkChapterPage();
  } else if (path.match(/lessons\/\d+/)) {
    applyDarkLessonPage();
  }
});

/**
 * 教材のページにダークモードを適用する関数
 */
function applyDarkChapterPage() {
  console.log("Ny0bi_dark:load applyDarkChapterPage()");

  const body = $("body");
  body.css({ "background-color": "#000000", "color": "#e8e8e8" });

  //上部のバーにダークモードを設定する
  const topBar = body.find(".u-global-navigation");
  topBar.css("background-color", "#222222");
  const top_li = topBar.find(".u-global-navigation-pages *");
  top_li.css("color", "#e8e8e8");

  //タイトルを黒くする
  body.find(".typo-page-title").css("color", "#FFF");
  body.find(".u-breadcrumbs>li.current > a").css("color", "#dcdcdc");

  //教材・授業の一覧にダークモードを適用する
  //全体の色をダークにし、コースとコースの境界線のボーダー色を変更する
  body.find(".u-card").css({ "background-color": "#202124", "color": "#FFF", "border": "none" });
  body.find(".u-list.has-linked-children>li").css("border", "solid 1px #2f2f2f");
  //"自信がない"のみの部分にダークモードを設定
  body.find(".u-filter").css({ "background-color": "#353535", "border": "solid 1px #929292;" });
  body.find(".u-button").css({ "background-color": "#505050", "border": "#505050" });
  //教材名の文字色を白に
  body.find(".u-list.has-linked-children>li>a").css("color", "#e8e8e8");
  //教材や授業を触ったときの色を変更
  $("head").append('<style>.u-list.has-linked-children>li>a:hover { background-color: #383838; }</style>');
  //進行度のバーの色を調整
  $("head").append('<style>.u-progress { background-color: rgb(191 191 191); }</style>');
}

/**
 * 最初のコースなどを選択するページにダークモードを適用する関数
 */
function applyDarkTopPage() {
  console.log("Ny0bi_dark:load applyDarkTopPage()");
  console.log("Ny0bi_dark:このページは未実装ですが、今後サポートされる予定です。")
}

/**
 * 授業のページにダークモードを適用する関数
 */
function applyDarkLessonPage() {
  console.log("Ny0bi_dark:load applyDarkLessonPage()");

  const body = $("body");
  body.css({ "background-color": "#000000", "color": "#e8e8e8" });

  //上部のバーにダークモードを設定する
  const topBar = body.find("#root > div > div").eq(0);
  topBar.css("background-color", "#292A2D");
  //「N予備校とは」などと書かれている部分の文字色の設定
  topBar.find("ul *,ul").css("color", "#8AB4F8");

  //コメビューを黒くする
  $("head").append('<style>textarea { background-color: #202124; color: #e8e8e8; }</style>');

  //タイトルなどが書かれている部分にダークモードを設定する
  const titleArea = body.find("#root > div > div > div > div").eq(1).find("article");
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

  //テキストを黒くする
  var iframe = $("iframe").contents();
  applyDarkTextPage(iframe, true);
}

/**
 * Guideにあるテキストや問題などにダークモードを適用する関数
 * @param {boolean} hasComprehensionArea 理解度を設定ボタンがあるページか
 */
function applyDarkGuidePage(doc) {
  console.log("Ny0bi_dark:load applyDarkGuidePage()");

  doc.css({ "background-color": "#000000", "color": "#e8e8e8" });
  //上部のタイトルなどが書かれている部分を黒くする
  doc.find("header").css({ "background-color": "#000000", "color": "#e8e8e8" });

  if ($(".footer").length) {
    //理解度を指定の部分を黒くする
    doc.find(".wrapper .footer").css({ "background-color": "#202124", "border-top": "solid 3px #4a4a4a;" });
    doc.find(".u-button.type-primary-light").css({ "background-color": "#2654bb", "color": "#FFFFFF", "border": "none" });
    doc.find(".tag-content span").css("color", "#eaeaea")
    doc.find("head").append('<style>.u-button.type-primary-light:hover { background-color: #00044e; border: none; }</style>');
    //「理解できましたか」のダイアログを黒くする
    doc.find(".modal-window-content").css("background-color", "#2c2c33");
  }
  //問題のページの時の設定
  if ($(".exercise").length) {
    doc.find(".exercise-item").not(".exercise-item *").css({ "background-color": "#202124", "border": "none" });
    doc.find("li.answers-choice").css("background-color", "#202124");

    //解答の解説の部分の背景色を設定
    $("head").append('<style>.exercise .section-item.explanation { background-color: rgb(255 236 0 / 16%); }</style>');
    //触れた時の色を変更
    $("head").append('<style>.exercise .section-item.question-list ul.answers li.answers-choice:hover { background-color: #383838 !important; }</style>');
    //選択した時の色を設定
    $("head").append('<style>.exercise .section-item.question-list ul.answers li.answers-choice.answers-selected { background-color: #4f73e3 !important; }</style>');
    //正解の物の色を背景色を設定
    $("head").append('<style>.answered .exercise .section-item.question-list ul.answers li.answers-choice[data-correct="true"] { background-color: #00c541 !important; }</style>');
    //解説のページの領域の背景色を変更
    $("head").append('<style>.wrapper .container .links { background-color: #202124; }</style>');
    //英語で単語を選択する物にダークモードを反映
    $("head").append('<style>body.exercises.fill-box .fill-list li.fill-list-item { background-color: #202124; }</style>');
    $("head").append('<style>body.exercises.fill-box .fill-list li.fill-list-item:hover { background-color: #383838; }</style>');
    //問題の解説の文字色の改善
    $("head").append('<style>body.exercises .em3 { color: #A1B9FF !important; }</style>');
    $("head").append('<style>body.exercises .em2 { color: #44DB6C !important;; }</style>');
  }
  //音声プレイヤーがあるときの設定
  if ($(".fixed-audio-player-view").length) {
    //背景をダークモードに
    doc.find(".component-audio-player-fixed").css("background-color", "#202124");
    //各種文字の文字色を白に
    doc.find(".component-audio-player-fixed-title,.component-audio-player-fixed-time-control-time").css("color", "#e8e8e8");
    //見えずらいので再生ボタン等を反転
    doc.find(".component-audio-player-fixed-button-rewind,.component-audio-player-fixed-button-play-pause,.component-audio-player-fixed-icon,.component-audio-player-fixed-button-playback-rate,.component-audio-player-fixed-close").css("filter", "invert(1)");
  }

}

/**
 * テキストにダークモードを適用する関数
 * @param {jQuery.contents()} doc テキストのdocument(body)
 * @param {boolean} needGrayBack グレーなダークモードが必要か(授業のページ用)
 */
function applyDarkTextPage(doc, needGrayPage) {
  console.log("Ny0bi_dark:load applyDarkTextPage()");
  doc.css({ "background-color": "#000000", "color": "#e8e8e8" });

  let back_color = null;

  if (needGrayPage) {
    back_color = "#202124";
  } else {
    back_color = "#000000";
  }

  //本文があるdivの子要素の一部の例外以外全てにダークモードを設定
  doc.find('section,section *,.main-content *,.global--wrapper *').not('pre *,a,kdb,[class*="global--text-"],.tablink,.global--text-red,h1,h1 *').css({ "background-color": back_color, "color": "#e8e8e8" });
  //本文のdev自体の背景色を黒にする
  doc.find(".main-content,.global--wrapper,.index,.book-body").css("background-color", back_color);
  //通常のリンクの設定
  doc.find("a").not(".book-header *,.game-book-button").css("color", "#5da5ec");
  //tipのbackgroundを設定
  doc.find(".tip,.tip p,.tip-title,.tip strong").css("background", "#335267");
  //global--text-系で文字色を変えていないもので文字色を白にする
  doc.find(".global--text-big,.global--text-small,.global--text-strong").css("color","#e8e8e8");

  /* プログラミングの教材の設定 */

  //コードブロックの設定
  //text-shadowは無効化しないと見えずらくなるため無効化
  doc.find("code").css({ "background-color": "#222222", "color": "#e8e8e8", "text-shadow": "none" });
  //一行のコードブロックの設定
  doc.find("pre").css({ "background-color": "#222222", "color": "#e8e8e8" });
  //一部文字色が白色にならない部分があるので修正
  doc.find(".token.code,.token.interpolation").css("color", "#e8e8e8");
  //キーボードの案内のブロックの背景色の設定
  doc.find("kbd").css("background-color", "#222222");
  //タブの設定(Windowsとmacと操作が分かれる部分でよく見るもの)
  doc.find(".tablink").css({ "background-color": "#37373D", "color": "#e8e8e8" });

  //VS Codeのダークモードの配色に変更
  //Codeの行番号はbeforeで処理されているのでHeadのstyleから変更
  $("head").append('<style>.line-numbers span::before { content: attr(data-num); color: #858585 }</style>');
  //関数などの色を変更
  //JavaScript系
  doc.find(".token.operator").css("background-color", "#222222");
  doc.find(".token.string").css("color", "#CE9178");
  doc.find(".token.function").css("color", "#D0DC8B");
  doc.find(".token.keyword").css("color", "#3E9CCA");
  doc.find(".token.parameter").css("color", "#9CDCFE");
  doc.find(".token.number").css("color", "#B5CEA8");
  doc.find(".token.operator,.token.token.punctuation").css("color", "#D4D4C9");
  doc.find(".token.doctype-tag").css("color", "#3E9CCA");
  doc.find(".token.name").css("color", "#9CDCFE");
  doc.find(".token.class-name,.token.constant").css("color", "#4FC1FF");
  doc.find(".token.boolean").css("color", "#569CD6");
  doc.find(".token.regex-delimiter,.token.regex-source.language-regex").css("color","#C66951");
  //HTML系
  doc.find(".token.tag").css("color", "#3E9CCA");
  doc.find(".token.attr-name").css("color", "#9CDCFE");
  doc.find(".token.attr-value").css("color", "#CE9178");
  //差分系
  doc.find(".token.inserted-sign.inserted").css("background-color", "rgb(255 255 0 / 0.1)");
  doc.find(".token.line").css("color", "#e8e8e8");
  //その他
  doc.find(".token.plain-text,token.each").css("color", "#e8e8e8");

  /* 普通の教科の教材の設定 */

  //英語系の設定
  //音声の部分の背景色を黒に
  $("head").append('<style>.component-audio-player { background-color: #202124; }</style>');
  $("head").append('<style>.component-audio-player-title, .component-audio-player-time { color: #e8e8e8 !important; }</style>');
  //黒な再生・停止ボタンの色を反転させる
  $("head").append('<style>.component-audio-player-icon, .component-audio-player-play-pause:before { filter: invert(1); }</style>');
  //触れた時の色を変更
  $("head").append('<style>.component-audio-player:hover { background-color: #383838; }</style>');
}

/**
 * 教材の動画のページにダークモードを設定する
 */
function applyMovieDarkPage() {
  //動画のページはGuideにあるテキストと構成が同じだが、何故かクラスが難読化されているので区切りを利用して検索する
  const body = $("body");

  body.css({ "background-color": "#000000", "color": "#e8e8e8" });
  //上のタイトルなどが書かれている部分を黒くする
  body.find("header").css({ "background-color": "#000000", "color": "#e8e8e8" });
  //動画が置いてある場所を黒くする
  body.find("#root > div > div").eq(1).css("background-color", "#000000");

  //理解度を設定の背景色等を設定
  body.find("footer").css({ "background-color": "#202124", "border-top": "#4a4a4a" });
  body.find("#root > div > footer > div > button").css({ "background-color": "#2654bb", "color": "#FFFFFF", "border": "none" });
  body.find("head").append('<style>#root > div > footer > div > button:hover { background-color: #00044e; border: none; }</style>');
  //「理解できましたか」のダイアログを黒くする処理は、クラスが難読化されていて読み込み後ではできないので、afterEvent.jsでボタンを押して要素が出た時に設定する
}

/**
 * テストのページにダークモードを適用する
 */
function applyDarkTestPage() {
  console.log("Ny0bi_dark:load applyDarkTestPage()");
  console.log("Ny0bi_dark:このページは未実装ですが、今後対応します。");
}