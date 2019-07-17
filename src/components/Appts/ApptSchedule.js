import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import ApptSchDoc from './ApptSchDoc';
import ApptSchDate from './ApptSchDate';

const ApptSchedule = ({
  docDateTime,
  btnName,
  stageChangeHandler,
  btnDisabled,
  doctorId,
  doctors,
  schedule,
  specialities,
  selectHandler,
}) => {
  const schByDoc = {};
  /** making array byDoc and by Date */
  for (const doc of doctorId) {
    schByDoc[doc] = {};
    schByDoc[doc].dateSet = new Set();
    schedule.forEach((mapValue, docDateTime) => {
      if (mapValue.doctorId === doc) {
        if (!schByDoc[doc][mapValue.date]) schByDoc[doc][mapValue.date] = [];
        schByDoc[doc][mapValue.date].push({
          docDateTime,
          time: mapValue.time,
          selected: mapValue.selected,
        });
        schByDoc[doc].dateSet.add(mapValue.date);
      }
    });
  }

  const page = doctorId.map((doc) => {
    let btnDocDisabled = btnDisabled;
    if (!!docDateTime) {
      const docId = docDateTime.slice(0, 4);
      if (doc !== docId) {
        btnDocDisabled = true;
      }
    }
    return (
      <ApptSchDoc
        btnName={btnName}
        btnDisabled={btnDocDisabled}
        stageChangeHandler={stageChangeHandler}
        key={doc}
        doctor={doctors.get(doc)}
        docSpeciality={specialities.get(doctors.get(doc).speciality)}
      >
        {() => {
          return Array.from(schByDoc[doc].dateSet, (date) => {
            return (
              <ApptSchDate
                key={`${doc} ${date}`}
                selectHandler={selectHandler}
                date={date}
                timeSlots={schByDoc[doc][date]}
              />
            );
          });
        }}
      </ApptSchDoc>
    );
  });

  return <Fragment>{page}</Fragment>;
};

ApptSchedule.propTypes = {
  doctorId: PropTypes.arrayOf(PropTypes.string.isRequired),
  doctors: PropTypes.instanceOf(Map).isRequired,
  schedule: PropTypes.instanceOf(Map).isRequired,
  specialities: PropTypes.instanceOf(Map).isRequired,
};

export default ApptSchedule;
