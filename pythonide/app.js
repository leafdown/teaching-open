// Online Python IDE - Main Application Logic
// 在线 Python IDE - 主应用逻辑

let editor;
let pyodide;
let isPyodideReady = false;

// 等待 Pyodide 加载
async function waitForPyodide() {
    let attempts = 0;
    const maxAttempts = 100;
    
    console.log('⏳ 等待 Pyodide 加载...');
    
    while (!window.loadPyodide && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    
    if (!window.loadPyodide) {
        throw new Error('Pyodide 加载失败 - 请检查网络连接');
    }
    
    return window.loadPyodide;
}

// 初始化 Pyodide - 支持多个 CDN 源
async function initPyodide() {
    const cdnUrls = [
        'https://cdn.jsdelivr.net/npm/pyodide@0.29.0/pyodide.min.js',
    ];
    
    let lastError = null;
    
    for (const cdnUrl of cdnUrls) {
        try {
            console.log(`📍 尝试使用 CDN: ${cdnUrl}`);
            const loadPyodideFn = await waitForPyodide();
            
            if (!loadPyodideFn) {
                throw new Error('loadPyodide 未定义');
            }
            
            pyodide = await loadPyodideFn({
                indexURL: cdnUrl
            });
            
            isPyodideReady = true;
            console.log('✅ Python 环境加载成功');
            addOutput('✅ Python 环境准备就绪', 'info');
            return;
            
        } catch (error) {
            console.warn(`⚠️  CDN 失败 ${cdnUrl}:`, error.message);
            lastError = error;
            // 继续尝试下一个 CDN
            continue;
        }
    }
    
    // 所有 CDN 都失败了
    console.error('❌ 所有 CDN 都失败:', lastError);
    const errorMsg = lastError && lastError.message ? lastError.message : 'Pyodide 加载失败';
    addOutput(`❌ 错误: ${errorMsg}`, 'error');
    throw lastError || new Error('无法从任何 CDN 加载 Pyodide');
}

// 获取代码内容
function getCode() {
    if (!editor) return '';
    return editor.getValue();
}

// 执行代码
async function runCode() {
    const code = getCode();
    
    if (!code.trim()) {
        addOutput('⚠️ 请输入 Python 代码', 'warning');
        return;
    }
    
    if (!isPyodideReady) {
        addOutput('❌ Python 环境未就绪，请稍候...', 'error');
        return;
    }
    
    const startTime = performance.now();
    
    try {
        addOutput('\n▶️ 执行代码...', 'info');
        
        // 捕获输出
        const output = await pyodide.runPythonAsync(code);
        
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(3);
        
        addOutput(`✅ 执行完成 (${duration}s)`, 'success');
        
    } catch (error) {
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(3);
        
        addOutput(`❌ 错误 (${duration}s): ${error.message}`, 'error');
        console.error('执行错误:', error);
    }
}

// 清空输出
function clearOutput() {
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = '';
        addOutput('🗑️ 输出已清空', 'info');
    }
}

// 添加输出
function addOutput(text, type = 'log') {
    const output = document.getElementById('output');
    if (!output) {
        console.log('[' + type + ']', text);
        return;
    }
    
    const line = document.createElement('div');
    line.className = 'output-line output-' + type;
    line.textContent = text;
    
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

// 更新状态栏
function updateStatus() {
    if (!editor) return;
    
    const position = editor.getPosition();
    const content = editor.getValue();
    const lines = content.split('\n').length;
    const chars = content.length;
    
    const status = document.getElementById('status');
    if (status) {
        status.textContent = `行: ${position.lineNumber} | 列: ${position.column} | 字符: ${chars} | 行数: ${lines}`;
    }
}

// 保存到本地存储
function saveToLocalStorage() {
    if (!editor) return;
    
    const code = editor.getValue();
    localStorage.setItem('pythonCode', code);
}

// 从本地存储加载
function loadFromLocalStorage() {
    const code = localStorage.getItem('pythonCode');
    if (code && editor) {
        editor.setValue(code);
    }
}

// 导出代码
function exportCode() {
    const code = getCode();
    if (!code.trim()) {
        alert('没有代码可导出');
        return;
    }
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.py';
    a.click();
    URL.revokeObjectURL(url);
    
    addOutput('💾 代码已导出', 'success');
}

// 分享代码
function shareCode() {
    const code = getCode();
    if (!code.trim()) {
        alert('没有代码可分享');
        return;
    }
    
    const encoded = btoa(code);
    const shareUrl = window.location.origin + window.location.pathname + '?code=' + encoded;
    
    const modal = document.getElementById('shareModal');
    if (modal) {
        document.getElementById('shareUrl').value = shareUrl;
        modal.style.display = 'block';
    }
}

// 复制到剪贴板
function copyToClipboard() {
    const shareUrl = document.getElementById('shareUrl');
    if (shareUrl) {
        shareUrl.select();
        document.execCommand('copy');
        addOutput('📋 链接已复制到剪贴板', 'success');
    }
}

// 关闭 Modal
function closeModal() {
    const modal = document.getElementById('shareModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 从 URL 加载代码
function loadCodeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
        try {
            const decoded = atob(code);
            if (editor) {
                editor.setValue(decoded);
                addOutput('📥 从 URL 加载代码', 'info');
            }
        } catch (error) {
            console.error('URL 解码失败:', error);
        }
    }
}

// 设置事件监听器
function setupEventListeners() {
    // Run 按钮
    const runBtn = document.getElementById('runBtn');
    if (runBtn) {
        runBtn.addEventListener('click', runCode);
    }
    
    // Clear 按钮
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearOutput);
    }
    
    // Export 按钮
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportCode);
    }
    
    // Share 按钮
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareCode);
    }
    
    // Copy 按钮
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    }
    
    // Close 按钮
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // 编辑器事件
    if (editor) {
        editor.onDidChangeCursorPosition(updateStatus);
        editor.onDidChangeModelContent(updateStatus);
        editor.onDidChangeModelContent(saveToLocalStorage);
    }
    
    // Window 点击事件关闭 Modal
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('shareModal');
        if (modal && event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Ctrl+Enter 执行代码
    document.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            runCode();
        }
    });
}

// 初始化 Monaco Editor
function initMonacoEditor() {
    return new Promise((resolve, reject) => {
        require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });
        
        require(['vs/editor/editor.main'], function() {
            try {
                editor = monaco.editor.create(document.getElementById('editor'), {
                    value: '',
                    language: 'python',
                    theme: 'vs-dark',
                    automaticLayout: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                });
                
                console.log('✅ Monaco Editor 初始化成功');
                resolve();
            } catch (error) {
                console.error('❌ Monaco Editor 初始化失败:', error);
                reject(error);
            }
        });
    });
}

// 主初始化函数
async function init() {
    try {
        console.log('🚀 应用启动...');
        
        // 检查必要的 DOM 元素
        if (!document.getElementById('editor')) {
            throw new Error('编辑器容器 (#editor) 不存在');
        }
        
        if (!document.getElementById('output')) {
            throw new Error('输出容器 (#output) 不存在');
        }
        
        // 初始化 Monaco Editor
        await initMonacoEditor();
        
        // 初始化 Pyodide
        await initPyodide();
        
        // 设置事件监听器
        setupEventListeners();
        
        // 从 URL 加载代码
        loadCodeFromUrl();
        
        // 从本地存储加载代码
        loadFromLocalStorage();
        
        // 更新状态栏
        updateStatus();
        
        console.log('✅ 应用初始化完成');
        addOutput('✅ 欢迎使用 Online Python IDE!', 'success');
        addOutput('💡 提示: Ctrl+Enter 快速执行代码', 'info');
        
    } catch (error) {
        console.error('❌ 应用初始化失败:', error);
        addOutput(`❌ 初始化失败: ${error.message}`, 'error');
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
