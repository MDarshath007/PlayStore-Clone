const API_URL = "https://corsproxy.io/?https://www.freetogame.com/api/games"

let allGames = []

function createMainCard(game) {

  return `
  
    <div class=" card mt-5 rounded-3" style="min-width: 28rem">

      <div class="image-wrapper">

        <a href="game.html" onclick='saveGame(${JSON.stringify(game)})'>
          <img
            src="${game.thumbnail}"
            class="card-img-top rounded-top-3"
          />
        </a>

      </div>

      <div class="card-body bg-black text-white rounded-bottom-3">

        <h5 class="card-title fs-4">
          Play ${game.title}
        </h5>

        <p class="card-text">
          Get started with Google Play Games
        </p>

        <div class="card-bottom d-flex justify-content-between align-items-center">

          <div class="card-name">

            <img
              src="${game.thumbnail}"
              style="width:40px"
            />

            <span class="fw-semibold fs-5">
              ${game.title}
            </span>

          </div>

          <a href="game.html" onclick='saveGame(${JSON.stringify(game)})'
            class="install-btn btn text-black rounded-pill px-4 border-0" >
            Install on windows
          </a>

        </div>

      </div>

    </div>
  
  `;
}

function createGameCard(game){
  return `
<a href="game.html"
   onclick='saveGame(${JSON.stringify(game)})'>

  <div
    class="card border-0 rounded-2"
    style="min-width: 19rem"
  >

    <img
      src="${game.thumbnail}"
      class="card-img"
    />

    <div class="card-body border-0">

      <h5 class="card-title">
        ${game.title}
      </h5>

      <p class="card-text">
        ${game.short_description}
      </p>

    </div>

  </div>

</a>
`;
}

function renderPlatFormResult(game)
{
  return `
  <a href ="game.html"
   onclick='saveGame(${JSON.stringify(game)})'>
  <div class="card border-0 rounded-2 mt-5" style="width: 26rem;">
          <img src="${game.thumbnail}" class="card-img" alt="...">
          <div class="card-body">
            <h5 class="card-title">${game.title}</h5>
            <p class="card-text">
            ${game.short_description}
            </p>
          </div>
        </div>
        </a>
  `
}

function renderGames(
  games,
  genre,
  container,
  limit = 10
){
  let cards = "";
  const filteredGames = games
    .filter(game => game.genre === genre)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);

  filteredGames.forEach(game => {
    cards += createGameCard(game);
  });
  container.innerHTML = cards;
}
let mainContainer 
async function getGames(){

  const response = await fetch(API_URL);

  allGames = await response.json();

   mainContainer =
    document.getElementById("main-container");

  const actionContainer =
    document.getElementById("action-container");

  const sportsContainer =
    document.getElementById("sports-container");

  const cardGamesContainer =
    document.getElementById("card-games-container");

  // MAIN FEATURED GAMES

  const mainGames = allGames
    .filter(game => game.genre === "Strategy")
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  mainGames.forEach(game => {

    mainContainer.innerHTML +=
      createMainCard(game);

  });

  // OTHER SECTIONS

  renderGames(
    allGames,
    "Shooter",
    actionContainer
  );

  renderGames(
    allGames,
    "Sports",
    sportsContainer
  );

  renderGames(
    allGames,
    "Card Game",
    cardGamesContainer
  );
}

getGames();

function saveGame(game)
{
    localStorage.setItem(
        "selectedGame",
        JSON.stringify(game)
    );
}

const platForm_btns = document.querySelectorAll(".platform-btn")
const platFormResult = document.querySelector(".searched-games")

platForm_btns.forEach((btn)=>
{
  btn.addEventListener("click",()=>{

    const platform = btn.dataset.platform

    const filteredGames = allGames.filter(game =>
      game.platform === platform
    )

    let cards = ""

    filteredGames.forEach(game => {

      cards += renderPlatFormResult(game)

    })

    document.querySelector(".main-page")
      .style.display = "none"

    platFormResult.style.display = "flex"

    platFormResult.innerHTML = cards

  })
})

const searchBar =
  document.querySelector(".search-bar");

const searchBtn =
  document.querySelector(".search-btn");

searchBtn.addEventListener("click", (e) => {

  e.preventDefault();

  const searchValue =
    searchBar.value.toLowerCase().trim();

  if(searchValue === "")
  {
    return;
  }

  const filteredGames =
  allGames.filter(game =>

    game.title
      .toLowerCase()
      .includes(searchValue)

    ||

    game.genre
      .toLowerCase()
      .includes(searchValue)

    ||

    searchValue.includes(
      game.genre.toLowerCase()
    )

  );

  if(filteredGames.length === 0)
  {
    platFormResult.innerHTML =
      "<h2 class='mt-5'>No games found</h2>";

    document.querySelector(".main-page")
      .style.display = "none";

    platFormResult.style.display = "flex";

    return;
  }

  let cards = "";

  filteredGames.forEach(game => {

    cards += renderPlatFormResult(game);

  });

  document.querySelector(".main-page")
    .style.display = "none";

  platFormResult.style.display = "flex";

  platFormResult.innerHTML = cards;

});
const categories =
  document.querySelectorAll(".nav-link");

categories.forEach(category => {

  category.addEventListener("click", (e) => {
    e.preventDefault();

    const categoryName =
      category.textContent.trim().toLowerCase();

    const categorizedGames =
      allGames.filter(game =>

        game.genre
          .toLowerCase()
          .includes(categoryName)

      );

    let cards = "";

    categorizedGames.forEach(game => {

      cards += renderPlatFormResult(game);

    });

    document.querySelector(".main-page").style.display = "none";

    platFormResult.style.display = "flex";

    platFormResult.innerHTML = cards;

  });

});




