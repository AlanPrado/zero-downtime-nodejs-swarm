docker build -t my-web-app:1 .
docker stack deploy -c ./docker-compose.yml my-web-app
# docker run --rm -ti --net host jordi/ab -n 100 -c 50 http://192.168.99.100:3000/user
