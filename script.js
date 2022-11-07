const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;

}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;

}

function newQuote() {
    showLoadingSpinner();
    const rand = Math.floor(Math.random() * apiQuotes.length);
    console.log('rand', rand)
    const quote = apiQuotes[rand];
    //check if author does not exist
    if (!quote.author) {
        authorText.textContent = 'Unknown'; //nebo innerText
    } else {
        authorText.textContent = quote.author;
    }
    // switch css for long quote
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// get quotes
async function getQuotes() {
    showLoadingSpinner();
    const url = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(url);
        apiQuotes = await response.json();
        console.log('quotes', apiQuotes);
        newQuote();
    } catch (error) {
        console.log(error)
    }

}

function tweetQuote() {
    // const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}`;
    console.log('twitterUrl', twitterUrl);
    window.open(twitterUrl, '_blank');
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
// newQuoteBtn.addEventListener('click', newQuote);//nacita z API jen jednou, pak z apiQuotes
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes()