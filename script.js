const quoteCntr = document.getElementById('quote-contnr');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('tweet-btn');
const newQt = document.getElementById('new-quote');
const loader = document.getElementById('loader')
function loading(){
        quoteCntr.hidden = true;
        loader.hidden = false
}
function completeLoad(){
    quoteCntr.hidden = false;
    loader.hidden = true;
}
let quote = [];
function display(){
    loading();
    let quoteDisplay = quote[Math.floor(Math.random() * quote.length)];
    
    if (quoteDisplay.author=='type.fit'){
        author.textContent = 'Unknown';
    }else{
        const string = quoteDisplay.author;
        const characters = [];
        let index = 0;

        while (index < quoteDisplay.author.length) {
        const character = string[index];
        
        if (character === ',') {
            break; 
        }
        
        characters.push(character); 
        index++;
        }

        const result = characters.join(''); 
        author.textContent = result; 
    }
    quoteText.textContent = quoteDisplay.text;
    completeLoad();
}
async function getquotes(){
    const quoteApi = 'https://type.fit/api/quotes';
    loading();
    try{
        const response = await fetch(quoteApi);
        quote = await response.json();
        display();
    }
    catch(error){
        alert(error)
    }
}
function tweet(){
    const tweeturl = `https://twitter.com/intent/tweet?=text${quoteText.textContent } - ${author.textContent}`;
    window.open(tweeturl,'_blank');
}
newQt.addEventListener('click',display);
twitterBtn.addEventListener('click',tweet);
getquotes();