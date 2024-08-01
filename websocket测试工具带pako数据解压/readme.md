npm install
node server.js

如果fs下证书失效，手动生成，步骤如下：
js目录下exe文件生成openssl
执行命令：
openssl req -nodes -new -x509 -keyout server.key -out server.crt -days 365
证书拷贝到fs目录下
输入地址点击连接
输入参数等待返回