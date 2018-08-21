'use strict';

import { setUser, getUsers, removeUser, getUser } from '../_core/Store';

const initialState = {
    formData: {
        id: null,
        name: {
            error: true,
            value: ''
        },
        address: {
            error: true,
            value: ''
        },
        birthday: {
            day: '01',
            month: '01',
            year: '1900'
        },
        city: {
            error: true,
            value: ''
        },
        phone: {
            error: true,
            value: ''
        }
    },
    users: []
};

const ADD_USER = 'ADD_USER';
const GET_USERS = 'GET_USERS';
const REMOVE_USER = 'REMOVE_USER';
const CHANGE_FORM = 'CHANGE_FORM';
const CHANGE_USER = 'CHANGE_USER';

export function crud(state = initialState, action) {

    const { type, formData, userId } = action || {};
    
    switch(type) {
        case CHANGE_USER:
            return {...state, formData: getUser(userId)}
        case REMOVE_USER:
            return {...state, users: removeUser(userId)};
        case GET_USERS:
            return {...state, users: getUsers()};
        case ADD_USER:
            return {...state, formData: initialState.formData, users: setUser(formData)};
        case CHANGE_FORM:
            return {...state, formData};
        default:
            return state;
    }
}

export function onAddUser(formData) {
    return {type: ADD_USER, formData};
}

export function onGetUsers() {
    return {type: GET_USERS};
}

export function onRemoveUser(userId) {
    return {type: REMOVE_USER, userId};
}

export function onChangeUser(userId) {
    return {type: CHANGE_USER, userId};
}

export function changeForm(formData) {
    return {type: CHANGE_FORM, formData};
}