class Tweet {
  constructor(author, content, id) {
    this.author = author;
    this.content = content;
    this.id = id;
  }
  getTweet() {
    return this.author, this.content, this.id;
  }
  setTweet(newAuthor, newContent, newId) {
    newAuthor.trim();
    newContent.trim();
    if (newAuthor === "" || newContent === "") {
      throw "cannot create Tweet object";
    }
    this.author = newAuthor;
    this.content = newContent;
    this.id = newId;
  }
}

var tweets = [];

const form = document.getElementById("tweetForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = form.elements["username"];
  const tweet = form.elements["tweet"];
  const id = Date.now();

  let newTweet = new Tweet(username.value, tweet.value, id);

  tweets.push(newTweet);

  const filteredTweetsById = getUniqueListBy(tweets, "id");

  filteredTweetsById.map((tweet) => {
    return createTweet(tweet.author, tweet.content);
  });

  window.localStorage.setItem(newTweet.id, JSON.stringify(newTweet));
});

function createTweet(author, content) {
  let tweetTemplate = `
    <li>
                    <div class="tweet">
                      <div class="user-information">
                        <div class="user-profile">
                          <img
                            src="./images/user-icon.png"
                            alt="userProfile"
                            width="40"
                            height="40"
                          />
                        </div>
                        <div class="user-details">
                          <div class="username">
                            <h4 id="username">@${author}</h4>
                          </div>
                          <div class="elipses-icon">
                            <button class="btn-options">
                              <i class="fa-solid fa-ellipsis"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="tweet-content my-1">
                        <p>
                         ${content}
                        </p>
                      </div>
                      <hr class="h-line" />
                    </div>
                  </li>
    `;

  var tweetsList = document.getElementById("tweets-list");

  tweetsList.insertAdjacentHTML("beforeend", tweetTemplate);
}

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
