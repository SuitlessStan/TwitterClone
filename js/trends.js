var trends = [];

const randomWordsURL = "https://random-word-api.herokuapp.com/word";

let fetchRandomWords = async (url) => {
  for (let i = 0; i <= 3; i++) {
    let response = await fetch(url);
    let results = await response.json();
    createTrend(results[0], Math.ceil(Math.random() * 10000));
  }
};

fetchRandomWords(randomWordsURL);

function createTrend(trendName, numberOfTweets) {
  let trendTemplate = `
            <li class="my-1">
                <div class="trendItem">
                  <h3>${trendName}</h3>
                  <small>${numberOfTweets} Tweets</small>
                </div>
            </li>
    `;

  var trendsList = document.getElementById("trends-list");

  trendsList.insertAdjacentHTML("beforeend", trendTemplate);
}
