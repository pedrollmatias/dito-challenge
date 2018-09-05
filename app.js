let http = require('http');

// Função para fazer o request na URL e obter o JSON
function getJson(options, callback){
	http.request(options, (res) => {
		let body = '';

		// Atualiza a resposta body
		res.on('data', (chunk) => {
			body += chunk;
		});

		// Chama o callback assim que termina de obter a resposta, passando erro nulo e o JSON como resposta parametro
		res.on('end', () => {
			let result = JSON.parse(body);
			callback(null, result);
		});

		res.on('error', callback);
	})
	.on('error', callback)
	.end();
}

// Parametros para relizar a requisição
let options = {
	host: 'storage.googleapis.com',
	post: 80,
	json: true,
	path: 'dito-questions/events.json',
	method: 'GET'
}

// Função
getJson(options, (err, res) =>{
	// Retorna o erro casa haja falha ao obter o JSON
	if(err){
		return console.error("Erro ao tentar obter o JSON:\n", err);
	}

	// Respostar caso não haja erro:
	let json = res;
	// JSON.stringfy deixa a resposta mais organizada
	console.log('Request:\n\n', JSON.stringify(json, null, 4), '\n\n');

	/** @description Encontra o elemento a partir do valor de uma determinada chave
	* @param {array} Array em que a busca ocorrerá.
	* @param {field} Campo-chave que será parametro para a busca.
	* @param {value} Valor fornecido para a cunsulta do "field" (campo-chave)
	* @return {element} Retorna o elemento encontrado. Caso nao encontra ou o array de busca seja vazio, retorna null  
	*/ 
	function findElement(array, field, value) {
		if(typeof array !== 'undefined' && array.length > 0){
		  return array.find((element) => {
		  	return element[field] === value 
		  });
		}
		return null;
	}

	// timeline recebe a timeline desordenada
	// O método "reduce" reduz o json de entrada à resposta esperada, armazenando a nova resposta em "array" a cada iteração dos elementos
	let timeline = json.events.reduce((array, element) => {
		// transactionId recebe o valor da chave transaction_id do elemento corrente
		let transactionId = findElement(element.custom_data, 'key', 'transaction_id').value;
		// Caso já exista um elemento no array resposta (array) em que transaction_id = transactionId, armazena o elemento em transactionInArray
		// Caso contrário, transactionInArray recebe null (ainda não existe em array)
		let transactionInArray = findElement(array, 'transaction_id', transactionId);
		// Se o evento do elemento for do tipo "comprou"
		if(element.event == 'comprou'){
			// Se o elemento corrente (do tipo "comprou") ainda não existir no array resposta, adiciona-o no array, deixando a lista de produtos vazia
			if(!transactionInArray){
				array.push({
					"timestamp": element.timestamp,
					"revenue": element.revenue,
					"transaction_id": transactionId,
					"store_name": findElement(element.custom_data, 'key', 'store_name').value,
					"products": []
				});
			// Caso o elemento já exista no array, apenas sobrescreve os valores dos campos "timestamp", "store_name" e "revenue", já que este foi um elemento inserido a partir de um evento "comprou-produto", que não possui valores de "timestamp", "store_name" e "revenue" (null)
			}else{
				// Calcula em qual posição (indice) do array-resosta o elemento com transaction_id = transactionId está
				let index = array.indexOf(findElement(array, 'transaction_id', transactionId));
				// caso os valores de "timestamp", "store_name" e "revenue" sejam nulos, sobrescreve-os
				if(array[index].timestamp == null || array[index].revenue == null || array[index].store_name == null){
					array[index].timestamp = element.timestamp;
					array[index].revenue = element.revenue;
					array[index].store_name = findElement(element.custom_data, 'key', 'store_name').value;
				}
			}
		// Se o evento do elemento for do tipo comprou
		}else if(element.event == 'comprou-produto'){
			// Se o elemento corrente (do tipo "comprou-produto") ainda não existir no array resposta, adiciona-o no array, deixando a lista de produtos vazia
			if(!transactionInArray){
				array.push({
					"timestamp": null,
					"revenue": null,
					"transaction_id": transactionId,
					"store_name": null,
					"products": [
						{
							"name": findElement(element.custom_data, 'key', 'product_name').value,
							"price": findElement(element.custom_data, 'key', 'product_price').value,
						}
					]
				});
			// Se o elemento (com evento do tipo "comprou-produto") já estiver no array-resposta, é por que ele já foi inserido a partir de um evento do tipo "comprou". Desta maneira, apenas atualiza a lista de produtos adicionando o produto em questão
			}else{
				let index = array.indexOf(findElement(array, 'transaction_id', transactionId));
				array[index].products.push({
					"name": findElement(element.custom_data, 'key', 'product_name').value,
					"price": findElement(element.custom_data, 'key', 'product_price').value,
				})
			}
		// Programação preventiva para caso ocorra um evento diferente de "comprou" e "comprou-produto"
		}else{
			console.error('Tipo de evento não identificado');
		}
		// retorna o novo array a cada iteração
	 	return array;
	// o array vazio "[]" é um valor inicial de array
	}, [])

	// Ordena a timeline pelo Timestamp e armazena no array timeline dentro da resposta newJson
	newJson = {
		"timeline": timeline.sort((a, b) => { return new Date(b.timestamp) - new Date(a.timestamp) }) 
	}

	// Imprime a resposta no console. JSON.stringfy deixa a resposta mais organizada
	console.log('Response:\n\n', JSON.stringify(newJson, null, 4));
});