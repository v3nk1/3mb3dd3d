#!/bin/bash

size=
filename=
FS=ext4
LOOPDEV=/dev/loop7
MNTPOINT=/media/private

check () {

if ! test -d "$MNTPOINT" ;then
        sudo mkdir -p $MNTPOINT
	sudo chown ven:ven $MNTPOINT
fi

}

create () {

	filename=$1
	size=$2

	dd if=/dev/urandom of=$filename bs=1M count=$size
	sudo losetup -e aes $LOOPDEV $filename
	if [ $? != 0 ];then
		rm -rf $filename
		echo "Oops! Try again." && exit 10;
	fi;
	sudo mkfs -t $FS -L $filename $LOOPDEV
	if [ $? != 0 ];then
                rm -rf $filename
		sudo losetup -d $LOOPDEV
                echo "Oops! Try again." && exit 20;
        fi;
	sudo losetup -d $LOOPDEV
}

unlock_mount () {

	filename=$1

	if ! test -e "$filename" ;then
		echo "Sorry! Try Again: Cann't find requested file."
		exit 0
	fi
	
	check
	mkdir -p $MNTPOINT/$filename
	sudo mount -o loop,encryption=aes $filename $MNTPOINT/$filename

}

unmount_lock (){

	filename=$1

	if ! test -d "$MNTPOINT/$filename" ;then
		echo "Sorry! Try Again: Given isn't mouted."
		exit 0
	fi

	sudo umount -f $MNTPOINT/$filename
	rm -rf $MNTPOINT/$filename

}

case "$1" in

    create)

	if [[ $2 == */* ]];then
                echo "Sorry! slash(/) is not allowed.";
                echo "Suggision: Go to the path & have this script in that, and execute it."
                exit 1;
        fi

        echo "Creating Disk" "$2" "of $3"MB
	create $2 $3
        ;;

    open)

	if [[ $2 == */* ]];then
                echo "Sorry! slash(/) is not allowed.";
                echo "Suggistion: Go to the path & have this script in that, and execute it"
                echo "            by giving exact Disk-name."
                exit 1;
        fi
		
        echo "Opening Disk" "$2"
	unlock_mount $2
        ;;

    close)

	if [[ $2 == */* ]];then
                echo "Sorry! slash(/) is not allowed.";
                echo "Suggistion: Just give filename."
                exit 1;
        fi

	echo "Closing Disk" "$2"
	unmount_lock $2
        ;;

    *)
        echo "Usage: $0 {create <filename> <size-in-MB>|open <filename>|close <filename>}"
        exit 1
        ;;
esac

exit 0

