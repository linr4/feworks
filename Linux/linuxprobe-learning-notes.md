> 只记录我认为自己需要记录和复习的内容



### Chapter 1 - Install RHEL 7, and intro to RPM, Yum & systemd



###### 1.4 重置 RHEL 7 的 root 密码

* 确定是否为 RHEL 7

  ```sh
  cat /etc/rehat-release
  Red Hat Enterprise Linux Server release 7.0 (Maipo)
  ```

* 重启 Linux，在引导界面 (grub) 按 `e` 进入编辑界面；

* 在中间 `linux16` 开头的这一行的末尾加上 `rd.break` 参数；

* 按 `ctrl + X` 运行修改过的内核程序；

* 约 30 秒后进入 emergency mode，依次运行如下命令：

  ```sh
  mount -o remount,rw /sysroot
  chroot /sysroot
  passwd	# enter new passwd twice
  touch /.autorelabel
  exit
  reboot
  ```

* 重启完毕即可使用新密码登录系统。



###### 1.5 RPM 常用命令

`Redhat Package Manager`，建立软件信息数据库，记录文件信息和依赖关系，方便安装、升级、卸载等操作；

```sh
rpm -ivh filename.rpm	# 安装软件
rpm -Uvh filename.rpm	# 升级软件
rpm -e   filename.rpm	# 卸载软件
rpm -qpi filename.rpm	# 查询软件包信息
rpm -qpl filename.rpm	# 列出软件包所含的文件
rpm -qf  filename		# 查询文件属于哪个RPM
```



###### 1.6 Yum 常用命令

`Yellowdog Updater, Modified`，自动管理多个软件之间的依赖关系，降低维护难度；

```sh
yum repolist all	# 列出所有仓库
yum list all		# 列出仓库中所有软件包
yum info pkgname	# 查看软件包信息
yum install pkgname	# 安装软件包
yum reinstall pkgnm	# 重装软件包
yum update pkgname	# 升级软件包
yum remove pkgname	# 删除软件包
yum clean all		# 清除所有仓库缓存
yum check-update	# 检查可更新的软件包
yum grouplist		# 查看已安装的软件包组
yum groupinstall pkggroup	# 安装软件包组
yum groupremove	pkggroup	# 删除软件包组
yum groupinfo	pkggroup	# 查看软件包组的信息
```

* RPM 用于管理软件内部多个文件之间的依赖关系，而 YUM 用于处理多个软件之间的依赖关系。



###### 1.7 systemd 初始化进程

* 系统启动流程：BIOS > Boot Loader > kernel > systemd；

* systemd 替换了旧系统中的 System V init；

* systemd 主要作用：挂载文件系统、交换分区，启动各类进程；

* systemd 以 target 替代 System V init 中的 runlevel 概念，对应关系：

  | System V run level | systemd target                      | 作用                     |
  | ------------------ | ----------------------------------- | ------------------------ |
  | 0                  | runlevel0.target, poweroff.target   | 关机                     |
  | 1                  | runlevel1.target, rescue.target     | 单用户模式               |
  | 2                  | runlevel2.target, multi-user.target | 多用户文本界面，等同于 3 |
  | 3                  | runlevel3.target, multi-user.target | 多用户文本界面           |
  | 4                  | runlevel4.target, multi-user.target | 多用户文本界面，等同于 3 |
  | 5                  | runlevel5.target, graphical.target  | 多用户图形界面           |
  | 6                  | runlevel6.target, reboot.target     | 重启                     |
  | emergency          | emergency.target                    | 紧急 shell               |

  

* 将系统默认运行目标修改为  “ 多用户文本界面 ”  的方法：

  ```sh
  ln -sf /lib/systemd/system/multi-usesr.target /etc/systemd/system/default.target
  ```



* RHEL 7 中将 System V 中管理系统服务的命令 `chkconfig`, `service` 变更为 `systemctl` 命令来统一管理：

| RHEL 6 管理服务的命令 | RHEL 7 systemctl 命令                    | 作用                           |
| --------------------- | ---------------------------------------- | ------------------------------ |
| chkconfig foo on      | systemctl enable foo.service             | 使该服务在开机时自动启动       |
| chkconfig foo off     | systemctl disable foo.service            | 禁用该服务在开机时自动启动     |
| chkconfig foo         | systemctl is-enabled foo.service         | 查看该服务是否为开机自动启动   |
| chkconfig --list      | systemctl list-unit-files --type=service | 查看各级别下服务启动与禁用情况 |
| service foo start     | systemctl start foo.service              | 启动服务                       |
| service foo restart   | systemctl restart foo.service            | 重启服务                       |
| service foo stop      | systemctl stop foo.service               | 停止服务                       |
| service foo reload    | systemctl reload foo.service             | 重新加载配置文件（不终止服务） |
| service foo status    | systemctl status foo.service             | 查看服务状态                   |

* systemctl 命令在引用服务名称 foo.service 时，其中的 .service 后缀可以省略；



### Chapter 2 - Basic Linux Commands



###### 2.2 命令帮助 `man`

* Linux 命令格式：`cmd [options] [命令对象]`
* `man` 界面中的快捷键：
  * `/` 向下搜索关键字，如 `/linux`
  * `?` 向上搜索关键字，如 `?keyword`
  * `n` 定位到下一个搜索到的关键字
  * `N` 定位到上一个搜索到的关键字



###### 2.3 常用系统工作命令

* `echo [字符串|$变量]`

* `date [选项][+格式]`

  | 格式字符串 | 作用          |
  | ---------- | ------------- |
  | `%t`       | [TAB] 键      |
  | `%H`       | 小时（00~23） |
  | `%I`       | 小时（00~12） |
  | `%M`       | 分钟（00~59） |
  | `%S`       | 秒钟（00~59） |
  | `%j`       | 本年的第几天  |

  ```sh
  # date "+%m/%d/%Y %H:%M:%S"	  # 按指定格式显示日期时间
  10/06/2019 21:24:07
  
  # date -s "20191001 20:30:00"	  # 设置系统时钟为指定时间点
  
  # date +%j					  # 显示当前日期是本年度的第几天
  279
  ```

* `wget [选项] 下载地址`

  | 命令选项 | 作用                                 |
  | -------- | ------------------------------------ |
  | `-b`     | 后台下载模式                         |
  | `-P`     | 下载到指定目录                       |
  | `-t`     | 最大尝试次数                         |
  | `-c`     | 断点续传                             |
  | `-p`     | 下载页面内所有资源，包括图片、视频等 |
  | `-r`     | 递归下载                             |

  * `wget http://www.linuxprobe.com/docs/LinuxProbe.pdf`
  * `wget -r -p http://www.linuxprobe.com` 递归下载该网站所有内容，保存在与域名同名的目录中；

* `ps [选项]` 查看系统进程状态

  | 命令选项 | 作用                               |
  | -------- | ---------------------------------- |
  | `-a`     | 显示所有进程（包括其他用户的进程） |
  | `-u`     | 显示用户以及其它详细信息           |
  | `-x`     | 显示没有控制终端的进程             |

  * 进程的 5 中状态（显示在 `ps -aux` 输出结果的第 8 列 `stat` 下：
    * R (Running)：进程正在运行，或在运行队列中等待；
    * S (Suspended)：进程休眠中，等待某个条件形成或接收到信号时脱离该状态；
    * D (不可中断)：进程不响应系统异步信号，即：使用 `kill` 命令也无法终止；
    * Z (Zombie)：进程已终止、但进程描述符仍在，直至父进程调用 `wait4()` 将进程释放；
    * T (Terminated)：进程收到停止信号后停止运行。
  * 短格式的命令选项可以合并，如：`ps -a -u -x` 可合并为 `ps -aux`，一部分命令亦可省略 `-` 号，如 `ps -aux` 可简写为 `ps aux`；

* `top` 
  * 第 1 行：系统时间、运行时间、登录终端数、系统负载（分别为 1 分钟、 5 分钟、 15 分钟平均值）；
  * 第 2 行：进程总数、运行中的进程数、睡眠中的进程数、停止的进程数、僵死的进程数；
  * 第 3 行：用户占用资源百分比、内核占用资源百分比、改变过优先级的进程资源百分比、空闲资源百分比等。 
  * 第 4 行：物理内存总量、内存使用量、内存空闲量、作为内核缓存的内存量；
  * 第 5 行：虚拟内存总量、虚拟内存使用量、虚拟内存空闲量、已被提前加载的内存量。 

* `pidof [options][daemon name]` 查询指定进程的进程号 (PID)

  ```sh
  pidof sshd
  42738 42724 1717
  ```

* `kill [options][pid]`

* `killall [options][daemon name]` 终止指定服务名称的所有进程；



###### 2.4 系统状态检查命令

* `ifconfig`
* `uname -a`
* `uptime`
* `free -h`
* `who`
* `last`  查看用户登录记录
* `history`
  * `history -c` ：清空命令历史记录；
  * 默认保存 1000 条，可通过 `/etc/profile` 中的 `HISTSIZE` 修改默认值；
  * `!number` ：运行 `history` 输出中指定编号的命令；
  * 命令历史记录保存在 `~/.bash_history` 中；

* `sosreport`：收集系统配置和架构信息，用于诊断；



###### 2.5 工作目录切换命令

* `cd -` 回到上一次目录

* `cd ~` 回到用户 `home` 目录

* `ls`

  * `ls -a` 查看所有（包括隐藏）文件

  * `ls -d /etc` 查看目录属性

    ```sh
    # ls -ld /etc
    drwxr-xr-x. 132 root root 8192 Oct  6 21:39 /etc
    
    # ls -l /etc
    total 1396
    drwxr-xr-x.  3 root root       97 Oct  6 04:51 abrt
    -rw-r--r--.  1 root root       16 Oct  6 04:58 adjtime
    ...
    ```

    

###### 2.6 文本文件查看/编辑命令

* `cat -n file` ：查看文件，带行号；适用于小文件

* `more file`：适用于稍大的文件分页显示

* `head -n 20 file`：显示文件前 20 行；`head -20 file` 同样效果

* `tail -n 20 file`：显示文件最后 20 行；`tail -20 file` 同样效果

* `tail -f /var/log/messages`

* `tr [原始字符][目标字符]` ：用于替换文本文件中的内容

  ```sh
  cat anaconda-ks.cfg | tr [a-z] [A-Z]
  ```

* `wc -l -w -c file.txt` ：显示行数、单词数、字符数

* `stat filename` ：显示文件的存储信息 (size, device, 访问权限 Access、安全权限 Context) 和时间信息

  * Access 文件读取时间，atime
  * Modify 文件内容修改时间，mtime
  * Change 文件权限或属性修改时间，ctime
  * Birth ?

  

* `cut -d: -f1 /etc/passwd` ：按列提取文本，`-d:` 以冒号为分隔符，`-f1` 查看第 1 列：

  ```sh
  # cut -d: -f1 /etc/passwd
  root
  bin
  daemon
  adm
  lp
  ...
  
  # cut -d: -f6 /etc/passwd
  /root
  /bin
  /sbin
  /var/adm
  /var/spool/lpd
  ...
  ```

* `diff`

  * `diff --brief file1 file2` 判断两个文件是否相同
  * `diff -c file1 file2` 比较和显示具体不同之处



###### 2.7 文件目录管理命令

* `touch [options][file]`：创建空白文件，或设置文件时间

  ```sh
  touch -a "2019-10-06 20:30:10" file.txt		# 修改 atime 文件读取时间
  touch -m "2019-10-06 20:30:10" file.txt		# 修改 mtime 文件内容修改时间
  touch -d "2019-10-06 20:30:10" file.txt		# 同时修改 atime 和 mtime
  ```

* `cp [options] file.src file.dst`

  ```sh
  cp -p		# 保留源文件属性
  cp -d		# 若文件为链接文件，则保留链接文件属性
  cp -r		# 递归复制（目录）
  cp -i		# 询问是否覆盖目标文件
  cp -a		# 相当于 -pdr / -p -d -r
  ```

* `dd [options]` ：按指定大小和个数的数据块来复制或转换文件

  ```sh
  dd if=/dev/zero of=file560.tmp count=1 bs=560M
  dd if=/dev/cdrom of=RHEL7.iso	# 将光盘转换为 ISO 文件
  ```

* `file anaconda-ks.cfg` 查看文件类型

  ```sh
  # file /etc/passwd
  /etc/passwd: ASCII text
  
  # file /bin/ls
  /bin/ls: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked
  
  # file /dev/sda
  /dev/sda: block special
  ```




###### 2.8 打包压缩与搜索相关命令

* `tar`

  |      | 作用                         |
  | ---- | ---------------------------- |
  | `-c` | create，创建压缩文件         |
  | `-x` | extract，解开压缩文件        |
  | `-t` | 查看（不解压）               |
  | `-z` | 使用 gzip 格式压缩或解压     |
  | `-j` | 使用 bzip2 格式压缩或解压    |
  | `-v` | verbose，显示压缩或解压过程  |
  | `-f` | 目标文件名，该选项需放到最后 |
  | `-p` | 保留原始的权限和属性         |
  | `-P` | 使用绝对路径来压缩           |
  | -C   | 解压到指定路径               |

  ```sh
  tar -czvf etc.tar.gz /etc
  mkdir /root/etc
  tar -xzvf etc.targ.gz -C /root/etc
  ```

  

* `grep`  文本搜索匹配工具

  ```sh
  grep -b root /etc/binfine	# 把二进制文件档文本来搜索
  grep -c root /etc/passwd	# 仅显示找到的行数（有多少行）
  grep -n root /etc/passwd	# -n 显示行号
  grep -v nologin /etc/passwd	# -v 反选，结果不包括指定的关键字
  ```



* `find [path] condition operation`

| condition             | purpose                                                 |
| --------------------- | ------------------------------------------------------- |
| `-name`               | 匹配名称                                                |
| `-perm`               | 匹配权限（`mode` 完全匹配，`-mode` 包含即可）           |
| `-user`               | 匹配所有者                                              |
| `-group`              | 匹配所属组                                              |
| `-mtime -n / +n`      | 匹配内容修改时间（`-n` 指 n 天以内，`+n` 指 n 天以前）  |
| `-atime -n / +n`      | 匹配内容访问时间                                        |
| `-ctime -n / +n`      | 匹配权限或属性修改时间                                  |
| `-nouser`             | 匹配非该所有者                                          |
| `-group`              | 匹配非该所属组                                          |
| `-newer f1 !f2`       | 匹配比文件 f1 新、比 f2 旧的文件                        |
| `--type /b/d/c/p/l/f` | 匹配文件类型（block, dir, char, pipe, link, text file） |
| `-size +50KB / -50KB` | 匹配文件大小（`+50KB` 查找超过50KB的文件）              |
| `-prune`              | 忽略某个目录                                            |
| `-exec ... {}\;`      | 进一步处理搜索结果                                      |

```sh
# find / -perm -4000 -print		# 查找包括了 SUID 权限的所有文件，没有 -prune 时，-print 可省略
# find /etc -name "host*"		# 查找 /etc 目录下（包括子目录）以 host 开头的文件

# find / -user rlin -exec cp -a {} /tmp/found/ \;
	# 查找 owner 为 rlin 的所有文件，拷贝到 /tmp/found 目录
	# {} 表示 find 找到的每个文件；
	# -exec 必须以 \; 作为结尾；
```



### Chapter 3 - pipe, redirection and env variables

###### 3.1 输入输出重定向

* 重定向类型

  * 标准输入重定向（stdin，文件描述符 0）：默认从键盘输入，亦可从其它文件或命令输入；
  * 标准输出重定向（stdout，文件描述符 1）：默认输出到屏幕；
  * 错误输出重定向（stderr，文件描述符 2）：默认输出到屏幕；

* 输入重定向中的符号和作用

  | 符号                   | 作用                                                    |
  | ---------------------- | ------------------------------------------------------- |
  | `命令 < 文件`          | 将文件内容作为命令的标准输入                            |
  | `命令 << 分界符`       | 从标准输入中读入内容，直至遇见分界符为止                |
  | `命令 < 文件1 > 文件2` | 将文件1作为命令的`标准输入`，并将`标准输出` 输出到文件2 |

* 输出重定向中的符号和作用

  | 符号                                 | 作用                                                   |
  | ------------------------------------ | ------------------------------------------------------ |
  | `cmd > file`                         | 将 `标准输出` 重定向到文件中（清空文件原有内容）       |
  | `cmd 2> file`                        | 将 `错误输出` 重定向到文件中（清空文件原有内容）       |
  | `cmd >> file`                        | 将 `标准输出` 重定向到文件中（追加到文件原有内容之后） |
  | `cmd 2>> file`                       | 将 `错误输出` 重定向到文件中（追加到文件原有内容之后） |
  | `cmd >> file 2>&1` 或 `cmd &>> file` | 将 `标准输出` 与 `错误输出` 都追加到文件中             |

  * 标准输出重定向的文件描述符可以省略，如 `cmd > file` 实际上是 `cmd 1> file`；
  * 错误输出重定向的文件描述符不可省略，即：`cmd 2> file` 中的 2 不可省略；

  ```sh
  man ls > ls_help.txt
  echo "Hello, world" > hello.txt
  echo "Hello, Ray" >> hello.txt
  ls -l file_exist > stdout.txt
  ls -l file_noexist 2> stderr.txt
  
  ls -l file_exist 2> stderr.txt	# 命令成功，虽重定向至错误输出，但仍会输出到标准输出设备——屏幕
  
  wc -l < readme.txt
  ```

  

###### 3.2 管道命令符 `|`

* 修改用户密码需两次确认，通过管道符实现只需一条命令：

  ```sh
  echo "new_password" | passwd --stdin user1
    Changing password for user user1.
    passwd: all authentication tokens updated successfully.
  ```

* 一条命令打包邮件标题与内容并发送：

  ```sh
  echo "mail content" | mail -s "mail subject" mail_recipient
  ```

* 可以连续输入邮件正文的命令组合：

  ```shell
  mail -s "mail subject" rlin@mail.com << over
  > mail content line 1
  > mail content line 2
  > mail content line 3
  > ...
  > over	# 在输入 over 分界符之前不会结束，可以一直输入邮件正文
  ```

  

###### 3.4 转义字符

* `\` ：使得反斜线后的变量变为单纯的字符串

* `''`：单引号使得其中的变量变为单纯的字符串

* `""`：双引号保留其中的变量属性、不进行转义

* `` ` ` ``：反引号使得其中的命令执行并返回结果

  ```sh
  [root@station /]# PRICE=5
  [root@station /]# echo "Price is $PRICE"	# 双引号会保留变量属性
  Price is 5
  [root@station /]# echo "Price is $$PRICE"	# 双美元号$$表示当前程序的进程号PID
  Price is 51680PRICE
  [root@station /]# echo "Price is \$$PRICE"	# \$ 转义美元号为纯字符、而非变量标识符
  Price is $5
  [root@station /]# echo 'Price is \$$PRICE'	# 单引号会把转义字符和变量都当做纯字符
  Price is \$$PRICE
  
  [root@station /]# echo "uname -a"
  uname -a
  [root@station /]# echo `uname -a`			# 双反引号会执行引号中的命令，并返回结果
  Linux station.domain1.example.com 3.10.0-123.el7.x86_64 #1 SMP Mon May 5 11:16:57 EDT 2014 x86_64 x86_64 x86_64 GNU/Linux
  ```

  

###### 3.5 环境变量

* Linux 执行一个命令的过程：

  1. 判断用户是否输入路径（绝对或相对），有则直接执行；

  2. 用户输入的是否为 “别名命令”，即使用 `alias 别名=命令` 创建的命令（如：`alias rm='rm -i'` ，取消为 `unalias 别名`），是则执行；
  3. 由 bash 判断是内部or外部命令，可用 `type 命令` 查看命令类型，内部命令则直接执行，外部看第4步；
  4. 系统在 PATH 变量的路径中查找外部命令文件，找到就执行；

* 关于 PATH 的补充：

  * 添加新路径到 PATH 的方法：

    ```sh
    PATH=$PATH:/root/bin
    ```

  * 为何不能将当前目录 (`./`) 添加到 PATH 中？

    * 若黑客在常用目录如 /tmp 中存放与 ls 或 cd 同名的文件，若 `./` 添加到 PATH，该文件会被执行；

* 常用系统环境变量：

  | 变量名称     | 作用                         |
  | ------------ | ---------------------------- |
  | HOME         | 用户的主目录                 |
  | SHELL        | 用户在用的 Shell 解释器名称  |
  | HISTSIZE     | 输出的历史命令记录条数       |
  | HISTFILESIZE | 保存的历史命令记录条数       |
  | MAIL         | 邮件保存路径                 |
  | LANG         | 系统语言、语系名称           |
  | RANDOM       | 生成一个随机数字             |
  | PS1          | 解释器的提示符               |
  | PATH         | 解释器搜索用户执行命令的路径 |
  | EDITOR       | 用户默认的文本编辑器         |

* 变量在定义时，默认只在当前用户的 session 中生效；若要使其全局可用，需用 `export` 提升为全局变量：

  ```sh
  [linr4@station ~]$ echo $WORKDIR
  
  [linr4@station ~]$ mkdir workdir
  [linr4@station ~]$ WORKDIR=~/workdir
  [linr4@station ~]$ echo $WORKDIR
  /home/linr4/workdir
  [linr4@station ~]$ su
  Password:
  [root@station linr4]# echo $WORKDIR
  
  [root@station linr4]# exit
  exit
  [linr4@station ~]$ export WORKDIR
  [linr4@station ~]$ su
  Password:
  [root@station linr4]# echo $WORKDIR
  /home/linr4/workdir
  ```

  

### Chapter 4 - Vim and Shell

* vim 命令模式常用命令

  | 命令 | 作用                                                 |
  | ---- | ---------------------------------------------------- |
  | dd   | 删除（剪切）光标所在整行                             |
  | 5dd  | 删除（剪切）从光标处开始的 5 行                      |
  | yy   | 复制光标所在整行                                     |
  | 5yy  | 复制从光标处开始的 5 行                              |
  | n    | 显示搜索命令定位到的下一个字符串                     |
  | N    | 显示搜索命令定位到的上一个字符串                     |
  | u    | 撤销上一步的操作                                     |
  | p    | 将之前删除（ dd）或复制（ yy）过的数据粘贴到光标后面 |

* vim 末行模式常用命令

  |           | 作用               |
  | --------- | ------------------ |
  | :w        | 保存               |
  | :q        | 退出               |
  | :q!       | 强制退出（不保存） |
  | :wq!      | 强制保存退出       |
  | :set nu   | 显示行号           |
  | :set nonu | 不显示行号         |
  | :命令     | 执行该命令         |
  | :整数     | 跳转到该行         |

  

* 配置 yum 仓库

  ```sh
  cd /etc/yum.repos.d/
  vim rhel7.repo
  
  [rhel7-media]		# 软件仓库 repo 的唯一标识符，需避免与其它仓库标识符冲突
  name=rhel7-media	# 软件仓库的名称，以助识别其用途
  baseurl=file:///media/cdrom	# 软件仓库所在位置，可为 ftp://.., http://.., 本地 file:///..
  enabled=1			# 设置此仓库是否可用，1 启用，0 禁用
  gpgcheck=1			# 设置此仓库是否校验文件，1 校验，0 不校验
  gpgkey=file:///media/cdrom/RPM-GPG-KEY-redhat-release	# 若启用校验，需指定公钥文件地址
  
  mkdir -p /media/cdrom
  mount /dev/cdrom /media/cdrom
  vim /etc/fstab		# 配置光盘自动挂载
  	/dev/cdrom	/media/cdrom	iso9660	defaults	0	0
  
  yum install httpd -y	# 测试 yum 仓库是否可用
  ```

* 4.2 编写 Shell 脚本

  * 基本知识

  ```sh
  #!/bin/bash		# 第一行为脚本声明，告知系统使用何种解释器
  ```

  ```sh
  bash example.sh			# 执行脚本，脚本文件无需拥有执行权限 (x)、无需指定路径
  chmod g+x example.sh	# 给脚本文件添加执行权限，在“group”上
  chmod u+x example.sh	# 给脚本文件添加执行权限，在“user”上
  chmod o+x example.sh	# 给脚本文件添加执行权限，在“other”上
  chmod +x example.sh		# 一次性给3个角色都加上执行权限
  ./example.sh			# 需要指定绝对或相对路径
  ```
  * 用户参数和内置变量
  
  ```sh
  #!/bin/bash
  echo "file name of the script: $0"
  echo "there is(are) $# parameter(s), they are: $*"
  echo "parameter #1 is: $1"
  echo "return value of last cmd: $?"
  
  接收参数的内置变量：
  $0 为脚本文件的文件名
  $1 为第一个用户参数，依此类推
  $# 用户参数的个数
  $* 用户参数的值
  $? 上一个命令的返回值
  ```
  
  * 判断用户参数 - 条件测试语句
  
    * 格式：`[ condition expression ]` 中括号与`条件表达式`之间有<font color=red>空格</font>！条件成立则返回0，否则非0
  
    * 文件测试语句：判断文件是否存在、权限是否满足等
  
      | 运算符 | 作用                   |
      | ------ | ---------------------- |
      | `-d`   | 是否为目录             |
      | `-e`   | 文件是否存在           |
      | `-f`   | 是否为一般文件         |
      | `-r`   | 当前用户是否有读的权限 |
      | `-w`   | 当前用户是否有写的权限 |
      | `-x`   | 当前用户是否有执行权限 |
  
      ```sh
      [linr4@station /]$ [ -d /etc/fstab ]	# 判断 /etc/fstab 是否为目录
      [linr4@station /]$ echo $?				# 显示上一条命令的结果
      1										# 非 0 代表条件不成立，false
      [linr4@station /]$ [ -f /etc/fstab ]	# 判断 /etc/fstab 是否为一般文件
      [linr4@station /]$ echo $?
      0										# 返回 0 代表条件成立，true
      
      
      ```
  
    * 逻辑测试语句；
  
      ```sh
      # 逻辑“与”运算符 &&，前面的条件测试语句成立，才会执行后面的语句
      [ -e /dev/cdrom ] && echo "cdrom exist"	# && 与运算符，
      cdrom exist
      
      # 逻辑“或”运算符 ||，前面的条件测试语句不成立，才会执行后面的语句
      [linr4@station /]$ [ $USER = root ] || echo $USER
      linr4									# 当前用户非 root，因此执行 echo
      
      [linr4@station /]$ su -
      [root@station ~]# [ $USER = root ] || echo $USER
      										# 当前用于为 root，不执行 echo
      
      # 逻辑“非”运算符 !，结果取反，后面要有空格
      [root@station ~]# [ ! $USER=root ] || echo "admin"
      admin
      [root@station ~]# [ ! $USER=root ] && echo "admin"
      [root@station ~]#
      ```
  
      
  
      留意比较运算符 " = " 前后要有空格！否则如下例运算结果不对：
  
      ```sh
      [root@station ~]# [ ! $USER=root ] && echo "user" || echo "root"
      root
      [root@station ~]# exit
      logout
      
      # 虽当前用户非 root 仍显示 root，因比较的等号前后无空格
      [linr4@station /]$ [ ! $USER=root ] && echo "user" || echo "root"
      root		
      [linr4@station /]$ echo $USER
      linr4
      
      # 加上空格之后输出结果就与预期相同
      [linr4@station /]$ [ ! $USER = root ] && echo "user" || echo "root"
      user
      [linr4@station /]$
      ```
  
      
  
    * 整数值比较语句；
  
    * 字符串比较语句；

