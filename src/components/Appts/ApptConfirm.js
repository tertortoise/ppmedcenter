import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './ApptConfirm.module.scss';

const ApptConfirm = ({
  children,
  activeStage,
  docDateTime,
  doctors,
  specialities,
  apptId,
  newAppt,
}) => {
  let confirmedMsg, docFullName, docSpeciality, date, time, btnName;
  if (activeStage.type === 'confirm') {
    confirmedMsg = (
      <div className={clsx(styles.GridItem, styles.Confirm)}>
        Подтвердите запись
      </div>
    );
    const docId = docDateTime.slice(0, 4);
    docFullName = doctors.get(docId).fullName;
    docSpeciality = specialities.get(doctors.get(docId).speciality).title;
    date = docDateTime
      .slice(5, 15)
      .split('-')
      .reverse()
      .join('.');
    time = docDateTime.slice(16, 21);

    btnName = 'ПОДТВЕРЖДАЮ';
  } else {
    docFullName = newAppt.docFullName;
    docSpeciality = newAppt.Speciality;
    date = newAppt.date
      .split('-')
      .reverse()
      .join('.');
    time = newAppt.time;
    confirmedMsg = (
      <Fragment>
        <div className={clsx(styles.GridItem, styles.Confirm)}>
          Ваша запись подтверждена!
        </div>
        <h3 className={clsx(styles.GridItem, styles.Header)}>
          Талон № {newAppt.apptId}
        </h3>
      </Fragment>
    );
    btnName = 'ДОБАВИТЬ НОВУЮ ЗАПИСЬ';
  }

  return (
    <div className={styles.Paper}>
      {confirmedMsg}
      <div className={clsx(styles.GridItem, styles.Speciality)}>
        {docSpeciality}
      </div>
      <div className={clsx(styles.GridItem, styles.FullName)}>
        {docFullName}
      </div>
      <div className={clsx(styles.GridItem, styles.DateTime)}>
        <span className={styles.Attr}>Дата:</span>
        <span>{date}</span>
        
      </div>
      <div className={clsx(styles.GridItem, styles.DateTime)}>
        <span className={styles.Attr}>Время:</span><span>{time}</span> 
      </div>
      <div className={clsx(styles.GridItem, styles.Price)}>
      <span className={styles.Attr}>Стоимость:</span><span>2000 руб.</span>
      </div>
      <div className={clsx(styles.GridItem, styles.BtnDiv)}>
        {children(btnName)}
      </div>
    </div>
  );
};

ApptConfirm.propTypes = {
  activeStage: PropTypes.object.isRequired,
  doctorId: PropTypes.arrayOf(PropTypes.string),
  docDateTime: PropTypes.string,
  doctors: PropTypes.instanceOf(Map),
  schedule: PropTypes.instanceOf(Map),
  specialities: PropTypes.instanceOf(Map),
  apptId: PropTypes.string,
  newAppt: PropTypes.object,
};

export default ApptConfirm;
