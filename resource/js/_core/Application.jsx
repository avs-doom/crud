'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../components/Form';
import List from '../components/List';


import { onGetUsers } from '../_core/State';


@connect(
    state => ({}),
    dispatch => ({
        onGetUsers: () => dispatch(onGetUsers())
    })
)

export default class Application extends Component {
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
        const { onGetUsers } = this.props;
        
        onGetUsers && onGetUsers();
    }
    
    render() {
        
        return (
            <div className="wrapper">
                <Form />
                <List />
            </div>
        );
    }
}