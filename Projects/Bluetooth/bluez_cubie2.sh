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
LIBFFI=0
GETTEXT=0
GLIB=0
EXPAT=0
DBUS=0
LIBICAL=0
NCURSES=0
READLINE=0
BLUEZ=0
OBEX=0

ROOTDIR=${PWD}
INSTDIR=${ROOTDIR}/Recipe
PKGDIR=${ROOTDIR}/pkg-build
LOG=${PKGDIR}/build.log

${CUBIE2}	#exporting cross compile toolchain path

export INSTALL_DIR=${INSTDIR}
export PRE_FIX=/usr
export MY_SYSCONFDIR=/etc
export MY_LOCALSTATEDIR=/var

mkdir -p ${INSTDIR} ${PKGDIR}
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


#pkg_check () {
#
#	 if test -e zlib*.tar*
#        if test -e libffi*.tar*
#        if test -e gettext*.tar*
#        if test -e glib*.tar*
#        if test -e expat*.tar*
#        if test -e dbus*.tar*
#        if test -e libical*.tar*
#        if test -e ncurses*.tar*
#        if test -e readline*.tar*			
#        if test -e bluez*.tar* 
#
#}

down_bluez() {

##bluez
	wget -c http://zlib.net/zlib-1.2.8.tar.gz       &&                                                          wget -c www.mirrorservice.org/sites/sourceware.org/pub/libffi/libffi-3.1.tar.gz &&
	wget -c http://ftp.gnu.org/pub/gnu/gettext/gettext-0.19.1.tar.xz        &&
	wget -c http://ftp.gnome.org/pub/gnome/sources/glib/2.40/glib-2.40.0.tar.xz     &&
	wget -c http://sourceforge.net/projects/expat/files/expat/2.1.0/expat-2.1.0.tar.gz      &&
	wget -c http://dbus.freedesktop.org/releases/dbus/dbus-1.8.0.tar.gz     &&
	wget -c http://downloads.sourceforge.net/freeassociation/libical-1.0.tar.gz     &&
	wget -c http://ftp.gnu.org/pub/gnu/ncurses/ncurses-5.9.tar.gz   &&
	wget -c ftp://ftp.cwru.edu/pub/bash/readline-6.3.tar.gz &&
	wget -c http://www.kernel.org/pub/linux/bluetooth/bluez-5.20.tar.xz


}


down_obex () {

#pre-requisites on host                                                                     
	apt-get install obexftp libopenobex1-dev libusb-dev
	#obex-ftp
	apt-get source libusb-dev
	apt-get source libopenobex1-dev
	apt-get source obexftp
	#obex-fs
	wget -c -O fuse-2.9.3.tar.gz downloads.sourceforge.net/project/fuse/fuse-2.X/2.9.3/fuse-2.9.3.tar.gz?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Ffuse%2F%3Fsource%3Dtyp_redirect&ts=1409211723&use_mirror=cznic &&
	wget -c pkgs.fedoraproject.org/repo/pkgs/obexfs/obexfs-0.12.tar.gz/0f505672b025cdb505e215ee707a2e2f/obexfs-0.12.tar.gz
	#removing junk
	rm -rf *dsc* *diff* *debian* *orig* *ubuntu*

}

download_pkg () {

	#pkg_check

        cd ${PKGDIR}    &&
	if test $1 = all
		then 
		colored_echo "Downloading packages(all)"
		echo -e "\nChecking/Downloading packages(all) .." >> $LOG    &&
		down_bluez
		down_obex
		echo "Acomplished Checking/Downloading(all) packages." >> $LOG        &&
		colored_echo "Accomplished downloading(all)"	
	elif test $1 = obex
		then
		colored_echo "Downloading packages(obex)"
		echo -e "\nChecking/Downloading packages(obex) .." >> $LOG    &&
		down_obex
		echo "Acomplished Checking/Downloading(obex) packages." >> $LOG        &&
		colored_echo "Accomplished downloading(obex)"	
	elif test $1 = bluez
		then
		colored_echo "Downloading packages(bluez)"
		echo -e "\nChecking/Downloading packages(bluez) .." >> $LOG    &&
                down_bluez
                echo "Acomplished Checking/Downloading(bluez) packages." >> $LOG        &&
                colored_echo "Accomplished downloading(bluez)"
	else
		echo "Failed: Download is not found." >> $LOG
		colored_echo "Failed downloading"	
		exit 0	
	fi
	cd ..
}

zlib () {

colored_echo "Building zlib"	&&
	echo -e "\nStarted building zlib .." >> $LOG	&&
        cd ${PKGDIR}    &&
	tar -xvf zlib-1.2.8.tar.gz &&
	cd zlib-1.2.8	&&
	CC=arm-linux-gcc CFLAGS="-O4" ./configure --prefix=${PRE_FIX} --sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
	make DESTDIR=${INSTALL_DIR} -j4	&&
	make DESTDIR=${INSTALL_DIR} install &&
	cd ..	&&
	ZLIB=1	&&
	echo "Acomplished zlib." >> $LOG	&&
colored_echo "Acomplished zlib"	
	
}

libffi () {

colored_echo "Building libffi"	&&
	echo -e "\nStarted building libffi .." >> $LOG &&
        cd ${PKGDIR}    &&
	tar -xvf libffi*	&&
	cd libffi*	&&
	./configure --host=arm-linux --prefix=${PRE_FIX} --sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
	make DESTDIR=${INSTALL_DIR} -j4	&&
	make DESTDIR=${INSTALL_DIR} install	&&
        cd ..	&&
	LIBFFI=1	&&
	echo "Acomplished libffi." >> $LOG      &&
colored_echo "Acomplished libffi"	

}

gettext () {

colored_echo "Building gettext"	&&
	echo -e "\nStarted building gettext .." >> $LOG &&
        cd ${PKGDIR}    &&
	tar -xvf gettext*	&&
	cd gettext*	&&
	./configure --host=arm-linux --prefix=${PRE_FIX} --sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
	make DESTDIR=${INSTALL_DIR} -j4	&&
        make DESTDIR=${INSTALL_DIR} install	&&
        cd ..	&&
	GETTEXT=1	&&
	echo "Acomplished gettext." >> $LOG      &&
colored_echo "Acomplished gettext"	

}

glib () {

sudo apt-get install libglib2.0-dev	&&

colored_echo "Building glib"	&&
	echo -e "\nStarted building glib .." >> $LOG &&
        cd ${PKGDIR}    &&
	tar -xvf glib-*	&&
	cd glib-*	&&
	./configure --host=arm-linux --prefix=${PRE_FIX} \
	--sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} \
	PKG_CONFIG_PATH=${INSTDIR}/usr/lib/pkgconfig  \
	CC="arm-linux-gcc -L${INSTDIR}/usr/lib -I${INSTDIR}/usr/include" \
	glib_cv_stack_grows=no glib_cv_uscore=yes ac_cv_func_posix_getpwuid_r=yes \
	ac_cv_func_posix_getgrgid_r=yes	&&
	make LIBFFI_CFLAGS=-I${INSTDIR}/usr/lib/libffi-3.1/include DESTDIR=${INSTALL_DIR} -j4	&&
	make DESTDIR=${INSTALL_DIR} install	&&
	cd ..	&&
	GLIB=1	&&
	echo "Acomplished glib." >> $LOG      &&
colored_echo "Acomplished glib"	

}

expat () {

colored_echo "Building expat"	&&
	echo -e "\nStarted building expat .." >> $LOG &&
        cd ${PKGDIR}    &&
	tar -xvzf expat-*	&&
	cd expat*	&&
	./configure --host=arm-linux --prefix=${PRE_FIX}	\
	--sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
	make DESTDIR=${INSTALL_DIR} -j4	&&
        make DESTDIR=${INSTALL_DIR} install &&
        cd ..	&&
	EXPAT=1	&&
	echo "Acomplished expat." >> $LOG      &&
colored_echo "Acomplished expat"	

}

dbus () {

colored_echo "Building Dbus"	&&
	echo -e "\nStarted building Dbus .." >> $LOG &&
        cd ${PKGDIR}    &&
	tar -xzvf dbus-*	&&
	cd dbus*	&&
	export PKG_CONFIG_LIBDIR=${INSTDIR}/usr/lib/pkgconfig	&&
	echo ac_cv_have_abstract_sockets=yes > arm-linux.cache	&&
	./configure --host=arm-linux --prefix=${PRE_FIX} \
	--sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} \
	CC="arm-linux-gcc -L${INSTDIR}/usr/lib -I${INSTDIR}/usr/include -lexpat" \
	--cache-file=arm-linux.cache	&&
	make GLIB_CFLAGS="-I${INSTDIR}/usr/lib/glib-2.0/include -I${INSTDIR}/usr/include/glib-2.0"	\
	DESTDIR=${INSTALL_DIR} -j4	&&
        make DESTDIR=${INSTALL_DIR} install	&&
        cd ..	&&
	DBUS=1	&&
	echo "Acomplished Dbus." >> $LOG      &&
colored_echo "Acomplished Dbus"	

}


libical () {

sudo apt-get install cmake	&&

colored_echo "Building libical"	&&
	echo -e "\nStarted building libical .." >> $LOG &&
        cd ${PKGDIR}    &&
	tar -xzvf libical* &&
	cd libical*	&&
	export CC=arm-linux-gcc	&&
	export CXX=arm-linux-g++	&&
	cmake -DCMAKE_INSTALL_PREFIX=/usr	&&
	make DESTDIR=${INSTALL_DIR} -j4	&&
        make DESTDIR=${INSTALL_DIR} install	&&
        cd ..	&&
	LIBICAL=1	&&
	echo "Acomplished libical." >> $LOG      &&
colored_echo "Acomplished libical"	

}

ncurses () {

colored_echo "Building ncurses"	&&
	echo -e "\nStarted building ncurses .." >> $LOG &&
        cd ${PKGDIR}    &&
	tar -xvf ncurses*	&&
	cd ncurses*	&&
	./configure --host=arm-linux --prefix=${PRE_FIX} CXX="arm-linux-g++"	\
	--sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
	make DESTDIR=${INSTALL_DIR} -j4	&&
        make DESTDIR=${INSTALL_DIR} install	&&
        cd ..	&&
	NCURSES=1	&&
	echo "Acomplished ncurses." >> $LOG      &&
colored_echo "Acomplished ncurses"

}

readline () {

colored_echo "Building readline"	&&
	echo -e "\nStarted building readline .." >> $LOG &&
        cd ${PKGDIR}    &&
	tar -xvzf readline*	&&
	cd readline*	&&
	./configure --host=arm-linux --prefix=${PRE_FIX} \
	--sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} \
	bash_cv_wcwidth_broken=yes	&&
	make CC="arm-linux-gcc -L${INSTDIR}/usr/lib -I${INSTDIR}/usr/include -lc" \
	DESTDIR=${INSTALL_DIR} -j4	&&
	# SHLIB_LIBS=-lncurses Shud be removed for cubie2 Xcompile 
	# SHLIB_LIBS=-lncurses DESTDIR=${INSTALL_DIR} -j4	&&
        make DESTDIR=${INSTALL_DIR} install	&&
        cd ..	&&
	READLINE=1	&&
	echo "Acomplished readline." >> $LOG      &&
colored_echo "Acomplished readline"	

}

bluez () {

colored_echo "Building Bluez"		&&
	echo -e "\nStarted building Bluez .." >> $LOG &&
        cd ${PKGDIR}    &&
	tar -xvf bluez-*	&&
	cd bluez-*	&&
	./configure --host=arm-linux --prefix=${PRE_FIX}	\
	--sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} \
	LIBS="-lncurses" PKG_CONFIG_PATH=${INSTDIR}/usr/lib/pkgconfig        \
	--disable-systemd --disable-udev --disable-cups  --enable-library         \
	GLIB_CFLAGS="-I${INSTDIR}/usr/lib/glib-2.0/include -I${INSTDIR}/usr/include/glib-2.0"             \
	CC="arm-linux-gcc -L${INSTDIR}/usr/lib -I${INSTDIR}/usr/include -lc" \
	DBUS_CFLAGS="-I${INSTDIR}/usr/lib/dbus-1.0/include -I${INSTDIR}/usr/include/dbus-1.0"	&&

	make DESTDIR=${INSTALL_DIR} -j4	&&
        make DESTDIR=${INSTALL_DIR} install	&&
        cd ..	&&
	BLUEZ=1	&&
	echo "Acomplished Bluez." >> $LOG      &&
colored_echo "Acomplished Bluez"
	cd $ROOTDIR

}
			#######################
build_libusb () {

colored_echo "Building libusb"
	echo -e "\nStarted building libusb .." >> $LOG    &&
        cd ${PKGDIR}    &&
	cd libusb* &&
	./configure --host=arm-linux --sysconfdir=${MY_SYSCONFDIR} --prefix=${PRE_FIX}	\
			--localstatedir=${MY_LOCALSTATEDIR}				\
			OPENOBEX_LIBS=-L${INSTDIR}/usr/lib 				\
			BLUETOOTH_LIBS=-L${INSTDIR}/usr/lib 				\
			OPENOBEX_CFLAGS=-I${INSTDIR}/usr/include 			\
			BLUETOOTH_CFLAGS=-I${INSTDIR}/usr/include
	make DESTDIR=${INSTALL_DIR} -j4 &&
        make DESTDIR=${INSTALL_DIR} install &&
	cd ..   &&
        echo "Acomplished libusb." >> $LOG        &&
colored_echo "Acomplished libusb"


}

build_libopenobex () {

colored_echo "Building libopenobex"
	echo -e "\nStarted building openobex .." >> $LOG    &&
        cd ${PKGDIR}    &&
	cd libopenobex* &&
	sed 's/test "$cross_compiling" = yes \&\&/test "$cross_compiling" = * \&\&/' -i configure
	./configure --host=arm-linux --sysconfdir=${MY_SYSCONFDIR} --prefix=${PRE_FIX}	\
		--localstatedir=${MY_LOCALSTATEDIR} 	\
		PKG_CONFIG_PATH=${INSTDIR}/usr/lib/pkgconfig	\
		 CC="arm-linux-gcc -I${INSTDIR}/usr/include/ -L${INSTDIR}/usr/lib"
	make DESTDIR=${INSTALL_DIR} -j4 &&
        make DESTDIR=${INSTALL_DIR} install &&
	cd ..   &&
        echo "Acomplished libopenobex." >> $LOG        &&
colored_echo "Acomplished libopenobex"

}

build_obexftp () {

colored_echo "Building obexftp"    &&
        echo -e "\nStarted building obexftp .." >> $LOG    &&
	build_libusb
	build_libopenobex
        cd ${PKGDIR}    &&
        cd obexftp* &&
	./configure --host=arm-linux --sysconfdir=${MY_SYSCONFDIR} --prefix=${PRE_FIX} \
	--localstatedir=${MY_LOCALSTATEDIR} \
	CC="arm-linux-gcc -L${INSTDIR}/usr/lib -L${INSTDIR}/usr/lib -I${INSTDIR}/usr/include/ -I${INSTDIR}/usr/include/ -lusb" 			\
	OPENOBEX_LIBS="-L${INSTDIR}/usr/lib -lopenobex" 			\
	--disable-perl --disable-python --disable-ruby --disable-tcl CFLAGS="-L${INSTDIR}/usr/lib" &&	
	mv /usr/lib/libopenobex.so /	&&
	cp ${INSTDIR}/usr/lib/libusb.la -Rfp /usr/lib/ &&
	
	make DESTDIR=${INSTALL_DIR} PKG_CONFIG_PATH=${INSTDIR}/usr/lib/pkgconfig -j4 &&
	
	cp obexftp/.libs/libobexftp.a obexftp/.libs/libobexftp.lai	&&
	cp multicobex/.libs/libmulticobex.a multicobex/.libs/libmulticobex.lai	&&

	make DESTDIR=${INSTALL_DIR} install	&&
	
	mv /libopenobex.so /usr/lib		&&
	rm -rf /usr/lib/libusb.la		&&
	
        cd ..   &&
        echo "Acomplished obexftp." >> $LOG        &&
colored_echo "Acomplished obexftp"

}

build_libfuse () {

colored_echo "Building libfuse"
	echo -e "\nStarted building libfuse .." >> $LOG    &&
        cd ${PKGDIR}    &&
	tar -xvf fuse-2.9.3*
	cd fuse* &&
	./configure --host=arm-linux --sysconfdir=${MY_SYSCONFDIR} --prefix=${PRE_FIX} \
	--localstatedir=${MY_LOCALSTATEDIR} \
	CC="arm-linux-gcc -L${INSTDIR}/usr/lib -L${INSTDIR}/usr/lib -I${INSTDIR}/usr/include/ -I${INSTDIR}/usr/include"        &&
	make DESTDIR=${INSTALL_DIR} -j4 &&
        make DESTDIR=${INSTALL_DIR} install &&
	cd ..   &&
        echo "Acomplished libfuse." >> $LOG        &&
colored_echo "Acomplished libfuse"

}

build_obexfs () {

colored_echo "Building obexfs"
	echo -e "\nStarted building obexfs .." >> $LOG    &&
	build_libfuse
        cd ${PKGDIR}    &&
	tar -xvf obexfs*
	cd obexfs* &&
	./configure --host=arm-linux --sysconfdir=${MY_SYSCONFDIR} --prefix=${PRE_FIX} \
        --localstatedir=${MY_LOCALSTATEDIR} \
	CC="arm-linux-gcc -L${INSTDIR}/usr/lib -L${INSTDIR}/usr/lib -I${INSTDIR}/usr/include/ -I${INSTDIR}/usr/include"        &&
	make DESTDIR=${INSTALL_DIR} -j4 &&
        make DESTDIR=${INSTALL_DIR} install &&
        cd ..   &&
        echo "Acomplished obexfs." >> $LOG        &&
colored_echo "Acomplished obexfs"

}

make_initd_script () {

        if test $BLUEZ = 1 && test $OBEX = 1 
        then
                mkdir -p ${INSTDIR}${MY_SYSCONFDIR}/init.d &&
#### bluetoothd
                (echo -n "#!" && echo "/bin/sh") | tee > ${INSTDIR}${MY_SYSCONFDIR}/init.d/bluetoothd &&
		echo "### BEGIN INIT INFO
# Provides: bluetoothd
# Default-Start:     
# Default-Stop:      
# Short-Description: Starts or stops the bluetoothd daemon.
### END INIT INFO

NAME=bluetoothd
DAEMON=/usr/libexec/bluetooth/\$NAME
PIDFILE=/var/run/\$NAME.pid

# This --compat will allows you to add sdptool service otherwise
# Failed to connect to SDP server on FF:FF:FF:00:00:00: No such file or directory
BLUEZ_OPS=\"--compat\"

if ! test -x \"\$DAEMON\" ;then 
	echo \$DAEMON\": Not found or no execution permission\"
	exit 0
fi

case \"\$1\" in
    start)
	#/etc/init.d/dbus start
	rm -rf \$PIDFILE
	if [ ! -e \$PIDFILE ]; then
		/etc/init.d/dbus start
	        echo \"Starting daemon\" \"\$NAME\"
		start-stop-daemon --start --quiet --oknodo -m --pidfile \"\$PIDFILE\" --exec \"\$DAEMON\" -- \${BLUEZ_OPS} &
		/usr/bin/hciconfig hci0 up
	else 
		echo \"\$NAME-deamon is running.\"	
	fi
	#/usr/bin/hciconfig hci0 up
       	 ;;
    stop)
	if [ -e \$PIDFILE ]; then
	        echo \"Stopping daemon\" \"\$NAME\"
		#start-stop-daemon --stop --quiet --oknodo --name bluetoothd --pidfile \"\$PIDFILE\"
		start-stop-daemon --stop --quiet --oknodo --pidfile \"\$PIDFILE\"
		rm -rf \$PIDFILE
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
		echo \"Bluetoothd is upon running\"
	else
		echo \"Bluetoothd is not running\"
        fi
        ;;
    *)
        echo \"Usage: /etc/init.d/bluetoothd {start|stop|restart|force-reload|status}\"
        exit 1
        ;;
esac

exit 0" >> ${INSTDIR}${MY_SYSCONFDIR}/init.d/bluetoothd
	chmod +x ${INSTDIR}${MY_SYSCONFDIR}/init.d/bluetoothd
echo "Made init.d script in ${INSTDIR}${MY_SYSCONFDIR}/init.d/bluetoothd" >> $LOG        &&
colored_echo "Made init.d script in ${INSTDIR}${MY_SYSCONFDIR}/init.d/bluetoothd"

####### dbus 
	(echo -n "#!" && echo "/bin/sh") | tee > ${INSTDIR}${MY_SYSCONFDIR}/init.d/dbus &&
	echo "### BEGIN INIT INFO
# Provides: dbus
# Default-Start:     
# Default-Stop:      
# Short-Description: Starts or stops the sshd daemon.
### END INIT INFO

NAME=dbus-daemon
DAEMON=/usr/bin/\$NAME
#if dbus giving connection refused then give PIDFILE=/var/run/dbus/\$NAME.pid
PIDFILE=/var/run/\$NAME.pid

# It restrict dbus-daemon to create pid file in /var/run/dbus/pid
OPS=--nopidfile

if ! test -x \"\$DAEMON\" ;then 
	echo \$DAEMON\": Not found or no execution permission\"
	exit 0
fi

gen_group_passwd () {

	touch /etc/group /etc/passwd
	mkdir -p /home/messagebus /root

	if ! grep -q root \"/etc/group\"; then
		echo \"Creating /etc/group and adding entries ... \"
		addgroup -S root
	fi

	if ! grep -q messagebus \"/etc/group\"; then
		echo \"Adding group messagebus to /etc/group ..\"
		addgroup -S messagebus
	fi

	if ! grep -q root \"/etc/passwd\"; then
		echo \"Creating /etc/passwd and adding entries ... \"
		adduser root -G root -u 0 -D -h /root
		echo \"Enter Passwd for root: \"
		passwd
	fi

	if ! grep -q messagebus \"/etc/passwd\"; then
		echo \"Adding user messagebus to /etc/passwd ..\"	
		adduser -S messagebus -G messagebus
	fi
}

case \"\$1\" in
    start)
	rm -rf \$PIDFILE
	if [ ! -e \$PIDFILE ]; then
	        echo \"Starting daemon\" \"\$NAME\"
		gen_group_passwd
		#rm -rf /var/run/dbus/pid
		start-stop-daemon --start --quiet --oknodo -m --pidfile \"\$PIDFILE\" --exec \$DAEMON -- --system \${OPS}
		#dbus-daemon --system
	else
		echo \"\$NAME-deamon is running.\"
	fi
        ;;
    stop)
	if [ -e \$PIDFILE ]; 
	then
	        echo \"Stopping daemon\" \"\$NAME\"
		# Here i'm using name for stopping b'coz its been a garbage value in pid file created by
		# start-stop-daemon
		start-stop-daemon --stop --quiet --oknodo --name \"dbus-daemon\"
		#rm -fr /var/run/dbus/pid
		rm -rf \$PIDFILE
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
		echo \"dbus-daemon is upon running\"
	else
		echo \"dbus-daemon is not running\"
        fi
        ;;
    *)
        echo \"Usage: /etc/init.d/dbus {start|stop|restart|force-reload|status}\"
        exit 1
        ;;
esac

exit 0" >> ${INSTDIR}${MY_SYSCONFDIR}/init.d/dbus &&
chmod +x ${INSTDIR}${MY_SYSCONFDIR}/init.d/dbus  	
echo "Made init.d script in ${INSTDIR}${MY_SYSCONFDIR}/init.d/dbus" >> $LOG        &&
colored_echo "Made init.d script in ${INSTDIR}${MY_SYSCONFDIR}/init.d/dbus"
	fi

}

check_build_success () {

	colored_echo "BUILDING LOG:"
	check_pkgsuccess $ZLIB zlib
	check_pkgsuccess $LIBFFI libffi
	check_pkgsuccess $GETTEXT gettext
	check_pkgsuccess $GLIB glib
	check_pkgsuccess $EXPAT expat
	check_pkgsuccess $DBUS dbus
	check_pkgsuccess $LIBICAL libical
	check_pkgsuccess $NCURSES "ncurses"
	check_pkgsuccess $READLINE "readline"
	check_pkgsuccess $BLUEZ bluez
	check_pkgsuccess $OBEX obex


}


################################################################################

case "$1" in
    make-bluez)
	$0 clean-build bluez   &&
	download_pkg bluez &&
	zlib		&&
	libffi		&&
	gettext    &&
	glib    &&
	expat    &&
	dbus    &&
	libical    &&
	ncurses    &&
	readline    &&
	bluez
	make_initd_script
	check_build_success
	date >> $LOG	
        ;;
    make-init-scripts)
	BLUEZ=1
	OBEX=1
	make_initd_script
	
	;;
    make-bluez-obex)
	$0 clean-build all  &&
	download_pkg obex    &&
	$0 make-bluez	&&
	date >> ${LOG}
	build_obexftp	&&
	build_obexfs
	make_initd_script
	OBEX=1
	check_build_success
	date >> $LOG	
        ;;
    clean-build)
	case "$2" in
    		all)
			rm -rf ${PKGDIR}/*
			;;
		bluez)
			rm -rf ${PKGDIR}/{bluez-5.20,dbus-1.8.0,gettext-0.19.1,expat-2.1.0,glib-2.40.0,libffi-3.1,libical-1.0,ncurses-5.9,readline-6.3,zlib-1.2.8}
		;;
		obex)
			#rm -rf ${PKGDIR}
		;;
		*)
		;;
	esac
        ;;
    *)
        echo "Usage: $0 {make-bluez|make-bluez-obex|make-init-scripts|clean-build}"
        exit 1
        ;;
esac


#################################################################################
