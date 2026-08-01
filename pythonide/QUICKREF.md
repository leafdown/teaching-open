# Quick Reference Guide

## 🎯 快速参考

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Enter` / `Cmd+Enter` | 运行代码 |
| `Ctrl+S` / `Cmd+S` | 保存代码 |
| `Ctrl+Z` | 撤销 |
| `Ctrl+Shift+Z` | 重做 |
| `Ctrl+F` | 查找 |
| `Ctrl+H` | 查找替换 |
| `Ctrl+/` | 注释/取消注释 |
| `Ctrl+L` | 清空输出 |
| `Alt++` / `Alt+-` | 增大/减小字体 |

### 按钮说明

| 按钮 | 说明 |
|------|------|
| ▶ Run | 执行代码 |
| 🗑 Clear | 清空输出 |
| 🔗 Share | 分享代码 |
| ⋮ Menu | 更多选项 |

### 菜单选项

- **New**: 创建新文件
- **Download**: 下载为 .py 文件
- **Upload**: 上传本地 Python 文件
- **Format**: 格式化/验证代码

---

## 💡 常用代码示例

### 1. Hello World

```python
print("Hello, World!")
```

### 2. 计算

```python
# 算术运算
a, b = 10, 20
print(f"Sum: {a + b}")
print(f"Product: {a * b}")
print(f"Division: {a / b}")
print(f"Power: {a ** 2}")
```

### 3. 字符串操作

```python
# 字符串
text = "Python IDE"
print(text.lower())
print(text.upper())
print(f"Length: {len(text)}")
print(text.replace("Python", "Awesome"))
```

### 4. 列表操作

```python
# 列表
numbers = [1, 2, 3, 4, 5]
print(numbers)
numbers.append(6)
print(numbers)
print(f"Sum: {sum(numbers)}")
print(f"Max: {max(numbers)}")
print(f"Min: {min(numbers)}")
```

### 5. 字典操作

```python
# 字典
person = {
    "name": "Alice",
    "age": 30,
    "city": "Beijing"
}

for key, value in person.items():
    print(f"{key}: {value}")
```

### 6. 条件判断

```python
# If/Else
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")
```

### 7. 循环

```python
# For 循环
print("For loop:")
for i in range(5):
    print(f"i = {i}")

# While 循环
print("\nWhile loop:")
count = 0
while count < 3:
    print(f"count = {count}")
    count += 1
```

### 8. 函数

```python
# 定义函数
def greet(name="World"):
    return f"Hello, {name}!"

print(greet())
print(greet("Alice"))

# 递归函数
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(f"5! = {factorial(5)}")
```

### 9. 列表推导式

```python
# List Comprehension
squares = [x**2 for x in range(10)]
print(squares)

evens = [x for x in range(20) if x % 2 == 0]
print(evens)
```

### 10. 异常处理

```python
# Try/Except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Error: Cannot divide by zero!")
except Exception as e:
    print(f"Error: {e}")
else:
    print(f"Result: {result}")
finally:
    print("Done!")
```

### 11. 类和对象

```python
# 类定义
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"My name is {self.name}, I'm {self.age} years old"

person = Person("Bob", 25)
print(person.introduce())
```

### 12. Lambda 函数

```python
# Lambda 函数
add = lambda x, y: x + y
print(add(3, 5))

# 结合 map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)
```

### 13. 排序

```python
# 排序
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(sorted(numbers))
print(sorted(numbers, reverse=True))

students = [("Alice", 90), ("Bob", 85), ("Charlie", 95)]
print(sorted(students, key=lambda x: x[1]))
```

### 14. 文件操作（模拟）

```python
# 字符串操作模拟文件
text = """Line 1
Line 2
Line 3"""

lines = text.split('\n')
for i, line in enumerate(lines, 1):
    print(f"{i}: {line}")
```

### 15. 正则表达式

```python
import re

# 正则表达式
text = "Email: user@example.com"
pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"

if re.search(pattern, text):
    print("Valid email found!")
    matches = re.findall(pattern, text)
    print(matches)
```

---

## 🎓 学习路径

### 初级 (1-2 周)
- [ ] 基本语法和数据类型
- [ ] 条件和循环
- [ ] 函数定义
- [ ] 列表和字典

### 中级 (2-4 周)
- [ ] 文件 I/O
- [ ] 模块和包
- [ ] 类和对象
- [ ] 异常处理

### 高级 (1-2 月)
- [ ] 装饰器
- [ ] 生成器
- [ ] 上下文管理器
- [ ] 多线程和多进程

---

## 📚 学习资源

### 官方文档
- [Python 官方文档](https://docs.python.org/3/)
- [Python 教程](https://docs.python.org/3/tutorial/)

### 在线教程
- [Python.org Tutorial](https://www.python.org/about/gettingstarted/)
- [Real Python](https://realpython.com/)
- [Codecademy Python](https://www.codecademy.com/learn/learn-python-3)

### 交互式学习
- [LeetCode](https://leetcode.com/)
- [HackerRank](https://www.hackerrank.com/)
- [Codewars](https://www.codewars.com/)

---

## 🐛 常见错误

### 缩进错误 (IndentationError)
```python
# ❌ 错误
def hello():
print("Hello")  # 缺少缩进

# ✅ 正确
def hello():
    print("Hello")
```

### 名称错误 (NameError)
```python
# ❌ 错误
print(name)  # 变量未定义

# ✅ 正确
name = "Alice"
print(name)
```

### 类型错误 (TypeError)
```python
# ❌ 错误
result = "10" + 5  # 不能添加字符串和数字

# ✅ 正确
result = int("10") + 5
print(result)
```

### 键错误 (KeyError)
```python
# ❌ 错误
d = {"a": 1}
print(d["b"])  # 键不存在

# ✅ 正确
print(d.get("b", "Not found"))
```

### 索引错误 (IndexError)
```python
# ❌ 错误
lst = [1, 2, 3]
print(lst[10])  # 索引超出范围

# ✅ 正确
if len(lst) > 10:
    print(lst[10])
```

---

## 🔍 调试技巧

### 使用 print 调试
```python
def calculate(a, b):
    print(f"DEBUG: a={a}, b={b}")  # 调试输出
    result = a + b
    print(f"DEBUG: result={result}")  # 调试输出
    return result
```

### 检查类型
```python
x = "123"
print(type(x))  # <class 'str'>
print(type(int(x)))  # <class 'int'>
```

### 验证条件
```python
value = 42
assert value > 0, "Value must be positive"
assert value < 100, "Value must be less than 100"
print("All assertions passed!")
```

---

## 🚀 提交代码建议

1. **使用有意义的变量名**
   ```python
   # ❌ 避免
   x = 10
   y = 20
   
   # ✅ 推荐
   width = 10
   height = 20
   ```

2. **添加注释和文档字符串**
   ```python
   def add(a, b):
       """
       Add two numbers.
       
       Args:
           a: First number
           b: Second number
       
       Returns:
           Sum of a and b
       """
       return a + b
   ```

3. **遵循 PEP 8 风格指南**
   ```python
   # ✅ 正确
   def my_function(param1, param2):
       """Function description."""
       result = param1 + param2
       return result
   ```

---

**最后更新**: 2024
**参考**: Python 3.9+
