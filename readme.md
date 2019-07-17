# Project overview / Обзор проекта
This project is just a frontend piece of Personal Cabinet (SPA, single-page application) for a patient to view, make, edit and delete appointments and personal data.
Fully responsive design.
There is no backend (Redux store sort of emulates persistence of new appointments and changed personal data within a session).
Deployment to github pages is on gh pages branch. Source code is on master branch.

//Русский

Этот проект представляет собой фронтэнд часть Личного Кабинета (SPA, одностраничное приложение) пациента для просмотра, создания, редактирования и удаления записей и личных данных.
Полностью адаптивный дизайн.
Этот проект без бэкэнда (Redux эмулирует сохранение новых записей и изменений в рамках сессии).
Код для деплоя - gh pages. Исходник - master.

## Tech stack / Стэк технологий

React / Router / Redux

Material UI is utilized to make some components and style them (CSS in JS).

React-calendar is used to represent current appointments on a calendar.

//Русский

Material UI использована для ряда компонентов и стилизации (CSS in JS).

React-calendar использовался для отображения текущих записей на календаре.

## Main functions / Основные функции

- View current appointment,
- Edit and delete current appointment,
- Make new appointement in multi-stage process: choosing doctor by speciality or name, picking date-time, confirming appointment. Once made information on the appointment is available in Dashbord, Calendar and My appointments
- Change personal data: upload and delete picture, change name, phone, password etc.

//Русский

- Просмотр текущих записей
- Создание новых записей к врачу в ходе многоступечатого процесса: выбор варча по специальности или имени, выбор времени, подтверждение записи. После подтверждения записи, информация доступна в Кабинете (в том числе на календаре) и в Моих записях
- Изменение персональных данных: загрузка и удаление фото, изменение имени, телефона, пароля и т.д.


