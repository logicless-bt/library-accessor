let pokemonList = [
{name: 'Sigilyph', height: 4, types: ['psychic', 'flying']},
{name: 'Falinks', height: 9, types: ['fighting']},
{name: 'Volcarona', height: 5, types: ['bug', 'fire']}
];

for (let i = 0; i < pokemonList.length; i++) {
	if (pokemonList[i].height < 5) {
		document.write(`${pokemonList[i].name} \(height: ${pokemonList[i].height}\) -- that's a small one! `);
		document.write('<br\>');
	} else {
		document.write(`${pokemonList[i].name} \(height: ${pokemonList[i].height}\) `);
		document.write('<br\>');
	}
}