submodule: 
	@git submodule update --recursive --remote

build: build_database build_backend build_frontend

build_database: 
	@cd ./database && docker-compose pull

build_backend: 
	@cd ./muuvy-backend && mvn install

build_frontend:
	@npm install

start_database:
	@cd ./database && docker-compose up 

start_backend:
	@cd ./muuvy-backend && mvn thorntail:run

start_frontend:
	@npm start