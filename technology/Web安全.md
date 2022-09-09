## Web安全

### 攻击
#### XSS
XSS是跨站脚本工具，攻击者通过一种方式将恶意脚本注入，例如，评论的输入框直接将用户输入的字符串转换成DOM。
特点：
1. 通常难以从UI上感知(暗地执行脚本)
2. 窃取用户信息(cookie/token)
3. 绘制UI (例如弹窗),诱骗用户点击/填写表单

XSS工具类别
1. 存储型XSS攻击
恶意脚本呗存在数据库中，危害最大，对全部用户都可见。
> Demo
```
<img src="https://github.com/favicon.ico" onload="alert('XSS')" alt="">
```
2. 反射型XSS攻击
```
host/path/>param=<script>alert('123')</script>
```
如果代码获取了地址的url并将其转换为DOM使用，那么如果我们注入恶意脚本则是反射性XSS攻击。
3. 

### 防御