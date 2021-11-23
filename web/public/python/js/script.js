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
  } catch (err) {
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
  } catch (err) {
    console.log(`错误信息:${err}`);
  }
  var pn = document.getElementById("projectName");
  var projectName = pn.value;
  window.submitCode && window.submitCode(projectName, code)
}

var loading = document.getElementById("loading");
var uploadParam = {}
var workName = ''
const queryString = window.location.search;
console.log(`URL:${queryString}`);

var workId = urlParams('workId')
var unitId = urlParams('unitId')
var userInfo = getUserInfo();
var userInput = document.getElementById("user");
var whoamiInput = document.getElementById("whoami");

userInput.value = userInfo.id;
whoamiInput.value = userInfo.realname;

var qn_token = getQiniuToken();

let startDate = new Date();

window.trinketObject = {
  "id": workId,
  "code": "#欢迎来到蓝趣编程课堂\n",
  "lang": "python",
  "name": "Default",
  "description": "描述",
  "groupId": null,
  "_parent": null,
  "_origin_id": null,
  "_owner": userInfo.id,
  "hash": null,
  "shortCode": workId,
  "lastUpdated": startDate.toString(),
  "metrics": {},
  "lastView": {},
  "snapshot": null,
  "assets":null,
  "displayOnly": null,
  "original": null,
  "settings": {
    "autofocusEnabled": true,
    "testsEnabled": false,
    "astro_pi_mission_submission": false
  },
  "submissionState": null,
  "submissionOpts": {},
  "submittedOn": null,
  "slug": "",
  "published": false
};

window.draftObject = null

window.userSettings = {
  "disableAceEditor": false
};

setInterval(function () {
  qn_token = getQiniuToken();
}, 600 * 1000)
// twl mine create course
var scene = urlParams("scene")

function downloadFile(url, name) {

  fetch(url)
  .then(handleResponse)
  .then(data => console.log(data))
  .then(error => console.log(error))

function handleResponse (response) {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else if (contentType.includes('text/html') || contentType.includes('text/x-python')) {
    return handleTextResponse(response)
  } else {
    // Other response types as necessary. I haven't found a need for them yet though.
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
}

function handleJSONResponse (response) {
  return response.json()
    .then(json => {
      if (response.ok) {
        window.trinketObject = json;
        var ready_event = new CustomEvent('project_ready', null);
    
      setTimeout(() => {
        window.document.dispatchEvent(ready_event);
      }, 500)
        return json
      } else {
        return Promise.reject(Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        }))
      }
    })
}
function handleTextResponse (response) {
  return response.text()
    .then(text => {
      if (response.ok) {
        window.trinketObject = {
          "id": workId,
          "code": text,
          "lang": "python",
          "name": name,
          "description": "描述",
          "groupId": null,
          "_parent": "55d0a816737d8d0159ab7ab2",
          "_origin_id": null,
          "_owner": "6174299c13f62bbe040ed020",
          "hash": "f0ea194d92925417708f1768bbcc5d16dc5992dd",
          "shortCode": "f0e3d6014d",
          "lastUpdated": "2021-10-23T15:26:20.383Z",
          "metrics": {},
          "lastView": {},
          "snapshot": null,
          "assets": null,
          "displayOnly": null,
          "original": null,
          "settings": {
            "autofocusEnabled": true,
            "testsEnabled": false,
            "astro_pi_mission_submission": false
          },
          "submissionState": null,
          "submissionOpts": {},
          "submittedOn": null,
          "slug": "",
          "published": false
        };
        var ready_event = new CustomEvent('project_ready', null);
    
      setTimeout(() => {
        window.document.dispatchEvent(ready_event);
      }, 500)
        return text
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          err: text
        })
      }
    })
}
}

function loadLocalSaved() {}

var observer = {
  next(res) {},
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
  var ready_event = new CustomEvent('project_ready', null);
    
  setTimeout(() => {
    window.document.dispatchEvent(ready_event);
  }, 500)
}

window.document.addEventListener("loadPorject", function (e) {
  console.log("load project:" + e.detail.projectName);
  console.log(e.detail.url);
  if (!loadLocalSaved()) {
    if(loading)
      loading.hidden = false;
    downloadFile(e.detail.url, e.detail.projectName);
  } else
  {
  if(loading)
    loading.hidden = true;
  }
})
window.submitCode = function (code) {
  try{
    uuid = window.uuid();
  }
  catch(e)
  {
    uuid = window.uuid
  }
  console.log(code);
  projectName = code.name;
  uploadParam.projectTitle = projectName;
  code_text = JSON.stringify(code)
  var defaultUploadType = JSON.parse(localStorage.getItem("CONFIG")).defaultUploadType
  if (defaultUploadType == 'qiniu') {
    upload2Qiniu(code_text, 'python/' + uuid + '.json', projectName, observer)
  } else {
    update2Local(new Blob([code_text], {
      type: 'text/json'
    }), uploadParam.projectTitle + ".json", 'python', handleFileUploaded)
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
        alert(res.message)
        res_id = res.result.id
        url = window.location.href
        if(url.indexOf(res_id)==-1)
          window.location.href = "/python/index.html?workid="+res_id
      } else {}
    },
    error: function () {},
    complete: function () {}
  })
}