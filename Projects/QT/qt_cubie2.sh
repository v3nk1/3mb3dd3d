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
TSLIB=0
QT=0

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
                cd ${PKGDIR}    &&
#		wget -c www.mirrorservice.org/sites/download.qt-project.org/archive/qt/4.8/4.8.5/qt-everywhere-opensource-src-4.8.5.tar.gz &&
		git clone http://github.com/kergoth/tslib.git &&
		wget -c http://zlib.net/zlib-1.2.8.tar.gz &&
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"
	elif test $1 = tslib
		then
		cd ${PKGDIR}    &&
		git clone http://github.com/kergoth/tslib.git &&
		echo "Acomplished Checking/Downloading packages." >> $LOG       
                colored_echo "Accomplished downloading"						
	elif test $1 = zlib
		then
		cd ${PKGDIR}    &&
		wget -c http://zlib.net/zlib-1.2.8.tar.gz &&
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

tslib () {                                                                                                    
colored_echo "Building tslib"    &&
        echo -e "\nStarted building tslib .." >> $LOG    &&
        cd tslib   &&
	./autogen-clean.sh && ./autogen.sh &&
	echo "ac_cv_func_malloc_0_nonnull=yes" > arm-linux.autogen &&
	export CC=arm-linux-gcc && export CXX=arm-linux-g++ && 
	export CONFIG_SITE=arm-linux.autogen && 
	./configure --build=i386-linux --host=arm-linux --target=arm \
		--enable-static --enable-shared --prefix=${PRE_FIX} \
		--sysconfdir=${MY_SYSCONFDIR} --localstatedir=${MY_LOCALSTATEDIR} &&
        make DESTDIR=${INSTALL_DIR} -j4 &&
        make DESTDIR=${INSTALL_DIR} install &&
	unset CC && unset CXX &&
        cd ..   &&
        TSLIB=1  &&
        echo "Acomplished tslib." >> $LOG        &&
colored_echo "Acomplished tslib"

}
qt-4.8.5 () {

colored_echo "Building qt-4.8.5"    &&
        echo -e "\nStarted building qt-4.8.5 .." >> $LOG    &&
	tar xvf qt-everywhere-opensource-src-4.8.5.tar.gz &&
        cd qt-everywhere-opensource-src-4.8.5 &&
echo "#
# qmake configuration for building with arm-linux-g++
#

include(../../common/linux.conf)
include(../../common/gcc-base-unix.conf)
include(../../common/g++-unix.conf)
include(../../common/qws.conf)

# Here in QMAKE_CC like variables you shud give the Cross-
# compiled toolchain for target.
# or We can mention Entire path where the target toolchain 
# has intalled, if the path is not exported.
# Example: QMAKE_CC  = /embedd/mini2440/Toolchain/buildroot-
#          2014.03/output/host/usr/bin/arm-linux-gcc

QMAKE_CC  = arm-linux-gcc
QMAKE_CXX  = arm-linux-g++
QMAKE_LINK = arm-linux-g++
QMAKE_LINK_SHLIB = arm-linux-g++

QMAKE_AR  = arm-linux-ar cqs
QMAKE_OBJCOPY  = arm-linux-objcopy
QMAKE_STRIP  = arm-linux-strip

# Give the path to installed tslib build directory, Otherwise tslib test failed error thrown.	

QMAKE_INCDIR  += ${INSTALL_DIR}/usr/include
QMAKE_LIBDIR  += ${INSTALL_DIR}/usr/lib

#To reduce ld type of errors; like undefined reference to ts_open, ts_close 

QMAKE_LFLAGS += -Wl,-rpath-link=${INSTALL_DIR}/usr/lib

load(qt_config)
"	> mkspecs/qws/linux-arm-g++/qmake.conf &&
	
	(echo -e "o\nyes\n") | ./configure -embedded arm -xplatform qws/linux-arm-g++ -prefix ${PRE_FIX} \
		-sysconfdir ${MY_SYSCONFDIR} -qt-mouse-tslib -little-endian -no-pch &&
	make INSTALL_ROOT=${INSTALL_DIR} -j4 &&
	make INSTALL_ROOT=${INSTALL_DIR} install
	cd ..   &&
	QT=1 &&
        echo "Acomplished qt-4.8.5." >> $LOG        &&
colored_echo "Acomplished qt-4.8.5"
}

check_build_success () {

        colored_echo "BUILDING LOG:"
        check_pkgsuccess $ZLIB zlib
        check_pkgsuccess $TSLIB tslib
        check_pkgsuccess $QT qt-4.8.5

}
################################################################################

case "$1" in
    make-all)
        $0 clean-build    &&
        download_pkg	all  &&
        zlib    &&
        tslib    &&
        qt-4.8.5
        check_build_success
        date >> $LOG
        ;;
    make-tslib)
	rm -rf tslib*
        download_pkg	tslib	&&
        tslib    
        check_build_success
        date >> $LOG
        ;;
    make-zlib)
	rm -rf zlib-1.2.8 
        download_pkg	zlib	&&
        zlib    
        check_build_success
        date >> $LOG
        ;;
    clean-build)
        rm -rf ${PKGDIR}/{zlib-1.2.8,tslib,qt-everywhere-opensource-src-4.8.5}
        ;;
    *)
        echo "Usage: $0 {make-all|make-tslib|make-zlib|clean-build}"
        exit 1
        ;;
esac


#################################################################################
