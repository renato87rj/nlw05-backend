let socket_admin_id = null;
let socket = null;
let emailUser = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
    socket = io();
    
    const chat_help = document.getElementById('chat_help');
    chat_help.style.display = 'none'

    const chat_in_support = document.getElementById('chat_in_support');
    chat_in_support.style.display = 'block'

    const email = document.getElementById('email').value;
    emailUser = email;
    const text = document.getElementById('txt_help').value;

    socket.on('connect', () => {
        const params = {
            email, text
        }
        socket.emit('client_first_access', params);
    });

    socket.on('all_user_messages', messages => {
        const clientTemplate = document.getElementById('message-user-template').innerHTML;
        const adminTemplate = document.getElementById('admin-template').innerHTML;

        messages.forEach(message => {
            if (message.admin_id === null) {
                const rendered = Mustache.render(clientTemplate, {
                    message: message.text,
                    email
                });

                document.getElementById('messages').innerHTML += rendered;
            } else {
                const rendered = Mustache.render(adminTemplate, {
                    message_admin: message.text
                });

                document.getElementById('messages').innerHTML += rendered;
            }
        });
    });

    socket.on('admin_to_client', (message) => {
        socket_admin_id = message.socket_id;

        const adminTemplate = document.getElementById('admin-template').innerHTML;
        
        const rendered = Mustache.render(adminTemplate, {
            message_admin: message.text
        });

        document.getElementById('messages').innerHTML += rendered;
    });
});

document.getElementById('send_message_button').addEventListener('click', (event) => {
    const text = document.getElementById('message_user');
    
    const params = {
        text: text.value,
        socket_admin_id
    };

    socket.emit('client_send_message', params);

    const clientTemplate = document.getElementById('message-user-template').innerHTML;
    
    const rendered = Mustache.render(clientTemplate, {
        message: text.value,
        email: emailUser
    });

    document.getElementById('messages').innerHTML += rendered;

    text.value = "";
});
