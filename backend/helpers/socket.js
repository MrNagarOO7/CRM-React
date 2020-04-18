module.exports.init = init = (server) => {
    const jwt = require('jsonwebtoken');
    const io = require('socket.io')(server);

    const emps = {};

    if (io.on) {
        io.on('connection', (client) => {
            client.on('login', async (auth) => {
                return jwt.verify(auth.token, process.env.JWTSECRET, async function(err, decoded) {
                    console.log('----auth----', client.id);
                    console.log('err', err);

                    console.log(JSON.stringify(decoded));

                    if (err === null) {
                        console.log('socket-io: User ' + decoded.id + ' logged in');
                        if(decoded.type === 'emp'){
                            let current_datetime = new Date()
                            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
                            if(emps.hasOwnProperty(decoded.id)){
                                emps[decoded.id].status = 'Online';
                                emps[decoded.id].login = formatted_date;
                                emps[decoded.id].id = client.id;
                            } else {
                                emps[decoded.id] = {
                                    status: 'Online',
                                    login: formatted_date,
                                    id: client.id
                                };
                            }
                            io.sockets.emit('loginemp', emps);
                        }
                    }
                });
            });

            client.on('loggedEmps', () => {
                io.sockets.emit('loginemp', emps);
            });

            client.on('logout', (id) => {
                if(emps.hasOwnProperty(id)){
                    emps[id].status = 'Offline';
                    io.sockets.emit('loginemp', emps);
                }
            });

            client.on('disconnect', function(socket) {
                console.log(client.id);

                if (client.id) {
                    console.log('socket-io: User ' + client.id + ' disconnected');
                    // logout
                } else {
                    console.log('socket-io: Anonymous user disconnected');
                }
            });
        });
    }
};
