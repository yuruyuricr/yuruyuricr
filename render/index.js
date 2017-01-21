function getParameterByName(name, url) {
  if (!url) {
  url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var render = function(){
  var d = {
    "as":".akari.score",
    "ar":".akari.review p",
    "cs":".chinatsu.score",
    "cr":".chinatsu.review p",
    "ks":".kyoko.score",
    "kr":".kyoko.review p",
    "ys":".yui.score",
    "yr":".yui.review p",
    "it":".item.title",
  }
  for(k in d){
    var v = d[k];
    var fv = getParameterByName(k);
    document.querySelector(v).innerHTML = fv;
    document.querySelector(v).setAttribute("data-value",getParameterByName(k));
  }
  var ii = getParameterByName("ii");
  if(ii){
    ii = ii.replace(/\-/g,'+');
    document.querySelector("img").setAttribute("src",ii);
  }
}


document.addEventListener('DOMContentLoaded',function(){
  render();
});
