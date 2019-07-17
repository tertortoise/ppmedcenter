import moment from 'moment';

const apptsRaw = [
  {
    apptId: '156768',
    doctorId: 'd001',
    speciality: 'Терапевт',
    docFullName: 'Иванова Мария Петровна',
    time: { day: -80, time: '8:40' },
  },
  {
    apptId: '194800',
    doctorId: 'd003',
    speciality: 'Хирург',
    docFullName: 'Мясников Иван Николаевич',
    time: { day: -150, time: '14:40' },
  },
  {
    apptId: '456788',
    doctorId: 'd002',
    speciality: 'Терапевт',
    docFullName: 'Кабанова Наталья Ивановна',
    time: { day: 3, time: '10:20' },
  },
];

const dataApptsProc = apptsRaw.map((item) => {
  const timeString = item.time.time.padStart(5, '0');
  const dateString = moment()
    .add(item.time.day, 'd')
    .format('YYYY-MM-DD');
  const docDateTime = `${item.doctorId} ${dateString} ${timeString}`;
  const searchString = `${item.docFullName.toLowerCase()} ${item.speciality.toLowerCase()}`;
  return {
    apptId: item.apptId,
    doctorId: item.doctorId,
    speciality: item.speciality,
    docFullName: item.docFullName,
    dateTime: dateString + ' ' + timeString,
    date: dateString,
    time: timeString,
    docDateTime,
    searchString,
  };
});

export default dataApptsProc;