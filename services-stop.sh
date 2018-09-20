echo "Stoping stickerdojo-users service"
pm2 stop stickerdojo-users/bin/www --name admin
echo "Stoping stickerdojo-auth service"
pm2 stop stickerdojo-auth/bin/www --name auth