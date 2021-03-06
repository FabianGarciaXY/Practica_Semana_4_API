// Calling API 
const fetchPokemon = () => {

    const pokeName = document.getElementById('poke-name');
    const pokeInput = pokeName.value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`

    fetch( url )
        .then(( res ) => {
        
            if( res.status != '200' ) { console.log( res ); alert( 'There is not result' ); }
            else if( pokeInput === '' ) { alert( 'Please insert a search first' ); }
            else { return res.json() }

        })
        .then( ( data ) => {
            
            console.log( data );
            // Getting name
            const pokeName = data.name;
            pokemonName( pokeName );

            // Getting experience
            const pokeExperience = data.base_experience;
            experience( pokeExperience );

            // Getting weight
            const pokemonWeight = data.weight;
            pokeWeight( pokemonWeight );

            // Getting height
            const pokemonHeight = data.height;
            pokeHeight( pokemonHeight );

            // Getting pokemon images
            const pokeImg = data.sprites.other['official-artwork'].front_default;
            pokeImage( pokeImg );

            // Getting out id // Temporal
            const pokeId = data.id;
            id( pokeId )

            // Getting pokemon statistics
            const statsArray = data.stats;
            statistics( statsArray );

            // Getting pokemon Movements
            const movesArray = data.moves;
            moves( movesArray );
        })
}

// FetchPokemon Image
const pokeImage = ( value ) => {
    const pokeImage = document.getElementById('poke-img');
    pokeImage.src = value;
}

// Fetching Statistics
const statistics = ( value ) => {   
    const statisticsArray = document.querySelectorAll('.statistic-item');

    for (let i in value) {
        statisticsArray[i].textContent =`${value[i].base_stat}`;
    }   
}

// Fetching name 
const pokemonName = ( value ) => {
    const pokemonName = document.querySelector('#name');
    pokemonName.textContent = value.toUpperCase();
}

// Fetching Pokemon Id
const id = ( value ) => {
    const pokemonId = document.getElementById('id');
    document.getElementById('pre-id').textContent = "# "

    pokemonId.textContent = value;
}

// Fetching experience
const experience = ( value ) => {
    const pokeExperience = document.getElementById('experience');
    pokeExperience.textContent = 'Exp: ' + value;
}

// Fetching weight
const pokeWeight = ( value ) => {
    const pokemonWeight = document.getElementById('weight');
    pokemonWeight.textContent = 'Weight: ' +  value;
}

// Fetching height
const pokeHeight = ( value ) => {
    const pokemonWeight = document.getElementById('height');
    pokemonWeight.textContent = 'Height: ' +  value;
}


// Fetching Moves
const moves = ( value ) => {

    const previewsDivContainer = document.querySelector('.new-div');
    if (previewsDivContainer) {
        let statisticContainer = document.querySelector('.statistics');
        statisticContainer.removeChild(previewsDivContainer);
    }

    const newScreenTwo = document.querySelector('.statistics');
    const newDiv = document.createElement('div');    
    const newDiv2 = document.createElement('div');
    const newTitle = document.createElement('span');
    const ulList = document.createElement('ul');

    newTitle.textContent = 'Movements';
    newDiv.classList.add('new-div');

    for ( let i = 0; i < 9; i++ ) {
        const liItem = document.createElement('li');
        liItem.textContent = value[i].move.name;
        ulList.appendChild( liItem );
    }

    newDiv2.appendChild(newTitle)
    newDiv.appendChild(newDiv2);
    newDiv.appendChild(ulList);
    newScreenTwo.appendChild(newDiv);
    newDiv.style['z-index'] = '-1'
}

// Plus button
const nextPokeButton = document.querySelector('#top');
const rightButton = document.querySelector('#right');
nextPokeButton.addEventListener('click', next);
rightButton.addEventListener( 'click', next )

function next() {

    const pokeInput = document.getElementById('poke-name');
    let pokemonId = document.getElementById('id');
    let newPoke = parseInt(pokemonId.textContent);

    newPoke = newPoke + 1;
    console.log(newPoke)
    pokeInput.value = newPoke.toString();
    if(!pokemonId) {
        //        
    }
    fetchPokemon()
    document.querySelector('.new-div').style['z-index'] = '-1';
    document.querySelector('.stat-1').style['z-index'] = '1';
    document.querySelector('.stat-2').style['z-index'] = '1';
}

const prevPokeButton = document.querySelector('#down');
const leftPokeButton = document.querySelector('#left');
prevPokeButton.addEventListener('click', prev);
leftPokeButton.addEventListener('click', prev);

function prev() {

    const pokeInput = document.getElementById('poke-name');
    let pokemonId = document.getElementById('id');

    let newPoke = parseInt(pokemonId.textContent);

    newPoke = newPoke + -1;

    console.log(newPoke)
    pokeInput.value = newPoke.toString();
    if(!pokemonId) {
        //        
    }
    fetchPokemon()
    document.querySelector('.new-div').style['z-index'] = '-1';
    document.querySelector('.stat-1').style['z-index'] = '1';
    document.querySelector('.stat-2').style['z-index'] = '1';
}


// Statistics Button
const statsButton = document.querySelector('.stats');
statsButton.addEventListener( 'click', () => {
    const movementsContainer = document.querySelector('.new-div');
    const statsContainer1 = document.querySelector('.stat-1')
    const statsContainer2 = document.querySelector('.stat-2');

    movementsContainer.style['z-index'] = '-1';
    statsContainer1.style['z-index'] = '1';
    statsContainer2.style['z-index'] = '1';
})

// Movements Button
const movButton = document.querySelector('.mov');
movButton.addEventListener( 'click', () => {
    const movementsContainer = document.querySelector('.new-div');
    const statsContainer1 = document.querySelector('.stat-1');
    const statsContainer2 = document.querySelector('.stat-2');

    statsContainer1.style['z-index'] = '-1';
    statsContainer2.style['z-index'] = '-1';
    movementsContainer.style['z-index'] = '1';
})