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
		button.addEventListener("click", function(event) {
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
		//modalContainer.innerHTML = '';
	    /*let modal = document.createElement('div');
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
	    
	    modalContainer.classList.add('is-visible');*/

	    //assign modal elements
	    let modalBody = $('.modal-body');
	    let modalTitle = $('.modal-title');
	    let modalHeader = ('.modal-header');

	    //clear modal elements
	    modalBody.empty();
	    modalTitle.empty();
	    //modalHeader.empty();

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

	/*function hideModal() {
	    modalContainer.classList.remove('is-visible');
	}

	//hitting escape exits modal
	 window.addEventListener('keydown', (e) => {
	    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
	      hideModal();  
	    }
	  });

	 //exits the modal when clicking away
	 modalContainer.addEventListener('click', (e) => {
	    let target = e.target;
	    if (target === modalContainer) {
	      hideModal();
	    }
	  });*/

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