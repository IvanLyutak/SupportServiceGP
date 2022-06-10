# Документация разработчика

## Порядок развертывания

1. Если у вас не установлен yarn

```bash
npm install --global yarn
```

2. Загрузка пакетов:

```bash
yarn
```

3. Запросить у разработчика файлы firebaseConfig.js и serviceAccountKey.json. Поместить их в папку `src`

4. Запуск:
```bash
yarn start
```

  Приложение откроется в отдельном окне, как Desktop приложение, дублирующее [http://localhost:3000](http://localhost:3000)

5. Cоздание приложения для производства в папке `build`.

```bash
yarn build
```
## Архитектура приложения



## Используемые библиотеки
  
  [Bootstrap 5.1.3](https://getbootstrap.com)
  
  [Firebase 9.5.0](https://yandex.ru/search/?lr=213&text=firebase+node+js)
  
  [Firebase Admin 10.2.0](https://firebase.google.com/support/release-notes/admin/node)
  
  [MBDReact 5.2.0](https://mdbootstrap.com/support/cat/react/)
  
  [Notify.js 3.0.0](https://www.npmjs.com/package/notifyjs)
  
  [nw-react-scripts 4.0.4](https://www.npmjs.com/package/nw-react-scripts)
  
  [React 17.0.2](https://reactjs.org)
  
  [React Bootstrap 2.0.2](https://react-bootstrap.github.io)
  
  [react-moment 1.1.2](https://www.npmjs.com/package/react-moment)
  
  [react-yandex-maps 4.6.0](https://reactjsexample.com/yandex-maps-api-bindings-for-react/)
  
  [snmp-native 1.2.0](https://yandex.ru/search/?text=snmp-native&lr=213)

# Документация пользователя

## Авторизация администратора

Для входа в приложение необходимо пройти авторизацию с использованием логина и пароля. Получить статус администратора можно обратившись к @IvanLyutak

![Авторизация](https://github.com/IvanLyutak/Images/blob/main/Авторизация.png)

## Посещаемость паркингов

На данной странице отображается информация о посещаемости паркингов пользователями. Время бронирования, заезда и выезда указано по МСК.

![Посещаемость паркингов](https://github.com/IvanLyutak/Images/blob/main/Посещаемость%20паркингов.png)

## Транзакции

Для просмотра отчетов по проведенным транзакциям необходимо:

1. Выбрать адрес паркинга
2. Выбрать месяц за который необходимо получить отчет
3. Нажать кнопку `Найти`

![Транзакции](https://github.com/IvanLyutak/Images/blob/main/Транзакции.png)

## Операционный центр

На этой странице администратору доступны инструменты по отслеживанию и исправлению ошибок и поломок в системе General Parking. Для получения отчета по случившимся неисправностям необходимо либо нажать кнопку `Смотреть`, либо метку на карте.

![Операционный центр](https://github.com/IvanLyutak/Images/blob/main/Операционный%20центр.png)

Для осуществления перезагрузки сетевых устройств на объекте, необходимо нажать кнопку перезагрузки напротив соотвествующего паркинга в таблице. Далее выбрать действие, ввести пароль администратора и нажать `Перезагрузить`

![Перезагрузка устройств](https://github.com/IvanLyutak/Images/blob/main/Перезагрузка%20устройств.png)

Обратите внимание!

Необходимо предварительно настроить VPN клиент для подключения к локальным сетям объектов. Установление сети осуществляется автоматически. Некоторые VPN требуют подключения в ручном режиме.

## Чат со службой поддержки

Администратору доступен чат с пользователями.

Слева - список пользователей, от которых пришли сообщения в службу поддержки.

Справа - окно с чатом и строка для ввода текста сообщения. 

![Чат](https://github.com/IvanLyutak/Images/blob/main/Чат.png)

## Пользователи

На данном экране администратору доступен просмотр всей информации о пользователе. 

Поля "Баланс аккаунта" и "Номер авто" доступны для редактирования. Для этого необходимо нажать кнопку `Изменить`, далее ввести текст и нажать `Сохранить`.

Время бронирования, заезда и выезда указано по МСК.

Для симуляции заезда и выезда пользователей необходимо последовательно нажать на кнопку `Пропустить`. 

Для сброса бронирования - `Удалить`

![Пользователи](https://github.com/IvanLyutak/Images/blob/main/Пользователи.png)

Для удаления пользователя необходимо нажать кнопку `Удалить пользователя` и ввести пароль администратора

# Общая архитектура проекта General Parking

<p align="center"> <img src="https://github.com/IvanLyutak/Images/blob/main/Архитектура.png" width="75%"> </p>

# Обобщенная топология сети General Parking на паркингах

<p align="center"> <img src="https://github.com/IvanLyutak/Images/blob/main/Топология.png" width="75%"> </p>

# Полезные ссылки проекта General Parking

[Репозиторий программы мониторинга медиасервера](https://github.com/IvanLyutak/MonitoringMediaServer)

[Репозиторий программы мониторинга сетевых устройств](https://github.com/IvanLyutak/MonitoringServer)

[Документация пользователя базы данных](https://docs.google.com/document/d/1DQVeUMXectKqXcjGpcQl4quEwg8TSSHiw9SurNDWKJg/edit)

[Презентация проекта](https://docs.google.com/presentation/d/16-eHbvozZKoFUfgVn2WLcvX_8upM2R1_eMdlzpbycws/edit?usp=sharing)
