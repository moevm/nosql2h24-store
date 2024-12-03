# Стадия для сборки фронтенда (React)
FROM node:18 AS build_frontend
WORKDIR /app

# Установка зависимостей и сборка фронтенда
COPY ./client/package*.json ./client/
RUN npm install --prefix client
COPY ./client/ ./client/
RUN npm run build --prefix client

# Финальный контейнер для Nginx и фронтенда
FROM nginx:alpine AS nginx_server
COPY --from=build_frontend /app/client/build /usr/share/nginx/html  
# Копируем собранный фронтенд в Nginx
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf            
# Копируем конфигурацию Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]