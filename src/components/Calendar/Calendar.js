import React, { Component } from 'react';
import { connect } from 'react-redux';

import Calendar from 'react-calendar';
import styles from './Calendar.module.scss';

class ReactCalendar extends Component {
  state = {
    date: new Date(),
    currDateString: () => {
      const today = new Date();
      return `${today.getFullYear().toString()} ${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')} ${today
        .getDate()
        .toString()
        .padStart(2, '0')}`;
    },
    locale: 'ru',
    apptDates: [],
  };

  tileDisabled = ({ activeStartDate, date, view }) => {
    const dateString = `${date.getFullYear().toString()} ${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')} ${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
    return dateString < this.state.currDateString();
  };

  tileClassName = () => ({ date, view }) => {
    let style = null;
    const dateString = `${date.getFullYear().toString()} ${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')} ${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
    if (view === 'month') {
      if (dateString === this.state.currDateString()) {
        style = styles.Today;
      }
    }
    if (this.state.apptDates.length > 0) {
      this.state.apptDates.forEach((apptDate) => {
        if (dateString === apptDate) style = styles.Appt;
      })
    }

    return style;
  };

  componentDidMount() {
    if (this.props.appts) {
      const apptDates = [];
      this.props.appts.forEach((item) => {
        const itemDateString = item.date.split('-').join(' ');
        if (itemDateString >= this.state.currDateString()) apptDates.push(itemDateString);
      });
      this.setState({
        apptDates,
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.appts && (prevProps.appts !== this.props.appts)) {
      const apptDates = [];
      this.props.appts.forEach((item) => {
        const itemDateString = item.date.split('-').join(' ');
        if (itemDateString >= this.state.currDateString()) apptDates.push(itemDateString);
      });
      this.setState({
        apptDates,
      })
    }
  }

  render() {
    return (
      <Calendar
        value={this.state.date}
        locale={this.state.locale}
        className={[styles.CustomCalendar]}
        maxDetail='month'
        tileDisabled={this.tileDisabled}
        tileClassName={this.tileClassName()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appts: state.appts,
  };
};

export default connect(mapStateToProps)(ReactCalendar);
