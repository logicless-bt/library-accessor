let pokemonList = [
{name: 'Sigilyph', height: 4, types: ['psychic', 'flying']},
{name: 'Falinks', height: 9, types: ['fighting']},
{name: 'Volcarona', height: 5, types: ['bug', 'fire']}
];

function readOut(element) {
	if (element.height < 5) {
		document.write(`${element.name} \(height: ${element.height}\) -- that's a small one! `);
		document.write('<br\>');
	} else {
		document.write(`${element.name} \(height: ${element.height}\) `);
		document.write('<br\>');
	}
}

pokemonList.forEach(readOut);