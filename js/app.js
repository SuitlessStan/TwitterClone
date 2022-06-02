class Tweet {
  constructor(author, content, id, retweeted, liked) {
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
const tweetsList = document.getElementById("tweets-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = form.elements["username"];
  const tweet = form.elements["tweet"];
  const id = Date.now();

  let newTweet = new Tweet(username.value, tweet.value, id);

  tweets.push(newTweet);

  tweets = getUniqueListBy(tweets, "content");

  refreshFeed();

  // window.localStorage.setItem(newTweet.id, JSON.stringify(newTweet));
});

function createTweet(tweet) {
  let tweetTemplate = `
                  <li>
                    <div class="tweet" id=${tweet.id}>
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
                            <h4 id="username">@${tweet.author}</h4>
                          </div>
                          <div class="elipses-icon">
                            <button class="btn-options">
                              <i class="fa-solid fa-ellipsis"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="tweet-content">
                        <p>
                         ${tweet.content}
                        </p>
                        <div class="tweet-buttons">
                        <button class="btn-tweet"><i class="fa-solid fa-heart "></i></button>
                        <button onclick="isRetweeted(${tweet.id})" class="btn-tweet"><i class="fa-solid fa-retweet "></i></button>
                        </div>
                      </div>
                      <br/>
                      <hr class="h-line"/>
                    </div>
                  </li>
    `;

  tweetsList.insertAdjacentHTML("beforeend", tweetTemplate);
}

function isRetweeted(tweetID) {
  const filteredTweet = tweets.filter((tweet) => tweet.id === tweetID);
  removeElement(tweets, filteredTweet);
  tweets.unshift(filteredTweet[0]);
  refreshFeed();
}

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

function removeElement(arr, item) {
  let index = arr.indexOf(item);
  arr.splice(index, 1);
}

function refreshFeed() {
  tweetsList.innerHTML = "";
  tweets.forEach((tweet) => {
    return createTweet(tweet);
  });
}
