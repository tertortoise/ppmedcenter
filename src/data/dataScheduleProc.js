import moment from 'moment';
import dataSchedule from './dataSchedule';
/** processing initial schedule data into Array to be shoved into store */
const dataScheduleProc = [];
dataSchedule.forEach((doctor) => {
  const doctorId = doctor.doctorId;
  for (const day of doctor.schedule) {
    /** getting day stamp */
    const dayString = moment()
      .add(day, 'd')
      .format('YYYY-MM-DD');
    /** getting docDateTime for occupied slots */
    const occupied = [];
    let occupiedR = [];
    for (const time of day.occupied) {
      const timeString = time.padStart(5, '0');
      occupied.push(doctorId + ' ' + dayString + ' ' + timeString);
    }
    occupiedR = occupied.reverse();
    //console.log(occupied);
    const startTimeString = day.start.padStart(5, '0');
    const endTimeString = day.end.padStart(5, '0');
    const startTime = moment()
      .add(day, 'd')
      .set({
        hour: +startTimeString.slice(0, 2),
        minute: +startTimeString.slice(3),
      });
    const endTime = moment()
      .add(day, 'd')
      .set({
        hour: +endTimeString.slice(0, 2),
        minute: +endTimeString.slice(3),
      });
    const slotsNum = Math.floor(endTime.diff(startTime, 'minutes') / 20);
    for (let i = 0; i < slotsNum; i++) {
      const mult = Number(Boolean(i));
      const timeString = startTime.add(20 * mult, 'm').format('HH:mm');
      const docDateTime = doctorId + ' ' + dayString + ' ' + timeString;
      let available = true;
      if (docDateTime === occupiedR[occupiedR.length-1]) {
        available = false;
        occupiedR.pop();
      }
      dataScheduleProc.push({ doctorId, docDateTime, available });
    }
  }
});

export default dataScheduleProc;