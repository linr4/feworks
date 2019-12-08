# Git learning notes

--- 20191208



## 常用命令



###### `git add ` 

​	添加文件和/或目录到 git 工作目录的暂存区中，使其纳入 git 管理；

```sh
$ git add .
warning: LF will be replaced by CRLF in index.js.
The file will have its original line endings in your working directory
```



###### `git status`

​	查看当前文件/目录的纳管情况

```sh
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   index.js
```



###### `git commit -m "massage"`

​	把暂存区中的文件提交到主分支中

```sh
$ git commit -m "index.js modified"
[master 79f16bf] index.js modified
 1 file changed, 4 insertions(+), 1 deletion(-)
```



###### `git diff`

​	查看文件具体修改的内容

```sh
$ git diff index.js
warning: LF will be replaced by CRLF in index.js.
The file will have its original line endings in your working directory
diff --git a/index.js b/index.js
index c0ac80c..95509fd 100644
--- a/index.js
+++ b/index.js
@@ -1 +1,4 @@
-window.onload = function () {}
+window.onload = function () {
+       console.log('Hello world');
+
+}
```



###### `git log`

​	查看文件/目录的变更记录

```sh
$ git log index.js
commit 79f16bfa330bf4915866273038b5d8a910a104fb (HEAD -> master)
Author: linr4 <linr4@outlook.com>
Date:   Sun Dec 8 13:40:15 2019 +0800

    index.js modified

commit d913631ba8f7e163bbed99de9d2c80fe6334e5e3
Author: linr4 <linr4@outlook.com>
Date:   Sun Dec 8 13:17:23 2019 +0800

    move index.js from stag to master
```



###### `git reflog`

​	查看变更记录，更简洁的方式

```sh
$ git reflog
79f16bf (HEAD -> master) HEAD@{0}: commit: index.js modified
d913631 HEAD@{1}: commit (initial): move index.js from stag to master
```



###### `git reset --hard HEAD^`

​	把文件恢复到上一次提交变更前

```sh
$ git reset --hard HEAD^
HEAD is now at d913631 move index.js from stag to master

$ git reflog
d913631 (HEAD -> master) HEAD@{0}: reset: moving to HEAD^
79f16bf HEAD@{1}: commit: index.js modified
d913631 (HEAD -> master) HEAD@{2}: commit (initial): move index.js from stag to master
```



###### `git reset --hard ref_id`

​	把文件恢复到指定的 commit

```sh
$ git reset --hard 79f16bf
HEAD is now at 79f16bf index.js modified

$ git reflog
79f16bf (HEAD -> master) HEAD@{0}: reset: moving to 79f16bf
d913631 HEAD@{1}: reset: moving to HEAD^
79f16bf (HEAD -> master) HEAD@{2}: commit: index.js modified
d913631 HEAD@{3}: commit (initial): move index.js from stag to master
```





## 单人开放的使用流程



###### 一、准备工作（只做一次）

创建工作区：

```sh
git init	# 初始化版本库
git config --user.name "your name"
git config --user.email "your email"
git config --list
```

###### 二、开发阶段（按需执行）

* 编写代码；

* `git add` 添加代码到暂存区；

* `git commit -m` 把暂存区中的文件添加到 HEAD 指针指向的分支中；

  注意点：

  * 完成一个功能后再 `add / commit`，而非写一句代码添加一次；
  * `commit -m` 的注释信息需准确填写；



###### 单人开放使用 git 管理项目的好处：

* 可通过 `git status` 查看文件是否纳管、修改了那些文件；
  * 红色：没有纳管，或已被修改；
  * 绿色：在暂存区；
* 可通过 `git diff` 查看具体修改了哪些代码；
* 可通过 `git log / git reflog` 查看项目演进记录；
* 可通过 `git reset --hard 版本号` 在任意版本间切换；
* 无需备份多份文件，每次 commit 之后 git 自动备份； 



###### Git 忽略提交规则

​	在工作区写创建 .gitignore 文件，文件中包含不需要提交的文件名：

```sh
$ cat .gitignore
node_modules
.gitignore
build
npm-debug.log
.DS_Store
tmp
.idea*
*.log
Thumbs.db
*.a
!lib.a		# 表示 lib.a 目录需要纳入提交范围
```

