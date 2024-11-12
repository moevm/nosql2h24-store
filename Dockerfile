# Стадия для сборки фронтенда (React)
FROM node:18 AS build_frontend
WORKDIR /app

# Установка зависимостей и сборка фронтенда
COPY ./client/package*.json ./client/
RUN npm install --prefix client
COPY ./client/ ./client/
RUN npm run build --prefix client

# Стадия для бэкенда (ASP.NET)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build_backend
WORKDIR /src

# Копируем проект и восстанавливаем зависимости для бэкенда
COPY ["server/Warehouse2.csproj", "server/"]
RUN dotnet restore "server/Warehouse2.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "server/Warehouse2.csproj" -c Release -o /app/build

# Стадия для публикации бэкенда
FROM build_backend AS publish
RUN dotnet publish "server/Warehouse2.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Финальный контейнер для Nginx и фронтенда
FROM nginx:alpine AS nginx_server
COPY --from=build_frontend /app/client/build /usr/share/nginx/html  
# Копируем собранный фронтенд в Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf            
# Копируем конфигурацию Nginx
EXPOSE 80

# Финальный контейнер для бэкенда
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS backend
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "Warehouse2.dll"]
