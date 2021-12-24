git pull
rm -r ./build/
npm run build
rm -r /var/www/tt/html/*
cp -r ./build/* /var/www/tt/html/
