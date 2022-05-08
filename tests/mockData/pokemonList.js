export const pokemonListRaw = {
	count: 1126,
	next: "https://pokeapi.co/api/v2/pokemon/?offset=70&limit=10",
	previous: "https://pokeapi.co/api/v2/pokemon/?offset=50&limit=10",
	results: [{
		name: "poliwhirl",
		url: "https://pokeapi.co/api/v2/pokemon/61/"
	}, {
		name: "poliwrath",
		url: "https://pokeapi.co/api/v2/pokemon/62/"
	}, {
		name: "abra",
		url: "https://pokeapi.co/api/v2/pokemon/63/"
	}, {
		name: "kadabra",
		url: "https://pokeapi.co/api/v2/pokemon/64/"
	}, {
		name: "alakazam",
		url: "https://pokeapi.co/api/v2/pokemon/65/"
	}, {
		name: "machop",
		url: "https://pokeapi.co/api/v2/pokemon/66/"
	}, {
		name: "machoke",
		url: "https://pokeapi.co/api/v2/pokemon/67/"
	}, {
		name: "machamp",
		url: "https://pokeapi.co/api/v2/pokemon/68/"
	}, {
		name: "bellsprout",
		url: "https://pokeapi.co/api/v2/pokemon/69/"
	}, {
		name: "weepinbell",
		url: "https://pokeapi.co/api/v2/pokemon/70/"
	}]
};

export const pokemonDataObj = {
	abilities: [{
		ability: {
			name: "water-absorb",
			url: "https://pokeapi.co/api/v2/ability/11/"
		},
		is_hidden: false,
		slot: 1
	}],
	base_experience: 135,
	forms: [],
	game_indices: [],
	height: 10,
	held_items: [],
	id: 1,
	is_default: true,
	location_area_encounters: "https://pokeapi.co/api/v2/pokemon/61/encounters",
	moves: [],
	name: "poliwhirl",
	order: 100,
	species: {},
	sprites: {
		front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png",
		other: {
			dream_world: {
				front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/61.svg",
				front_female: null
			},
			home: {
				front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/61.png",
			}
		}
	},
	stats: [],
	types: [{
		slot: 1,
		type: {
			name: "water",
			url: "https://pokeapi.co/api/v2/type/11/"
		}
	}],
	weight: 200
};