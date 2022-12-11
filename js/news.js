// Production Script Run Starts here
// variables
const healthBtn = document.getElementById("health");
const searchBtn = document.getElementById("searchBtn");
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis 
const API_KEY = "b302ca2135c146fbab12a2fe932ccc42";
const HEALTH_NEWS = " https://api.worldnewsapi.com/search-news?api-key=e0c2c2a4786c40f699a521f2e859a7ec&source-countries=ph&text=health-headlines&number=12";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newsType.innerHTML="<h4>Top Health News</h4>";
    fetchHeadlines();
};


searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async () => {
    const response = await fetch(HEALTH_NEWS);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.news;
    } else {
        // handle errors and some debugging
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //error handle
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

//this will now create and display contents in the HTML from the contents received from the API
function displayNews() {

    newsdetails.innerHTML = "";

    // if(newsDataArr.length == 0) {
    //     newsdetails.innerHTML = "<h5>No data found.</h5>"
    //     return;
    // }

    newsDataArr.forEach(news => {

        var date = news.publish_date.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-10 col-md-6 col-lg-3 p-1 card m-1 card-styles";

        var card = document.createElement('div');
        card.className ="p-1 justify-content-between";

        var image = document.createElement('img');
        // image.setAttribute("height","matchparent");
        // image.setAttribute("width","100%");
        // image.setAttribute("height", "200px");
        image.className="rounded img-fluid img-height";
        image.src=news.image;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title title-height";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="cutoff-text";
        discription.innerHTML = news.text;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}

