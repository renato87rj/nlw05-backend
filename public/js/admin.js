const socket = io();
let connectionUsers = [];

socket.on('users_without_admin', connections => {
  connectionUsers = connections;
  document.getElementById('list_users').innerHTML = "";

  const template = document.getElementById('template').innerHTML;

  connections.forEach(connection => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socket_id
    });

    document.getElementById('list_users').innerHTML += rendered;
  });
})

function call(id) {
  const connection = connectionUsers.find(connection => connection.socket_id === id);
  const template = document.getElementById('admin_template').innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id
  });

  document.getElementById('supports').innerHTML += rendered;

  const params = {
    user_id: connection.user_id
  };

  //socket.emit('users_in_support', params);

  socket.emit('all_user_messages', params, (messages) => {
    const divMessages = document.getElementById(`allMessages${connection.user_id}`);

    messages.forEach(message => {
      const createDiv = document.createElement('div');

      if (message.admin_id === null) {
        createDiv.className = 'admin_message_client';

        createDiv.innerHTML = `<span>${connection.user.email}</span>`;
        createDiv.innerHTML += `<span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>`;
      } else {
        createDiv.className = 'admin_message_admin';

        createDiv.innerHTML = `Atendente: <span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>`;
      }

      divMessages.appendChild(createDiv);
    });
  });
}

function sendMessage(id) {
  const text = document.getElementById(`send_message_${id}`);
  const params = {
    text: text.value,
    user_id: id
  }

  socket.emit('admin_send_message', params);

  const divMessages = document.getElementById(`allMessages${id}`);

  const createDiv = document.createElement('div');
  createDiv.className = 'admin_message_admin';
  createDiv.innerHTML = `Atendente: <span>${text.value}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs().format('DD/MM/YYYY HH:mm:ss')}</span>`;


  divMessages.appendChild(createDiv);

  text.value = "";
}

socket.on('client_to_admin', (params) => {
  const connection = connectionUsers.find(connection => connection.socket_id = params.socket_id);

  const divMessages = document.getElementById(`allMessages${connection.user_id}`);
  
  const createDiv = document.createElement('div');

  createDiv.className = 'admin_message_client';

  createDiv.innerHTML = `<span>${connection.user.email}</span>`;
  createDiv.innerHTML += `<span>${params.message.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs(params.message.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>`;

  divMessages.appendChild(createDiv);
});
