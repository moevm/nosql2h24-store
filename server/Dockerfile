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

# Финальный контейнер для бэкенда
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS backend
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Warehouse2.dll"]
