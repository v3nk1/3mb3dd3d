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
        if test -e ./down       
                then
                cp ./down ${PKGDIR}	&&
			cd ${PKGDIR}	&&
			./down		&&
			rm -rf down
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"
        else
                echo "Failed: Download script is not found." >> $LOG
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
        download_pkg    &&
        zlib    &&
        openssl    &&
        openssh
        check_build_success
        date >> $LOG
        ;;
    make-openssh)
        $0 clean-build    &&
        download_pkg    &&
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
