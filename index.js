const tbody = document.querySelector("tbody");
const table = document.querySelector("table");
const input = document.querySelector("#searchBar");
const apiUrl = "https://api.tvmaze.com/search/shows?q=";
const loader = document.querySelector("#loader");
let timeout = null;

function search() {
  toggleLoader();

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    fetch(apiUrl + input.value)
      .then((res) => res.json())
      .then((data) => {
        renderData(data);
        toggleLoader();
      })
      .catch((error) => alert(`ERROR! ${error}`));
  }, 1000);
}

const renderData = function (data) {
  tbody.innerHTML = "";
  if (!data.length) {
    alert("No movies found under this name.");
    input.value = "";
  } else {
    for (entry of data) {
      const row = document.createElement("tr");
      const name = document.createElement("td");
      const rating = document.createElement("td");
      const genre = document.createElement("td");
      const desc = document.createElement("td");
      tbody.append(row);
      row.append(name);
      row.append(genre);
      row.append(rating);
      row.append(desc);
      name.innerText = entry.show.name;
      rating.innerText = entry.score;
      genre.innerText = entry.show.genres;
      desc.innerHTML = entry.show.summary;
    }
  }
};

const toggleLoader = function () {
  loader.classList.toggle("hidden");
  table.classList.toggle("hidden");
};

input.addEventListener("input", search);