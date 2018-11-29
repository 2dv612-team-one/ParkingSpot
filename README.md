# ParkingZpot

Projektet bygger på en utvecklingsmiljö med Docker och kräver med andra ord att man redan har Docker installerat på sin dator för att kunna köras. Välj att installera den version av Docker nedan som stämmer överens med ditt operativsystem.

* [Docker för Mac](https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac)  
* [Docker för Windows](https://docs.docker.com/toolbox/toolbox_install_windows/)  
* [Docker för Ubuntu](https://www.docker.com/docker-ubuntu) samt [docker-compose](https://docs.docker.com/compose/install/)

### Starta projektet med Docker - för utveckling

1. Se till att du har en `.env`-fil i samma folder som docker-compose.yml som innehåller lösenordet till email-kontot i formatet `PZPOT_GMAIL_PASSWORD=lösenord`.
2. Om det är första gången du kör upp projektet med Docker, börja med att bygga upp alla containers genom att stå i projektets rot-folder och köra kommandot `docker-compose up -d --build` i din terminal.  
_(Observera att det här kan ta en stund beroende på dator och internetuppkoppling, framför allt att bygga klienten.)_
3. Om du däremot redan har kört projektet tidigare, räcker det att du kör `docker-compose up -d` i terminalen.
4. Applikationen körs nu på `localhost:8080` (om du får fram en sida med 'Bad Gateway', så kan det bero på att containern ännu inte har hunnit starta upp - ha tålamod!).
5. När du är klar med all utveckling, stoppa alla containers genom att köra kommandot `docker-compose stop`.


#### Användbara kommandon under utveckling med docker-compose:

*_containerName_ ska alltid ersättas med namnet på den specifika containern (p_zpots för tillfället).

* `docker-compose ps` - Skriver ut en lista med alla containers som körs för tillfället. Är framför allt användbart för att kunna se nuvarande status för alla containrar (om allting körs som det ska, bör status vara _Up_).
* `docker-compose up -d containerName` - Startar en specifik Docker container.
* `docker-compose stop containerName` - Stoppar en specifik Docker container.
* `docker-compose rm -f containerName` - Tar bort en specifik Docker container.
* `docker-compose logs --tail 50 -f containerName` - Visar de senaste 50 raderna av loggarna för den specifika Docker containern.
* `docker-compose exec containerName sh` - Gå in i en specifik Docker container. Väl inne en container går det att till exempel installera npm paket eller köra automatiska tester.
* `docker rmi $(docker images -q)` - Tar bort alla Docker images som finns på datorn, även de som tillhör andra projekt. Efter det här är gjort kommer projektet att behöva byggas om på nytt.
* `docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q) && docker system prune -a -f --volumes` - Det ultimata nödkommandot och en sista utväg när ingenting fungerar som det ska - stoppar och tar bort **alla** containrar på datorn, även de som inte körs eller som tillhör andra projekt. Tar även bort **alla** volymer (dvs eventuellt sparat innehåll i databaser). Efter det här är gjort kommer projektet att behöva byggas om på nytt.

#### Tester för server
`docker-compose exec server mvn clean test`

#### Postgresql

`docker-compose exec db sh`

`psql -d pzpot_db -U pzpot`
`password: pzpot`


#### Deployment
We use a git post-receive hook to deploy code to the server. The post-receive script is included in the repo. The basic flow is that when the push is complete the post-receive script is executed and it in its turn executed the script deploy.sh For this to work for you there are two things you need to do. 
* Create a new remote where the code will be deployed.
    - `git remote add deploy_dev ubuntu@194.47.206.231:deploy` - This adds a remote that will point to the dev server.
* Execute a SSH command when you do the git push command
    - `git config --local core.sshCommand "ssh -i cloud.pem"` - This makes it so on every push or pull that uses SSH executed this command.
    What I did here was to put the cloud.pem file in the project root. I have added it to the .gitignore so it should not be included in the repo. Make sure you have the `--local` flag so you do not set this globally.
* Do the push.
    - `git push deploy_dev master` - You could technically push whatever branch you like but right know the post-receive script will only accept the master branch.
