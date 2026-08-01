/**
 * Teaching Platform — Python Online IDE
 * Pyodide + Monaco Editor + Qiniu + TeachingWorkController
 *
 * URL params: ?workId=X&unitId=X&scene=X
 */

;(function () {
  'use strict'

  // ── State ──
  let monacoEditor = null
  let pyodide = null
  let isPyodideReady = false
  let isRunning = false
  let isDirty = false
  let currentTheme = 'dark'
  let autoSaveTimer = null
  let qnToken = null

  // URL params (from common.js)
  const workId = window.urlParams('workId')
  const unitId = window.urlParams('unitId')
  const scene = window.urlParams('scene')
  const codeParam = window.urlParams('code')
  const additionalId = window.urlParams('additionalId')
  const preloadUrl = window.urlParams('url')

  // ── Multi-file state ──
  let files = {} // { 'filename.py': 'content', ... }
  let currentFileName = null // Currently active file name
  let fileOrder = [] // Ordered list of file names
  const MAIN_FILE = 'main.py' // Default entry file

  // ── DOM refs ──
  const $ = (sel) => document.querySelector(sel)
  const $$ = (sel) => document.querySelectorAll(sel)

  const els = {
    fileName: $('#fileName'),
    btnRun: $('#btnRun'),
    btnSave: $('#btnSave'),
    btnSubmit: $('#btnSubmit'),
    btnDownload: $('#btnDownload'),
    btnUpload: $('#btnUpload'),
    btnMenu: $('#btnMenu'),
    fileInput: $('#fileUploadInput'),
    menuDropdown: $('#menuDropdown'),
    editorContainer: $('#editor-container'),
    outputContainer: $('#output-container'),
    turtleContainer: $('#turtle-container'),
    turtleCanvas: $('#turtleCanvas'),
    loadingOverlay: $('#loadingOverlay'),
    loadingText: $('#loadingText'),
    loadingProgressBar: $('#loadingProgressBar'),
    statusCursor: $('#statusCursor'),
    statusChars: $('#statusChars'),
    statusSave: $('#statusSave'),
    statusPyodide: $('#statusPyodide'),
    statusTime: $('#statusTime'),
    confirmModal: $('#confirmModal'),
    confirmTitle: $('#confirmTitle'),
    confirmMessage: $('#confirmMessage'),
    fileTree: $('#file-tree'),
    fileTreeList: $('#file-tree-list'),
    btnNewFile: $('#btnNewFile'),
    assetPanel: $('#asset-panel'),
    assetList: $('#asset-list'),
    assetTabs: $$('.asset-tab'),
  }

  // ── LocalStorage helpers ──
  function storageKey(key) {
    return 'pyide_' + (workId || 'new') + '_' + key
  }

  function saveLocal(key, val) {
    try {
      localStorage.setItem(storageKey(key), val)
    } catch (e) {
      /* quota */
    }
  }

  function loadLocal(key) {
    try {
      return localStorage.getItem(storageKey(key))
    } catch (e) {
      return null
    }
  }

  function getCode() {
    return monacoEditor ? monacoEditor.getValue() : ''
  }

  function setCode(value) {
    if (monacoEditor) monacoEditor.setValue(value)
  }

  // ── Multi-file operations ──
  function hasFile(name) {
    return name in files
  }

  function getFileNames() {
    return fileOrder.slice()
  }

  function switchFile(name) {
    if (!hasFile(name)) return
    // Save current file content before switching
    if (currentFileName && hasFile(currentFileName)) {
      files[currentFileName] = getCode()
    }
    currentFileName = name
    setCode(files[name])
    if (els.fileName) els.fileName.value = name
    renderFileTree()
    setDirty(false)
  }

  function addFile(name) {
    name = name.trim()
    if (!name.endsWith('.py')) name += '.py'
    if (hasFile(name)) {
      appendOutput('[系统] 文件 "' + name + '" 已存在', 'system')
      return false
    }
    files[name] = '# ' + name + '\n\ndef run():\n    pass\n'
    fileOrder.push(name)
    switchFile(name)
    appendOutput('[系统] 新建文件: ' + name, 'system')
    return true
  }

  function deleteFile(name) {
    if (fileOrder.length <= 1) {
      appendOutput('[系统] 至少保留一个文件', 'system')
      return false
    }
    if (name === MAIN_FILE) {
      appendOutput('[系统] 不能删除主文件 ' + MAIN_FILE, 'system')
      return false
    }
    delete files[name]
    var idx = fileOrder.indexOf(name)
    if (idx > -1) fileOrder.splice(idx, 1)
    // Switch to another file
    if (currentFileName === name) {
      switchFile(fileOrder[0])
    } else {
      renderFileTree()
    }
    appendOutput('[系统] 已删除文件: ' + name, 'system')
    return true
  }

  function renameFile(oldName, newName) {
    if (!hasFile(oldName)) return false
    if (!newName.endsWith('.py')) newName += '.py'
    if (newName !== oldName && hasFile(newName)) {
      appendOutput('[系统] 文件 "' + newName + '" 已存在', 'system')
      return false
    }
    files[newName] = files[oldName]
    delete files[oldName]
    var idx = fileOrder.indexOf(oldName)
    if (idx > -1) fileOrder[idx] = newName
    if (currentFileName === oldName) {
      currentFileName = newName
      if (els.fileName) els.fileName.value = newName
    }
    renderFileTree()
    appendOutput('[系统] 文件重命名: ' + oldName + ' → ' + newName, 'system')
    return true
  }

  function getMultiFileContent() {
    // Refresh current file content
    if (currentFileName && hasFile(currentFileName)) {
      files[currentFileName] = getCode()
    }
    return JSON.stringify({ files: files, order: fileOrder })
  }

  function loadMultiFileContent(jsonStr) {
    try {
      var data = JSON.parse(jsonStr)
      if (data && data.files) {
        files = data.files
        fileOrder = data.order || Object.keys(files)
        // Ensure all files in order exist
        fileOrder = fileOrder.filter(function (n) {
          return n in files
        })
        Object.keys(files).forEach(function (n) {
          if (fileOrder.indexOf(n) === -1) fileOrder.push(n)
        })
        if (fileOrder.length === 0) {
          files[MAIN_FILE] = ''
          fileOrder = [MAIN_FILE]
        }
        switchFile(fileOrder[0])
        renderFileTree()
        return true
      }
    } catch (e) {
      /* not multi-file format */
    }
    return false
  }

  // ── File tree UI ──
  function renderFileTree() {
    var list = els.fileTreeList
    if (!list) return
    list.innerHTML = ''
    fileOrder.forEach(function (name) {
      var li = document.createElement('li')
      li.className = 'file-tree-item' + (name === currentFileName ? ' active' : '')
      li.dataset.filename = name

      var icon = document.createElement('i')
      icon.className = 'fa fa-file-code-o file-icon'
      li.appendChild(icon)

      var span = document.createElement('span')
      span.className = 'file-name-text'
      span.textContent = name
      li.appendChild(span)

      // Delete button (not for last file or main.py)
      if (fileOrder.length > 1 && name !== MAIN_FILE) {
        var delBtn = document.createElement('i')
        delBtn.className = 'fa fa-times file-del-btn'
        delBtn.title = '删除'
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation()
          showConfirm('删除文件', '确定要删除 "' + name + '" 吗？', function () {
            deleteFile(name)
          })
        })
        li.appendChild(delBtn)
      }

      li.addEventListener('click', function () {
        switchFile(name)
      })

      list.appendChild(li)
    })
  }

  // Verify that main.py (or another .py) is runnable
  function getRunCode() {
    // When running, gather all files as a combined module context
    // We build a simple preamble that makes other files available
    var code = ''
    if (currentFileName && hasFile(currentFileName)) {
      files[currentFileName] = getCode()
    }
    // Combine: put non-current files first as they might define imports
    var allNames = fileOrder.filter(function (n) {
      return n !== currentFileName
    })
    // Put current file last
    var runFile = currentFileName || MAIN_FILE
    if (runFile !== currentFileName) {
      allNames = fileOrder
    } else {
      allNames.push(runFile)
    }
    // Build combined code with file markers as comments
    allNames.forEach(function (name) {
      if (hasFile(name)) {
        code += '# --- ' + name + ' ---\n' + files[name] + '\n\n'
      }
    })
    return code
  }

  function getCode() {
    // ── Output helpers ──
    function clearOutput() {
      els.outputContainer.innerHTML = ''
    }

    function appendOutput(text, cls) {
      var line = document.createElement('div')
      line.className = 'output-line ' + (cls || 'stdout')
      line.textContent = text
      els.outputContainer.appendChild(line)
      els.outputContainer.scrollTop = els.outputContainer.scrollHeight
    }

    function clearTurtle() {
      var canvas = els.turtleCanvas
      var ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = els.turtleContainer.clientWidth
        canvas.height = els.turtleContainer.clientHeight
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    // ── Status bar ──
    function updateStatusBar() {
      if (!monacoEditor) return
      var pos = monacoEditor.getPosition()
      var content = monacoEditor.getValue()
      if (els.statusCursor) {
        els.statusCursor.textContent = '行 ' + pos.lineNumber + ', 列 ' + pos.column
      }
      if (els.statusChars) {
        els.statusChars.textContent = content.length + ' 字符'
      }
    }

    function setDirty(dirty) {
      isDirty = dirty
      els.statusSave.textContent = dirty ? '未保存' : '已保存'
      els.statusSave.className = dirty ? 'status-dirty' : 'status-saved'
    }

    // ── Pyodide initialization ──
    async function initPyodide() {
      els.statusPyodide.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Python 加载中...'
      els.statusPyodide.className = 'status-pyodide loading'
      els.loadingText.textContent = '正在加载 Python 环境（约10MB，首次较慢）...'
      els.loadingProgressBar.style.width = '30%'

      if (typeof loadPyodide === 'undefined') {
        throw new Error('Pyodide 脚本未加载，请检查网络连接')
      }

      pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/',
        stdout: function (text) {
          appendOutput(text, 'stdout')
        },
        stderr: function (text) {
          appendOutput(text, 'stderr')
        },
      })

      els.loadingText.textContent = '正在加载常用 Python 库...'
      els.loadingProgressBar.style.width = '70%'

      // Load commonly used packages
      await pyodide.loadPackage(['numpy', 'matplotlib', 'pandas'])
      els.loadingProgressBar.style.width = '100%'

      // Monkey-patch turtle to render to our canvas
      setupTurtleSupport()

      isPyodideReady = true
      els.statusPyodide.innerHTML = '<i class="fas fa-check-circle"></i> Python 就绪'
      els.statusPyodide.className = 'status-pyodide'
    }

    // ── Turtle graphics support ──
    function setupTurtleSupport() {
      if (!pyodide) return
      // The Pyodide turtle module auto-detects browser environment and renders
      // to an HTML5 canvas. We ensure our canvas is available and sized correctly.
      resizeTurtleCanvas()
    }

    function switchToTurtleTab() {
      var turtleContainer = els.turtleContainer
      turtleContainer.classList.add('active')
      els.outputContainer.style.display = 'none'
      document.querySelector('[data-tab="turtle"]').classList.add('active')
      document.querySelector('[data-tab="console"]').classList.remove('active')
      resizeTurtleCanvas()
    }

    function switchToConsoleTab() {
      els.turtleContainer.classList.remove('active')
      els.outputContainer.style.display = ''
      document.querySelector('[data-tab="console"]').classList.add('active')
      document.querySelector('[data-tab="turtle"]').classList.remove('active')
    }

    function resizeTurtleCanvas() {
      var canvas = els.turtleCanvas
      var container = els.turtleContainer
      canvas.width = container.clientWidth || 600
      canvas.height = container.clientHeight || 400
    }

    // ── Code execution ──
    async function runCode() {
      if (!isPyodideReady) {
        appendOutput('[系统] Python 环境尚未就绪，请稍候...', 'system')
        return
      }
      if (isRunning) {
        appendOutput('[系统] 代码正在执行中...', 'system')
        return
      }

      // Gather all files for execution
      var code = getRunCode()
      if (!code.trim()) {
        appendOutput('[系统] 没有可执行的代码', 'system')
        return
      }

      isRunning = true
      els.btnRun.classList.add('running')
      els.btnRun.innerHTML = '<i class="fas fa-stop"></i> <span class="btn-label">停止</span>'
      clearOutput()
      clearTurtle()
      appendOutput('▶ 开始执行...', 'system')

      var startTime = performance.now()

      try {
        // Wrap code to handle turtle properly
        var wrappedCode = code
        // Check if code uses turtle
        if (code.includes('turtle') || code.includes('Turtle')) {
          wrappedCode =
            `
import turtle
turtle.Screen()._root = None  # Prevent Tk errors
` + code
        }

        await pyodide.runPythonAsync(wrappedCode)

        var duration = ((performance.now() - startTime) / 1000).toFixed(3)
        els.statusTime.textContent = '执行: ' + duration + 's'
        appendOutput('✓ 执行完成 (' + duration + 's)', 'system')

        // Check if turtle was used and switch to turtle tab
        try {
          var hasCanvas = pyodide.runPython('_turtle_module.getcanvas() if _turtle_module.getcanvas() else None')
          if (hasCanvas) {
            switchToTurtleTab()
          }
        } catch (e) {
          // turtle not used, stay on console
        }
      } catch (err) {
        var duration = ((performance.now() - startTime) / 1000).toFixed(3)
        els.statusTime.textContent = '错误 (' + duration + 's)'
        var errMsg = err.message || String(err)
        // Clean up Pyodide stack traces for readability
        errMsg = errMsg.replace(/File "<exec>", line \d+.*?\n/g, '')
        errMsg = errMsg.replace(/File ".*?pyodide.*?", line \d+.*?\n/g, '')
        appendOutput('✗ ' + errMsg, 'stderr')
      } finally {
        isRunning = false
        els.btnRun.classList.remove('running')
        els.btnRun.innerHTML = '<i class="fas fa-play"></i> <span class="btn-label">运行</span>'
      }
    }

    // ── Backend: save work ──
    function saveToBackend() {
      var code = getMultiFileContent()
      var name = (els.fileName && els.fileName.value) || 'project'

      // Auto-save to localStorage first
      saveLocal('multifile', code)
      saveLocal('name', name)
      setDirty(false)

      // If no workId, we can't save to backend (need to submit first)
      if (!workId) {
        appendOutput('[系统] 代码已保存到本地。使用"提交"按钮保存到平台。', 'system')
        return
      }

      // Save to backend: upload to Qiniu then update work
      var uploadType = (window.getSysConfig && window.getSysConfig('uploadType')) || 'qiniu'

      if (uploadType === 'qiniu') {
        var token = window.getQiniuToken ? window.getQiniuToken() : qnToken
        if (!token) {
          appendOutput('[系统] 无法获取上传凭证，代码已保存到本地', 'system')
          return
        }
        qnToken = token

        var key = 'python/' + (workId || window.uuid()) + '_' + Date.now() + '.json'
        var blob = new Blob([code], { type: 'application/json' })

        var observable = qiniu.upload(
          blob,
          key,
          token,
          {
            fname: 'project.json',
            params: {},
            mimeType: 'application/json',
          },
          {
            useCdnDomain: true,
            region: qiniu.region[(window.getSysConfig && window.getSysConfig('qiniuArea')) || 'cn-east-2'],
            disableStatisticsReport: true,
          }
        )

        observable.subscribe({
          next: function () {
            /* progress */
          },
          error: function (err) {
            appendOutput('[系统] 上传失败: ' + (err.message || '未知错误'), 'stderr')
          },
          complete: function (res) {
            updateWorkRecord(res.key)
          },
        })
      } else {
        var formData = new FormData()
        formData.append('file', new Blob([code], { type: 'application/json' }), 'project.json')
        formData.append('bizPath', 'python')

        $.ajax({
          url: (JSON.parse(localStorage.getItem('CONFIG') || '{}').domianURL || '') + '/sys/common/upload',
          type: 'POST',
          cache: false,
          data: formData,
          processData: false,
          contentType: false,
          beforeSend: function (req) {
            req.setRequestHeader('X-Access-Token', window.getUserToken())
          },
          success: function (res) {
            if (res.success) {
              updateWorkRecord(res.message)
            }
          },
          error: function () {
            appendOutput('[系统] 上传失败', 'stderr')
          },
        })
      }
    }

    function updateWorkRecord(fileKey) {
      $.ajax({
        url: '/api/teaching/teachingWork/submit',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (req) {
          req.setRequestHeader('X-Access-Token', window.getUserToken())
        },
        data: JSON.stringify({
          id: workId || undefined,
          courseId: unitId || undefined,
          workCover: '',
          workFile: fileKey,
          workName: els.fileName.value || 'untitled.py',
          workType: 4,
          workScene: scene || 'create',
          additionalId: additionalId || undefined,
        }),
        success: function (res) {
          if (res.code === 200) {
            appendOutput('[系统] 保存成功', 'system')
          } else {
            appendOutput('[系统] 保存失败: ' + (res.message || ''), 'stderr')
          }
        },
        error: function () {
          appendOutput('[系统] 保存失败，请检查网络', 'stderr')
        },
      })
    }

    // ── Backend: submit work ──
    function submitWork() {
      var code = getMultiFileContent()
      var name = (els.fileName && els.fileName.value) || 'project'

      // Save to localStorage first
      saveLocal('multifile', code)
      saveLocal('name', name)

      var uploadType = (window.getSysConfig && window.getSysConfig('uploadType')) || 'qiniu'

      if (uploadType === 'qiniu') {
        var token = window.getQiniuToken ? window.getQiniuToken() : qnToken
        if (!token) {
          appendOutput('[系统] 无法获取上传凭证，请稍后重试', 'system')
          return
        }
        qnToken = token

        var key = 'python/' + (workId || window.uuid()) + '_' + Date.now() + '.json'
        var blob = new Blob([code], { type: 'application/json' })

        var observable = qiniu.upload(
          blob,
          key,
          token,
          {
            fname: 'project.json',
            params: {},
            mimeType: 'application/json',
          },
          {
            useCdnDomain: true,
            region: qiniu.region[(window.getSysConfig && window.getSysConfig('qiniuArea')) || 'cn-east-2'],
            disableStatisticsReport: true,
          }
        )

        observable.subscribe({
          next: function () {},
          error: function (err) {
            appendOutput('[系统] 提交失败，上传出错: ' + (err.message || '未知错误'), 'stderr')
          },
          complete: function (res) {
            submitWorkRecord(res.key)
          },
        })
      } else {
        var formData = new FormData()
        formData.append('file', new Blob([code], { type: 'application/json' }), 'project.json')
        formData.append('bizPath', 'python')

        $.ajax({
          url: (JSON.parse(localStorage.getItem('CONFIG') || '{}').domianURL || '') + '/sys/common/upload',
          type: 'POST',
          cache: false,
          data: formData,
          processData: false,
          contentType: false,
          beforeSend: function (req) {
            req.setRequestHeader('X-Access-Token', window.getUserToken())
          },
          success: function (res) {
            if (res.success) {
              submitWorkRecord(res.message)
            } else {
              appendOutput('[系统] 上传失败', 'stderr')
            }
          },
          error: function () {
            appendOutput('[系统] 提交失败，请检查网络', 'stderr')
          },
        })
      }
    }

    function submitWorkRecord(fileKey) {
      $.ajax({
        url: '/api/teaching/teachingWork/submit',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (req) {
          req.setRequestHeader('X-Access-Token', window.getUserToken())
        },
        data: JSON.stringify({
          courseId: unitId || undefined,
          workCover: '',
          workFile: fileKey,
          workName: els.fileName.value || 'untitled.py',
          id: workId || undefined,
          workType: 4,
          workScene: scene || 'create',
          additionalId: additionalId || undefined,
        }),
        success: function (res) {
          if (res.code === 200) {
            appendOutput('[系统] 提交成功！', 'system')
            alert('作品提交成功！')
          } else {
            appendOutput('[系统] 提交失败: ' + (res.message || ''), 'stderr')
          }
        },
        error: function () {
          appendOutput('[系统] 提交失败，请检查网络', 'stderr')
        },
      })
    }

    // ── Load work from backend ──
    function loadWorkFromBackend() {
      if (!workId) return

      window.getWorkInfo &&
        window.getWorkInfo(workId, function (info) {
          if (info && info.workFileKey_url) {
            fetch(info.workFileKey_url)
              .then(function (r) {
                return r.text()
              })
              .then(function (content) {
                // Try to load as multi-file format first
                if (!loadMultiFileContent(content)) {
                  // Legacy single-file format: treat whole content as main.py
                  files = {}
                  fileOrder = []
                  files[MAIN_FILE] = content
                  fileOrder.push(MAIN_FILE)
                  switchFile(MAIN_FILE)
                }
                if (els.fileName) els.fileName.value = info.workName || 'project'
                saveLocal('multifile', getMultiFileContent())
                saveLocal('name', info.workName || '')
                setDirty(false)
                appendOutput('[系统] 已加载作品: ' + info.workName, 'system')
              })
              .catch(function () {
                loadFromLocal()
              })
          } else {
            loadFromLocal()
          }
        })
    }

    function loadFromLocal() {
      var multi = loadLocal('multifile')
      var name = loadLocal('name')
      if (multi && loadMultiFileContent(multi)) {
        if (name && els.fileName) els.fileName.value = name
        setDirty(false)
        return
      }
      // Fallback: try old single-file localStorage format
      var code = loadLocal('code')
      if (!code) {
        try {
          var oldCode = localStorage.getItem(workId + 'code')
          if (oldCode) code = decodeURIComponent(atob(oldCode))
        } catch (e) {}
      }
      if (!name) {
        try {
          var oldName = localStorage.getItem(workId + 'name')
          if (oldName) name = decodeURIComponent(atob(oldName))
        } catch (e) {}
      }

      if (code) {
        files = {}
        fileOrder = []
        files[MAIN_FILE] = code
        fileOrder.push(MAIN_FILE)
        switchFile(MAIN_FILE)
      }
      if (name && els.fileName) els.fileName.value = name
      setDirty(false)
    }

    function loadFromUrlCode() {
      if (!codeParam) return
      try {
        var decoded = atob(codeParam)
        setCode(decoded)
        appendOutput('[系统] 已从链接加载代码', 'system')
      } catch (e) {
        /* invalid encoding */
      }
    }

    function loadFromPreloadUrl() {
      if (!preloadUrl) return
      fetch(preloadUrl)
        .then(function (r) {
          return r.text()
        })
        .then(function (content) {
          if (!loadMultiFileContent(content)) {
            files = {}
            fileOrder = []
            files[MAIN_FILE] = content
            fileOrder.push(MAIN_FILE)
            switchFile(MAIN_FILE)
          }
          appendOutput('[系统] 已加载课程代码', 'system')
          setDirty(false)
        })
        .catch(function () {
          appendOutput('[系统] 加载课程代码失败', 'system')
        })
    }

    // ── File operations ──
    function downloadFile() {
      // Save current file content first
      if (currentFileName && hasFile(currentFileName)) {
        files[currentFileName] = getCode()
      }

      // If only one file, download it directly
      if (fileOrder.length === 1) {
        var name = fileOrder[0]
        var blob = new Blob([files[name]], { type: 'text/plain' })
        var url = URL.createObjectURL(blob)
        var a = document.createElement('a')
        a.href = url
        a.download = name
        a.click()
        URL.revokeObjectURL(url)
        appendOutput('[系统] 文件已下载: ' + name, 'system')
        return
      }

      // Multiple files: download as JSON project file
      var content = getMultiFileContent()
      var name = (els.fileName && els.fileName.value) || 'project'
      var blob = new Blob([content], { type: 'application/json' })
      var url = URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.download = name + '.json'
      a.click()
      URL.revokeObjectURL(url)
      appendOutput('[系统] 项目已下载: ' + name + '.json (' + fileOrder.length + ' 个文件)', 'system')
    }

    function uploadFile() {
      els.fileInput.click()
    }

    function handleFileOpen(event) {
      var file = event.target.files[0]
      if (!file) return
      var reader = new FileReader()
      reader.onload = function (e) {
        var name = file.name
        // Add as a new file in multi-file mode
        if (name.endsWith('.py')) {
          if (!hasFile(name)) {
            fileOrder.push(name)
            renderFileTree()
          }
          files[name] = e.target.result
          switchFile(name)
        } else {
          setCode(e.target.result)
        }
        if (els.fileName) els.fileName.value = name
        saveLocal('multifile', getMultiFileContent())
        saveLocal('name', name)
        setDirty(false)
        appendOutput('[系统] 已打开文件: ' + name, 'system')
      }
      reader.readAsText(file)
      event.target.value = ''
    }

    function newFile() {
      // Simply add a new file to multi-file project
      var baseName = 'file'
      var counter = 1
      while (hasFile(baseName + counter + '.py')) {
        counter++
      }
      addFile(baseName + counter + '.py')
      clearOutput()
      setDirty(false)
    }

    function setDefaultCode() {
      var d = new Date()
      var t = d.toLocaleString('zh-CN')
      // Initialize with multi-file structure
      files = {}
      fileOrder = []
      files[MAIN_FILE] = '# ' + t + '\n# 蓝趣编程课堂\n\nprint("Hello, Python!")\n'
      fileOrder.push(MAIN_FILE)
      switchFile(MAIN_FILE)
      renderFileTree()
    }

    // ── Confirm dialog ──
    var confirmCallback = null

    function showConfirm(title, message, cb) {
      confirmCallback = cb
      els.confirmTitle.textContent = title
      els.confirmMessage.textContent = message
      els.confirmModal.classList.add('active')
    }

    function hideConfirm() {
      els.confirmModal.classList.remove('active')
      confirmCallback = null
    }

    // ── Asset library (same source as Scratch) ──
    function loadAssets(assetType) {
      var labels = { 1: '背景', 2: '声音', 3: '造型', 4: '角色' }
      appendOutput('[系统] 正在加载 ' + (labels[assetType] || '素材') + ' 库...', 'system')
      window.getScratchAssets &&
        window.getScratchAssets(assetType, function (assets) {
          renderAssetPanel(assetType, assets)
        })
    }

    function renderAssetPanel(assetType, assets) {
      var container = els.assetList
      if (!container) return
      container.innerHTML = ''
      if (!assets || !assets.length) {
        container.innerHTML = '<div class="asset-empty">暂无素材</div>'
        return
      }
      assets.forEach(function (item) {
        var card = document.createElement('div')
        card.className = 'asset-card'

        var img = document.createElement('img')
        img.className = 'asset-thumb'
        // Asset file URL construction (same as Scratch)
        var md5 = item.md5ext || (item.costumes && item.costumes[0] && item.costumes[0].md5ext)
        if (md5) {
          img.src = window.getFileAccessHttpUrl ? window.getFileAccessHttpUrl('internalapi/asset/' + md5) : ''
          img.onerror = function () {
            img.style.display = 'none'
          }
        } else {
          img.style.display = 'none'
        }
        card.appendChild(img)

        var nameEl = document.createElement('div')
        nameEl.className = 'asset-name'
        nameEl.textContent = item.name || ''
        card.appendChild(nameEl)

        card.addEventListener('click', function () {
          // Insert import statement at cursor position
          if (monacoEditor) {
            var selection = monacoEditor.getSelection()
            var pos = selection.getStartPosition()
            var range = new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column)
            // Generate Python code to access the asset
            var varName = (item.name || 'asset').replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase()
            var assetUrl = img.src || ''
            var snippet = '\n# ' + (item.name || '素材') + '\n' + varName + '_url = "' + assetUrl + '"\n'
            if (assetType === 2) {
              // Sound asset
              snippet = '\n# ' + (item.name || '声音素材') + '\n' + varName + '_url = "' + assetUrl + '"\n'
            }
            monacoEditor.executeEdits('asset-paste', [
              {
                range: range,
                text: snippet,
                forceMoveMarkers: true,
              },
            ])
            monacoEditor.focus()
            appendOutput('[系统] 已插入素材引用: ' + (item.name || ''), 'system')
          }
        })

        container.appendChild(card)
      })
      if (els.assetPanel) els.assetPanel.classList.add('active')
    }

    // ── Theme ──
    function toggleTheme() {
      if (currentTheme === 'dark') {
        document.body.classList.add('theme-light')
        currentTheme = 'light'
        monacoEditor.updateOptions({ theme: 'vs' })
      } else {
        document.body.classList.remove('theme-light')
        currentTheme = 'dark'
        monacoEditor.updateOptions({ theme: 'vs-dark' })
      }
    }

    // ── Format code ──
    function formatCode() {
      var code = getCode()
      if (!code.trim()) return

      // Use Pyodide's autopep8 or black for formatting, or fallback to simple indent fix
      if (isPyodideReady) {
        pyodide
          .runPythonAsync(
            `
try:
    import autopep8
    formatted = autopep8.fix_code("""` +
              code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$') +
              `""")
except ImportError:
    formatted = """` +
              code.replace(/\\/g, '\\\\').replace(/"/g, '\\"') +
              `"""
`
          )
          .then(function () {
            pyodide.runPythonAsync('formatted').then(function (result) {
              if (result && result !== code) {
                setCode(result)
                appendOutput('[系统] 代码已格式化', 'system')
              }
            })
          })
          .catch(function () {
            appendOutput('[系统] 格式化失败（需要 autopep8 库）', 'system')
          })
      }
    }

    // ── Auto-save ──
    function startAutoSave() {
      if (autoSaveTimer) clearInterval(autoSaveTimer)
      autoSaveTimer = setInterval(function () {
        if (isDirty && monacoEditor) {
          var content = getMultiFileContent()
          var name = (els.fileName && els.fileName.value) || 'project'
          saveLocal('multifile', content)
          saveLocal('name', name)
          setDirty(false)
        }
      }, 30000) // every 30 seconds
    }

    // ── Monaco initialization ──
    function initMonacoEditor() {
      return new Promise(function (resolve, reject) {
        require.config({
          paths: {
            vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs',
          },
        })

        require(['vs/editor/editor.main'], function () {
          try {
            monacoEditor = monaco.editor.create(els.editorContainer, {
              value: '',
              language: 'python',
              theme: 'vs-dark',
              automaticLayout: true,
              minimap: { enabled: false },
              fontSize: 15,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              fontFamily: '"Cascadia Code", "Fira Code", "JetBrains Mono", "Courier New", monospace',
              renderWhitespace: 'selection',
              bracketPairColorization: { enabled: true },
              tabSize: 4,
            })

            // Track changes
            monacoEditor.onDidChangeModelContent(function () {
              setDirty(true)
              updateStatusBar()
            })

            monacoEditor.onDidChangeCursorPosition(updateStatusBar)

            console.log('Monaco Editor initialized')
            resolve()
          } catch (e) {
            console.error('Monaco Editor init failed:', e)
            reject(e)
          }
        })
      })
    }

    // ── Event bindings ──
    function bindEvents() {
      // Run button
      els.btnRun.addEventListener('click', function () {
        if (isRunning) {
          appendOutput('[系统] 无法中途停止执行，请等待完成', 'system')
        } else {
          runCode()
        }
      })

      // Save button
      els.btnSave.addEventListener('click', saveToBackend)

      // Submit button
      els.btnSubmit.addEventListener('click', function () {
        var code = getRunCode()
        if (!code.trim()) {
          appendOutput('[系统] 请先编写代码再提交', 'system')
          return
        }
        submitWork()
      })

      // Download
      els.btnDownload.addEventListener('click', downloadFile)

      // Upload
      els.btnUpload.addEventListener('click', uploadFile)
      els.fileInput.addEventListener('change', handleFileOpen)

      // Menu toggle
      els.btnMenu.addEventListener('click', function (e) {
        e.stopPropagation()
        els.menuDropdown.classList.toggle('active')
      })

      document.addEventListener('click', function () {
        els.menuDropdown.classList.remove('active')
      })

      // Menu items
      $('#menuNew').addEventListener('click', newFile)
      $('#menuTheme').addEventListener('click', toggleTheme)
      $('#menuClear').addEventListener('click', function () {
        clearOutput()
        appendOutput('[系统] 输出已清空', 'system')
      })
      $('#menuFormat').addEventListener('click', formatCode)

      // Output tabs
      $$('.output-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
          if (this.dataset.tab === 'turtle') {
            switchToTurtleTab()
          } else {
            switchToConsoleTab()
          }
        })
      })

      // Confirm modal
      $('#confirmCancel').addEventListener('click', hideConfirm)
      $('#confirmOk').addEventListener('click', function () {
        hideConfirm()
        if (confirmCallback) confirmCallback()
      })
      els.confirmModal.addEventListener('click', function (e) {
        if (e.target === els.confirmModal) hideConfirm()
      })

      // Keyboard shortcuts
      document.addEventListener('keydown', function (e) {
        // Ctrl+Enter or Cmd+Enter: Run
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault()
          runCode()
        }
        // Ctrl+S or Cmd+S: Save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault()
          saveToBackend()
        }
      })

      // File name change
      els.fileName.addEventListener('input', function () {
        setDirty(true)
      })

      // Window resize
      window.addEventListener('resize', function () {
        resizeTurtleCanvas()
      })

      // Multi-file: new file button
      if (els.btnNewFile) {
        els.btnNewFile.addEventListener('click', function () {
          showConfirm('新建文件', '输入新文件名 (例如: helper.py)', function () {
            var name = prompt('文件名:', 'helper.py')
            if (name) addFile(name)
          })
          hideConfirm()
        })
      }

      // Asset tabs
      if (els.assetTabs) {
        els.assetTabs.forEach(function (tab) {
          tab.addEventListener('click', function () {
            var type = parseInt(this.dataset.assetType)
            els.assetTabs.forEach(function (t) {
              t.classList.remove('active')
            })
            this.classList.add('active')
            loadAssets(type)
          })
        })
      }

      // Close asset panel
      var closeAsset = document.getElementById('closeAssetPanel')
      if (closeAsset && els.assetPanel) {
        closeAsset.addEventListener('click', function () {
          els.assetPanel.classList.remove('active')
        })
      }

      // File name change updates the file tree
      if (els.fileName) {
        els.fileName.addEventListener('change', function () {
          if (currentFileName && this.value && this.value !== currentFileName) {
            renameFile(currentFileName, this.value)
          }
        })
      }
    }
  }

  // ── Main initialization ──
  async function init() {
    try {
      console.log('Python IDE starting...')

      // 1. Init Monaco Editor
      els.loadingText.textContent = '正在加载编辑器...'
      els.loadingProgressBar.style.width = '10%'
      await initMonacoEditor()
      els.loadingProgressBar.style.width = '20%'

      // 2. Load initial code
      setDefaultCode()

      // 3. Load from URL params or localStorage
      if (workId) {
        els.loadingText.textContent = '正在加载作品...'
        loadWorkFromBackend()
      } else if (preloadUrl) {
        loadFromPreloadUrl()
      } else if (codeParam) {
        loadFromUrlCode()
      } else {
        loadFromLocal()
      }

      // 4. Render file tree (if DOM exists)
      if (els.fileTree) {
        renderFileTree()
      }

      // 5. Init Pyodide
      await initPyodide()

      // 6. Bind events
      bindEvents()

      // 7. Start auto-save
      startAutoSave()

      // 7. Update UI
      updateStatusBar()
      setDirty(false)
      els.loadingOverlay.classList.remove('active')
      els.loadingProgressBar.style.width = '0%'

      console.log('Python IDE ready')
      appendOutput('Python IDE 就绪。Ctrl+Enter 运行代码，Ctrl+S 保存。', 'system')
    } catch (err) {
      console.error('IDE initialization failed:', err)
      els.loadingText.textContent = '初始化失败: ' + err.message
      els.loadingProgressBar.style.width = '0%'

      // Still allow editing even if Pyodide fails
      els.loadingOverlay.classList.remove('active')
      appendOutput('[错误] Python 环境初始化失败: ' + err.message, 'stderr')
      appendOutput('[提示] 编辑器仍可使用，但无法运行代码。请刷新页面重试。', 'system')
    }
  }

  // ── Start ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
