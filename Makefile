include .env

.PHONY: run
run:
	docker run -d \
	-p ${DB_PORT}:${DB_PORT} \
	-v ${PWD}/data:/var/lib/postgresql/data \
	-e POSTGRES_USER=${DB_USER} \
	-e POSTGRES_PASSWORD=${DB_PASS} \
	-e POSTGRES_DB=${DB_NAME} \
	--name ${DB_CONTAINER} \
	${DB_IMAGE}:${DB_VERSION}

.PHONY: start
start:
	docker start ${DB_CONTAINER}

.PHONY: stop
stop:
	docker stop ${DB_CONTAINER}

.PHONY: logs
logs:
	docker logs ${DB_CONTAINER}

.PHONY: restart
restart: docker restart ${DB_CONTAINER}

.PHONY: terminal
terminal:
	docker exec -it ${DB_CONTAINER} bash

.PHONY: wipe-all
wipe-all:
	docker rm -fv ${DB_CONTAINER} && \
	rm -rf data

.PHONY: remove-modules
remove-modules:
	rm -rf node_modules
