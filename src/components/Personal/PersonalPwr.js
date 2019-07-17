import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button as ButtonMUI } from '@material-ui/core';

import { fetchPersonalPwr } from '../../actions/actions';
import validate from '../../utils/inputValidation';
import styles from './Personal.module.scss';
import Input from '../UI/Input';

class PersonalPwr extends Component {
  state = {
    data: new Map([
      [
        'oldPwr',
        {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: null,
          },
          value: '',
          label: 'Старый пароль',
          valid: true,
          touched: false,
          readOnly: false,
          inputDefaultMessage: `тестовый пароль ${this.props.personalPwr}`,
        },
      ],
      [
        'newPwr',
        {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: null,
          },
          value: '',
          label: 'Новый пароль',
          validation: {
            required: true,
            minLength: 6,
            maxLength: 20,
            regexp: [
              {
                minmax: [6, 20],
                regexp: /^[0-9a-z*!$@?]{6,20}$/gi,
                message:
                  'допускаются только латинские буквы, цифры и символы: *, !, ?, $, @ ',
              },
            ],
          },
          valid: true,
          readOnly: true,
          touched: false,
          inputDefaultMessage:
            'используйте только латинские буквы, цифры и символы: *, !, ?, $, @',
        },
      ],
      [
        'newPwrConfirm',
        {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: null,
          },
          value: '',
          label: 'Подтвердите новый пароль',
          valid: true,
          readOnly: true,
          touched: false,
        },
      ],
    ]),
  };

  changeStageHandler = (e, type) => {
    if (type === 'save') {
      this.props.fetchPersonalPwr(this.state.data.get('newPwr').value);
    }
    this.props.changeStage(null, 'main');
  };

  changeInputHandler = (e, input) => {
    const data = new Map(this.state.data);
    const inputElement = {
      ...data.get(input),
    };
    if (input === 'oldPwr') {
      const newPwrElement = {
        ...data.get('newPwr'),
      };
      const newPwrConfirmElement = {
        ...data.get('newPwrConfirm'),
      };
      inputElement.value = e.target.value;
      inputElement.valid = false;
      inputElement.touched = true;
      if (inputElement.value === this.props.personalPwr) {
        inputElement.valid = true;
        newPwrElement.readOnly = false;
        newPwrConfirmElement.readOnly = false;
      }
      data.set(input, inputElement);
      data.set('newPwr', newPwrElement);
      data.set('newPwrConfirm', newPwrConfirmElement);
    }
    if (input === 'newPwr') {
      inputElement.value = e.target.value;
      inputElement.touched = true;
      const newPwrConfirmElement = {
        ...data.get('newPwrConfirm'),
      };
      const { isValid: valid, message } = validate(
        inputElement.value,
        inputElement.validation
      );
      inputElement.valid = valid;
      if (valid && inputElement.inputInvalidMessage)
        inputElement.inputInvalidMessage = undefined;
      else inputElement.inputInvalidMessage = message;
      if (newPwrConfirmElement.touched) {
        if (inputElement.value === newPwrConfirmElement.value) {
          newPwrConfirmElement.valid = true;
          newPwrConfirmElement.inputInvalidMessage = undefined;
        } else {
          newPwrConfirmElement.valid = false;
          newPwrConfirmElement.inputInvalidMessage =
            'введенный пароль не совпадает';
        }
      }
      data.set(input, inputElement);
      data.set('newPwrConfirm', newPwrConfirmElement);
    }
    if (input === 'newPwrConfirm') {
      inputElement.value = e.target.value;
      inputElement.touched = true;
      if (inputElement.value === this.state.data.get('newPwr').value) {
        inputElement.valid = true;
        inputElement.inputInvalidMessage = undefined;
      } else {
        inputElement.valid = false;
        inputElement.inputInvalidMessage =
          'новый пароль введен повторно неверно!';
      }
      data.set(input, inputElement);
    }

    this.setState({
      data,
    });
  };

  toggleVisibility = (e, input) => {
    const data = new Map(this.state.data);
    const inputElement = {
      ...data.get(input),
      elementConfig: { ...data.get(input).elementConfig },
    };
    inputElement.elementConfig.type =
      inputElement.elementConfig.type === 'password' ? 'text' : 'password';
    data.set(input, inputElement);
    this.setState({
      data,
    });
  };

  render() {
    let inputsAllValid = true;
    let inputsAllTouched = true;
    this.state.data.forEach((value, key) => {
      inputsAllTouched = value.touched && inputsAllTouched;
      inputsAllValid = value.valid && inputsAllValid;
    });
    const saveBtnDisabled = !inputsAllTouched || !inputsAllValid;
    return (
      <Fragment>
        <div className={styles.FormContents}>
          {Array.from(this.state.data, ([key, value]) => {
            let inputMessage;

            if (value.inputInvalidMessage) {
              inputMessage = value.inputInvalidMessage;
            } else if (value.inputDefaultMessage) {
              inputMessage = value.inputDefaultMessage;
            }
            return (
              <Fragment key={key}>
                <Input
                  key={key}
                  elementType={value.elementType}
                  value={value.value}
                  label={value.label}
                  valid={value.valid}
                  touched={value.touched}
                  elementConfig={value.elementConfig}
                  readOnly={this.state.data.get(key).readOnly}
                  changed={(e) => this.changeInputHandler(e, key)}
                  inputMessage={inputMessage}
                />
                <ButtonMUI
                  key={'btnToggle' + key}
                  color='primary'
                  size='small'
                  disabled={value.readOnly}
                  onClick={(e) => this.toggleVisibility(e, key)}
                >
                  Показать пароль
                </ButtonMUI>
              </Fragment>
            );
          })}
        </div>
        <div className={styles.Buttons}>
          <ButtonMUI
            color='secondary'
            size='medium'
            onClick={(e) => this.changeStageHandler(e, 'cancel')}
          >
            Назад
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
      </Fragment>
    );
  }
}

PersonalPwr.propTypes = {};

const mapStateToProps = (state) => {
  return {
    personalPwr: state.personalPwr,
  };
};

const mapDispatchToProps = {
  fetchPersonalPwr,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalPwr);
