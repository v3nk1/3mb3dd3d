#!/bin/bash
# reference: http://wiki.beyondlogic.org/index.php?title=Cross_Compiling_ISC_dhcp_for_ARM
bold=`tput bold`
unline="\033[0m"
#bold yellow underline
BYU="\033[3;33m\033[4m${bold}"
#return to normal font {deselect all}
NORM="\033[0m"
#bold yellow
BY="\033[3;33m${bold}"

#Local env:
IW=0
WPASUPPLICANT=0
DHCLIENT=0
RFKILL=0
HOSTAPD=0

ROOTDIR=${PWD}
INSTDIR=${ROOTDIR}/Recipe
PKGDIR=${ROOTDIR}/pkg-build
LOG=${PKGDIR}/build.log

export INSTALL_DIR=${INSTDIR}
export PRE_FIX=/usr
export MY_SYSCONFDIR=/etc
export MY_LOCALSTATEDIR=/var

mkdir -p ${INSTDIR} ${PKGDIR}

${CUBIE2}      #exporting cross compile toolchain path

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
		mkdir -p ${PKGDIR}/{iw,wpa_supplicant,rfkill,dhclient,hostapd}
                cd ${PKGDIR}/iw    &&
		wget -c http://www.infradead.org/~tgr/libnl/files/libnl-3.2.24.tar.gz
		wget -c https://www.kernel.org/pub/software/network/iw/iw-3.15.tar.gz
                cd ${PKGDIR}/wpa_supplicant    &&
		apt-get source libnl-dev 
		rm -rf *.dsc *.orig.* *.debian.*
                wget -c https://www.openssl.org/source/openssl-1.0.1h.tar.gz
		wget -c http://hostap.epitest.fi/releases/wpa_supplicant-2.2.tar.gz
                cd ${PKGDIR}/rfkill    &&
		wget -c https://www.kernel.org/pub/software/network/rfkill/rfkill-0.5.tar.gz
                cd ${PKGDIR}/dhclient    &&
		wget -c ftp://ftp.isc.org/isc/dhcp/4.3.0b1/dhcp-4.3.0b1.tar.gz
		wget -c http://wiki.beyondlogic.org/patches/dhcp-4.3.0b1.bind_arm-linux-gnueabi.patch
		wget -c http://wiki.beyondlogic.org/patches/bind-9.9.5rc1.gen_crosscompile.patch
		#apt-get source isc-dhcp-client &&
		#rm -rf *.dsc *.orig.* *.debian.*
                cd ${PKGDIR}/hostapd    &&
		wget -c http://hostap.epitest.fi/releases/hostapd-2.2.tar.gz
		
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"
	elif test $1 = iw
		then
		mkdir -p ${PKGDIR}/iw
		cd ${PKGDIR}/$1    &&
		wget -c http://www.infradead.org/~tgr/libnl/files/libnl-3.2.24.tar.gz
		wget -c https://www.kernel.org/pub/software/network/iw/iw-3.15.tar.gz
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"						
	elif test $1 = wpa_supplicant
		then
		mkdir -p ${PKGDIR}/wpa_supplicant
		cd ${PKGDIR}/$1    &&
		#libnl for this shud be 1.x version.
		apt-get source libnl-dev 
		rm -rf *.dsc *.orig.* *.debian.*
                wget -c https://www.openssl.org/source/openssl-1.0.1h.tar.gz
		wget -c http://hostap.epitest.fi/releases/wpa_supplicant-2.2.tar.gz
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"
        elif test $1 = rfkill
		then
		mkdir -p ${PKGDIR}/rfkill
		cd ${PKGDIR}/$1    &&
		wget -c https://www.kernel.org/pub/software/network/rfkill/rfkill-0.5.tar.gz
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"
        elif test $1 = dhclient
		then
		mkdir -p ${PKGDIR}/dhclient
		cd ${PKGDIR}/$1    &&
		wget -c ftp://ftp.isc.org/isc/dhcp/4.3.0b1/dhcp-4.3.0b1.tar.gz
		wget -c http://wiki.beyondlogic.org/patches/dhcp-4.3.0b1.bind_arm-linux-gnueabi.patch
		wget -c http://wiki.beyondlogic.org/patches/bind-9.9.5rc1.gen_crosscompile.patch
		#apt-get source isc-dhcp-client &&
		#rm -rf *.dsc *.orig.* *.debian.*
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"
        elif test $1 = hostapd
		then
		mkdir -p ${PKGDIR}/hostapd
		cd ${PKGDIR}/$1    &&
		wget -c http://hostap.epitest.fi/releases/hostapd-2.2.tar.gz
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"
	else
                echo "Failed: Download is not found." >> $LOG
                colored_echo "Failed downloading"
                exit 0
        fi

}

libnl () {

colored_echo "Building libnl"    &&
	echo -e "\nStarted building libnl .." >> $LOG    &&
	cd ${PKGDIR}/iw
	tar -xzf libnl-3.2.24.tar.gz &&
	cd libnl-3.2.24		&&
	./configure --host=arm-linux --prefix=${PRE_FIX} \
		--sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
	make DESTDIR=${INSTDIR} -j4
	make DESTDIR=${INSTDIR} install
	#LIBNL=1  &&
	cd ../.. &&
        echo "Acomplished libnl." >> $LOG        &&
colored_echo "Acomplished libnl"

}

iw () {
	libnl &&
colored_echo "Building iw"    &&
	echo -e "\nStarted building iw .." >> $LOG    &&
	cd ${PKGDIR}/iw
	tar -xzf iw-3.15.tar.gz
	cd iw-3.15	&&
	#export PKG_CONFIG=${INSTDIR}/usr/lib/pkgconfig
	export CC="arm-linux-gcc -I${INSTDIR}/usr/include -L${INSTDIR}/usr/lib"
	make DESTDIR=${INSTDIR} -j4 &&
	make DESTDIR=${INSTDIR} install &&
	IW=1  &&
	cd ../.. &&
        echo "Acomplished iw." >> $LOG        &&
colored_echo "Acomplished iw."

}

libnl1x () {

colored_echo "Building libnl-1.x"    &&                                                                
        echo -e "\nStarted building libnl-1.x .." >> $LOG    &&
        cd ${PKGDIR}/wpa_supplicant
	#tar -xzf libnl-1.1.4.tar.gz
	cd libnl-1.1
	./configure --host=arm-linux --prefix=${PRE_FIX} \
		--sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
        export CC=arm-linux-gcc
        export PKG_CONFIG_PATH=${INSTDIR}/usr/lib/pkgconfig
        make DESTDIR=${INSTDIR} -j4 &&
        make install DESTDIR=${INSTDIR} -j4 &&
	#LIBNL1=1
        cd ../.. &&
        echo "Acomplished libnl-1.x." >> $LOG        &&
colored_echo "Acomplished libnl-1.x."

}

openssl () {

colored_echo "Building openssl"    &&                                                                
        echo -e "\nStarted building openssl .." >> $LOG    &&
        cd ${PKGDIR}/wpa_supplicant
	tar -xzf openssl-1.0.1h.tar.gz 
        cd openssl-1.0.1h
	export ARCH=arm
	export CROSS_COMPILE=arm-linux-
	./configure --host=arm-linux --prefix=${PRE_FIX} \
                --sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
        export CC=arm-linux-gcc
        export PKG_CONFIG_PATH=${INSTDIR}/usr/lib/pkgconfig
	mkdir -p ${INSTDIR}/etc/ssl                                                                     
        ./Configure dist --prefix=${PRE_FIX} --openssldir=/etc/ssl && 
        make CC="arm-linux-gcc" AR="arm-linux-ar r" RANLIB="arm-linux-ranlib" INSTALL_PREFIX=${INSTALL_DIR} -j4 
        make CC="arm-linux-gcc" AR="arm-linux-ar r" RANLIB="arm-linux-ranlib" INSTALL_PREFIX=${INSTALL_DIR} -j4 &&
        make INSTALL_PREFIX=${INSTDIR} install &&
        cd ..   &&
#        OPENSSL=1 &&
        echo "Acomplished openssl." >> $LOG        &&
colored_echo "Acomplished openssl"

}

wpa_supplicant () {
        libnl1x &&
	openssl &&
colored_echo "Building wpa_supplicant"    &&
        echo -e "\nStarted building wpa_supplicant .." >> $LOG    &&
        cd ${PKGDIR}/wpa_supplicant
        tar -xzf wpa_supplicant-2.2.tar.gz
        cd wpa_supplicant-2.2/wpa_supplicant     &&
	cp defconfig .config
        export PKG_CONFIG=${INSTDIR}/usr/lib/pkgconfig
	make CC="arm-linux-gcc -I${INSTDIR}/usr/include -L${INSTDIR}/usr/lib" -j4 &&
	make install DESTDIR=${INSTDIR} -j4 &&
        WPASUPPLICANT=1  &&
        cd ../.. &&
        echo "Acomplished wpa_supplicant." >> $LOG        &&
colored_echo "Acomplished wpa_supplicant."

}

rfkill () {

colored_echo "Building rfkill"    &&                                                                
        echo -e "\nStarted building rfkill .." >> $LOG    &&
        cd ${PKGDIR}/rfkill
	tar -xzf rfkill-0.5.tar.gz
	cd rfkill-0.5/
	make CC=arm-linux-gcc &&
	make install DESTDIR=${INSTDIR} -j4 &&
        cd ../.. &&
	RFKILL=1
        echo "Acomplished rfkill" >> $LOG        &&
colored_echo "Acomplished rfkill"

}

hostapd () {

colored_echo "Building hostapd"    &&                                                                
        echo -e "\nStarted building hostapd .." >> $LOG    &&
        cd ${PKGDIR}/hostapd
        tar -xzf hostapd-2.2.tar.gz
	cd hostapd-2.2/hostapd &&
	cp defconfig .config
        make CC="arm-linux-gcc -I${INSTDIR}/usr/include -L${INSTDIR}/usr/lib" &&
        make install DESTDIR=${INSTDIR} -j4 &&
        cd ../.. &&
        HOSTAPD=1
        echo "Acomplished hostapd" >> $LOG        &&
colored_echo "Acomplished hostapd"

}

dhclient () {

colored_echo "Building dhclient"    &&                                                                              
echo -e "\nStarted building dhclient .." >> $LOG    &&
        cd ${PKGDIR}/dhclient
        tar xvf dhcp-4.3.0b1.tar.gz &&
	cd dhcp-4.3.0b1 &&
	### if source is not dhcp-4.3.0b1.tar.gz
	#sed '7623s/exit 1/printf removed_exit_by_ven/' -i configure
	#sed '7623s/exit 1/printf removed_exit_by_ven/' -i configure
	sed '6432s/as_fn_error/echo/' -i configure
        ./configure --host=arm-linux --prefix=${PRE_FIX} \
                --sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
	#Insert a line before a pattern.
	#sed "/configure --disable-kqueue/i \sed '22069s/as_fn_error/echo/' -i bind/bind-9.8.3/configure &&" -i bind/Makefile
	#Insert a line before a pattern with tab.
	#sed "/configure --disable-kqueue/i \\\t\tsed '22069s/as_fn_error/echo/' -i bind-9.8.3/configure && \\\\" -i bind/Makefile &&
	sed "/configure --disable-kqueue/i \\\t\tsed '14817s/as_fn_error/echo/' -i bind-9.9.5rc1/configure && \\\\" -i bind/Makefile &&
	sed "/configure --disable-kqueue/i \\\t\tsed '171s/CC/BUILD_CC/' -i bind-9.9.5rc1/lib/export/dns/Makefile.in && \\\\" -i bind/Makefile &&
	sed 's/configure --disable-kqueue/configure --host=arm-linux --disable-kqueue BUILD_CC=gcc --with-randomdev=\/dev\/random/' -i bind/Makefile &&
	#export BUILD_CC=arm-linux-gcc &&
	#export CC=arm-linux-gcc &&
	unset CC && unset BUILD_CC &&
	make CC=arm-linux-gcc &&
        make install DESTDIR=${INSTDIR} -j4 &&
        cd ../.. &&
        DHCLIENT=1
        echo "Acomplished dhclient" >> $LOG        &&
colored_echo "Acomplished dhclient"

}

check_build_success () {

        colored_echo "BUILDING LOG:"
        check_pkgsuccess $IW iw
        check_pkgsuccess $WPASUPPLICANT wpa_supplicant
        check_pkgsuccess $RFKILL rfkill
        check_pkgsuccess $HOSTAPD hostapd
        check_pkgsuccess $DHCLIENT dhclient

}
################################################################################

case "$1" in
    make-all)
        $0 clean-build    &&
        download_pkg	all  &&
        iw
	wpa_supplicant
	dhclient
	rfkill
	hostapd
	check_build_success
        date >> $LOG
        ;;
    make-iw)
        download_pkg iw	&&
        iw 
        check_build_success
        date >> $LOG
        ;;
    make-wpa_supplicant)
        download_pkg	wpa_supplicant &&
        wpa_supplicant 
        check_build_success
        date >> $LOG
        ;;
    
    make-rfkill)
        download_pkg	rfkill &&
        rfkill
        check_build_success
        date >> $LOG

	;;
    make-dhclient)
        download_pkg dhclient &&
        dhclient
        check_build_success
        date >> $LOG
	;;
    make-hostapd)
        download_pkg	hostapd &&
        hostapd
        check_build_success
        date >> $LOG
	;;
    clean-build)
	#shopt -s extglob 
        cd ${PKGDIR}/
	#rm -rf !(.tar)
        ;;
    *)
        echo "Usage: $0 {make-all|make-iw|make-wpa_supplicant|make-rfkill|make-dhclient|make-hostapd|clean-build}"
        exit 1
        ;;
esac


#################################################################################
