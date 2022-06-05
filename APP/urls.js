const Validar = require('./LOGIN/Validar');

class urls{
	constructor(server,views){
		this.server=server;
		this.listUrls(views);
	}
	
	listUrls(views){
		this.server.get('/', Validar, views.home);
		this.server.get('/logoff', Validar, views.sair);
		this.server.get('/cadastro', views.cadastro);
		this.server.post('/Cadastrar', views.cadastrar);
		this.server.get('/login', views.login);
		this.server.post('/logar', views.entrar);
		this.server.get('/conversas', Validar , views.getConversas);
		this.server.get('/amigos', Validar, views.getAmigos);		
	}
}

module.exports = urls;