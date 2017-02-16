var ii = "";
var url = "";
function makeRequestBase64(file, cb){
  var reader = new FileReader();
  reader.onload = function(e){
    var body = e.target.result.substring(e.target.result.indexOf(',') + 1);
    cb(null,file.type+";base64,"+body);
  };
  reader.readAsDataURL(file);
}

function gen_url(){
  q = "";
  document.querySelectorAll("[name]").forEach(function(f){
    var v = f.value.replace(/\n/g,'<br>');
    q += f.name+"="+v+"&";
  });
  q += "ii="+ii;
  var url = window.location.href;
  url = url.replace(/index.html/,"");
  url += "render/index.html?"+q;
  return url;
}

function gen_random(min,max){
  return Math.floor(Math.random()*(max+1))+min;
}

function load_sample(){
  var s = document.createElement("script");
  s.src = "sample_"+gen_random(0,2)+".js";
  document.body.appendChild(s);
}

function build_sample(sample){
  for(k in sample){
    var v = sample[k];
    if(k != "ii"){
      document.querySelector("[name="+k+"]").value = v;
    }
    if(k == "ii"){
      ii = v;
      document.getElementById('ii').value = v;
    }
  }
  url = gen_url();
  document.querySelector("iframe").setAttribute("src",url);
}

document.addEventListener('DOMContentLoaded',function(){
  load_sample();
  document.getElementById('ii').addEventListener('change',function(e){
    /*
    var file = e.target.files[0];
    makeRequestBase64(file,function(err, result){
      ii = "data:"+result;
      ii = ii.replace(/\+/g,'-');
      url = gen_url();
      document.querySelector("iframe").setAttribute("src",url);
    });
    */
    ii = document.getElementById('ii').value;
  });
  document.getElementById('clear').addEventListener('click',function(e){
    if(confirm("フォームの内容を全てクリアしますか？")){
      document.querySelectorAll("[name]").forEach(function(n){
        n.value = "";
      });
      document.querySelectorAll("select[name]").forEach(function(n){
        n.value = 0;
      });
      ii = "";
      url = gen_url();
      document.querySelector("iframe").setAttribute("src",url);
    }
  });
  document.getElementById('reflesh').addEventListener('click',function(e){
    url = gen_url();
    document.querySelector("iframe").setAttribute("src",url);
  });
  document.getElementById('open').addEventListener('click',function(e){
    window.open(url,"_blank");
  });
});
