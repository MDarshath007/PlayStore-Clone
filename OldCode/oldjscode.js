const API_URL = "https://www.freetogame.com/api/games";

async function getGames() {
    const response = await fetch(
      "https://corsproxy.io/?https://www.freetogame.com/api/games"
    );

    const game = await response.json();

    console.log(game);

    let main_container = document.getElementById("main-container")
    let action_container = document.getElementById("action-container")
    let sports_container = document.getElementById("sports-container")
    let cardGames_container = document.getElementById("card-games-container")
    
    // const randomGames = game.sort(() => 0.5 - Math.random()).slice(0, 5);
    // console.log(randomGames)
    
    // randomGames.forEach(game => {
    
    //   main_container.innerHTML += create_main_card(game);
    
    // });

    const main_games = game.filter( game=> game.genre == "Strategy")
    const random_main_games = main_games.sort(()=> 0.5 - Math.random()).slice(0,5)
    random_main_games.forEach( game =>
    {
        main_container.innerHTML += create_main_card(game)
    }
    )

function create_main_card(game)
{
    return `
     
    <div class="card mt-5 rounded-3" style="min-width: 33rem">
        <div class="image-wrapper">
          <a href="${game.game_url}"> <img src="${game.thumbnail}" class="card-img-top rounded-top-3" alt="..."/>
        </div>
        <div class="card-body bg-black text-white rounded-bottom-3">
          <h5 class="card-title fs-4">Play ${game.title}</h5>
          <p class="card-text">Get started with Google Play Games</p>
          <div
            class="card-bottom d-flex justify-content-between align-items-center"
          >
            <div class="card-name">
              <img src="${game.thumbnail}" alt="Game Icon" class="me-2" style="width:40px"/>
              <span class="fw-semibold fs-5">${game.title}</span>
            </div>
            <a
            href="${game.game_url}"
            class="install-btn btn btn-success wd-100 text-black rounded-pill px-4 border-0"
            style="background-color: #27f5a9; flex-shrink: 0;"
            >Install on windows</a
            >
            </div>
            </div>
            `
        }

        const action_games = game.filter(game => game.genre === "Shooter")
        const random_action_games = action_games.sort(()=> 0.5 - Math.random()).slice(0,10);
        
        random_action_games.forEach(game => {
        
            action_container.innerHTML += create_action_card(game)
        
        });
        
function create_action_card(game)
{
    return `
    <a href="${game.game_url}">
    <div class="card border-0 rounded-2" style="min-width: 19rem">
    <img src="${game.thumbnail}" class="card-img-bottom" alt="..." />
    <div class="card-body border-0">
    <h5 class="card-title">${game.title}</h5>
    <p class="card-text" >
    ${game.short_description}
    </p>  
    </div>
    </div>
    </div>
    </a>
    `
}

const sports_games = game.filter(game => game.genre === "Sports")
const random_sports_games = sports_games.sort(()=> 0.5 - Math.random()).slice(0,10);

random_sports_games.forEach(game => {

    sports_container.innerHTML += create_racing_card(game)

});

function create_racing_card(game)
{

    return `
    <a href="${game.game_url}">
    <div class="card border-0 rounded-2" style="min-width: 19rem">
        <img src="${game.thumbnail}" class="card-img-bottom" alt="..." />
        <div class="card-body border-0">
          <h5 class="card-title">${game.title}</h5>
          <p class="card-text">
            ${game.short_description}
          </p>  
        </div>
      </div>
    </div>
    </a>
    `
}

const card_games = game.filter(game => game.genre === "Card Game")
const random_card_games = card_games.sort(()=> 0.5 - Math.random()).slice(0,10);

random_card_games.forEach(game => {

    cardGames_container.innerHTML += create_card_games_card(game)

});

function create_card_games_card(game)
{
    return `
    <a href="${game.game_url}">
    <div class="card border-0 rounded-2" style="min-width: 19rem">
        <img src="${game.thumbnail}" class="card-img-bottom" alt="..." />
        <div class="card-body border-0">
          <h5 class="card-title">${game.title}</h5>
          <p class="card-text">
            ${game.short_description}
          </p>  
        </div>
      </div>
    </div>
    </a>
    `
}
}

getGames();