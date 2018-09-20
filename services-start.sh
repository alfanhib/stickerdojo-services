echo "Starting stickerdojo-users service"
pm2 start stickerdojo-users/bin/www --name admin
echo "Starting stickerdojo-auth service"
pm2 start stickerdojo-auth/bin/www --name auth