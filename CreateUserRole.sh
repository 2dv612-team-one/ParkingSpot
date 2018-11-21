#!/bin/bash

echo --- ParkinsZpot Role Management ---
echo

PREFIX="ROLE_"

function askUser {
    echo Type -q to exit or -l to list all roles!
    echo Enter the rolename you would like to add:
    read roleName

    if [ -z $roleName ]; then

        echo Empty string not allowed please give the role a name!
        echo
        askUser
        
    elif [ $roleName = "-l" ]; then

        docker-compose exec db sh -c "psql -d pzpot_db -U pzpot -c \"SELECT * from roles\""
        askUser
        
    elif [ $roleName = "-q"  ]; then

        echo Bye Bye!
        exit

    else 
        docker-compose exec db sh -c "psql -d pzpot_db -U pzpot -c \"INSERT INTO public.roles(name) VALUES('$PREFIX$roleName');\""

        echo You added role: $roleName to the database
        echo
        askUser         
    fi 
}

askUser