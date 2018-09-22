echo "Starting stickerdojo-users service"
cd stickerdojo-users
npm run dev

echo "Starting stickerdojo-auth service"
cd stickerdojo-auth
npm run dev

echo "Starting stickerdojo-sticker service"
cd stickerdojo-sticker
npm run dev