import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button as ButtonMUI } from '@material-ui/core';

import { fetchPersonalData } from '../../actions/actions';
import validate from '../../utils/inputValidation';
import styles from './Personal.module.scss';
import Input from '../UI/Input';

class PersonalData extends Component {
  state = {
    data: new Map([
      [
        'surname',
        {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: null,
          },
          value: this.props.personalData.surname,
          label: 'Фамилия',
          validation: {
            regexp: [
              {
                minmax: [1, 1],
                regexp: /[a-z\u0430-\u044f]/i,
                message:
                  'допускаются только русские или латинские символы, тире и пробел!',
              },
              {
                minmax: [2, 1000000],
                regexp: /^[a-z\u0430-\u044f][-a-z\u0430-\u044f\s]*[a-z\u0430-\u044f\s]$/i,
                message: 'допускаются только русские или латинские символы!',
              },
            ],
          },
          valid: true,
          touched: false,
          inputDefaultMessage:
            'используйте только русские или латинские буквы, пробелы, тире',
        },
      ],
      [
        'firstName',
        {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: null,
          },
          value: this.props.personalData.firstName,
          label: 'Имя',
          validation: {
            regexp: [
              {
                minmax: [1, 1],
                regexp: /[a-z\u0430-\u044f]/i,
                message:
                  'допускаются только русские или латинские символы, тире и пробел!',
              },
              {
                minmax: [2, 1000000],
                regexp: /^[a-z\u0430-\u044f][-?a-z\u0430-\u044f\s]*[a-z\u0430-\u044f\s]$/i,
                message: 'допускаются только русские или латинские символы!',
              },
            ],
          },
          valid: true,
          touched: false,
          inputDefaultMessage:
            'используйте только русские или латинские буквы, пробелы, тире',
        },
      ],
      [
        'middleName',
        {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: null,
          },
          value: this.props.personalData.middleName,
          label: 'Отчество',
          validation: {
            regexp: [
              {
                minmax: [1, 1],
                regexp: /[a-z\u0430-\u044f]/i,
                message:
                  'допускаются только русские или латинские символы, тире и пробел!',
              },
              {
                minmax: [2, 1000000],
                regexp: /^[a-z\u0430-\u044f][-a-z\u0430-\u044f\s]*[a-z\u0430-\u044f\s]$/i,
                message: 'допускаются только русские или латинские символы!',
              },
            ],
          },
          valid: true,
          touched: false,
          inputDefaultMessage:
            'используйте только русские или латинские буквы, пробелы, тире',
        },
      ],
      [
        'phone',
        {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: null,
          },
          value: this.props.personalData.phone,
          label: 'Телефон*',
          validation: {
            regexp: [
              {
                minmax: [1, 20],
                regexp: /\+7 \(([0-9]){3}\) ([0-9]){3} ([0-9]){2} ([0-9]){2}/,
                message: 'необходимо полностью ввести цифры телефона!',
              },
            ],
          },
          valid: true,
          touched: false,
        },
      ],
      [
        'email',
        {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: null,
          },
          value: this.props.personalData.email,
          label: 'Эл.почта',
          validation: {
            maxLength: 50,
            regexp: [
              {
                minmax: [1, 500],
                regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
                message:
                  'оставьте поле пустым или введите эл.почту example@example.ru!',
              },
            ],
          },
          valid: true,
          touched: false,
        },
      ],
      [
        'login',
        {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: null,
          },
          value: this.props.personalData.login,
          label: 'Логин*',
          validation: {
            minLength: 6,
            maxLength: 20,
            regexp: [
              {
                minmax: [1, 500],
                regexp: /^[a-z0-9]{6,20}$/i,
                message: 'в поле допускаются только латинские буквы и цифры!',
              },
            ],
          },
          valid: true,
          touched: false,
          inputDefaultMessage:
            'латинские заглавные и/или строчные буквы и цифры, мин. 6, максимум 20 символов',
        },
      ],
    ]),
  };

  changeStageHandler = (e, type) => {
    const data = new Map(this.state.data);
    if (type === 'save') {
      const personalData = {};
      data.forEach((info, key) => {
        personalData[key] = info.value;
        data.set(key, { ...info, touched: false, valid: true });
      });
      this.props.fetchPersonalData(personalData);
    } else if (type === 'cancel') {
      data.forEach((info, key) => {
        data.set(key, {
          ...info,
          value: this.props.personalData[key],
          touched: false,
          valid: true,
        });
      });
    }
    this.setState({
      data,
    });
    this.props.changeStage(null, 'main');
  };

  changeInputHandler = (e, input) => {
    if (!this.state.data.get(input).wasChanged && e.type === 'blur') return;
    const data = new Map(this.state.data);
    const inputElement = { ...data.get(input) };
    let valid, message;
    if (e.type === 'change') {
      inputElement.wasChanged = true;
      inputElement.value = e.target.value;
      if (input === 'phone') {
        const regexp = /[0-9]+/g;
        let matchedRaw = e.target.value.match(regexp);

        if (!matchedRaw) matchedRaw = ['7'];
        else if (matchedRaw[0] !== '7') matchedRaw.unshift('7');
        const matched = matchedRaw.join('').padEnd(11, '_');

        inputElement.value = `+7 (${matched.slice(1, 4)}) ${matched.slice(
          4,
          7
        )} ${matched.slice(7, 9)} ${matched.slice(9, 11)}`;
      }
    } else if (e.type === 'blur') {
      inputElement.wasChanged = undefined;
      if (
        input === 'surname' ||
        input === 'firstName' ||
        input === 'middleName'
      ) {
        const capitalize = (string) => {
          const str = string.trim();
          return (str.charAt(0).toUpperCase() + str.slice(1))
            .replace(/\s{2,}/g, ' ')
            .replace(/-{2,}/g, '-');
        };
        inputElement.value = capitalize(e.target.value);
      } else inputElement.value = e.target.value.trim();
    }
    if (inputElement.validation) {
      ({ isValid: valid, message } = validate(
        inputElement.value,
        inputElement.validation
      ));
    }
    inputElement.valid = valid;
    if (valid && inputElement.inputInvalidMessage)
      inputElement.inputInvalidMessage = undefined;
    else inputElement.inputInvalidMessage = message;
    if (this.props.personalData[input] !== inputElement.value)
      inputElement.touched = true;
    else inputElement.touched = false;
    data.set(input, inputElement);
    this.setState({
      data,
    });
  };

  render() {
    const { renderButtons, dataInputsReadOnly } = this.props;
    const { data } = this.state;
    let inputsAllValid = true;
    let inputsAnyTouched = false;
    data.forEach((value, key) => {
      inputsAnyTouched = value.touched || inputsAnyTouched;
      inputsAllValid = value.valid && inputsAllValid;
    });
    const saveBtnDisabled = !inputsAnyTouched || !inputsAllValid;

    const buttons = renderButtons ? (
      <div className={styles.Buttons}>
        <ButtonMUI
            color='secondary'
            size='medium'
            onClick={(e) => this.changeStageHandler(e, 'cancel')}
          >
            Не сохранять
          </ButtonMUI>
          <ButtonMUI
            color='secondary'
            size='medium'
            disabled={saveBtnDisabled}
            onClick={(e) => this.changeStageHandler(e, 'save')}
          >
            Сохранить
          </ButtonMUI>
      </div>
    ) : null;

    return (
      <Fragment>
        <div className={styles.FormContents}>
          <span className={styles.Remark}>*поля обязательные для заполнения</span>
          {Array.from(data, ([key, value]) => {
            let inputMessage;

            if (value.inputInvalidMessage) {
              inputMessage = value.inputInvalidMessage;
            } else if (value.inputDefaultMessage) {
              inputMessage = value.inputDefaultMessage;
            }
            return (
              <Input
                key={key}
                id={key}
                elementType={value.elementType}
                value={value.value}
                label={value.label}
                valid={value.valid}
                touched={value.touched}
                elementConfig={value.elementConfig}
                readOnly={dataInputsReadOnly}
                changed={(e) => this.changeInputHandler(e, key)}
                blurred={(e) => this.changeInputHandler(e, key)}
                inputMessage={inputMessage}
              />
            );
          })}
        </div>
        {buttons}
      </Fragment>
    );
  }
}

PersonalData.propTypes = {
  renderButtons: PropTypes.bool.isRequired,
  dataInputsReadOnly: PropTypes.bool.isRequired,
  changeStage: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    personalData: state.personalData,
  };
};

const mapDispatchToProps = {
  fetchPersonalData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalData);
