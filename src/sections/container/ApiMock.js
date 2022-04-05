import AsyncStorage from '@react-native-async-storage/async-storage';

const Users = [
    {
        id: 1, email: 'erikole21@gmail.com', password: '123', nombre: 'Erik Rodriguez',
        avatar: require("../../../assets/avatars/boy.jpg"),
        urlbakground: require("../../../assets/lights2.jpeg")
    },
    {
        id: 2, email: 'prueba@gmail.com', password: 'Prueba', nombre: 'Usuario Prueba',
        avatar: require("../../../assets/avatars/boy4.jpeg"),
        urlbakground: require("../../../assets/blurBg.png")
    }];


async function consultarViajesAgregados() {
    const userActual = await AsyncStorage.getItem('@Users');
    const misViajes = await AsyncStorage.getItem('@MisViajes');
    if (misViajes != null) {
        const userJson = JSON.parse(userActual);
        const viajesJson = JSON.parse(misViajes);
        return viajesJson.filter(u => u.userId == userJson.id);
    }
    else {
        return [];
    }
}

async function viajeAgregado(idViaje) {
    const userActual = await AsyncStorage.getItem('@Users');
    const misViajes = await AsyncStorage.getItem('@MisViajes');
    if (misViajes != null) {
        const userJson = JSON.parse(userActual);
        const viajesJson = JSON.parse(misViajes);
        if (viajesJson.find(u => u.userId == userJson.id && u.idViaje == idViaje)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

async function agregarViaje(idViaje) {
    const userActual = await AsyncStorage.getItem('@Users');
    const misViajes = await AsyncStorage.getItem('@MisViajes');
    const userJson = JSON.parse(userActual);
    if (misViajes != null) {
        const viajesJson = JSON.parse(misViajes);
        if (viajesJson.find(u => u.userId == userJson.id && u.idViaje == idViaje) == undefined) {
            viajesJson.push({ idViaje: idViaje, userId: userJson.id });
            await AsyncStorage.setItem('@MisViajes', JSON.stringify(viajesJson));
        }
    }
    else {
        const viajes = [{ idViaje: idViaje, userId: userJson.id }];
        await AsyncStorage.setItem('@MisViajes', JSON.stringify(viajes));
    }

    return true;
}

async function quitarViaje(idViaje) {
    const userActual = await AsyncStorage.getItem('@Users');
    const misViajes = await AsyncStorage.getItem('@MisViajes');
    const userJson = JSON.parse(userActual);
    if (misViajes != null) {
        let viajesJson = JSON.parse(misViajes);
        if (viajesJson.find(u => u.userId == userJson.id && u.idViaje == idViaje)) {
            viajesJson = viajesJson.filter(v => v.idViaje != idViaje && v.userId == userJson.id);
            await AsyncStorage.setItem('@MisViajes', JSON.stringify(viajesJson));
        }
    }
}

function consultarUsuario(email, password) {
    let user = Users.find(o => o.email.toLocaleLowerCase() == email.toLocaleLowerCase() && o.password == password);
    if (user) {
        return user;
    }
    else {
        return null;
    }
}

export default { consultarUsuario, consultarViajesAgregados, viajeAgregado, agregarViaje, quitarViaje }