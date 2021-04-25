document.querySelector("#start_chat").addEventListener("click", (event) => {
    const chat_help = document.getElementById('chat_help');
    chat_help.style.display = 'none'

    const chat_in_support = document.getElementById('chat_in_support');
    chat_in_support.style.display = 'block'

    const email = document.getElementById('email').value;
    const text = document.getElementById('txt_help').value;

    const socket = io();

    socket.on('connect', () => {
        const params = {
            email, text
        }
        socket.emit('client_first_access', params, (call, error) => {
            if(error) {
                console.error(error);
            }
            if (call) {
                console.log(call);
            }
        })
    });

    socket.on('all_user_messages', messages => {
        let clientTemplate = document.getElementById('message-user-template').innerHTML;
        let adminTemplate = document.getElementById('admin-template').innerHTML;

        messages.forEach(message => {
            if (message.admin_id === null) {
                let rendered = Mustache.render(clientTemplate, {
                    message: message.text,
                    email
                });

                document.getElementById('messages').innerHTML += rendered;
            } else {
                let rendered = Mustache.render(adminTemplate, {
                    message_admin: message.text
                });

                document.getElementById('messages').innerHTML += rendered;
            }
        });
    })
});
