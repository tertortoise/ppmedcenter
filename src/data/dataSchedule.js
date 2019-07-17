const schedule = [
  {
    doctorId: 'd001',
    schedule: [
      {
        day: 1,
        start: '8:00',
        end: '14:00',
        occupied: ['9:20', '10:00', '10:20'],
      },
      {
        day: 2,
        start: '14:00',
        end: '20:20',
        occupied: ['14:40', '15:00', '16:20'],
      },
      {
        day: 3,
        start: '12:00',
        end: '18:00',
        occupied: ['12:00', '12:20', '15:00', '15:20', '16:20'],
      },
    ],
  },
  {
    doctorId: 'd002',
    schedule: [
      {
        day: 1,
        start: '14:00',
        end: '18:00',
        occupied: ['14:20', '16:00', '17:20'],
      },
      {
        day: 3,
        start: '8:00',
        end: '13:20',
        occupied: ['9:40', '10:20', '12:40'],
      },
      {
        day: 4,
        start: '9:00',
        end: '13:00',
        occupied: ['9:40', '10:20', '12:00', '12:20', '12:40'],
      },
    ],
  },
  {
    doctorId: 'd003',
    schedule: [
      {
        day: 1,
        start: '14:00',
        end: '18:00',
        occupied: ['14:20', '16:00', '17:20'],
      },
      {
        day: 3,
        start: '8:00',
        end: '13:20',
        occupied: ['9:40', '10:20', '12:40'],
      },
      {
        day: 4,
        start: '9:00',
        end: '13:00',
        occupied: ['9:40', '10:20', '12:00', '12:20', '12:40'],
      },
    ],
  },
];

export default schedule;
