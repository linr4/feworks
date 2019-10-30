# RHCSA & RHCE

> root / redhat | rrhh9708
>
> grade / qq5156770



  **少部分考试环境没有安装 GUI，需要自行安装**：

​	`yum install -y xorg\* gnome\* glx\*` 



## 第1题

###### 重置系统密码：

* 修改系统的 root 帐号密码为 rrhh9708，确保能够使用 root 帐号能够登陆系统；

###### 根据以下信息完成虚拟机Desktop网络的修改：

* 主机名：desktop.group8.example.com

* IP地址：172.24.8.10

* 子网掩码：255.255.255.0

* 网关： 172.24.8.254

* 名称服务：172.24.8.254

  

---

###### 解题方法：

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

  

## 第2题

配置 Linux 运行在 enforcing 模式

```sh
[root@desktop ~]# getenforce
Permissive
[root@desktop ~]# cat /etc/selinux/config
SELINUX=permissive
SELINUXTYPE=targeted

[root@desktop ~]# vi /etc/selinux/config
  SELINUX=enforcing
  SELINUXTYPE=targeted

[root@desktop ~]# reboot		# 实际考试中可以先不重启，做完题在重启
[root@desktop ~]# getenforce
Enforcing
```



## 第3题

配置默认软件仓库：http://rhgls.domain1.example.com/rhel

```sh
# vi /etc/yum.repos.d/rhcsa.repo
  [rhcsa]
  name=rhcsa repo
  baseurl=http://rhgls.domain1.example.com/rhel
  enabled=1
  gpgcheck=0
  
# yum repolist all
# yum install -y httpd
```



## 第4题

###### 调整逻辑卷 lv0 的容量：

* 调整后逻辑卷和文件系统大小为290 MB
* 调整后文件系统内容不能破坏
* 调整后允许误差在 270 ~ 320 MB 之间
* 调整后挂载目录不变

```sh
[root@desktop ~]# lvscan	# 查看 lv 信息
  ACTIVE            '/dev/vg0/lv0' [200.00 MiB] inherit

[root@desktop ~]# df -hT	# 查看 lv 格式（ext3）
Filesystem          Type      Size  Used Avail Use% Mounted on
/dev/sda1           xfs       9.8G  3.3G  6.5G  34% /
devtmpfs            devtmpfs  660M     0  660M   0% /dev
tmpfs               tmpfs     674M  144K  674M   1% /dev/shm
tmpfs               tmpfs     674M  8.9M  666M   2% /run
tmpfs               tmpfs     674M     0  674M   0% /sys/fs/cgroup
/dev/mapper/vg0-lv0 ext3      190M  1.6M  179M   1% /home
tmpfs               tmpfs     135M   12K  135M   1% /run/user/0

[root@desktop ~]# blkid /dev/vg0/lv0 	# 查看 lv 格式（ext3）和容量
/dev/vg0/lv0: UUID="b2285e5e-de78-4392-945a-817843fd7f10" TYPE="ext3"

[root@desktop ~]# lvextend -L 290M /dev/vg0/lv0
  Rounding size to boundary between physical extents: 292.00 MiB
  Size of logical volume vg0/lv0 changed from 200.00 MiB (50 extents) to 292.00 MiB (73 extents).
  Logical volume lv0 successfully resized.
  
  
[root@desktop ~]# blkid /dev/vg0/lv0
/dev/vg0/lv0: UUID="b2285e5e-de78-4392-945a-817843fd7f10" TYPE="ext3"

[root@desktop ~]# xfs_growfs /dev/vg0/lv0	# xfs 扩容命令
xfs_growfs: /dev/vg0/lv0 is not a mounted XFS filesystem

[root@desktop ~]# resize2fs /dev/vg0/lv0	# ext 扩容命令
resize2fs 1.42.9 (28-Dec-2013)
Filesystem at /dev/vg0/lv0 is mounted on /home; on-line resizing required
old_desc_blocks = 1, new_desc_blocks = 2
The filesystem on /dev/vg0/lv0 is now 299008 blocks long.

[root@desktop ~]# df -hT
Filesystem          Type      Size  Used Avail Use% Mounted on
/dev/sda1           xfs       9.8G  3.3G  6.5G  34% /
devtmpfs            devtmpfs  660M     0  660M   0% /dev
tmpfs               tmpfs     674M  144K  674M   1% /dev/shm
tmpfs               tmpfs     674M  8.9M  666M   2% /run
tmpfs               tmpfs     674M     0  674M   0% /sys/fs/cgroup
/dev/mapper/vg0-lv0 ext3      279M  2.1M  263M   1% /home
tmpfs               tmpfs     135M   12K  135M   1% /run/user/0

[root@desktop ~]# lvscan
  ACTIVE            '/dev/vg0/lv0' [292.00 MiB] inherit

```



## 第5题

###### 创建用户和用户组

按照以下要求创建用户、用户组：

* 新建一个名为 adminuser 的组，组 id 为 40000
* 新建一个名为 natasha 的用户，并将 adminuser 作为其附属组
* 新建一个名为 harry 的用户，并将 adminuser 作为其附属组
* 新建一个名为 sarah 的用户，其不属于 adminuser 组，其在系统中没有任何可交互的 shell
* natasha 、 harry 和 sarah 三个用户的密码均设置为 redhat

```sh
[root@desktop ~]# groupadd -u 40000 adminuser
[root@desktop ~]# useradd natasha -G adminuser
[root@desktop ~]# useradd harry -G adminuser
[root@desktop ~]# useradd sarah -s /sbin/nologin

[root@desktop ~]# echo "redhat" | passwd --stdin natasha
Changing password for user natasha.
passwd: all authentication tokens updated successfully.
[root@desktop ~]# echo "redhat" | passwd --stdin harry
Changing password for user harry.
passwd: all authentication tokens updated successfully.
[root@desktop ~]# echo "redhat" | passwd --stdin sarah
Changing password for user sarah.
passwd: all authentication tokens updated successfully.
```



## 第6题

###### 配置文件 /var/tmp/fstab 的权限

复制文件 /etc/fstab 到 /var/tmp 目录下，并按照以下要求配置 /var/tmp/fstab 文件的权限：
*  该文件的所属人为 root
* 该文件的所属组为 root
*  该文件对任何人均没有执行权限
*  用户 natasha 对该文件有读和写的权限
*  用户 harry 对该文件既不能读也不能写
*  所有其他用户（包括当前已有用户及未来创建的用户）对该文件都有读的权限

```sh
[root@desktop ~]# cp /etc/fstab /var/tmp
[root@desktop tmp]# cd /var/tmp

[root@desktop tmp]# chown root:root fstab	# 所属人和所属组均为 root

[root@desktop tmp]# chmod a-x fstab			# 任何人均没有执行权限

[root@desktop tmp]# ll fstab
-rw-r--r--. 1 root root 451 Oct 28 18:29 fstab

[root@desktop tmp]# setfacl -m u:natasha:rw /var/tmp/fstab   # natasha 对该文件有读和写的权限
[root@desktop tmp]# setfacl -m u:harry:- /var/tmp/fstab		 #  harry 对该文件既不能读也不能写

[root@desktop tmp]# chmod o+r fstab		# 所有其他用户对该文件都有读的权限

[root@desktop tmp]# getfacl /var/tmp/fstab
getfacl: Removing leading '/' from absolute path names
# file: var/tmp/fstab
# owner: root
# group: root
user::rw-
user:natasha:rw-
user:harry:---
group::r--
mask::rw-
other::r--

[root@desktop tmp]# ll fstab 
-rw-rw-r--+ 1 root root 451 Oct 29 11:02 fstab	# 加号表示设置了 ACL

```



## 第7题

###### 建立计划任务

对 natasha 用户建立计划任务，要求在本地时间每天的 14:23 执行以下命令：

> `/bin/echo "hiya"` 

```sh
[root@desktop tmp]# crontab -e -u natasha
no crontab for natasha - using an empty one
crontab: installing new crontab

[root@desktop tmp]# crontab -l -u natasha
23 14 * * * /bin/echo "hiya"		# 练习系统要用 "rhcsa" 代替 "hiya"，否则过不了 grade 评分
```



## 第8题

###### 创建一个共享目录

在 /home 目录下创建名为 admins 的子目录，并按以下要求设置权限：

*  /home/admins 目录的所属组为 adminuser

*  该目录对 adminuser 组的成员可读可执行可写，但对其他用户没有任何权限，但 root 不受限制

*  在 /home/admins 目录下所创建的文件的所属组自动被设置为 adminuser

```sh
[root@desktop ~]# mkdir /home/admins
[root@desktop ~]# chown :adminuser /home/admins	# 改所属组为 adminuser
[root@desktop ~]# ls -ld /home/admins
drwxr-xr-x. 2 root adminuser 1024 Oct 28 19:00 /home/admins

[root@desktop ~]# chmod -Rf 770 /home/admins	# adminuser组成员可读写可执行，其他用户没有权限
[root@desktop ~]# ls -ld /home/admins
drwxrwx---. 2 root adminuser 1024 Oct 28 19:00 /home/admins

[root@desktop ~]# chmod g+s /home/admins		# 目录下所创建的文件所属组自动设置为 adminuser
[root@desktop ~]# ls -ld /home/admins
drwxrws---. 2 root adminuser 1024 Oct 28 19:00 /home/admins

[root@desktop ~]# getfacl /home/admins
# file: home/admins
# owner: root
# group: adminuser
# flags: -s-
user::rwx
group::rwx
other::---
```



## 第9题

###### 升级系统内核

从 http://server.group8.example.com/pub/ 下找到需要升级的内核，同时满足下列要求：

* 当系统重新启动之后，升级的内核要作为默认的内核
*  原来的内核要被保留，并且仍然可以正常启动



方法一：使用 yum 引用 kernel 安装包在服务器上的地址进行安装；

```sh
# 查看服务器上的安装包信息
[root@desktop ~]# curl --silent http://server.group8.example.com/pub/ | grep kernel

<tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="kernel-3.10.0-327.4.5.el7.x86_64.rpm">kernel-3.10.0-327.4...&gt;</a></td><td align="right">2016-12-30 16:48  </td><td align="right"> 33M</td><td>&nbsp;</td></tr>

[root@desktop ~]# yum install -y http://server.group8.example.com/pub/kernel-3.10.0-327.4.5.el7.x86_64.rpm		# 使用 yum 指定安装包地址进行安装

kernel-3.10.0-327.4.5.el7.x86_64.rpm                     |  33 MB     00:02

Examining /var/tmp/yum-root-UAMOOU/kernel-3.10.0-327.4.5.el7.x86_64.rpm: kernel-3.10.0-327.4.5.el7.x86_64

Marking /var/tmp/yum-root-UAMOOU/kernel-3.10.0-327.4.5.el7.x86_64.rpm as an update to kernel-3.10.0-123.el7.x86_64

Marking /var/tmp/yum-root-UAMOOU/kernel-3.10.0-327.4.5.el7.x86_64.rpm as an update to kernel-3.10.0-327.el7.x86_64

Resolving Dependencies
--> Running transaction check
---> Package kernel.x86_64 0:3.10.0-327.4.5.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

================================================================================
 Package Arch    Version               Repository                          Size
================================================================================
Installing:
 kernel  x86_64  3.10.0-327.4.5.el7    /kernel-3.10.0-327.4.5.el7.x86_64  136 M

Transaction Summary
================================================================================
Install  1 Package

Total size: 136 M
Installed size: 136 M
Downloading packages:
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : kernel-3.10.0-327.4.5.el7.x86_64                             1/1
  Verifying  : kernel-3.10.0-327.4.5.el7.x86_64                             1/1

Installed:
  kernel.x86_64 0:3.10.0-327.4.5.el7

Complete!

```



方法二：在 GUI 中用 Firefox 到服务器下载安装包，在本地使用 yum 安装；

```sh
# Visit http://server.group8.example.com/pub via Firefox and download kernel file

[root@desktop Downloads]# pwd
/root/Downloads

[root@desktop Downloads]# ls -l kernel-3.10.0-327.4.5.el7.x86_64.rpm
-rw-r--r--. 1 root root 34635076 Oct 29 12:32 kernel-3.10.0-327.4.5.el7.x86_64.rpm

[root@desktop Downloads]# yum install -y kernel-3.10.0-327.4.5.el7.x86_64.rpm

```



## 第10题

###### 绑定外部验证服务

系统 server.group8.example.com 提供了一个 LDAP 验证服务。您的系统需要按照以下要求绑定到这个服务上：

* 验证服务器的基本 DN 是：dc=group8,dc=example,dc=com

* 账户信息和验证信息都是由 LDAP 提供

* 连接需要使用证书加密，整数可以在下面的链接中下载：
     http://server.group8.example.com/pub/cacert.pem

当正确完成配置后，用户 thales 可以登录系统，登录密码是 redhat

```sh
[root@desktop ~]# yum -y install openldap openldap-clients sssd authconfig-gtk

[root@desktop ~]# authconfig-gtk	# 需要 startx 在 GUI 中配置
  # User Account Database: LDAP
  # LDAP Search Base DN: dc=group8,dc=example,dc=com
  # Use TLS to encrypt connection ---> CHECKED
  # Download CA Certificate..  http://server.group8.example.com/pub/cacert.pem
  # Kerberos password ---> Realm: #
  
[root@desktop ~]# getent passwd thales		# 验证 thales 用户是否 OK
thales:*:2001:2001:thales:/home/ldap/thales:/bin/bash

[root@desktop ~]# systemctl restart sssd	# 重启和检查 系统安全服务 状态
[root@desktop ~]# systemctl status sssd
● sssd.service - System Security Services Daemon
   Loaded: loaded (/usr/lib/systemd/system/sssd.service; enabled; vendor preset: disabled)
  Drop-In: /etc/systemd/system/sssd.service.d
           └─journal.conf
   Active: active (running) since Tue 2019-10-29 13:29:36 CST; 6s ago
...
```

![image-20191028204032051](image-20191028204032051.png)

```sh
[root@desktop ~]# id thales
uid=2001(thales) gid=2001(thales) groups=2001(thales)
[root@desktop ~]# ssh thales@localhost
```



## 第11题

###### 配置 autofs

按照下述要求配置 autofs 用来自动挂载 DLAP 用户的主目录：

* server.group8.example.com 通过 NFS 输出了 /rhome 目录到您的系统；
* 文件系统包含了用户 thales 的主目录，并且已经预先配置好了；

* thales 用户的主目录是 server.group8.example.com:/rhome/thales；

* thales 用户的主目录应该挂载到本地的/home/ldap/thales；

* 用户对其主目录必须是读写的；

* thales 的登录密码是 redhat；

* 要求使用 nfs3 版本挂载；

```sh
[root@desktop ~]# yum install autofs -y
[root@desktop ~]# mkdir -p /home/ldap/

[root@desktop ~]# vi /etc/auto.master
/home/ldap /etc/auto.ldap
  
[root@desktop ~]# vi /etc/auto.ldap
* -fstype=nfs,-rw,vers=3 server.group8.example.com:/rhome/&
# * -rw,sync,soft server.group8.example.com:/rhome/&	  # 旧版本 NFS 的写法

[root@desktop ~]# systemctl restart autofs
[root@desktop ~]# systemctl enable autofs

[root@desktop ~]# su - thales
Last login: Tue Oct 29 13:41:00 CST 2019 on pts/2
[thales@desktop ~]$ exit
logout

[root@desktop ~]# ssh thales@localhost
thales@localhost's password:
Permission denied, please try again.

```



## 第12题

###### 配置 NTP

配置您的系统时间与服务器 server.group8.example.com 同步，要求系统重启后依然生效；

```sh
# NTP 服务默认已经安装了
# [root@desktop /]# yum install ntp
# [root@desktop /]# yum install chronyd

[root@desktop /]# vi /etc/chrony.conf
  # comment out unused servers, then add a new server:
  server server.group8.example.com iburst

[root@desktop /]# systemctl restart chronyd
[root@desktop /]# systemctl enable chronyd
[root@desktop /]# chronyc sources

# --- 考试时到此即可 ----

[root@desktop /]# chronyc sources -v
210 Number of sources = 1

  .-- Source mode  '^' = server, '=' = peer, '#' = local clock.
 / .- Source state '*' = current synced, '+' = combined , '-' = not combined,
| /   '?' = unreachable, 'x' = time may be in error, '~' = time too variable.
||                                                 .- xxxx [ yyyy ] +/- zzzz
||      Reachability register (octal) -.           |  xxxx = adjusted offset,
||      Log2(Polling interval) --.      |          |  yyyy = measured offset,
||                                \     |          |  zzzz = estimated error.
||                                 |    |           \
MS Name/IP address         Stratum Poll Reach LastRx Last sample
===============================================================================
^* server                        2   6    17     7  +3047ns[-3690us] +/-   12ms

[root@desktop /]# chronyc sourcestats -v
210 Number of sources = 1
                             .- Number of sample points in measurement set.
                            /    .- Number of residual runs with same sign.
                           |    /    .- Length of measurement set (time).
                           |   |    /      .- Est. clock freq error (ppm).
                           |   |   |      /           .- Est. error in freq.
                           |   |   |     |           /         .- Est. offset.
                           |   |   |     |          |          |   On the -.
                           |   |   |     |          |          |   samples. \
                           |   |   |     |          |          |             |
Name/IP Address            NP  NR  Span  Frequency  Freq Skew  Offset  Std Dev
==============================================================================
server                      8   4   263     -0.004      3.251   -121ns   148us

[root@desktop /]# timedatectl
      Local time: Mon 2019-10-28 21:56:29 CST
  Universal time: Mon 2019-10-28 13:56:29 UTC
        RTC time: Mon 2019-10-28 13:56:26
       Time zone: Asia/Shanghai (CST, +0800)
     NTP enabled: yes
NTP synchronized: yes
 RTC in local TZ: no
      DST active: n/a

# 查看chrony服务所有conf配置文件分布
[root@desktop /]# rpm -ql chrony |grep conf
/etc/chrony.conf
/usr/share/man/man5/chrony.conf.5.gz
[root@desktop /]#

# 检查chrony服务配置文件所在
[root@desktop /]# rpm -qc chrony
/etc/chrony.conf
/etc/chrony.keys
/etc/logrotate.d/chrony

# 查看和配置时区
[root@desktop /]# timedatectl list-timezones
Africa/Abidjan
Africa/Accra
Africa/Addis_Ababa
Africa/Algiers
Africa/Asmara
Africa/Bamako

[root@desktop /]# timedatectl set-timezone Asia/Shanghai

# 修改日期时间
[root@desktop /]# timedatectl set-time "2019-10-28 22:01:59"
Failed to set time: Automatic time synchronization is enabled

# 开启/关闭 NTP： # timedatectl set-ntp true/flase
```

*  chrony 和 ntpd 类似 firewalld 和 iptables，不能共存，同时只能存在一个服务运行。 



## 第13题

###### 创建一个归档

创建一个名为 /root/sysconfig.tar.bz2 的归档文件，其中包含了 /etc/sysconfig 目录中的内容，tar 归档文件必须使用 bzip2 进行压缩。

```sh
[root@desktop ~]# tar jcvf sysconfig.tar.bz2 /etc/sysconfig

```



## 第14题

###### 配置一个用户帐号

请创建一个名为 jay 的用户，并满足以下要求：

* 用户 id 为3456

* 密码为 glegunge

```sh
[root@desktop ~]# useradd jay -u 3456

[root@desktop ~]# id jay
uid=3456(jay) gid=3456(jay) groups=3456(jay)

[root@desktop ~]# passwd jay
Changing password for user jay.
New password:
BAD PASSWORD: The password is shorter than 9 characters
Retype new password:
passwd: all authentication tokens updated successfully.

# --- 或者用 echo，不容易输错密码 ---

[root@desktop ~]# echo "glegunge" | passwd --stdin jay
Changing password for user jay.
passwd: all authentication tokens updated successfully.
```



## 第15题

###### 添加一个 swap 分区

在您的系统中添加一个新的 swap 分区，并满足以下要求：

* swap 分区容量为 512 MiB

* 当您的系统启动时，swap 分区应该可以自动挂载

* 不要移除或者修改其他已经存在于您的系统中的 swap 分区

```sh
[root@desktop ~]# df -hT	# 查看当前文件系统，在 sda 上创建 swap
Filesystem                              Type      Size  Used Avail Use% Mounted on
/dev/sda1                               xfs       9.8G  3.6G  6.3G  37% /
devtmpfs                                devtmpfs  660M     0  660M   0% /dev
tmpfs                                   tmpfs     674M  144K  674M   1% /dev/shm
tmpfs                                   tmpfs     674M  9.0M  666M   2% /run
tmpfs                                   tmpfs     674M     0  674M   0% /sys/fs/cgroup
/dev/mapper/vg0-lv0                     ext3      279M  2.1M  263M   1% /home
tmpfs                                   tmpfs     135M   12K  135M   1% /run/user/0
server.group8.example.com:/rhome/thales nfs       9.8G  1.8G  8.1G  18% /home/ldap/thales

[root@desktop ~]# fdisk /dev/sda	# 对磁盘 sda 进行操作，新建分区准备用于 swap
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): m
Command action
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   g   create a new empty GPT partition table
   G   create an IRIX (SGI) partition table
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)

Command (m for help): p		# 查看 sda 当前分区信息

Disk /dev/sda: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000bffad

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    20482047    10240000   83  Linux
/dev/sda2        20482048    24578047     2048000   82  Linux swap / Solaris
/dev/sda3        24578048    25602047      512000   83  Linux

Command (m for help): n		# 创建新分区
Partition type:
   p   primary (3 primary, 0 extended, 1 free)
   e   extended
Select (default e): e		# 创建新的扩展分区
Selected partition 4
First sector (25602048-41943039, default 25602048):		# 默认
Using default value 25602048
Last sector, +sectors or +size{K,M,G} (25602048-41943039, default 41943039):  # 默认
Using default value 41943039
Partition 4 of type Extended and of size 7.8 GiB is set

Command (m for help): p		# 再次查看分区信息

Disk /dev/sda: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000bffad

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    20482047    10240000   83  Linux
/dev/sda2        20482048    24578047     2048000   82  Linux swap / Solaris
/dev/sda3        24578048    25602047      512000   83  Linux
/dev/sda4        25602048    41943039     8170496    5  Extended	# 已创建新的扩展分区

Command (m for help): n		# 再在新扩展分区上创建逻辑分区
All primary partitions are in use
Adding logical partition 5
First sector (25604096-41943039, default 25604096):	# 默认
Using default value 25604096
Last sector, +sectors or +size{K,M,G} (25604096-41943039, default 41943039): +512M # 指定
Partition 5 of type Linux and of size 512 MiB is set

Command (m for help): p

Disk /dev/sda: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000bffad

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    20482047    10240000   83  Linux
/dev/sda2        20482048    24578047     2048000   82  Linux swap / Solaris
/dev/sda3        24578048    25602047      512000   83  Linux
/dev/sda4        25602048    41943039     8170496    5  Extended
/dev/sda5        25604096    26652671      524288   83  Linux	# 已创建新的逻辑分区

Command (m for help): t					# 修改分区类型
Partition number (1-5, default 5): 5
Hex code (type L to list all codes): 82	# 修改分区类型为 Linux swap
Changed type of partition 'Linux' to 'Linux swap / Solaris'

Command (m for help): p					# 再次查看分区信息，Linux swap 分区已创建

Disk /dev/sda: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000bffad

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    20482047    10240000   83  Linux
/dev/sda2        20482048    24578047     2048000   82  Linux swap / Solaris
/dev/sda3        24578048    25602047      512000   83  Linux
/dev/sda4        25602048    41943039     8170496    5  Extended
/dev/sda5        25604096    26652671      524288   82  Linux swap / Solaris	# 新 swap

Command (m for help): w					# 保存退出
The partition table has been altered!

Calling ioctl() to re-read partition table.

WARNING: Re-reading the partition table failed with error 16: Device or resource busy.
The kernel still uses the old table. The new table will be used at
the next reboot or after you run partprobe(8) or kpartx(8)
Syncing disks.

[root@desktop ~]# partprobe			# 扫描磁盘、生成设备文件（类似 ioscan）
[root@desktop ~]# ll /dev/sda5		# swap 分区的设备文件已生成
brw-rw----. 1 root disk 8, 5 Oct 29 13:59 /dev/sda5

[root@desktop ~]# mkswap /dev/sda5	# 创建 swap
Setting up swapspace version 1, size = 524284 KiB
no label, UUID=a17887fc-7b2d-4e21-9d9f-6ba2ff84fb8d

[root@desktop ~]# vim /etc/fstab	# 把新 swap 写入 fstab，启动时自动挂载
  UUID=a17887fc-7b2d-4e21-9d9f-6ba2ff84fb8d swap swap defaults 0 0

[root@desktop ~]# swapon -a			# 启用所有 Swap 分区
# -a, --all   All devices marked as 'swap' in /etc/fstab are made available, except for those with the 'noauto' option.  Devices  that  are already being used as swap are silently skipped.

# -s, --summary   Display swap usage summary by device. Equivalent to "cat /proc/swaps". 

[root@desktop ~]# swapon -s			# 查看 Swap 分区信息
Filename                                Type            Size    Used    Priority
/dev/sda2                               partition       2047996 12344   -1
/dev/sda5                               partition       524284  0       -2
```



## 第16题

###### 查找文件

找出系统上所有者为 jay 的所有文件，并将文件拷贝到 /root/findfiles 目录中；

```sh
[root@desktop ~]# mkdir /root/findfiles
[root@desktop ~]# find / -user jay -exec cp -Ra {} /root/findfiles \;
	# {} 表示 find 找到的每个文件；
	# cp -a 相当于 cp -p -d -r （保留源文件属性、保留链接文件、递归复制），-R 也是递归
	# -exec 必须以 \; 作为结尾；
	
[root@desktop ~]# ll /root/findfiles/
total 0
drwxr-xr-x. 2 jay jay  6 Jan 27  2014 extensions
-rw-rw----. 1 jay mail 0 Oct 29 13:52 jay
drwxr-xr-x. 2 jay jay  6 Jan 27  2014 plugins
```



## 第17题

###### 查找一个字符串

在 /usr/share/dict/words 文件中查找所有包含 seismic 字符串的行，并将这些行按照原始文件中的顺序存放到 /root/wordlist 中，/root/wordlist 文件不能包含空行；

```sh
[root@desktop ~]# grep seismic /usr/share/dict/words | grep -v ^$ > /root/wordlist
# grep -v ^$ 	# 过滤空行
```



## 第18题

###### 创建逻辑卷

按下列要求创建逻辑卷：

* 创建一个 VG 名为 datastore，PE size 为 16 MB；

* 创建一个 LV 名为 database，属与 VG datastore，该 LV 由 50 个 PE 组成；

* 将新建的 LV 格式化为 xfs 文件系统，要求系统启动时该 LV 能自动挂载到 /mnt/database 目录；

```sh
[root@desktop ~]# df -hT
Filesystem                              Type      Size  Used Avail Use% Mounted on
/dev/sda1                               xfs       9.8G  3.6G  6.3G  37% /
devtmpfs                                devtmpfs  660M     0  660M   0% /dev
tmpfs                                   tmpfs     674M  144K  674M   1% /dev/shm
tmpfs                                   tmpfs     674M  9.0M  666M   2% /run
tmpfs                                   tmpfs     674M     0  674M   0% /sys/fs/cgroup
/dev/mapper/vg0-lv0                     ext3      279M  2.1M  263M   1% /home
tmpfs                                   tmpfs     135M   12K  135M   1% /run/user/0

[root@desktop ~]# fdisk /dev/sda		# 在 sda 上创建新的 PV、VG、LV
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): p		# 查看当前分区信息

Disk /dev/sda: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000bffad

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    20482047    10240000   83  Linux
/dev/sda2        20482048    24578047     2048000   82  Linux swap / Solaris
/dev/sda3        24578048    25602047      512000   83  Linux
/dev/sda4        25602048    41943039     8170496    5  Extended
/dev/sda5        25604096    26652671      524288   82  Linux swap / Solaris

Command (m for help): n		# 创建新的逻辑分区
All primary partitions are in use
Adding logical partition 6
First sector (26654720-41943039, default 26654720):
Using default value 26654720
Last sector, +sectors or +size{K,M,G} (26654720-41943039, default 41943039):
Using default value 41943039
Partition 6 of type Linux and of size 7.3 GiB is set

Command (m for help): p

Disk /dev/sda: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000bffad

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    20482047    10240000   83  Linux
/dev/sda2        20482048    24578047     2048000   82  Linux swap / Solaris
/dev/sda3        24578048    25602047      512000   83  Linux
/dev/sda4        25602048    41943039     8170496    5  Extended
/dev/sda5        25604096    26652671      524288   82  Linux swap / Solaris
/dev/sda6        26654720    41943039     7644160   83  Linux		# 刚创建的新分区

Command (m for help): t		# 修改分区类型为 LVM
Partition number (1-6, default 6):
Hex code (type L to list all codes): 8e		# 8e 为 LVM
Changed type of partition 'Linux' to 'Linux LVM'

Command (m for help): p

Disk /dev/sda: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000bffad

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048    20482047    10240000   83  Linux
/dev/sda2        20482048    24578047     2048000   82  Linux swap / Solaris
/dev/sda3        24578048    25602047      512000   83  Linux
/dev/sda4        25602048    41943039     8170496    5  Extended
/dev/sda5        25604096    26652671      524288   82  Linux swap / Solaris
/dev/sda6        26654720    41943039     7644160   8e  Linux LVM	# 刚修改为 LVM 类型

Command (m for help): w					# 保存退出
The partition table has been altered!

Calling ioctl() to re-read partition table.

WARNING: Re-reading the partition table failed with error 16: Device or resource busy.
The kernel still uses the old table. The new table will be used at
the next reboot or after you run partprobe(8) or kpartx(8)
Syncing disks.

[root@desktop ~]# partprobe		# 刷新并创建 新 LVM 分区的设备文件

[root@desktop ~]# ll /dev/sda6
brw-rw----. 1 root disk 8, 6 Oct 29 14:51 /dev/sda6

[root@desktop ~]# pvcreate /dev/sda6	# 在 sda6 上创建 PV
  Physical volume "/dev/sda6" successfully created
  
[root@desktop ~]# vgcreate -s 16M datastore /dev/sda6	# 创建 VG，设定 PE size = 16M
  Volume group "datastore" successfully created
  
[root@desktop ~]# lvcreate -n database -l 50 datastore	# 创建 LV，包含 50 个 PE；
  Logical volume "database" created.
  
[root@desktop ~]# mkfs.xfs /dev/datastore/database		# 格式化 LV 为 xfs 格式的文件系统

meta-data=/dev/datastore/database isize=256    agcount=4, agsize=51200 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=0        finobt=0
data     =                       bsize=4096   blocks=204800, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=0
log      =internal log           bsize=4096   blocks=853, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0

[root@desktop ~]# blkid /dev/datastore/database		# 查看 LV 的 UUID，以便修改 fstab
/dev/datastore/database: UUID="b37b5eab-0f14-4b2a-af53-4696b2065062" TYPE="xfs"

[root@desktop ~]# mkdir /mnt/database
[root@desktop ~]# vi /etc/fstab
  # 在末尾加上这句，使其启动时自动挂载
  UUID="b37b5eab-0f14-4b2a-af53-4696b2065062" /mnt/database xfs defaults 0 0

[root@desktop ~]# mount -a		# 挂载 fstab 中设置的全部 FS
[root@desktop ~]# df -h
Filesystem                      Size  Used Avail Use% Mounted on
/dev/sda1                       9.8G  3.6G  6.3G  37% /
devtmpfs                        660M     0  660M   0% /dev
tmpfs                           674M  144K  674M   1% /dev/shm
tmpfs                           674M  9.0M  666M   2% /run
tmpfs                           674M     0  674M   0% /sys/fs/cgroup
/dev/mapper/vg0-lv0             279M  2.1M  263M   1% /home
tmpfs                           135M   12K  135M   1% /run/user/0
/dev/mapper/datastore-database  797M   33M  765M   5% /mnt/database		# 已挂载

[root@desktop ~]# reboot		# 重启检查效果
...
[root@desktop ~]# df -h
Filesystem                      Size  Used Avail Use% Mounted on
/dev/sda1                       9.8G  3.6G  6.3G  37% /
devtmpfs                        660M     0  660M   0% /dev
tmpfs                           674M     0  674M   0% /dev/shm
tmpfs                           674M  8.9M  666M   2% /run
tmpfs                           674M     0  674M   0% /sys/fs/cgroup
/dev/mapper/datastore-database  797M   33M  765M   5% /mnt/database
/dev/mapper/vg0-lv0             279M  2.1M  263M   1% /home
tmpfs                           135M     0  135M   0% /run/user/0

[root@desktop ~]# swapon -s
Filename                                Type            Size    Used    Priority
/dev/sda5                               partition       524284  0       -1
/dev/sda2                               partition       2047996 0       -2
```







---







# RHCE



##  第一题：

###### 设定SELinux

在 system1 和 system2 上要求 SELinux 的工作模式为 enforcing，要求系统重启后依然生效。

```sh
[root@desktop ~]# vi /etc/selinux/config
  SELINUX=enforcing
```



##  第二题： 

###### 配置防火墙

按下列要求在 system1 和 system2 上设定防火墙系统：

* 允许 group8.example.com 域的客户对 system1 和 system2 进行 ssh 访问；

* 禁止 my133t.org 域的客户对 system1 和 system2 进行 ssh 访问；

* 备注： my133t.org 是在 172.13.8.0/24 网络。

```sh
[root@desktop ~]# firewall-config		# invoke GUI to configure firwall
```

1) Change `Configuration` to be `Permanent` ;

2) Navigate to `Rich Rules` tab, click `Add` to add an entry ;

3) Add ALLOW entry for group8.example.com :

* Change `Family` to `ipv4`

* Check `Element`, select service `ssh`

* Check `Action`, select `Accept`

* Fill `Source`  with `172.24.8.0/24`
* Click `OK` to save and exit

4) Add DENY entry for my133t.org:

* Click `Add` button on Firewall Configuration window to add a new entry;
* Change `Family` to `ipv4`

* Check `Element`, select service `ssh`

* Check `Action`, select `Reject`

* Fill `Source`  with `172.13.8.0/24`
* Click `OK` to save and exit

5) Click menu item `Options` -> `Reload Firewalld`

DONE.

![image-20191030115139377](image-20191030115139377.png)



## 第3题

###### 自定义用户环境

在系统 system1 和 system2 上创建自定义命令为 qstat ，要求：

* 此自定义命令将执行以下命令：`/bin/ps -Ao pid`, `tt`, `user`, `fname`, `rsz`

* 此命令对系统中的所有用户有效。

```sh
[root@system1 Desktop]# vi /etc/profile
  # add an entry at the bottom, above "unset ..."
  alias qstat='/bin/ps -Ao pid,tt,user,fname,rsz'

[root@system1 Desktop]# source /etc/profile		# 重新执行 profile 中的命令而不用注销并重新登录

[root@system1 Desktop]# qstat
   PID TT       USER     COMMAND    RSZ
     1 ?        root     systemd   6412
     2 ?        root     kthreadd     0
     3 ?        root     ksoftirq     0
     5 ?        root     kworker/     0
     7 ?        root     migratio     0
     8 ?        root     rcu_bh       0
     9 ?        root     rcuob/0      0
    10 ?        root     rcuob/1      0
    11 ?        root     rcuob/2      0
...
```



## 第4题

###### 配置端口转发

在系统 system1 设定端口转发，要求：

* 在172.24.8.0/24 网络中的系统，访问system1的本地端口 5423 将被转发到 80

* 此设置必须永久有效

  

```sh
[root@desktop ~]# firewall-config	# 启动防火墙配置工具
```

* 左上角 `Configuration` 选择 `Permanment`
* 点击 `Rich Rules` 选项卡，点击左下角 `Add` 添加一条新记录
* 上方 `Family` 选择 `ipv4`
* 勾选 `Element`，选择 `forward-port`，点击其右侧 dropbox 打开 `Port Forwarding` 窗口
* `Protocol` 默认选择 `tcp`，`Port / Port` Range 输入 5423
* 去掉 `Local forwarding`，选中 `Forward to another port`
* `IP address` 填入 172.24.8.11，`Port / Port Range` 填入 80
* 点击 `OK` 保存退出
* 点击 `Source` 输入框，弹出 `Address` 窗口中填入 172.24.8.0/24
* 再次点击 `Add` 添加新记录，除了 `Protocol` 选择 `udp` 之外、其余都一样；
* 最后点击菜单 `Options`，点击菜单项 `Reload Firewalld` 即可。

![image-20191030115520511](image-20191030115520511.png)





## 第5题

###### 配置链路聚合

在 system1 和 system2 之间按以下要求设定一个链路：

* 此链路使用接口 eth1 和 eth2
* 此链路在一个接口失效时仍然能工作
* 此链路在 system1 使用下面的地址172.16.3.40/255.255.255.0
* 此链路在 system2 使用下面的地址172.16.3.45/255.255.255.0
* 此链路在系统重启之后依然保持正常状态



###### 解题方法

```sh
[root@system1 Desktop]# nm-connection-editor		# 打开网络管理器
# ... 
# 在图形界面进行添加 team connection 的操作
```

* 打开 `nm-connection-editor`

* 点击左上角 `Add` 添加新的连接，类型选择 `Team`，点击 `Create...`

![image-20191030125938708](image-20191030125938708.png)



* 在 `Editing Team Connection` 窗口中点击 `Add` 添加网卡，类型按默认的 `Ethernet`，点击 `Create`：

![image-20191030130115904](image-20191030130115904.png)

![image-20191030130249619](image-20191030130249619.png)



* 在弹出的窗口的 `Ethernet`  -> `Device MAC address`中选择 `eth1`，切换到 `General` 勾选 `Auto connect when avail`，点击 `Save` 保存退出：

![image-20191030130608294](image-20191030130608294.png)



![image-20191030130538828](image-20191030130538828.png)



* 以同样的方法添加 `eth2`；在 `JSON Config` 中填入 `{"runner":{"name":"activebackup"}}` 

![image-20191030141939228](image-20191030141939228.png)



* 切换到 `IPv4 Settings` 选项卡，选择 `Method` 为 `Manual`，点击 `Add` 添加 IP 信息，点击 `Save` 保存；

  ![image-20191030131230077](image-20191030131230077.png)

  

* 重启网络服务，测试 IP 的连通性：

```sh
[root@system1 Desktop]# systemctl restart network

[root@system1 Desktop]# ping 172.16.3.40
PING 172.16.3.45 (172.16.3.45) 56(84) bytes of data.
64 bytes from 172.16.3.45: icmp_seq=1 ttl=64 time=3.96 ms
...
```



## 第6题

###### 配置IPV6地址

在考试系统上设定接口eth0使用下列IPV6地址：

* system1 上的地址应该是 2003:ac18::305/64

- system2 上的地址应该是 2003:ac18::30a/64

- 两个系统必须能与网络 2003:ac18/64 内的系统通信

- 地址必须在重启后依然生效

- 两个系统必须保持当前的 IPv4 地址并能通信



###### 解题方法：

* 打开网络管理器，在 GUI 中进行配置；

```sh
[root@system1 Desktop]# nm-connection-editor	# 启动网络管理器
```

* 在 `Network Connections` 窗口中选中 `eth0`，点击 `Edit...` 进行编辑；
* 在 `Editing eth0` 窗口中，点击 `IPv6 Settings` 选项卡；
* 选择 `Method` 为 `Manual`，点击 `Add` 添加新地址：完成后点击 `Save...` 保存退出；

![image-20191030144143528](image-20191030144143528.png) 



* 重启网络服务，并使用 `ping6` 测试连通性：

```sh
[root@system1 Desktop]# systemctl restart network

[root@system1 Desktop]# ping6 2003:ac18::305
PING 2003:ac18::305(2003:ac18::305) 56 data bytes
64 bytes from 2003:ac18::305: icmp_seq=1 ttl=64 time=0.345 ms
64 bytes from 2003:ac18::305: icmp_seq=2 ttl=64 time=0.060 ms
...

[root@system1 Desktop]# ping6 2003:ac18::30a
PING 2003:ac18::30a(2003:ac18::30a) 56 data bytes
64 bytes from 2003:ac18::30a: icmp_seq=1 ttl=64 time=153 ms
64 bytes from 2003:ac18::30a: icmp_seq=2 ttl=64 time=70.1 ms
...
```





## 第7题

###### 配置本地邮件服务

在系统 system2 和 system1 上配置邮件服务，要求：

- 这些系统不接受外部发送来的邮件

- 在这些系统上本地发送的任何邮件都会自动路由到 mail.group8.example.com

- 从这些系统上发送的邮件显示来自于 server.group8.example.com

可以通过发送邮件到本地用户 dave 来测试配置，系统 server.group8.example.com 已经配置把此用户的邮件转到 `http://server.group8.example.com/pub/received_mail/8`



```sh
# 编辑邮件配置文件
[root@system1 Desktop]# vim /etc/postfix/main.cf		

# 大概在100行处，添加两条记录
101 local_transport = error:local			# 仅接受本地邮件
102 myorigin = server.group8.example.com	# 邮件显示来自 server.group8.example.com

# 大概在116行处，添加一条记录（注释掉原 inet_interfaces = localhost 那条）
118 inet_interfaces = loopback-only

# 大概在315行处，添加一条记录
316 relayhost = [mail.group8.example.com]	# 邮件自动路由到 mail.group8.example.com

# 防火墙允许 SMTP 服务
[root@system1 Desktop]# firewall-cmd --permanent --add-service=smtp
success
[root@system1 Desktop]# firewall-cmd --reload 
success

# 重启邮件服务，并设置自动启动
[root@system1 Desktop]# systemctl restart postfix
[root@system1 Desktop]# systemctl enable postfix

# 测试邮件服务
[root@system1 Desktop]# echo "Here is mail body" | mail -s "mail subject" dave

# 查看发送结果
[root@system1 Desktop]# curl http://server.group8.example.com/pub/received_mail/8

From root@server.group8.example.com  Wed Oct 30 15:12:27 2019
Return-Path: <root@server.group8.example.com>
X-Original-To: dave@server.group8.example.com
Delivered-To: dave@server.group8.example.com
Received: from system1.group8.example.com (system1.group8.example.com [172.24.8.11])
	by server.group8.example.com (Postfix) with ESMTP id B741F308B543
	for <dave@server.group8.example.com>; Wed, 30 Oct 2019 15:12:27 +0800 (CST)
Received: by system1.group8.example.com (Postfix, from userid 0)
	id 9878922EDCB7; Wed, 30 Oct 2019 15:12:27 +0800 (CST)
Date: Wed, 30 Oct 2019 15:12:27 +0800
To: dave@server.group8.example.com
Subject: This is mail subject
User-Agent: Heirloom mailx 12.5 7/5/10
MIME-Version: 1.0
Content-Type: text/plain; charset=us-ascii
Content-Transfer-Encoding: 7bit
Message-Id: <20191030071227.9878922EDCB7@system1.group8.example.com>
From: root@server.group8.example.com (root)

This is mail body

[root@system1 Desktop]#
```



## 第8题

###### 通过 SMB 共享目录

在 system1 上配置 SMB 服务 ，要求：

- 您的 SMB 服务器必须是 STAFF 工作组的一个成员

- 共享 /common 目录，共享名必须为 common

- 只有 group8.example.com 域内的客户端可以访问 common 共享

- common 必须是可以浏览的

- 用户 andy 必须能够读取共享中的内容，如果需要的话，验证密码是 redhat



```sh
[root@system1 ~]# yum install -y samba samba-client
[root@system1 ~]# mkdir /common
[root@system1 ~]# chcon -R -t samba_share_t /common

[root@system1 ~]# vim /etc/samba/smb.conf

# 修改 89 行的 workgroup 值为 STAFF
89         workgroup = STAFF	

# 在 320 行（文件末尾）添加如下：
321 [common]					
322         path = /common
323         hosts allow = 172.24.8.
324         browseable = yes

#####

# 设置防火墙允许 SMB 相关服务
[root@system1 ~]# firewall-cmd --permanent --add-service=samba
[root@system1 ~]# firewall-cmd --permanent --add-service=mountd
[root@system1 ~]# firewall-cmd --reload

# 重启 SMB 相关服务，并设置自动启动
[root@system1 ~]# systemctl restart smb nmb
[root@system1 ~]# systemctl enable smb nmb

# 添加 SMB 用户，设置密码 redhat
[root@system1 ~]# smbpasswd -a andy
New SMB password:
Retype new SMB password:
Added user andy.

###################### system2 ######################

[root@system2 ~]# yum install -y samba-client cifs-utils

[root@system2 ~]# smbclient -L //172.24.8.11/ -U andy
Enter andy's password: 
Domain=[STAFF] OS=[Windows 6.1] Server=[Samba 4.2.3]

	Sharename       Type      Comment
	---------       ----      -------
	common          Disk      
	IPC$            IPC       IPC Service (Samba Server Version 4.2.3)
	andy            Disk      Home Directories
Domain=[STAFF] OS=[Windows 6.1] Server=[Samba 4.2.3]

	Server               Comment
	---------            -------
	SYSTEM1              Samba Server Version 4.2.3

	Workgroup            Master
	---------            -------
	STAFF                SYSTEM1

```



## 第9题

###### 配置多用户SMB挂载

在 system1 通过 SMB 共享目录 /devops，并满足下列要求：

- 共享名为 devops

- 共享目录 devops 只能 group8.example.com 域中的客户端使用

- 共享目录 devops 必须可以被浏览

- 用户 silene 必须能以**只读**的方式访问此共享，访问密码是 redhat

- 用户 akira 必须能以**读写**的方式访问此共享，访问密码是 redhat

- 此共享目录永久挂载在 system2.group8.example.com 上的 /mnt/dev 目录，并用 silene 作为认证用户
- 任何用户都可以通过 akira 来临时获取写的权限



```sh
[root@system1 ~]# mkdir /devops
[root@system1 ~]# chcon -R -t samba_share_t /devops		# 修改目录的 SELinux 上下文安全域
[root@system1 ~]# chmod o+w /devops
# 或者：
[root@system1 ~]# setfacl -m u:akira:rwx /devops/
# 如上两条命令之一均可使得 akira 获取该目录的 写 权限

[root@system1 ~]# ll -d /devops
drwxr-xrwx. 2 root root 6 Oct 30 16:23 /devops

[root@system1 ~]# vim /etc/samba/smb.conf 
# 在文件的末尾添加如下内容：
[devops]
        path = /devops
        hosts allow = 172.24.8.	# 只能 group8.example.com 域中的客户端使用
        browseable = yes		# 使得共享目录可以被浏览
        writable = no			# 以只读的方式访问此共享
        write list = akira		# arkira 可以读写该共享目录

# 设置防火墙，重启SMB相关服务
[root@system1 ~]# firewall-cmd --permanent --add-service=samba		# 第8题已经设置
[root@system1 ~]# firewall-cmd --permanent --add-service=mountd		# 第8题已经设置
[root@system1 ~]# firewall-cmd --reload

[root@system1 ~]# systemctl restart smb nmb
[root@system1 ~]# systemctl enable smb nmb

# 创建SMB用户
[root@system1 ~]# smbpasswd -a silene
New SMB password:
Retype new SMB password:
Added user silene.

[root@system1 ~]# smbpasswd -a akira
New SMB password:
Retype new SMB password:
Added user akira.


###################### system2 ######################

[root@system2 ~]# yum install -y samba-client cifs-utils		# 在第8题中已经安装

[root@system2 ~]# smbclient -L //172.24.8.11 -U silene			# 查看system1的共享目录
Enter silene's password: 

Domain=[STAFF] OS=[Windows 6.1] Server=[Samba 4.2.3]

	Sharename       Type      Comment
	---------       ----      -------
	common          Disk      
	devops          Disk      
	IPC$            IPC       IPC Service (Samba Server Version 4.2.3)
	silene          Disk      Home Directories
Domain=[STAFF] OS=[Windows 6.1] Server=[Samba 4.2.3]

	Server               Comment
	---------            -------
	SYSTEM1              Samba Server Version 4.2.3

	Workgroup            Master
	---------            -------
	STAFF                SYSTEM1


[root@system2 ~]# smbclient -L //172.24.8.11 -U akira			# 查看system1的共享目录
Enter akira's password: 
Domain=[STAFF] OS=[Windows 6.1] Server=[Samba 4.2.3]

	Sharename       Type      Comment
	---------       ----      -------
	common          Disk      
	devops          Disk      
	IPC$            IPC       IPC Service (Samba Server Version 4.2.3)
	akira           Disk      Home Directories
Domain=[STAFF] OS=[Windows 6.1] Server=[Samba 4.2.3]

	Server               Comment
	---------            -------
	SYSTEM1              Samba Server Version 4.2.3

	Workgroup            Master
	---------            -------
	STAFF                SYSTEM1


#######################

# 将 system1 共享目录 /devops 永久挂载在 system2 的 /mnt/dev 目录上，使用 silene 作为认证用户
# 可通过用户 akira 来临时获取写的权限

[root@system2 ~]# mkdir /mnt/dev		# 创建挂载点
[root@system2 ~]# chmod o+w /mnt/dev	# 使得 akira 有写的权限

[root@system2 ~]# vim /etc/fstab		# 设置自动挂载
# 在 fstab 中添加一条记录：
//172.24.8.11/devops /mnt/dev cifs defaults,multiuser,username=silene,password=redhat,sec=ntlmssp  0 0

[root@system2 ~]# mount -a
[root@system2 ~]# df -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/sda1             9.8G  3.2G  6.7G  33% /
devtmpfs              765M     0  765M   0% /dev
tmpfs                 773M  140K  773M   1% /dev/shm
tmpfs                 773M  8.8M  765M   2% /run
tmpfs                 773M     0  773M   0% /sys/fs/cgroup
//172.24.8.11/devops  9.8G  3.2G  6.7G  33% /mnt/dev


# 测试两个 SMB 用户的访问权限

[root@system2 ~]# su - akira
su: warning: cannot change directory to /home/ldap/akira: No such file or directory
mkdir: cannot create directory '/home/ldap': Permission denied
ABRT has detected 1 problem(s). For more info run: abrt-cli list

-bash-4.2$ cd /mnt/dev
-bash-4.2$ cifscreds add 172.24.8.11
Password: 

-bash-4.2$ ll -d /mnt/dev
drwxrwxrwx+ 2 root root 0 Oct 30 21:34 /mnt/dev		# akira 有读写权限

-bash-4.2$ touch akira.txt				
-bash-4.2$ echo "I am akira" > akira.txt	
-bash-4.2$ exit
logout

[root@system2 ~]# su - silene
Last login: Wed Oct 30 20:05:01 CST 2019 on pts/0
su: warning: cannot change directory to /home/ldap/silene: No such file or directory
mkdir: cannot create directory '/home/ldap': Permission denied
ABRT has detected 1 problem(s). For more info run: abrt-cli list
-bash-4.2$ cd /mnt/dev
-bash-4.2$ cifscreds add 172.24.8.11
Password: 
-bash-4.2$ ll
total 4
-rw-r--r--. 1 akira akira 11 Oct 30 20:06 akira.txt
-bash-4.2$ cat akira.txt 
I am akira

-bash-4.2$ ll /mnt/dev
total 0
-rw-r--r--. 1 akira akira 0 Oct 30 21:42 akira.txt	# silene 仅有只读权限

-bash-4.2$ touch silene.txt
touch: cannot touch ‘silene.txt’: Permission denied		
-bash-4.2$ exit
logout
```

