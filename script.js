const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const addToFavouritesBtn = document.getElementById("favourite");
const loader = document.getElementById("loader");


//===Show Loading====
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//=====Hide Loading====
function complete() {
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
async function getQuote() {
  loading();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if(!data.quoteAuthor){
      authorText.innerHTML = 'Unknown';
    } else {
      authorText.innerHTML = data.quoteAuthor;
    }
    if(data.quoteText.length > 120){
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML = data.quoteText;
    //Show quote and stop loader
    complete();
  } catch(error) {
    getQuote();
  }
}

//Tweet the quote
function tweetQuote(){
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

//adding to favourites
function addQuote() {
  const li = document.createElement('li');
  const addQuotes = `${quoteText.innerText} - ${authorText.innerText}`;
  li.appendChild(document.createTextNode(addQuotes));
  document.querySelector('ul').appendChild(li);
  li.addEventListener('click', () => {
    li.remove();
  });
  getQuote();
}



//Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);
addToFavouritesBtn.addEventListener('click',addQuote);


getQuote();
