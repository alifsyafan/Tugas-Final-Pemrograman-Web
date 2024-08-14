
async function getPokemon() {
    
    try {
        const config = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const response = await config.json();

        response.results.forEach(poke => {
            const getCol = document.querySelector(".wrappers");
            // create elements
            getCol.insertAdjacentHTML('beforeend',
            `<div class="col-md-4 col-sm-12 my-3">
            <div class="wrapper d-flex justify-content-center">
                <div class="card" style="width: 18rem;">
                    <img src="img/1.webp" class="card-img-top img-fluid mx-auto pokeball" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-sm-center">${poke.name.toUpperCase()}</h5>
                        <p class="card-text">Liat-liat detail tentang <span id="poke-name-detail">${poke.name}</span> yang mungkin sering kamu liat di film atau di game</p>
                        <div class="d-flex justify-content-center">
                        <button onclick='getDetailPokemon("${poke.url}")' class="btn tombol-poke mx-1" data-toggle="modal" data-target="#pokemodal">View Detail</button>
                        <button onclick='getDetailPokemon("${poke.url}")' class="btn tombol-liat mx-1" data-toggle="modal" data-target="#pokemodal">Buka Poke</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
        });

    } catch (error) {
        console.log(error.message);
    }
}

getPokemon()

async function getDetailPokemon(pokemon){

    const config = await fetch(pokemon);
    const response = await config.json();

    // mengubah nama pokemon
    const pokeName = document.querySelector("#poke-name");
    pokeName.innerHTML = response.name.toUpperCase()
    
    // mengubah img pokemon
    const pokeImg = document.querySelector("#poke-img");
    pokeImg.setAttribute("src", response.sprites.front_shiny);

    // mengubah ability 
    const ability = document.querySelector(".ability");
    response.abilities.forEach(abi => {
        ability.insertAdjacentHTML("beforeend", `<button class="btn badge mr-2 skills text-light">${abi.ability.name}</button>`);
    });

    // mengubah berat
    const weight = document.querySelector(".berat");
    weight.innerHTML = `<small>Weight : <span id="berat-text">${response.weight}</span></small></button>`;

    // untuk mengambil stat
    const stats = document.querySelector(".stat");
    response.stats.forEach(stat => {
        console.log(stat.stat.name)
        stats.insertAdjacentHTML("beforeend", `<button class="btn badge mr-2 skills text-light">${stat.stat.name}</button>`);
    });

    console.log(response.stats)
}
