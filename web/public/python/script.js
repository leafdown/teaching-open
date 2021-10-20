/**
 * 基于localstorage的存储,刷新页面后不会失去原来代码
 * linjie
 */
function saveCode() {
  var code = window.editor.getValue();
  var pn = document.getElementById("projectName");
  var name = pn.value;
  code = encode(code);
  name = encode(name);
  try {
    localStorage.setItem(urlParams('workId') + "code", code);
    localStorage.setItem(urlParams('workId') + "name", name);
  }
  catch (err) {
    console.log(`错误信息:${err}`);
    alert(`错误信息:${err}`)
    return;
  }
  alert(`保存成功`)
}

function encode(str) {
  return btoa(encodeURIComponent(str));
}

function decode(str) {
  return decodeURIComponent(atob(str));
}

// 格式化时间戳
function getFormatTime() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  if (h >= 0 && h <= 9) h = '0' + h;
  if (m >= 0 && m <= 9) m = '0' + m;
  if (s >= 0 && s <= 9) s = '0' + s;
  return h.toString() + m.toString() + s.toString();
}

function submitTo() {
  var code = window.editor.getValue();
  try {
    localStorage.setItem(urlParams('workId') + "code", encode(code));
  }
  catch (err) {
    console.log(`错误信息:${err}`);
  }
  var pn = document.getElementById("projectName");
  var projectName = pn.value;
  window.submitCode && window.submitCode(projectName, code)
}



// Microsoft 的 Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.loli.net/ajax/libs/monaco-editor/0.9.0/min/vs' } });
require.config({
  'vs/nls': {
    availableLanguages: {
      '*': 'zh-cn'
    }
  }
});
require(['vs/editor/editor.main'], () => {
  // Dark Mode Theme 暗黑主题
  monaco.editor.defineTheme('vs-darker', {
    base: 'vs-dark',
    inherit: true,
  });
  // Initialize Editor 初始化
  var d = new Date();
  var t = d.toLocaleString();
  var c = localStorage.getItem(urlParams('workId') + "code");
  var str = "# " + t + "\nprint('欢迎来到蓝趣编程课堂')"
  if (c != null) { str = decode(c); }
  window.editor = monaco.editor.create(document.getElementById("editorContainer"), {
    theme: 'vs',
    fontSize: "16px",
    mouseWheelZoom: true,
    model: monaco.editor.createModel(str, "python"),
    wordWrap: 'on',
    automaticLayout: true,
    fontFamily: '"Fira Code", "Noto Sans SC", monospace',
    scrollbar: {
      vertical: 'auto'
    }
  });

});

document.onkeydown = function (e) {
  if (e.ctrlKey && e.code == "KeyS") {
    saveCode();
    e.preventDefault();
  }
}
// Skulpt配置
function outf(text) {
  var mypre = document.getElementById("outputContainer");
  mypre.innerHTML = mypre.innerHTML + text;
}


/**
 * 以下是在编译器中导入numpy包
 * 1、定义externalLibs
 * 2、构建builtinRead
 * 3、在runCode()中加入配置Sk.configure
 * 参考：https://jsbin.com/jokoyituhu/1/edit?html,js,console
 * @type {{"./numpy/__init__.js": string}}
 */
var basePath = 'https://cdn.rawgit.com/Petlja/pygame4skulpt/3435847b/pygame/';

var externalLibs = {
  "./numpy/__init__.js": "https://cdn.jsdelivr.net/gh/ebertmi/skulpt_numpy@master/numpy/__init__.js"
};

function builtinRead(file) {
  console.log("Attempting file: " + Sk.ffi.remapToJs(file));

  if (externalLibs[file] !== undefined) {
    return Sk.misceval.promiseToSuspension(
      fetch(externalLibs[file]).then(
        function (resp) { return resp.text(); }
      ));
  }

  if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[file] === undefined) {
    throw "File not found: '" + file + "'";
  }

  return Sk.builtinFiles.files[file];
}

/**
 * 【运行】核心代码
 */
function runCode() {
  try {
    var prog = window.editor.getValue();
  } catch (err) {
    console.log(`错误信息:${err}`);
    return;
  }
  var mypre = document.getElementById("outputContainer");
  mypre.innerHTML = '';
  var myCanvas = document.getElementById("turtleCanvas");
  myCanvas.innerHTML = '';
  Sk.pre = "output";

  /**
   * 配置builtinRead
   */
  Sk.configure({
    read: builtinRead,
    output: outf,
    __future__: Sk.python3,
  });
  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'turtleCanvas';
  var myPromise = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody("<stdin>", false, prog, true);
  });
  
  myPromise.then(function (mod) {
    console.log('Yeah! There\'s nothing wrong! when ' + getFormatTime() + ' ¯\_(ツ)_/¯');
  },
    function (err) {
      var errlog = document.getElementById("outputContainer");
      var curMode = document.getElementsByTagName('meta')['theme'];
      // popInfo("运行出错了", "= = 看看错误信息吧", "infoErr", "fa fa-bug");
      if (curMode.content == "dark") {
        errlog.innerHTML = mypre.innerHTML + "<div class=\"errorLog\">" + err.toString() + "</div>";
      } else {
        errlog.innerHTML = mypre.innerHTML + "<div class=\"errorLog light\">" + err.toString() + "</div>";
      }
    });

}

var loading = document.getElementById("loading");
var uploadParam = {}
var workName = ''
var workId = urlParams('workId')
var unitId = urlParams('unitId')
var userInfo = getUserInfo();
var qn_token = getQiniuToken();
setInterval(function () {
  qn_token = getQiniuToken();
}, 600 * 1000)
// twl mine create course
var scene = urlParams("scene")
setInterval(onTimerSave, 30000);

function onTimerSave() {
  var code = window.editor.getValue();
  var pn = document.getElementById("projectName");
  var name = pn.value;
  code = encode(code);
  name = encode(name);
  try {
    localStorage.setItem(urlParams('workId') + "code", code);
    localStorage.setItem(urlParams('workId') + "name", name);
  }
  catch (err) {
    console.log(`错误信息:${err}`);
    alert(`错误信息:${err}`)
    return;
  }
}
function downloadFile(url, name) {
  fetch(url)
    .then(response => response.text())
    .then(text => {
      localStorage.setItem(urlParams('workId') + "code", encode(text));
      localStorage.setItem(urlParams('workId') + "name", encode(name));
      window.editor.setValue(text);
      var pn = document.getElementById("projectName");
      pn.value = name;
      workName = name;
      loading.hidden = true;
    })
    .catch(console.error)
    {
      loading.hidden = true;
    }
}

function loadLocalSaved()
{
  var c = localStorage.getItem(urlParams('workId') + "code");
  var n = localStorage.getItem(urlParams('workId') + "name");
  var d = new Date();
  var t = d.toLocaleString();
  var str = "# " + t + "\nprint('欢迎来到蓝趣编程课堂')"
  if (c != null) { str = decode(c); }
    window.editor.setValue(str);
    var pn = document.getElementById("projectName");
    if (n != null)
      pn.value = decode(n);
    else
      pn.value =  "Default";
  return c!=null;
}

var observer = {
  next(res) { },
  error(err) {
    console.log(1, err)
  },
  complete(res) {
    uploadParam.projectKey = uploadFile(res.key, '学生作业-python', res.key, 2)
    uploadWork()
  }
}

function handleFileUploaded(res) {
  console.log(res);
  if (res.success) {
    var key = res.message
    uploadParam.projectKey = uploadFile(key, '学生作业-python', key, 1)
    uploadWork()
  } else {
    alert("上传失败：" + res.message)
  }
}
if (workId) {
  getWorkInfo(workId, function (info) {
    var myEvent = new CustomEvent('loadPorject', {
      detail: {
        projectName: info.workName,
        url: info.workFileKey_url
      }
    });

    setTimeout(() => {
      window.document.dispatchEvent(myEvent);
    }, 500)
  })
} else {
  setTimeout(() => {
    loadLocalSaved();
    loading.hidden = true;
  }, 500)

}

window.document.addEventListener("loadPorject", function (e) {
  console.log("load project:" + e.detail.projectName);
  console.log(e.detail.url);
  if (!loadLocalSaved())
  {
    loading.hidden = false;
    downloadFile(e.detail.url, e.detail.projectName);
  }else
    loading.hidden = true;
})
window.submitCode = function (projectName, code) {
  console.log(code);
  var uuid = window.uuid()
  uploadParam.projectTitle = projectName
  var defaultUploadType = JSON.parse(localStorage.getItem("CONFIG")).defaultUploadType
  if (defaultUploadType == 'qiniu') {
    upload2Qiniu(code, 'python/' + uuid + '.py', projectName, observer)
  } else {
    update2Local(new Blob([code], { type: 'text/plain' }), uploadParam.projectTitle + ".py", 'python', handleFileUploaded)
  }
}

//上传作业
function uploadWork() {
  $.ajax({
    url: '/api/teaching/teachingWork/submit',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function (request) {
      request.setRequestHeader('X-Access-Token', getUserToken())
    },
    data: JSON.stringify({
      courseId: unitId,
      workCover: "",
      workFile: uploadParam.projectKey,
      workName: uploadParam.projectTitle,
      id: workId,
      workType: 4
    }),
    success: function (res) {
      if (res.code == 200) {
        alert("提交成功")
      } else {
      }
    },
    error: function () {
    },
    complete: function () {
    }
  })
}