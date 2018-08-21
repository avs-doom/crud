'use strict';

export function setUser(formData) {
    debugger;
    const { id } = formData || {};
    
    let users = localStorage.getItem('users');
    
    users = users && JSON.parse(users) || [];
    
    if (id !== null) {
        users = users.map(user => {
            return user.id === id ? formData : user
        });
    } else {
        
        const newId = users.length != 0 ? users[users.length - 1].id + 1 : 0;
        
        users.push({...formData, id: newId});
    }
    
    localStorage.setItem('users', JSON.stringify(users));
    
    return users;
}

export function getUsers() {
        
    let users = localStorage.getItem('users');
    
    return users ? JSON.parse(users) : [];
}
    
export function getUser(userId) {
    
    let users = localStorage.getItem('users');
    
    users = users && JSON.parse(users);
    
    return users.find(user => user.id === userId);
}
    
export function removeUser(userId) {
    
    let users = localStorage.getItem('users');
    
    users = users && JSON.parse(users);
    
    const newUsers = users.filter(user => user.id !== userId);
    
    localStorage.setItem('users', JSON.stringify(newUsers));
    
    return newUsers;
}