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
		console.log(pokemon);
	}

	function loadList() {

	}

	function loadDetails() {

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

/*function readOut(element) {
	if (element.height < 5) {
		document.write(`${element.name} \(height: ${element.height}\) -- that's a small one! `);
		document.write('<br\>');
	} else {
		document.write(`${element.name} \(height: ${element.height}\) `);
		document.write('<br\>');
	}
}*/

pokemonRepository.getAll().forEach(function(pokemon) {
	pokemonRepository.addListItem(pokemon);
});