# Стадия для сборки фронтенда (React)
FROM node:18 AS build_frontend
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY ./client/package*.json ./client/
RUN npm install --prefix client

# Копируем все файлы фронтенда
COPY ./client/ ./client/
WORKDIR /app/client
EXPOSE 3000
CMD ["npm", "start"]

# Стадия для бэкенда (ASP.NET)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build_backend
WORKDIR /src

# Копируем проект бэкенда и восстанавливаем зависимости
COPY ["server/Warehouse2.csproj", "server/"]
RUN dotnet restore "server/Warehouse2.csproj"

# Копируем все остальные файлы бэкенда
COPY . .
WORKDIR "/src"
RUN dotnet build "server/Warehouse2.csproj" -c Release -o /app/build

# Стадия для публикации проекта службы (бэкенда)
FROM build_backend AS publish
RUN dotnet publish "server/Warehouse2.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Финальный контейнер для работы приложения (бэкенд)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS backend
WORKDIR /app
EXPOSE 8080

# Копируем скомпилированное приложение с бэкенда
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Warehouse2.dll"]
