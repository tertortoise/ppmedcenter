import React from 'react';

import styles from './ApptDoctors.module.scss';
import SelectableSpan from '../UI/SelectableSpan';

const ApptSchDate = (props) => {
  return (
    <div className={styles.DateLine}>
      <div className={styles.Date}>{props.date
                .split('-')
                .reverse()
                .join('.')}</div>
      <div className={styles.Time}>
        {props.timeSlots.map((timeSlot) => {
          return (
            <SelectableSpan
              selected={timeSlot.selected}
              key={timeSlot.docDateTime}
              clickHandler={(e) => props.selectHandler(e, timeSlot.docDateTime)}
            >
              {timeSlot.time}
            </SelectableSpan>
          );
        })}
      </div>
    </div>
  );
};

export default ApptSchDate;
