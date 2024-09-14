let pokemonRepository = (function () {
	let pokemonList = [
		{
			name: 'Sigilyph', 
			height: 4, 
			types: ['psychic', 'flying']
		},
		{
			name: 'Falinks', 
			height: 9, 
			types: ['fighting']
		},
		{
			name: 'Volcarona', 
			height: 5, 
			types: ['bug', 'fire']
		}
	]

	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


	function add (pokemon) {
		if (typeof pokemon === object &&
			'name' in pokemon &&
			'height' in pokemon &&
			'types' in pokemon) {
			pokemonList.push(pokemon);
		}else {
			console.log('Pokemon must have a name, height, and type.')
		}
	}

	function getAll () {
		return pokemonList;
	}

	function addListItem(pokemon) {
		//setting up
		let pokemonCurrent = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.addEventListener('click', function(){showDetails(pokemon)});
		// for some reason the above code immediately displays the information

		/*button.addEventListener('click', function(pokemon) {
			console.log(pokemon);
		})*/
		//the above code works correctly, but does not use the predefined function

		//changing content and class of buttons
		button.innerText = pokemon.name;
		button.classList.add('pokemonButton');

		//placing button on list
		listItem.appendChild(button);
		pokemonCurrent.appendChild(listItem);
	}

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			console.log(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
			});
		}).catch(fuction (e) {
			console.error(e);
		})
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			//adds details to items
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(function (e) {
			console.error(e);
		});
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		showDetails: showDetails,
		loadDetails: loadDetails,
		loadList: loadList
	};
})();

pokemon.Repository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});