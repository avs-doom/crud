'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { onRemoveUser, onChangeUser } from '../_core/State';


@connect(
    state => ({
        users: state.users
    }),
    dispatch => ({
        onRemoveUser: userId => dispatch(onRemoveUser(userId)),
        onChangeUser: userId => dispatch(onChangeUser(userId))
    })
)

export default class List extends Component {
    
    static get propTypes() {
        return {
            users: PropTypes.array.isRequired
        }
    }
    
    constructor(props) {
        super(props);
        
        this.state = this._setState(props);
    }
    
    _setState(props) {
        
        return {
            
        };
    }
    
    _handlerRemoveUser(userId) {
        
        const { onRemoveUser } = this.props;
        
        onRemoveUser && onRemoveUser(userId);
    }
    
    _handlerChangeUser(userId) {
        
        const { onChangeUser } = this.props;
        
        onChangeUser && onChangeUser(userId);
    }
    
    _renderUserItemTemplate(item, index) {
        
        const { name, address, birthday, city, id } = item;
        
        return (
            <div className="user" key={index}>
                <div className="user__name">{name.value}</div>
                <div className="user__birthday">{`${birthday.day}.${birthday.month}.${birthday.year}`}</div>
                <div className="user__address">{address.value}</div>
                <div className="user__city">{city.value}</div>
                <div className="user__remove"><a className="link" onClick={this._handlerRemoveUser.bind(this, id)}>Удалить</a> | <a className="link" onClick={this._handlerChangeUser.bind(this, id)}>Редактировать</a></div>
            </div>
        );
    }
    
    render() {
        
        const { users } = this.props; 
        
        return (
            <div className="users__list">
               {users.map(this._renderUserItemTemplate.bind(this))}
            </div>
        );
    }
}