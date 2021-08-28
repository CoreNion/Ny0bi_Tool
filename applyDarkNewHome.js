function applyDarkNewHomeCentor() {
  const path = location.pathname;
  if(path.match(/home/)) {
    applyDarkNewHomePage();
  }
}

function applyDarkNewHomePage() {
  console.log("Ny0bi_Tool:load applyDarkNewHomePage()");
  $("body").css({ "background-color": "#000", "color": "#e8e8e8" });

}
