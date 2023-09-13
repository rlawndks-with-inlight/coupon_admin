server {
listen 80;
server_name stellaorder.com
root html;


location / {
        return 301 https://stellaorder.com$request_uri;
    }
}

server {

    listen       443 ssl;
    server_name  stellaorder.com;
    
    client_max_body_size 64M;
    
    ssl_certificate     /etc/letsencrypt/live/stellaorder.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/stellaorder.com/privkey.pem;

    location / {
       proxy_pass http://stellaorder.com:3000;

    }
 
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}