import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import docMaleImage from '../../images/docMale.jpg';
import docFemaleImage from '../../images/docFemale.jpg';
import styles from './ApptDoctors.module.scss';
import SelectableSpan from '../UI/SelectableSpan';

const ApptDoctors = (props) => {
  let contents = [];

  props.doctors.forEach((item, id) => {
    if (!item.visible) return;
    const imgSrc = item.gender === 'male' ? docMaleImage : docFemaleImage;
    contents.push(
      <div onClick={(e) => props.selectHandler(e, id)} className={clsx(styles.Paper, styles.PaperHover)} key={id}>
        <div className={styles.FotoCont}>
          <img
            alt=""
            width={100}
            src={imgSrc}
          />
        </div>
        <div className={styles.DetailsCont}>
          <div className={styles.FullName}>
            <SelectableSpan
              classNames={styles.FullName}
              selected={item.selected}
              clickHandler={(e) => props.selectHandler(e, id)}
            >
              {item.fullName}
            </SelectableSpan>
            
          </div>

          <div
            className={styles.Speciality}
          >
            {props.specialities.get(item.speciality).title}
          </div>
          <div
            className={styles.Experience}
          >
            (стаж {item.experience})
          </div>
          <div
            className={styles.Price}
          >
            Стоимость приема 2000 руб.
          </div>
        </div>
        <div className={styles.Next}>
          <span>{props.children(item.selected)}</span>
        </div>
        
      </div>
    );
  });
  return <div className={styles.ApptDoctors}>{contents}</div>;
};

ApptDoctors.propTypes = {
  specialities: PropTypes.instanceOf(Map).isRequired,
  doctors: PropTypes.instanceOf(Map).isRequired,
  selectHandler: PropTypes.func.isRequired,
};

export default ApptDoctors;
