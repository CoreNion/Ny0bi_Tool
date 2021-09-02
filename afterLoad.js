'use strict';

//ページがロードされた後に実行するもの
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
  } else if (path.match(/home|my_course|lessons|questions|notices|setting|courses\/\d+\/chapters|packages|setting\/profile/)) {
    //新ホーム対応作業はapplyDarkNewHome.js内で行う
    //ホーム画面へのダークモード適用のコードは長いので、作業が終わってもこのjsとは分離させる予定
    applyDarkNewHomeCentor();
  }

  chrome.storage.local.set({ 'nowPage': path });
}

/**
 * 教材のページとテスト開始前のページにダークモードを適用する関数
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
function applyDarkLessonPage() {
  console.log("Ny0bi_dark:load applyDarkLessonPage()");

  const body = $("body");
  body.css({ "background-color": "#000000", "color": "#e8e8e8" });

  //上部のバーにダークモードを設定する
  const topBar = body.find("#root > div > div > div").eq(0);
  topBar.css("background-color", "#292A2D");
  //「N予備校とは」などと書かれている部分の文字/背景色の設定
  topBar.find("ul *,ul").css({ "color": "#8AB4F8", "background-color": "#292A2D" });

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
}

/**
 * テキストや問題などにダークモードを適用する関数
 * @param {boolean} needDarkBackColor BackgroundColorをグレーにするか
 */
function applyDarkGuidePage(needDarkBackColor) {
  console.log("Ny0bi_dark:load applyDarkGuidePage()");
  const body = $("body");

  //applyDarkTextPageで処理できるものならそちらの関数を利用
  if ($("section,section,.main-content,.global--wrapper").length) {
    if (needDarkBackColor) {
      applyDarkTextPage(true);
    } else {
      applyDarkTextPage(false);
    }
  }

  let backColor = null;
  //授業用のテキストの場合、授業のページに表示されるので、授業のページと同化しないようにする
  if (needDarkBackColor) {
    backColor = "#202124";
  } else {
    backColor = "#000000";
  }
  //bodyの色を設定
  body.css({ "background-color": backColor, "color": "#e8e8e8" });

  //上部のタイトルなどが書かれている部分を黒くする
  body.find("header").css({ "background-color": "#000000", "color": "#e8e8e8" });
  //見出しの色を黒くし、線の色をはっきりさせる(主に特別授業用)
  body.find("h2,h3,h4,h5,h6").css({ "color": "#FFFFFF", "border-left": "6px solid #0000FF" });
  //h3の見出しの線をはっきりさせる(主に特別授業用)
  body.find("h3").css("border-bottom", "2px solid #0000ff");

  //音声プレイヤーをダークモードに(英語用)
  $("head").append('<style>.component-audio-player, .component-audio-player-fixed { background-color: #202124; }</style>');
  $("head").append('<style>.component-audio-player-title, .component-audio-player-time, .component-audio-player-fixed-title,.component-audio-player-fixed-time-control-time { color: #e8e8e8 !important; }</style>');
  //黒な再生・停止ボタンの色を反転させる
  $("head").append('<style>.component-audio-player-icon, .component-audio-player-play-pause:before, .component-audio-player-play-stop, .component-audio-player-fixed-button-rewind, .component-audio-player-fixed-button-play-pause, .component-audio-player-fixed-icon, .component-audio-player-fixed-button-playback-rate, .component-audio-player-fixed-close { background-color: transparent !important; filter: invert(1); }</style>');
  //触れた時の色を変更
  $("head").append('<style>.component-audio-player:hover { background-color: #383838; }</style>');

  //理解度を設定ボタンがあるとき
  if ($(".footer").length) {
    //理解度を指定の部分を黒くする
    body.find(".wrapper .footer").css({ "background-color": "#202124", "border-top": "solid 3px #4a4a4a;" });
    body.find(".u-button.type-primary-light").css({ "background-color": "#2654bb", "color": "#FFFFFF", "border": "none" });
    body.find(".tag-content span").css("color", "#eaeaea")
    body.find("head").append('<style>.u-button.type-primary-light:hover { background-color: #00044e; border: none; }</style>');
    //「理解できましたか」のダイアログを黒くする
    body.find(".modal-window-content").css("background-color", "#2c2c33");
  }
}

/**
 * テキストや問題などにダークモードを適用する関数
 * @param {boolean} needGrayPage 背景がグレーなダークモードが必要か(授業のページ用)
 */
function applyDarkTextPage(needGrayPage) {
  console.log("Ny0bi_dark:load applyDarkTextPage()");
  const body = $("body");
  let back_color = null;

  if (needGrayPage) {
    back_color = "#202124";
  } else {
    back_color = "#000000";
  }

  body.css({ "background-color": back_color, "color": "#e8e8e8" });

  //本文があるdivの子要素の一部の例外以外全てにダークモードを設定
  body.find('section,section *,.main-content *,.global--wrapper *').not('pre *,a,kdb,[class*="global--text-"],.tablink,.global--text-red,h1,h1 *,.exercise-item *,.component-audio-player-play-pause').css({ "background-color": back_color, "color": "#e8e8e8" });
  //本文のdev自体の背景色を黒にする
  body.find(".main-content,.global--wrapper,.index,.book-body").css("background-color", back_color);
  //通常のリンクの設定
  body.find("a").not(".book-header *,.game-book-button,#question-btn").css("color", "#5da5ec");
  //tipのbackgroundを設定
  body.find(".tip,.tip *").css("background", "#335267");
  //global--text-系で文字色を変えていないもので文字色を白にする
  body.find(".global--text-big,.global--text-small,.global--text-strong").css("color", "#e8e8e8");
  //「まとめ」のデザインをダークモード化
  body.find(".summary-h2").css({ "background": "linear-gradient(#000000 60%, #000000 60%, #009bff 95%, #000000 95%, #000000 100%)" });
  $("head").append('<style>.summary-h2:before, .summary-h2:after { background: #000000; }</style>');

  //問題用の設定
  if ($(".exercise").length) {
    body.find(".exercise-item").css("background-color", "#202124");
    body.find("li.answers-choice").css("background-color", "#202124");

    //解答の解説の部分の背景色を設定
    $("head").append('<style>.exercise .section-item.explanation { background-color: rgb(255 236 0 / 16%); }</style>');
    //触れた時の色を変更
    $("head").append('<style>.exercise .section-item.question-list ul.answers li.answers-choice:hover { background-color: #383838 !important; }</style>');
    //〇の色がほぼ同化するので反転
    $("head").append('<style>li.answers-choice::before { filter: invert(1); }</style>');
    //✅の色を修正
    $("head").append('<style> li.answers-choice.answers-selected::before { filter: inherit; }</style>');
    $("head").append('<style> li.answers-choice.answers-selected::before { filter: inherit; }</style>');
    $("head").append('<style>.answered .exercise .section-item.question-list ul.answers li.answers-choice[data-correct="true"]::before { filter: inherit; }</style>');
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
    //文字数カウント(公式)の背景色を変更
    $("head").append('<style>.exercise .section-item .type-descriptive.answer-area[data-status=valid][data-focus=true] .counter { background-color: #000000; }</style>')
    //記述式の問題での、inputの色を設定
    body.find(".exercise .section-item .type-descriptive .answers").css("background-color", "#202124");
    body.find("input[type=text], textarea").css("color", "#f6f6f6");
    //先生のコメントの色を調整
    body.find(".exercise .section-item .type-descriptive .explanation.teacher-comment").css("background-color", "#7b7700");
  }

  /* プログラミングの教材の設定 */

  //コードブロックの設定
  //text-shadowは無効化しないと見えずらくなるため無効化
  body.find("code, code *").css({ "background-color": "#222222", "color": "#e8e8e8", "text-shadow": "none" });
  //一行のコードブロックの設定
  body.find("pre").css({ "background-color": "#222222", "color": "#e8e8e8" });
  //一部文字色が白色にならない部分があるので修正
  body.find(".token.code,.token.interpolation").css("color", "#e8e8e8");
  //キーボードの案内のブロックの背景色の設定
  body.find("kbd").css("background-color", "#222222");
  //タブの設定(Windowsとmacと操作が分かれる部分でよく見るもの)
  body.find(".tablink").css({ "background-color": "#37373D", "color": "#e8e8e8" });

  //VS Codeのダークモードの配色に変更
  //Codeの行番号はbeforeで処理されているのでHeadのstyleから変更
  $("head").append('<style>.line-numbers span::before { content: attr(data-num); color: #858585 }</style>');
  //関数などの色を変更
  //JavaScript系
  body.find(".token.operator").css("background-color", "#222222");
  body.find(".token.string").css("color", "#CE9178");
  body.find(".token.function").css("color", "#D0DC8B");
  body.find(".token.keyword").css("color", "#3E9CCA");
  body.find(".token.parameter").css("color", "#9CDCFE");
  body.find(".token.number").css("color", "#B5CEA8");
  body.find(".token.operator,.token.token.punctuation").css("color", "#D4D4C9");
  body.find(".token.bodytype-tag").css("color", "#3E9CCA");
  body.find(".token.name").css("color", "#9CDCFE");
  body.find(".token.class-name,.token.constant").css("color", "#4FC1FF");
  body.find(".token.boolean").css("color", "#569CD6");
  body.find(".token.regex-delimiter,.token.regex-source.language-regex").css("color", "#C66951");
  //HTML系
  body.find(".token.tag").css("color", "#3E9CCA");
  body.find(".token.attr-name").css("color", "#9CDCFE");
  body.find(".token.attr-value").css("color", "#CE9178");
  //差分系
  body.find(".token.inserted-sign.inserted, .token.inserted-sign.inserted *").css("background-color", "#4d4d1c");
  body.find(".token.line").css("color", "#e8e8e8");
  //その他
  body.find(".token.plain-text,token.each").css("color", "#e8e8e8");

  /* 普通の教科の教材の設定 */

  //英語系の設定
  //音声の部分の背景色を黒に
  $("head").append('<style>.component-audio-player, .component-audio-player-fixed { background-color: #202124; }</style>');
  $("head").append('<style>.component-audio-player-title, .component-audio-player-time, .component-audio-player-fixed-title,.component-audio-player-fixed-time-control-time { color: #e8e8e8 !important; }</style>');
  //黒な再生・停止ボタンの色を反転させる
  $("head").append('<style>.component-audio-player-icon, .component-audio-player-play-pause:before, .component-audio-player-play-stop, .component-audio-player-fixed-button-rewind, .component-audio-player-fixed-button-play-pause, .component-audio-player-fixed-icon, .component-audio-player-fixed-button-playback-rate, .component-audio-player-fixed-close { background-color: transparent !important; filter: invert(1); }</style>');
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
  $("head").append('<style>#root > div > div:last-of-type { background-color: #000000; }</style>')

  //理解度を設定の背景色等を設定
  body.find("footer").css({ "background-color": "#202124", "border-top": "#4a4a4a" });
  body.find("#root > div > footer > div > button").css({ "background-color": "#2654bb", "color": "#FFFFFF", "border": "none" });
  body.find("head").append('<style>#root > div > footer > div > button:hover { background-color: #00044e; border: none; }</style>');
  //理解度設定のダイアログを黒くする
  $("head").append('<style>.ReactModal__Content > div > div > div { background-color: #2c2c33; }<style>');
}

/**
 * テストのページにダークモードを適用する
 */
function applyDarkTestPage() {
  console.log("Ny0bi_dark:load applyDarkTestPage()");
  $("body").css({ "background-color": "#000", "color": "#e8e8e8" });
  const path = location.pathname;

  //習熟度テストの結果のページの埋め込み用
  if (path.match(/contents/)) {
    console.log("Ny0bi_dark:Detection of embedded proficiency test results.");
    $(".p-short-test-review").css("background-color", "#222222");
    //総評の背景の色を変更
    $(".review").css("background-color", "rgb(255 236 0 / 30%)");

    //解答の背景色等を変更
    $(".answers").css({ "background-color": "#292a2d", "border": "solid 1px rgb(255 255 255 / 20%)" });
    $(".answer ul").css("border", "solid 1px rgb(255 255 255 / 10%)");
    $(".answer").css("border-bottom", "solid 1px rgb(255 255 255 / 10%)")

  } else {
    //ResultPageかは中のdivの量で判断(後で問題が読み込まれた時は、通常のテストのページと同じ動作をしないとダークモードが反映されないため)
    let inResultPage = $("#root > div > div > div > div > div").eq(0).find("div").children().length == 3;
    let bottomBar = null;
    let topBar = null;
    let centorContents = null;

    if (inResultPage) {
      //習熟度テストの"結果のページ"のセレクタをセット
      bottomBar = $("#root > div > div > div > div > div").eq(1);
      topBar = $("#root > div > div > div > div").eq(0);
      centorContents = $("#root > div > div > div > div > div").eq(0);
    } else {
      //習熟度テストのセレクタをセット
      bottomBar = $("#root > div > div > div > div > div > div").eq(2);
      topBar = $("#root > div > div > div > div > div > div").eq(0);
      centorContents = $("#root > div > div > div > div > div > div").eq(1);
    }

    //習熟度テストの名前の部分を黒くする
    classCSSPatcher(centorContents.find("div > div"), "background-color: #202124; border-bottom: 1px solid rgb(255 255 255 / 30%);");

    //上のバーにダークモードを適用
    topBar.css("background-color", "#222222");
    //ボタンを黒くする
    topBar.find("a").css({ "background-color": "#505050", "border": "#505050", "color": "#8ca8ff" });
    if (!inResultPage) {
      //タイマーを黒くする
      topBar.find("span").css({ "background-color": "#222222", "border-right": "1px solid rgb(255 255 255 / 30%)", "border-left": "1px solid rgb(255 255 255 / 30%)" });
    }

    //下のバーにダークモードを適用
    if (inResultPage) {
      //背景にダークモードを適用
      classCSSPatcher(bottomBar, "background-color: #222222;");
      //ボタンを黒くする
      classCSSPatcher(bottomBar.find("button"), "background-color: #505050; color:#95c0ff;");
      classCSSPatcher(bottomBar.find("a"), "background-color: #505050; color: #95c0ff;");
    } else {
      //下のバーを黒くする
      bottomBar.css("background-color", "#222222");
      //ボタンを黒くする
      bottomBar.find("button, a").not(bottomBar.find("button").eq(1)).css({ "background-color": "#505050", "color": "#95c0ff" });
    }
  }
}

/**
 * ホーム系統のページ(授業一覧やフォーラムなども含む)にダークモードを適用する関数
 * 
 * 新ホーム非対応(https://github.com/CoreNion/Ny0bi_Tool/issues/3)
 */
function applyDarkHomePage() {
  //クラスが難読化されている上他のページとは仕様が異なるためダークモードにする方法がやや特殊です

  console.log("Ny0bi_dark:load applyDarkHomePage()");
  $("body").css({ "background-color": "#000", "color": "#e8e8e8" });

  //上部のバーにダークモードを適用する
  const topBar = $("#root > div > div > div").eq(0);
  topBar.css("background-color", "#222222");
  //各種リンクの文字色を白にする
  const topBarButtons = topBar.find("div > div > div > a");
  topBarButtons.css("color", "#FFFFFF");
  //アカウント設定などが選択できる場所にダークモード適用
  const userProfile = topBar.find("div > div > div > div").eq(3);
  classCSSPatcher(userProfile, "background-color: #202124;");
  classCSSPatcher(userProfile.find("div:nth-child(1)"), "color: #FFFFFF;");
  classCSSPatcher(userProfile.find("div:nth-child(2) > a"), "background-color: #383838;", "hover");
  classCSSPatcher(userProfile.find("div:nth-child(3) > a"), "background-color: #383838;", "hover");

  const path = location.pathname;
  let linklistOffset = null;

  if (path.match(/home/)) {
    //中のコンテンツへのElement取得
    const contents = $("#root > div > div > div").eq(3).find("div").eq(0);
    //授業一覧のElement取得
    const courceLinks = contents.find("div").eq(0);
    linklistOffset = courceLinks.find("div > div > div > a > div");

    /* ページ固有のElementにダークモード適用 */
    ///一覧系
    //教材のアイコンの色を変更
    classCSSPatcher(linklistOffset.find("div > i"), "color: #648aff;");
    //進捗度のバーや文字色を変更
    classCSSPatcher(linklistOffset.find("div").eq(2), "background-color: #bfbfbf;");
    //教材の名前の文字色を変更
    classCSSPatcher(linklistOffset.find("div > div"), "color: #e8e8e8;");
    //必修授業・課外授業の選択の部分にダークモード適用
    classCSSPatcher(courceLinks.find("div > ul").eq(0),"background-color: #202124; border-color: #2f2f2f;", null, 2);
    classCSSPatcher(courceLinks.find("div > ul > li > div > a > div").eq(1), "color: rgb(255 255 255 / 80%);");
    classCSSPatcher(courceLinks.find("div > ul > li > div > a > div").eq(0), "color: rgb(255 255 255 / 80%);");
    //このページのタイトルの文字色を変更
    classCSSPatcher(courceLinks.find("div > div > h1"), "color: #e8e8ff;");

    //Q&A系
    const qa = $("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(3) > div");
    //タイトルの部分にダークモードを適用
    const qaTitle = qa.find("div").eq(0);
    classCSSPatcher(qaTitle, "background-color: #222222;", null, 2);
    classCSSPatcher(qaTitle.find("h2"), "color: #FFFFFF;");
    //各質問のタイトルの文字色を変更
    classCSSPatcher(qa.find("div > a > div > div:nth-child(2) > div"), "color: #e8e8e8;");

    //学習を効果的に行えるよう〜(略)の部分にダークモードを適用
    const userInfo = courceLinks.find("div:nth-child(2) > div > div > div:nth-child(2)").eq(0);
    classCSSPatcher(userInfo, "background-color: #202124; border-color: #8c8c8c;", false, 2);
    classCSSPatcher(userInfo.find("div:nth-child(1)"), "background-color: #202124; color: #e8e8e8;");
  } else if (path.match(/lessons/)) {
    /* 授業一覧のページにダークモード適用 */

    //授業の部分のelementを取得し、リンクの部分のelementを設定
    linklistOffset = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div > a > div");

    //ページタイトルの文字色を変更
    classCSSPatcher($("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h1"), "color: #e8e8ff;");

    if (!(path.match(/search/))) {
      //必修授業・課外授業の選択の部分にダークモード適用(授業一覧のページのみ)
      const selectWhenLesson = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div > ul").eq(0);
      classCSSPatcher(selectWhenLesson, "background-color: #202124; border-color: #2f2f2f;", false, 2);
      classCSSPatcher(selectWhenLesson.find("a"), "color: #ffffffcc;", "hover");
      classCSSPatcher(selectWhenLesson.find("a"), "color: #ffffffcc;", "visited");
      //もっと見るの部分にダークモード適用(授業一覧のページのみ)
      const seeMore = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div");
      classCSSPatcher(seeMore, "background-color: #202124;", false, 2);
      const seeMoreButton = seeMore.find("button");
      classCSSPatcher(seeMoreButton, "background-color: #505050; border-color: #cad7ff; color: #cad7ff;");
    } else {
      //検索結果の部分にダークモード適用
      const searchResults = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div");
      classCSSPatcher(searchResults, "background-color: #202124; border-color: #8c8c8c;", null, 2);
      classCSSPatcher(searchResults.find("div > div:nth-child(3) > span:nth-child(1)"), "color: #FFF;");
    }
    //検索系のところにダークモード適用
    const rightContents = $("#root > div > div:nth-child(2) > div > div > div:nth-child(2) > div");
    //検索窓をダークにする
    classCSSPatcher(rightContents.find("input"), "color: #FFFFFF; background-color: #222222; border-color: #404040;");
    //タグのボタンをダークにする
    classCSSPatcher(rightContents.find("div > ul > li"), "background-color: #202124;");
    //学習を効果的に行えるよう〜(略)の部分にダークモードを適用
    const userInfo = rightContents.find("div:nth-child(2)").eq(0);
    classCSSPatcher(userInfo, "background-color: #202124; border-color: #8c8c8c;", false, 2);
    classCSSPatcher(userInfo.find("div:nth-child(1)"), "background-color: #202124; color: #e8e8e8;");
  } else if (path.match(/questions/)) {
    if (path.match(/questions\/\d+/)) {
      /* スレッドのページにダークモード適用 */
      const topDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(1)");
      //タイトルの文字色を変更
      topDiv.find("h1").css("color", "#e8e8ff");
      //ガイドを見るボタンにダークモード適用
      topDiv.find("div > button").css("background-color", "#2b2c2f;");
      //表示する投稿を変更する部分の、文字色を変更
      topDiv.find("ul > li > a").css("color", "#FFFFFF");

      //コメント数やタグなどが書かれている部分にダークモード適用
      const postInfo = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)");
      postInfo.css({ "background-color": "#202124", "border-color": "#404040" });
      postInfo.find("div > div > ul > li").css("background-color", "#ffffff0d");

      //スレッドの中身にダークモード適用
      const threads = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:not(:first-child)");
      //質問者の名前と登校時刻の部分にダークモード適用
      classCSSPatcher(threads.find("div:nth-child(2) > div").eq(0), "color: rgb(255 255 255 / 83%);");
      //質問したい教材の部分にダークモード適用(ある場合のみ)
      if (threads.eq(0).find("p").length) {
        threads.eq(0).css("background-color", "#202124");
        threads.eq(0).find("p").css("color", "#bdbdbd");
        threads.eq(0).find("div").css("border-color", "rgb(255 255 255 / 10%)");
      }

      //各コメントにダークモード適用
      for (let i = 0; i <= threads.length; i++) {
        let threed = threads.eq(i);
        //「回答」の部分だった場合はそのborder等にダークモード適用
        if (!(threed.css("border-style") == "none")) {
          threed.css("border-color", "#252525");
          threed.find("span").css({ "background-color": "#000000", "color": "#FFFFFF" });
        } else {
          //質問者の色を設定(色で判定)
          let threedBody = threed.find("div:nth-child(2)").eq(0);
          if (threedBody.css("background-color") == "rgb(226, 238, 255)") {
            //質問者の投稿の色
            classCSSPatcher(threedBody, "background-color: #607d8b; color:#FFFFFF;");
          } else if (threedBody.css("background-color") == "rgb(255, 255, 255)") {
            //他の人の投稿の色
            classCSSPatcher(threedBody, "background-color: #01579b; color:#FFFFFF;");
          } else if (threedBody.css("background-color") == "rgb(255, 247, 149)" || threedBody.css("background-color") == "rgb(255, 242, 78)") {
            //運営と先生の投稿の色
            classCSSPatcher(threedBody, "background-color: #1b5e20; color:#FFFFFF;");
          }
        }
      }

      //返信を送る部分にダークモード適用
      const replayArea = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(3)");
      classCSSPatcher(replayArea, "background-color: #202124;");
      classCSSPatcher(replayArea.find("textarea"), "background-color: #202124; color: #e8e8e8;");
      classCSSPatcher(replayArea.find("div > div:nth-child(1) > button"), "background-color: #2b2c2f; border-color: #424242;");
    } else if (path.match(/new/)) {
      /* フォーラムに投稿を行うページにダークモード適用 */

      //ページタイトルにダークモード適用
      classCSSPatcher($("form > div > h1"), "color: #e8e8ff;");
      //コメントの内容を入力する部分ににダークモード適用
      classCSSPatcher($("form > div > div:nth-child(2) > div:nth-child(1)"), "background-color: #202124; color: #FFFFFF; border-color: #424242;", null, 2);
      classCSSPatcher($("textarea"), "background-color: #202124; color: #e8e8e8;");
      classCSSPatcher($("form > div > div:nth-child(2) > div:nth-child(2)"), "background-color: #202124; color: #FFFFFF; border-color: #424242;", null, 2);
      //画像をアップロードボタンにダークモード適用
      classCSSPatcher($("form > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button"), "background-color: #2b2c2f; border-color: #424242;");
    } else {
      /* スレッド一覧のページで、タイトル〜表示する投稿を変更する部分にダークモード適用 */

      const mainDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(1)");
      //タイトルの文字色を変更
      classCSSPatcher(mainDiv.find("h1"), "color: #e8e8ff;");
      //ガイドを見るボタンの色を変更
      classCSSPatcher(mainDiv.find("button"), "background-color: #2b2c2f;");
      //フォーラムの履歴の部分の色を変更
      classCSSPatcher(mainDiv.find("div").eq(2), "background-color: #2c2c2c; color: #e8e8e8;", null, 2);
      classCSSPatcher(mainDiv.find("p"), "color: #e8e8e8;");

      //表示する投稿を変更する部分の、文字色を変更
      mainDiv.find("ul > li > a").css("color", "#FFFFFF");

      /* 各投稿の一覧の部分にダークモードを適用 */
      //投稿リストの一番上の境界線を削除
      classCSSPatcher($("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2)"), "border-style: none;");
      //一番上のリストの名前にダークモード適用
      const forumListTitleDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)");
      //全体の背景色や境界線関連の色
      classCSSPatcher(forumListTitleDiv, "background-color: #202124; border-color: #2f2f2f;");

      //タイトルの文字色(検索以外のページ用)
      if (!path.match(/search/)) {
        classCSSPatcher(forumListTitleDiv.find("h2"), "color: #FFFFFF");
      }

      //フォーラムの各投稿のリンクにダークモード適用 
      const forumLinkDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)");
      //全体の背景色や境界線関連の色
      classCSSPatcher(forumLinkDiv, "background-color: #202124; border-color: #2f2f2f; border-bottom-width: 3px; margin-bottom: 0px;");
      //リンクに触れた時の背景色色
      classCSSPatcher(forumLinkDiv, "background-color: #383838;", "hover");
      //投稿のタイトル以外の文字色
      classCSSPatcher(forumLinkDiv.find("a"), "color: #bbbbbb;");
      //投稿のタイトルの文字色
      classCSSPatcher(forumLinkDiv.find("a > div:nth-child(1)"), "color: #e8e8e8;");
      //投稿のタグ
      classCSSPatcher(forumLinkDiv.find("a > div:nth-child(2) > ul > li"), "background-color: #ffffff0d;");
      //次へボタンなどにダークモードダークモード適用
      classCSSPatcher($("#root > div > div:nth-child(2) > div > div > div:nth-child(1) > ul > li > button"), "background-color: #222222; color:#6187ff;");

      //(検索用)検索結果の件数の文字色にダークモード適用
      if (path.match(/search/)) {
        forumListTitleDiv.find("div").eq(3).css("color", "#FFF");
      }
    }

    if (!(path.match(/new/))) {
      /* 右側の部分にダークモード適用(フォーラム投稿ページ以外) */
      //検索窓の色を変更
      classCSSPatcher($("form > div > input"), "color: #FFFFFF; background-color: #222222; border-color: #404040;");

      //カテゴリーから探すの部分にダークモード適用
      const findbyTagDiv = $("#root > div > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(3)");
      //全体の背景色と境界線の色を変更
      classCSSPatcher(findbyTagDiv, "background-color: #222222; border-color: #404040;");
      //「カテゴリーから探す」と書いている部分にダークモード設定
      classCSSPatcher(findbyTagDiv.find("div:nth-child(1)"), "border-color: #404040");
      classCSSPatcher(findbyTagDiv.find("div > h2"), "color: #FFFFFF");
      //タグのジャンルの名前の背景色と線の色を変更
      classCSSPatcher(findbyTagDiv.find("div > div > h3"), "color: #FFFFFF");
      classCSSPatcher(findbyTagDiv.find("div > div > h3"), "background-color: #e8e8e80d;", "before");
      //各タグのボタンにダークモード適用
      classCSSPatcher(findbyTagDiv.find("div > div > div > div > a"), "background-color: #2b2c2f; border-color: #6b6b6b;");
    }
  } else if (path.match(/setting/)) {
    //ページタイトルの文字色を変更
    $("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > h1").css("color", "#e8e8ff");

    //中央部のメインの設定の色を変更
    const mainContents = $("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3)");
    mainContents.css({ "background-color": "#222222", "color": "#FFFFFF" });
    //設定一覧の部分の文字色を変更
    mainContents.find("ul > li > a").css("color", "#FFFFFF")
    //所属先の部分の色を変更
    mainContents.find("div > div > ul > li").css({ "background-color": "#b8fdac", "color": "#000000" });
    //右側のボタンの色を変更
    classCSSPatcher(mainContents.find("div > div > div > div > a > button"), "background-color: #4f73e3; color: #FFF; border: 0px");
    classCSSPatcher(mainContents.find("div > div > div > div > a > button"), "color: #FFF;", "hover");
  } else if (path.match(/notices|courses\/\d+\/chapters/)) {
    //ページタイトルの文字色を変更
    $("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > h1").css("color", "#e8e8ff");
    //各リンクの部分にダークモード適用
    linklistOffset = $("#root > div > div:nth-child(2) > div:nth-child(2) > div > div > a > div");
  } else if (path.match(/packages/)) {
    //ページタイトルの文字色を変更
    classCSSPatcher($("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > h1"), "color: #e8e8ff;")

    //左側のジャンル一覧の部分にダークモード適用
    const genres = $("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > ul:nth-child(2) > li > a");
    classCSSPatcher(genres, "color: #e8e8e8;");
    classCSSPatcher(genres, "background-color: #4f73e3; color: #e8e8e8;", "hover");

    //右側のコース一覧の部分にダークモード適用
    const cources = $("#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div:not(:nth-child(2))");
    classCSSPatcher(cources, "background-color: #202124; color: #FFFFFF; border-color: #2f2f2f;");
    classCSSPatcher(cources.children("div"), "background-color: #383838;", "hover");
    //折り畳みの中のコースの部分の色の変更
    classCSSPatcher(cources.find("ul  > a > li > div"), "background-color: #383838;", "hover");
    classCSSPatcher(cources.find("ul  > a > li"), "border-color: #2f2f2f;");
    classCSSPatcher(cources.find("ul  > a > li > div > h3"), "color: #FFFFFF;");
    classCSSPatcher(cources.find("ul  > a > li > div > div"), "background-color: #bfbfbf;");

    //コース選択のダイアログの文字色を修正
    $("head").append('<style> body.ReactModal__Body--open { color: #000000 !important; }  </style>')
  }

  if (linklistOffset) {
    /* 一覧系のクラスの色をダークモードに変更(共通の物のみ) */
    classCSSPatcher(linklistOffset, "background-color: #202124; color: #FFFFFF; border-color: #2f2f2f;");
    //触れた時の背景色を変更
    classCSSPatcher(linklistOffset, "background-color: #383838", "hover");
  }

  homePageTopBarTracker(topBar);
}
/**
 * プロフィール設定のページをダークモードにする関数(profile系のページはsettingと仕様が異なるため別関数化)
 */
function applyDarkProfileSettingPage() {
  console.log("Ny0bi_dark:load applyDarkProfileSettingPage()");
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

/**
 * Elementが所属しているクラスのCSSの変更を恒久的に適用する関数
 * 
 * @param {JQuery<HTMLElement>} element 変更したいHTMLElement
 * @param {string} property CSSの内容({}は不要)
 * @param {string} pseudoClass 疑似クラス(必要な場合のみ, ":"は不要)
 * @param {number} classNumber 何番目のクラスに適用するかの値(手動指定する場合のみ、デフォルトは最後尾(最優先のクラス))
 */
function classCSSPatcher(element, property, pseudoClass, classNumber) {
  //所属しているクラス一覧を取得し、クラス名の一文字目に.を付け、配列化
  const elementClassArrary = ("." + element.attr("class").split(' ').join(' .')).split(' ');

  //クラスの番号を決定する
  let className = null;
  if (classNumber) {
    className = elementClassArrary[classNumber];
  } else {
    //指定されていない場合は最後尾(最優先)のクラスに設定する
    className = elementClassArrary[elementClassArrary.length - 1]
  }

  //headにstyleを追加
  if (pseudoClass) {
    //疑似クラスが必要な場合
    $("head").append("<style> " + className + ":" + pseudoClass + " { " + property + " }</style>");
  } else {
    $("head").append("<style> " + className + " { " + property + " }</style>");
  }
}