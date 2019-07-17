import React from 'react';
import { Button as ButtonMUI } from '@material-ui/core';

import styles from './ApptDoctors.module.scss';
import docMaleImage from '../../images/docMale.jpg';
import docFemaleImage from '../../images/docFemale.jpg';

const ApptSchDoc = (props) => {
  const imgSrc = props.doctor.gender === 'male' ? docMaleImage : docFemaleImage;
  return (
    <div className={styles.Paper}>
      <div className={styles.FotoCont}>
        <img alt="" width={100} src={imgSrc} />
      </div>
      <div className={styles.DetailsCont}>
        <div className={styles.FullName}>{props.doctor.fullName}</div>

        <div className={styles.Speciality}>{props.docSpeciality.title}</div>
        <div className={styles.Experience}>
          (стаж {props.doctor.experience})
        </div>
        <div className={styles.Price}>Стоимость приема 2000 руб.</div>
      </div>

      <div className={styles.SchCont}>
        <div className={styles.DatesCont}>{props.children()}</div>
        <div className={styles.BtnDiv}>
          <ButtonMUI
            disableRipple
            color='secondary'
            size='medium'
            disabled={props.btnDisabled}
            onClick={(e) => props.stageChangeHandler(e, 'confirm')}
          >
            Перейти к подтверждению
          </ButtonMUI>
        </div>
      </div>
    </div>
  );
};

export default ApptSchDoc;
