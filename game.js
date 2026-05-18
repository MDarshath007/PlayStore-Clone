const game = JSON.parse(
    localStorage.getItem("selectedGame")
);

const gameDetails =
    document.getElementById("game-details");

gameDetails.innerHTML = `

<div class="row align-items-center">

    <div class="col-md-8">

        <h1 class="display-3 fw-bold">
            ${game.title}
        </h1>

        <p class="fs-5 text-success">
            ${game.publisher}
        </p>

        <p>
            ${game.short_description}
        </p>

        <div class="d-flex gap-3 mt-4">
        <a href="${game.game_url}"
            <button class="btn btn-success px-4 py-2">
                Install or Play 
            </button>
        </a>

        </div>

        <div class="mt-4">

            <p><strong>Genre:</strong> ${game.genre}</p>

            <p><strong>Platform:</strong> ${game.platform}</p>

            <p><strong>Developer:</strong> ${game.developer}</p>

            <p><strong>Release Date:</strong> ${game.release_date}</p>

        </div>

    </div>

    <div class="col-md-4 text-center">

        <img
          src="${game.thumbnail}"
          class="img-fluid rounded-4 shadow"
        >

    </div>

</div>

`;