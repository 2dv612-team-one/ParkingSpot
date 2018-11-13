FROM jhipster/jhipster

USER root

ENV PATH_APP=/home/jhipster/app

COPY app/package*.json $PATH_APP/
WORKDIR $PATH_APP/
RUN npm install && npm install --only=dev

COPY ./app/ $PATH_APP/

CMD ["./mvnw"]