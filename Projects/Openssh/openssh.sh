#!/bin/bash

bold=`tput bold`
unline="\033[0m"
#bold yellow underline
BYU="\033[3;33m\033[4m${bold}"
#return to normal font {deselect all}
NORM="\033[0m"
#bold yellow
BY="\033[3;33m${bold}"

#Local env:
ZLIB=0
OPENSSH=0
OPENSSL=0

ROOTDIR=${PWD}
INSTDIR=${ROOTDIR}/Recipe
PKGDIR=${ROOTDIR}/pkg-build
LOG=${PKGDIR}/build.log

export INSTALL_DIR=${INSTDIR}
export PRE_FIX=/usr
export MY_SYSCONFDIR=/etc
export MY_LOCALSTATEDIR=/var

mkdir -p ${INSTDIR} ${PKGDIR}

${PEXP_MINI}      #exporting cross compile toolchain path

date > ${LOG}

colored_echo () {
# 1. The arguments what you've passed to function can accessed form $1, $2, $3 so-on..
# 2. The arguments what you've passed while running the script form terminal are different if you want to access
#  them in side the funtion then only you shud pass them aslo to your function as an arguments.
echo -e ${BYU}"\n$1"${unline}${BY}" .."${NORM}

}

check_pkgsuccess () {

        if [ $1 -ne 1 ];
        then
                colored_echo $2": Package build failed";
        else
                colored_echo $2": Package build Sucess"
        fi
}

download_pkg () {

        colored_echo "Downloading packages"
        echo -e "\nChecking/Downloading packages .." >> $LOG    &&
        if test $1 = all       
                then
			cd ${PKGDIR}	&&
			wget -c http://zlib.net/zlib-1.2.8.tar.gz &&
                        wget -c https://www.openssl.org/source/openssl-1.0.1h.tar.gz &&
			wget -c ftp://ftp.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-6.6p1.tar.gz &&
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"
        else
                echo "Failed: Download is not found." >> $LOG
                colored_echo "Failed downloading"
                exit 0
        fi

}

zlib () {

colored_echo "Building zlib"    &&
        echo -e "\nStarted building zlib .." >> $LOG    &&
        tar -xvf zlib-1.2.8.tar.gz &&
        cd zlib-1.2.8   &&
        CC=arm-linux-gcc CFLAGS="-O4" ./configure --prefix=${PRE_FIX} --sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
        make DESTDIR=${INSTALL_DIR} -j4 &&
        make DESTDIR=${INSTALL_DIR} install &&
        cd ..   &&
        ZLIB=1  &&
        echo "Acomplished zlib." >> $LOG        &&
colored_echo "Acomplished zlib"

}

openssl () {

colored_echo "Building openssl"    &&
        echo -e "\nStarted building openssl .." >> $LOG    &&
        tar -xvf openssl*.tar* &&
        cd openssl*   &&
	mkdir -p ${INSTALL_DIR}/etc/ssl
	./Configure dist --prefix=${PRE_FIX} --openssldir=/etc/ssl && 
	make CC="arm-linux-gcc" AR="arm-linux-ar r" RANLIB="arm-linux-ranlib" INSTALL_PREFIX=${INSTALL_DIR} -j4 
	make CC="arm-linux-gcc" AR="arm-linux-ar r" RANLIB="arm-linux-ranlib" INSTALL_PREFIX=${INSTALL_DIR} -j4 &&
	make INSTALL_PREFIX=${INSTALL_DIR} install &&
        cd ..   &&
	OPENSSL=1 &&
	echo "Acomplished openssl." >> $LOG        &&
colored_echo "Acomplished openssl"

}

openssh () {

colored_echo "Building openssh"    &&
        echo -e "\nStarted building openssh .." >> $LOG    &&
        tar -xvf openssh*.tar* &&
        cd openssh*   &&
	./configure --host=arm-linux --prefix=/usr --sysconfdir=${MY_SYSCONFDIR}/ssh \
	--localstatedir=${MY_LOCALSTATEDIR} --disable-strip \
	CC="arm-linux-gcc -L${INSTALL_DIR}/usr/lib -I${INSTALL_DIR}/usr/include" AR="arm-linux-ar"	&&

	## Removing these strings 'check-config' and '$(STRIP_OPT)' in entire file.
	cp Makefile Makefile.old
	sed 's/check-config//' -i Makefile	&&
	sed 's/$(STRIP_OPT)//' -i Makefile	&&

	make DESTDIR=${INSTALL_DIR} -j4 &&
	make DESTDIR=${INSTALL_DIR} install &&
        cd ..   &&
        OPENSSH=1  &&
        echo "Acomplished openssh." >> $LOG        &&
colored_echo "Acomplished openssh"

}

make_initd_script () {

        if test $ZLIB = 1 && test $OPENSSL = 1 && test $OPENSSH = 1 ;
        then
                mkdir -p ${INSTDIR}${MY_SYSCONFDIR}/init.d &&
		(echo -n "#!" && echo "/bin/sh") | tee > ${INSTDIR}${MY_SYSCONFDIR}/init.d/ssh
		echo "### BEGIN INIT INFO
# Provides:          sshd
# Default-Start:     
# Default-Stop:      
# Short-Description: Starts or stops the sshd daemon.
### END INIT INFO

NAME=sshd
DAEMON=/usr/sbin/\$NAME
PIDFILE=/var/run/\$NAME.pid
SYSCONF_DIR=/etc/ssh

PASSWD=letmein

if ! test -x \"\$DAEMON\" ;then 
	echo \$DAEMON\": Not found or no execution permission\"
	exit 0
fi

gen_ssh_hostkeys () {

	if [ ! -e \${SYSCONF_DIR}/ssh_host_key -o 				\
		! -e \${SYSCONF_DIR}/ssh_host_dsa_key -o				\
		! -e \${SYSCONF_DIR}/ssh_host_rsa_key -o				\
		! -e \${SYSCONF_DIR}/ssh_host_ecdsa_key -o			\
		! -e \${SYSCONF_DIR}/ssh_host_ed25519_key ];	then
		rm -rf \${SYSCONF_DIR}/ssh_host*
		echo \"Generating Keys ...\"
		ssh-keygen -q -t rsa1 -f \${SYSCONF_DIR}/ssh_host_key -N \"\"          &&
		ssh-keygen -q -t dsa -f \${SYSCONF_DIR}/ssh_host_dsa_key -N \"\"       &&
		ssh-keygen -q -t rsa -f \${SYSCONF_DIR}/ssh_host_rsa_key -N \"\"       &&
		ssh-keygen -q -t ecdsa -f \${SYSCONF_DIR}/ssh_host_ecdsa_key -N \"\"   &&
		ssh-keygen -q -t ed25519 -f \${SYSCONF_DIR}/ssh_host_ed25519_key -N \"\" ;
	fi

}

gen_ssh_id_rsa () {

	if [ ! -d /root -o ! -d /root/.ssh -o ! -e /root/.ssh/id_rsa ];	then
		echo \"Generating id_rsa ...\"
		mkdir -p /root/.ssh
		(echo -e \"\n\n\n\") | ssh-keygen
		rm -rf /etc/ssh_host_*
		gen_ssh_hostkeys
	
	fi

}

group_passwd () {

	touch /etc/group /etc/passwd

	if ! grep -q root \"/etc/group\"; then
		echo \"Creating /etc/group and adding entries ... \"
		addgroup -S root
	fi

	if ! grep -q root \"/etc/passwd\"; then
		echo \"Creating /etc/passwd and adding entries ... \"
		adduser root -G root -u 0 -D -h /root
		#echo \"Enter Passwd for root: \"
		echo \"Pre-chosen Passwd for root: letmein\"
		#passwd hard-coded
		(echo -e \"${PASSWD}\n${PASSWD}\") | passwd
	fi

	if ! grep -q sshd \"/etc/passwd\"; then
		echo \"Adding sshd user to passwd ...\"
		mkdir -p /var/run
		adduser sshd -G root -D -h /var/run/sshd -s /usr/sbin/nologin
		#sshd:x:117:65534::/var/run/sshd:/usr/sbin/nologin
	fi
}

_start () {

	if ! test -d /dev/pts	;then :
		# These below 2 steps are necessary for ssh connection to HOST
		echo \"Mounting devpts to /dev/pts\"
		mkdir -p /dev/pts
		mount -t devpts devpts  /dev/pts
	fi

	group_passwd
	gen_ssh_id_rsa
	gen_ssh_hostkeys

}


case \"\$1\" in
    start)
	rm -rf \$PIDFILE
	if [ ! -e \$PIDFILE ]; then
	        echo \"Starting daemon\" \"\$NAME\"
		_start
		start-stop-daemon --start --quiet --oknodo -m --pidfile \"\$PIDFILE\" --exec \"\$DAEMON\"
		#echo \$?
	else
		echo \"\$NAME-daemon is running.\"
	fi
        ;;
    stop)
	if [ -e \$PIDFILE ]; then
	        echo \"Stopping daemon\" \"\$NAME\"
		start-stop-daemon --stop --quiet --oknodo --pidfile \"\$PIDFILE\"
		rm -rf \$PIDFILE
	        #echo \$?
	else
		echo \"\$NAME-daemon is not running.\"
	fi
        ;;
    restart|force-reload)
        \$0 stop
        \$0 start
        ;;
    status)
        if [ -e \$PIDFILE ] ; then
		echo \"SSH is upon running\"
	else
		echo \"SSH is not running\"
        fi
        ;;
    *)
        echo \"Usage: \$0 {start|stop|restart|force-reload|status}\"
        exit 1
        ;;
esac

exit 0" >> ${INSTDIR}${MY_SYSCONFDIR}/init.d/ssh
		chmod +x ${INSTDIR}${MY_SYSCONFDIR}/init.d/ssh
		echo "Made init.d script in ${INSTDIR}${MY_SYSCONFDIR}/init.d/ssh" >> $LOG        &&
		colored_echo "Made init.d script in ${INSTDIR}${MY_SYSCONFDIR}/init.d/ssh"
	fi
}

check_build_success () {

        colored_echo "BUILDING LOG:"
        check_pkgsuccess $ZLIB zlib
        check_pkgsuccess $OPENSSL openssl
        check_pkgsuccess $OPENSSH openssh

}

################################################################################

case "$1" in
    make-all-install)
        $0 clean-build    &&
        download_pkg  all &&
        zlib    &&
        openssl    &&
        openssh
	make_initd_script
        check_build_success
        date >> $LOG
        ;;
    make-openssh)
        $0 clean-build    &&
        download_pkg  all  &&
        zlib    &&
        openssl    &&
        openssh
        check_build_success
        date >> $LOG
        ;;
    clean-build)
	cd ${PKGDIR}
        rm -rf zlib-1.2.8 openssl-1.0.1h openssh-6.6p1
	cd ..
        ;;
    *)
        echo "Usage: $0 {make-all-install|make-openssh|clean-build}"
        exit 1
        ;;
esac


#################################################################################
