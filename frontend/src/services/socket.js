import io from 'socket.io-client';
import config from '../config';

export default function () {
    const socket = io.connect(config.socket);

    function registerHandler(onMessageReceived) {
        socket.on('loginemp', onMessageReceived)
    }

    function unregisterHandler() {
        socket.off('message')
    }

    socket.on('error', function (err) {
        console.log('received socket error:');
        console.log(err)
    });

    function login(token) {
        socket.emit('login', {token})
    }

    function logout(id) {
        socket.emit('logout', id)
    }

    function loggedEmps() {
        socket.emit('loggedEmps', {})
    }

    return {
        registerHandler,
        unregisterHandler,
        login,
        logout,
        loggedEmps
    }
}
