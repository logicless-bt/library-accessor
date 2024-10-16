let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

	//function to accept input to the list
	function add (pokemon) {
		if (typeof pokemon === "object" &&
			"name" in pokemon && /*
			"height" in pokemon &&
			"types" in pokemon*/
			"detailsUrl" in pokemon) {
			pokemonList.push(pokemon);
		}else {
			console.log("Pokemon must have a name, height, and type.")
		}
	}

	function getAll () {
		return pokemonList;
	}

	function addListItem(pokemon) {
		//setting up, including bootstrap list classes
		let pokemonCurrent = document.querySelector(".pokemon-list");
		let listItem = document.createElement("li");
		listItem.classList.add('list-group-item');
		//let button = $('<button data-toggle-"modal" data-target="poke-modal"</button>');
		let button = document.createElement('button');
		button.addEventListener("click", function() {
			pokemonRepository.showDetails(pokemon);
		});


		//changing content and class of buttons, including bootstrap button classes
		button.innerText = pokemon.name;
		button.classList.add('poke-modal');
		button.classList.add('btn');
		button.classList.add('btn-outline-primary');
		$('poke-modal').attr('data-toggle', 'modal');
		$('poke-modal').attr('data-target', '#poke-modal');

		//placing button on list
		listItem.appendChild(button);
		pokemonCurrent.appendChild(listItem);
	}

	//let modalContainer = document.querySelector('.modal');
	function showModal(title, text, img) {
		

	    //assign modal elements
	    let modalBody = $('.modal-body');
	    let modalTitle = $('.modal-title');
	    //let modalHeader = ('.modal-header');

	    //clear modal elements
	    modalBody.empty();
	    modalTitle.empty();
	    

	    //creating the title element (name)
	    let titleElement = ('<h1>' + title + '</h1>');

	    //creating img content
	    let imageElement = document.createElement('img')
	    imageElement.classList.add('modal-img');
	    imageElement.src = img;

	    //creating body element (height)
	    let contentElement = ('<p>' + text + '</p>');

	    //appending
	    modalTitle.append(titleElement);
	    modalBody.append(imageElement);
	    modalBody.append(contentElement);
	}

	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function () {
			showModal(
				pokemon.name,
				`Height: ${pokemon.height}`,
				pokemon.imageUrl
			);
			$('#poke-modal').modal('show');
		});
	}

	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url,
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		})
	}

	function loadDetails(pokemon) {
		let url = pokemon.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			//adds details to items
			pokemon.imageUrl = details.sprites.front_default;
			pokemon.height = details.height;
			pokemon.types = details.types;
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
		loadList: loadList,
		showModal: showModal
	};
})();

pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});