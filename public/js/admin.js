const socket = io();
let connectionUsers = [];

socket.on('users_without_admin', connections => {
  connectionUsers = connections;
  document.getElementById('list_users').innerHTML = "";

  const template = document.getElementById('template').innerHTML;

  connections.forEach(connection => {
    let rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socket_id
    });

    document.getElementById('list_users').innerHTML += rendered;
  });
})

function call(id) {
  const connection = connectionUsers.find(connection => connection.socket_id === id);
  let template = document.getElementById('admin_template').innerHTML;

  let rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id
  });

  document.getElementById('supports').innerHTML += rendered;

  const params = {
    user_id: connection.user_id
  };

  socket.emit('all_user_messages', params, messages => {
    console.log('Messages', messages);
  });
}