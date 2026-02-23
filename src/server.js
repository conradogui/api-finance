// Importa a aplicação Express configurada em app.js
const app = require('./app')

// Inicia o servidor HTTP na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})
