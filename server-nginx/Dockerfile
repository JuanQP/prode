FROM nginx:1.25-alpine

RUN mkdir -p /usr/share/nginx/html/static
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
