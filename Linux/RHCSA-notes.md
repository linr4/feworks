# RHCSA

> root / redhat
>
> grade / qq5156770



## 第1题

配置 Linux 运行在 enforcing 模式

```sh
# vi /etc/selinux/config
  SELINUX=enforcing
  SELINUXTYPE=targeted
```



## 第2题

配置默认软件仓库：http://rhgls.domain1.example.com/rhel

```sh
# vi /etc/yum.repos.d/rhcsa.repo
  [rhcsa]
  name=rhcsa repo
  baseurl=http://rhgls.domain1.example.com/rhel
  enabled=1
  gpgcheck=0
  
# yum repolist all
```



## 第3题

调整逻辑卷 lv0 的容量：

* 调整后逻辑卷和文件系统大小为290 MB
* 调整后文件系统内容不能破坏
* 调整后允许误差在 270 ~ 320 MB 之间
* 调整后挂载目录不变

```sh
[root@desktop yum.repos.d]# lvdisplay
  --- Logical volume ---
  LV Path                /dev/vg0/lv0
  LV Name                lv0
  VG Name                vg0
  LV UUID                iqQ7BM-M19R-6vG3-8mRG-igJ6-cMaE-WpmT5J
  LV Write Access        read/write
  LV Creation host, time localhost.localdomain, 2016-07-24 19:36:42 +0800
  LV Status              available
  # open                 1
  LV Size                300.00 MiB
  Current LE             75
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:0

[root@desktop yum.repos.d]# lvscan
  ACTIVE            '/dev/vg0/lv0' [300.00 MiB] inherit
  
[root@desktop yum.repos.d]# lvextend -L 310M /dev/vg0/lv0
  Rounding size to boundary between physical extents: 312.00 MiB
  Size of logical volume vg0/lv0 changed from 300.00 MiB (75 extents) to 312.00 MiB (78 extents).
  Logical volume lv0 successfully resized.
  
[root@desktop yum.repos.d]# blkid /dev/vg0/lv0
/dev/vg0/lv0: UUID="b2285e5e-de78-4392-945a-817843fd7f10" TYPE="ext3"

[root@desktop yum.repos.d]# xfs_growfs /dev/vg0/lv0
xfs_growfs: /dev/vg0/lv0 is not a mounted XFS filesystem

[root@desktop yum.repos.d]# resize2fs /dev/vg0/lv0
resize2fs 1.42.9 (28-Dec-2013)
Filesystem at /dev/vg0/lv0 is mounted on /home; on-line resizing required
old_desc_blocks = 2, new_desc_blocks = 2
The filesystem on /dev/vg0/lv0 is now 319488 blocks long.

[root@desktop yum.repos.d]# df -h
Filesystem           Size  Used Avail Use% Mounted on
/dev/sda1            9.8G  3.3G  6.5G  34% /
devtmpfs             660M     0  660M   0% /dev
tmpfs                674M     0  674M   0% /dev/shm
tmpfs                674M  8.9M  666M   2% /run
tmpfs                674M     0  674M   0% /sys/fs/cgroup
/dev/mapper/vg0-lv0  299M  2.1M  282M   1% /home
tmpfs                135M     0  135M   0% /run/user/0

[root@desktop yum.repos.d]# lvdisplay
  --- Logical volume ---
  LV Path                /dev/vg0/lv0
  LV Name                lv0
  VG Name                vg0
  LV UUID                iqQ7BM-M19R-6vG3-8mRG-igJ6-cMaE-WpmT5J
  LV Write Access        read/write
  LV Creation host, time localhost.localdomain, 2016-07-24 19:36:42 +0800
  LV Status              available
  # open                 1
  LV Size                312.00 MiB
  Current LE             78
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:0

[root@desktop yum.repos.d]# lvscan
  ACTIVE            '/dev/vg0/lv0' [312.00 MiB] inherit
[root@desktop yum.repos.d]#
```



## 第4题

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
[root@desktop ~]#

```



## 第5题

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

[root@desktop tmp]# chmod -x fstab			# 任何人均没有执行权限

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

```



## 第6题

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



## 第7题

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



## 第8题

###### 升级系统内核

从 http://server.group8.example.com/pub/ 下找到需要升级的内核，同时满足下列要求：

* 当系统重新启动之后，升级的内核要作为默认的内核

*  原来的内核要被保留，并且仍然可以正常启动

```sh
[root@desktop ~]# vi /etc/yum.repos.d/update.repo

[update]
name=update kernel
baseurl=http://server.group8.example.com/pub
enabled=1
gpgcheck=0

[root@desktop ~]# yum clean all
Loaded plugins: langpacks, product-id, search-disabled-repos, subscription-manager
 Cleaning repos: update
Cleaning up everything

[root@desktop ~]# yum update kernel -y
Loaded plugins: langpacks, product-id, subscription-manager
Package kernel-3.10.0-123.el7.x86_64 already installed and latest version
Nothing to do
```



## 第9题

###### 绑定外部验证服务

系统 server.group8.example.com 提供了一个 LDAP 验证服务。您的系统需要按照以下要求绑定到这个服务上：

* 验证服务器的基本 DN 是：dc=group8,dc=example,dc=com

* 账户信息和验证信息都是由 LDAP 提供

* 连接需要使用证书加密，整数可以在下面的链接中下载：
     http://server.group8.example.com/pub/cacert.pem

当正确完成配置后，用户 thales 可以登录系统，登录密码是 redhat

```sh
[root@desktop ~]# yum -y install openldap openldap-clients sssd authconfig-gtk
[root@desktop ~]# authconfig-gtk	# 需要在 GUI 中配置； startx
Unable to initialize graphical environment. Most likely cause of failure
is that the tool was not run using a graphical environment. Please either
start your graphical user interface or set your DISPLAY variable.
```

![image-20191028204032051](C:\Users\linr4\Desktop\image-20191028204032051.png)

```sh
[root@desktop ~]# id thales
uid=2001(thales) gid=2001(thales) groups=2001(thales)
[root@desktop ~]# ssh thales@localhost
```



## 第10题

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
[root@desktop ~]# mkdir -p /home/ldap/thales

[root@desktop ~]# vi /etc/auto.master
/home/ldap /etc/auto.ldap
  
[root@desktop ~]# vi /etc/auto.ldap
* -fstype=nfs,vers=3 server.group8.example.com:/rhome/&

[root@desktop ~]# systemctl restart autofs
[root@desktop ~]# systemctl enable autofs
[root@desktop ~]# ssh thales@localhost
```



## 第11题

###### 配置 NTP

配置您的系统时间与服务器 server.group8.example.com 同步，要求系统重启后依然生效；

```sh
[root@desktop /]# yum install chronyd

[root@desktop /]# vi /etc/chrony.conf
  # comment out unused servers, then add a new server:
  server server.group8.example.com iburst

[root@desktop /]# systemctl restart chronyd
[root@desktop /]# systemctl enable chronyd

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



## 第n题

###### 创建一个归档

创建一个名为 /root/sysconfig.tar.bz2 的归档文件，其中包含了 /etc/sysconfig 目录中的内容，tar 归档文件必须使用 bzip2 进行压缩。

```sh
[root@desktop ~]# tar jcvf sysconfig.tar.bz2 /etc/sysconfig

```



## 第12题

###### 配置一个用户帐号

请创建一个名为 jay 的用户，并满足以下要求：

* 用户 id 为3456

* 密码为 glegunge

```sh
[root@desktop ~]# useradd jay -u 3456
[root@desktop ~]# passwd jay
Changing password for user jay.
New password:
BAD PASSWORD: The password is shorter than 9 characters
Retype new password:
passwd: all authentication tokens updated successfully.
[root@desktop ~]#

```



## 第13题

###### 添加一个 swap 分区

在您的系统中添加一个新的 swap 分区，并满足以下要求：

* swap 分区容量为 512 MiB

* 当您的系统启动时，swap 分区应该可以自动挂载

* 不要移除或者修改其他已经存在于您的系统中的 swap 分区