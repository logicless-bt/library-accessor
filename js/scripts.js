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
		//setting up
		let pokemonCurrent = document.querySelector(".pokemon-list");
		let listItem = document.createElement("li");
		let button = document.createElement("button");
		button.addEventListener("click", function(event) {
			pokemonRepository.showDetails(pokemon);
		});

		//changing content and class of buttons
		button.innerText = pokemon.name;
		button.classList.add("pokemonButton");

		//placing button on list
		listItem.appendChild(button);
		pokemonCurrent.appendChild(listItem);
	}

	let modalContainer = document.querySelector('#modal-modal');
	function showModal(title, text, img) {
		/*let titleElement = document.querySelector('#pokemon-modal-label');
		let contentElement = document.querySelector('.modal-body');
		let pkHeight = document.querySelector('#pokemon-height');
		let pkImage = document.querySelector('#pokemon-image')

		titleElement.innerText = title;
		contentElement.innerText = text;
		//pkImage.setAttribute('src', img);*/

		modalContainer.innerHTML = '';
	    let modal = document.createElement('div');
	    modal.classList.add('modal');

	    let closeButtonElement = document.createElement('button');
	    closeButtonElement.classList.add('modal-close');
	    closeButtonElement.innerText = 'Close';
	    closeButtonElement.addEventListener('click', hideModal);

	    let titleElement = document.createElement('h1');
	    titleElement.innerText = title;

	    let contentElement = document.createElement('p');
	    contentElement.innerText = text;

	    let imageElement = document.createElement('img');
	    imageElement.src = img;

	    modal.appendChild(closeButtonElement);
	    modal.appendChild(titleElement);
	    modal.appendChild(contentElement);
	    modal.appendChild(imageElement);
	    modalContainer.appendChild(modal);
	    
	    modalContainer.classList.add('is-visible');
	}

	function hideModal() {
	    modalContainer.classList.remove('is-visible');
	  }

	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function () {
			showModal(
				pokemon.name,
				`Height: ${pokemon.height}`,
				pokemon.imageUrl
			);
			//$('#pokemon-modal').modal('show');
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