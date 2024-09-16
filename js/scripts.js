let pokemonRepository = (function () {
	let pokemonList = []
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

	//nested IIFE containing modal details
	let allModal = (function() {
		function showModal(title, text) {
			let modalContainer = document.querySelector('#modal-container');

			//clears all modal content, creates a new div, and assigns it the modal class
			modalContainer.innerHTML = '';
			let modal = document.createElement('div');
			modal.classList.add('modal');

			//sets up the close button
			let closeButtonElement = document.createElement('button');
			closeButtonElement.classList.add('modal-close');
			closeButtonElement.innerText = 'Close';
			closeButtonElement.addEventListener('click', hideModal);

			//defines modal title
			let titleElement = document.createElement('h1');
			titleElement = title;

			//defines modal content
			let contentElement = document.createElement('p');
			contentElement = text;

			//appends elements to modal and modal to container
			modal.appendChild(closeButtonElement);
			modal.appendChild(titleElement);
			modal.appendChild(contentElement);
			modalContainer.appendChild(modal);

			//makes modal visible
			modalContainer.classList.add('is-visible');

			modalContainer.classList.addEventListener('click', (e) => {
				let target = e.target;
				if(target === modalContainer) {
					hideModal();
				}
			});
		}

		document.querySelector('#show-modal').addEventListener('click', () => 
		{
			showModal('Modal Title', 'This is the modal content...');
		});

		let dialogPromiseReject; // to be set up later

		function hideModal() {
			let modalContainer = document.querySelector('#modal-container');
			modalContainer.classList.remove('is-visible');

			/*if(dialogPromiseReject) {
				dialogPromiseReject();
				dialogPromiseReject = null;
			}*/
		}

		return {
			showModal: showModal;
			hideModal: hideModal
		}
	})(); //end nested modal IIFE, return to pokemonList


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
		button.addEventListener("click", function(){showDetails(pokemon)});

		//changing content and class of buttons
		button.innerText = pokemon.name;
		button.classList.add("pokemonButton");

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
		loadList: loadList
	};
})();

pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});