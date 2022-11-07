const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;

}
//hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;

}

function newQuote() {
    loading();
    const rand = Math.floor(Math.random() * apiQuotes.length);
    console.log('rand', rand)
    const quote = apiQuotes[rand];
    //check if author does not exist
    if (!quote.author) {
        authorText.textContent = 'Unknown';
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
    complete();
}

// get quotes
async function getQuotes() {
    loading();
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
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes()