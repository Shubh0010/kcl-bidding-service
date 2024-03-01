# Installation

- docker pull redis

- docker pull phpmyadmin/phpmyadmin

- docker pull mysql:latest

- docker run --name dev-mysql -e MYSQL_ROOT_PASSWORD=pass123 -p 3306:3306 -d mysql:latest

- docker run --name dev-phpmyadmin -d --link dev-mysql:db -p 7098:80 phpmyadmin/phpmyadmin

- docker run --name dev-redis -p 6379:6379 -d redis:latest
