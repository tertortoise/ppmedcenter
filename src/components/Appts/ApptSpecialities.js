import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import styles from './ApptSpecialities.module.scss';
import SelectableSpan from '../UI/SelectableSpan';


const ApptSpecialities = (props) => {
  /** building contents from Map */
  let Contents = {};
  Contents.adult = [];
  Contents.child = [];
  props.specialities.forEach((spec, id) => {
    if (!spec.visible) return;
    Contents[spec.ageCategory].push(
      <div className={styles.Item} key={id}>
        <SelectableSpan
          classNames={styles.Span}
          selected={spec.selected}
          title={spec.details}
          clickHandler={(e) => props.selectHandler(e, id)}
        >
          {spec.title}
        </SelectableSpan>
        <span className={styles.BtnSpan}>{props.children(spec.selected)}</span>
      </div>
    );
  });

  return (
    <Fragment>
      <div className={styles.Department}>
        <h2 className={styles.Header}>Специальности взрослого отделения</h2>
        <div className={styles.Contents}>{Contents.adult}</div>
      </div>
      <div className={styles.Department}>
        <h2 className={styles.Header}>Специальности детского отделения</h2>
        <div className={styles.Contents}>{Contents.child}</div>
      </div>
    </Fragment>
  );
};

ApptSpecialities.propTypes = {
  specialities: PropTypes.instanceOf(Map).isRequired,
  selectHandler: PropTypes.func.isRequired,
};

export default ApptSpecialities;
