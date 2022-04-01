import React, { useState } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { createServer } from 'miragejs';

if (window.server) {
    window.server.shutdown();
}

const Users = [{ id: 1, email: 'erikole21@hotmail.com', password: 'erikole21', nombre: 'Erik Rodriguez' },
{ id: 2, email: 'prueba@gmail.com', password: 'prueba', nombre: 'Usuario Prueba' }]

AsyncStorage.setItem('@Users', JSON.stringify(Users));

window.server = createServer({
    routes() {
        this.get('/api/user/', async (email, password) => {
            // let users = await AsyncStorage.getItem('@Users');  
            // users = JSON.parse(users);
            // let user = users.find(o => o.email == email && o.password == password);
            // console.log(user);
            // if (user) {
            //     return { user};
            // }
            // else{
            //     return null;
            // }            
        });

        
    }
});

export function ConsultarUsuario(email, password){
    const [user, setuser] = useState([]);

    fetch('/api/user')
    .then(res => res.json())
    .then(json => setuser(json));

    return user;
}