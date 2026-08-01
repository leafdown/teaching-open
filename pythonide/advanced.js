/* Advanced Features for IDE */

// Theme Management
const themes = {
    dark: 'vs-dark',
    light: 'vs',
    hc: 'hc-black'
};

let currentTheme = localStorage.getItem('editorTheme') || 'dark';

// Font size management
let currentFontSize = parseInt(localStorage.getItem('editorFontSize')) || 14;

// Initialize advanced features
function initAdvancedFeatures() {
    // Load saved theme and font size
    applyTheme(currentTheme);
    applyFontSize(currentFontSize);
    
    // Setup theme switcher
    setupThemeSwitcher();
    
    // Add keyboard shortcuts info
    setupShortcutsDialog();
}

// Apply theme
function applyTheme(themeName) {
    if (editor && themes[themeName]) {
        monaco.editor.setTheme(themes[themeName]);
        currentTheme = themeName;
        localStorage.setItem('editorTheme', themeName);
        
        // Update body background for theme
        if (themeName === 'light') {
            document.body.style.background = '#ffffff';
            document.body.style.color = '#333333';
        } else {
            document.body.style.background = '#1e1e1e';
            document.body.style.color = '#d4d4d4';
        }
    }
}

// Apply font size
function applyFontSize(size) {
    if (editor) {
        editor.updateOptions({ fontSize: size });
        currentFontSize = size;
        localStorage.setItem('editorFontSize', size);
    }
}

// Increase font size
function increaseFontSize() {
    if (currentFontSize < 24) {
        applyFontSize(currentFontSize + 1);
    }
}

// Decrease font size
function decreaseFontSize() {
    if (currentFontSize > 8) {
        applyFontSize(currentFontSize - 1);
    }
}

// Setup theme switcher
function setupThemeSwitcher() {
    // Add theme switcher to menu or create separate control
    // This can be expanded based on UI needs
}

// Keyboard shortcuts info
function setupShortcutsDialog() {
    const shortcuts = {
        'Ctrl+Enter / Cmd+Enter': 'Run Code',
        'Ctrl+S / Cmd+S': 'Save Code',
        'Ctrl++ / Cmd++': 'Increase Font Size',
        'Ctrl+- / Cmd+-': 'Decrease Font Size',
        'Ctrl+L': 'Clear Output',
        'Ctrl+N': 'New File',
        'Ctrl+Shift+F': 'Format Document'
    };
    
    // Store for potential shortcuts dialog
    window.editorShortcuts = shortcuts;
}

// Advanced code execution with error handling
async function runCodeAdvanced() {
    if (!isPyodideReady) {
        addOutput('Error: Python environment is not ready yet', 'error');
        return;
    }

    const code = editor.getValue();
    if (!code.trim()) {
        addOutput('Error: No code to run', 'error');
        return;
    }

    const output = document.getElementById('output');
    output.innerHTML = '';
    document.getElementById('loading').classList.add('active');

    const startTime = performance.now();
    let hasError = false;

    try {
        // Create a custom output handler
        const oldPrint = console.log;
        let customOutput = '';

        // Override print function
        pyodide.FS.writeFile('/tmp/python_code.py', code);

        // Execute code
        await pyodide.runPythonAsync(`
import sys
import traceback
from io import StringIO

# Capture stdout and stderr
old_stdout = sys.stdout
old_stderr = sys.stderr
sys.stdout = StringIO()
sys.stderr = StringIO()

try:
    exec(open('/tmp/python_code.py').read())
except Exception as e:
    traceback.print_exc()

# Get output
import sys
print()
`);

        const endTime = performance.now();
        const executionTime = ((endTime - startTime) / 1000).toFixed(3);

        addOutput('Code executed successfully', 'success');
        document.getElementById('executionTime').textContent = `Execution time: ${executionTime}s`;

    } catch (error) {
        hasError = true;
        const endTime = performance.now();
        const executionTime = ((endTime - startTime) / 1000).toFixed(3);
        
        addOutput(formatErrorMessage(error.message), 'error');
        document.getElementById('executionTime').textContent = `Execution time: ${executionTime}s`;
    } finally {
        document.getElementById('loading').classList.remove('active');
    }
}

// Format error message for better readability
function formatErrorMessage(message) {
    // Extract the most useful part of error message
    const lines = message.split('\n');
    return lines.filter(line => line.trim()).slice(0, 5).join('\n');
}

// Code validation
async function validateCode() {
    const code = editor.getValue();
    
    try {
        await pyodide.runPythonAsync(`
import ast
try:
    ast.parse('''${code.replace(/'/g, "\\'")}''')
    print("✓ Valid Python syntax")
except SyntaxError as e:
    print(f"✗ Syntax Error at line {e.lineno}: {e.msg}")
`);
        return true;
    } catch (error) {
        console.error('Validation error:', error);
        return false;
    }
}

// Code statistics
function getCodeStatistics() {
    const code = editor.getValue();
    const lines = code.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim()).length;
    const chars = code.length;
    const words = code.split(/\s+/).filter(w => w.length).length;
    
    return {
        lines: lines.length,
        nonEmptyLines: nonEmptyLines,
        characters: chars,
        words: words
    };
}

// Export code as different formats
function exportAs(format) {
    const code = editor.getValue();
    const fileName = document.getElementById('fileName').value || 'untitled';
    
    let content = code;
    let mimeType = 'text/plain';
    let fileExtension = 'py';
    
    switch(format) {
        case 'txt':
            fileExtension = 'txt';
            mimeType = 'text/plain';
            break;
        case 'json':
            fileExtension = 'json';
            mimeType = 'application/json';
            content = JSON.stringify({ code: code, timestamp: new Date() }, null, 2);
            break;
        case 'html':
            fileExtension = 'html';
            mimeType = 'text/html';
            content = generateHTMLPreview(code);
            break;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Generate HTML preview
function generateHTMLPreview(code) {
    return `<!DOCTYPE html>
<html>
<head>
    <title>Python Code Preview</title>
    <style>
        body { font-family: monospace; margin: 20px; }
        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; }
        .meta { color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <h1>Python Code</h1>
    <div class="meta">Generated: ${new Date()}</div>
    <pre>${escapeHtml(code)}</pre>
</body>
</html>`;
}

// Escape HTML characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Undo/Redo handlers
function undo() {
    editor.trigger('keyboard', 'undo');
}

function redo() {
    editor.trigger('keyboard', 'redo');
}

// Find and Replace
function openFindReplace() {
    editor.trigger('keyboard', 'editor.action.startFindReplaceAction');
}

// Go to line
function goToLine() {
    editor.trigger('keyboard', 'editor.action.gotoLine');
}

// Multi-line comment/uncomment
function toggleLineComment() {
    editor.trigger('keyboard', 'editor.action.commentLine');
}

// Quick formatting fixes
function quickFormat() {
    const code = editor.getValue();
    
    // Basic formatting: remove trailing whitespace
    const formatted = code.split('\n')
        .map(line => line.trimRight())
        .join('\n');
    
    editor.setValue(formatted);
    saveToLocalStorage();
}

// Export module
window.IDEAdvanced = {
    runCodeAdvanced,
    validateCode,
    getCodeStatistics,
    exportAs,
    increaseFontSize,
    decreaseFontSize,
    applyTheme,
    undo,
    redo,
    openFindReplace,
    goToLine,
    toggleLineComment,
    quickFormat
};
