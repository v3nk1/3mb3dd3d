#!/bin/bash

check () {

	if ! test -e $1
	then
		echo "Error! $1: No such file found"
		exit 1
	fi
	if [ -z $2 ];then
		echo "Error!, Usage: $0 <file> <cmd>";
		exit 2;
	fi
}


check $1 $2 
while read line
do
	cmd=$2
	red=$line 
#	echo "Text read from file: $red" 

	$cmd $red --no-playlist
	
	if [ $? != 0 ];then 
		echo "$red" >> faildlog;
	fi;

done < $1
