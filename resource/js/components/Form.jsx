'use strict';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeForm, onAddUser } from '../_core/State';


@connect(
    state => ({
        formData: state.formData,
        users: state.users
    }),
    dispatch => ({
        onChangeForm: formData => dispatch(changeForm(formData)),
        onAddUser: cityId => dispatch(onAddUser(cityId))
    })
)

export default class Form extends Component {
    
    static get propTypes() {
        return {
            formData: PropTypes.object.isRequired,
            users: PropTypes.array.isRequired
        }
    }
    
    _handlerChangeForm(name, event) {
            
        const value = event && event.target.value;
            
        const { onChangeForm, formData } = this.props;
        
        const error = this._validate(name, value);
        
        onChangeForm && onChangeForm({...formData, [name]: {error, value}});
    }

    _handlerChangeBirthdayForm(name, event) {
    
        const value = event && event.target.value;
    
        const { onChangeForm, formData } = this.props;
        
        let { birthday } = formData || {};
        
        birthday[name] = value;
    
        onChangeForm && onChangeForm({...formData, birthday});
    }

    _handlerSubmit() {
    
        const { onAddUser, formData, users } = this.props;
    
        onAddUser && onAddUser({...formData, id: formData.id});
    }

    _validate(name, value) {
        
        //крутая валидация!
        return !value ? 'Поле должно быть заполнено' : null;
    }

    _isValid() {
        
        const { formData } = this.props;
        const { name, address, city } = formData || {};
        
        return !name.error && !address.error && !city.error;
    }

    _getNumberArray(min, max) {
    
        let array = [];
    
        for (let i = min; i <= max; i++) {
            array.push(i < 10 ? `0${i}` : i.toString());
        }
    
        return array;
    }
    
    render() {

        const { formData } = this.props;
        const { name, birthday, address, city } = formData || {};
        
        const dayArray = this._getNumberArray(1, 31);
        const monthArray = this._getNumberArray(1, 12);
        const yearArray = this._getNumberArray(1900, 2018);

        const isValid = this._isValid();

        return (
            <div className="user-form">
                
                <div className="user-form__name">
                    <div className="user-form__label">ФИО:</div>
                    <input className="input" maxLength="100" onChange={this._handlerChangeForm.bind(this, 'name')} value={name.value} />
                    {name.error && <div className="input__error">{name.error}</div>}
                </div>
                {/* тут не понятно какие ограничения должны быть на селкторах? нужна ли зависимость от соседних? нужна ли подгрузка на "лету" */}
                {/* раз нет уточнений сделаю максимально простой вариант c несуществующими датами) */}
                <div className="user-form__birthday">
                    <div className="user-form__label">Дата рождения:</div>
                    <select value={birthday.day} onChange={this._handlerChangeBirthdayForm.bind(this, 'day')}>
                        {dayArray.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                    <select value={birthday.month} onChange={this._handlerChangeBirthdayForm.bind(this, 'month')}>
                        {monthArray.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                    <select value={birthday.year} onChange={this._handlerChangeBirthdayForm.bind(this, 'year')}>
                        {yearArray.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                {/* адрес ограничений в задаче никаких, ну нет так нет, просто поле) в реале данные берутся из базы по автокомплиту или делается сложная покомпонентная форма */}
                <div className="user-form__address">
                    <div className="user-form__label">Адрес:</div>
                    <input className="input" maxLength="255" onChange={this._handlerChangeForm.bind(this, 'address')} value={address.value} />
                    {address.error && <div className="input__error">{address.error}</div>}
                </div>
                {/* зачем город, когда есть адрес? Вангую что должет быть селектор выбора из 100500 городов, но пока просто поле... */}
                <div className="user-form__city">
                    <div className="user-form__label">Город:</div>
                    <input className="input" maxLength="255" onChange={this._handlerChangeForm.bind(this, 'city')} value={city.value} />
                    {city.error && <div className="input__error">{city.error}</div>}
                </div>

                <div className="user-form__submit">
                    <button className="button" disabled={!isValid} onClick={this._handlerSubmit.bind(this)}>Сохранить/Добвить</button>
                </div>
            </div>
        );
    }
}