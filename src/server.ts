import express, { request, response } from 'express';

const app = express();

app.get('/', (request, response) => {
    response.json({
        message: 'Servidor node funcionando!'
    })
})

app.post('/users', (request, response) => {
    let user = request.body
    response.json({
        message: 'Usuario recebido com sucesso!',
        data: user
    })
})

app.listen(3333, () => console.log('Server is running on port 3333'));