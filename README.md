# nosql_template


## Предварительная проверка заданий

<a href=" ./../../../actions/workflows/1_helloworld.yml" >![1. Согласована и сформулирована тема курсовой]( ./../../actions/workflows/1_helloworld.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/2_usecase.yml" >![2. Usecase]( ./../../actions/workflows/2_usecase.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/3_data_model.yml" >![3. Модель данных]( ./../../actions/workflows/3_data_model.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/4_prototype_store_and_view.yml" >![4. Прототип хранение и представление]( ./../../actions/workflows/4_prototype_store_and_view.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/5_prototype_analysis.yml" >![5. Прототип анализ]( ./../../actions/workflows/5_prototype_analysis.yml/badge.svg)</a> 

<a href=" ./../../../actions/workflows/6_report.yml" >![6. Пояснительная записка]( ./../../actions/workflows/6_report.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/7_app_is_ready.yml" >![7. App is ready]( ./../../actions/workflows/7_app_is_ready.yml/badge.svg)</a>

## Запуск приложения

1. Поднять контейнеры с помощью команды 
```
docker-compose up --build
```
или
```
docker-compose build –no-cache
docker compose up
```
2. Авторизоваться.

## Данные для авторизации

Клиент (минимальный доступ):
```
Логин: novak@mail.ru
Пароль: novak
```

Администратор (полный доступ):
```
Логин: rybkov@mail.ru
Пароль: 1234
```

Директор (доступ клиента + статика + тестовое большое количество арендованных ячеек):
```
Логин: polina@mail
Пароль: 8278
```

Работник (доступ клиента + видит список всех ячеек, чтобы обслуживать):
```
Логин: anna@etu.ru
Пароль: anna19
```

Владелец бизнеса (доступ клиента + видит статистику):
```
Логин: mark@mail.ru
Пароль: 123mark
```

> [!NOTE]
> Файл для проверки импорта находится по адресу:
> 
> server/test_data/import.json
