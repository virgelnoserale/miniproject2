const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// const HEALTH_NEWS = " https://api.worldnewsapi.com/search-news?api-key=e0c2c2a4786c40f699a521f2e859a7ec&source-countries=ph&text=health-headlines&number=12&offset=12";

//second account in API
const HEALTH_NEWS = " https://api.worldnewsapi.com/search-news?api-key=81ddac3084094da1a9597ce609d3fae5&source-countries=ph&text=health-headlines&number=12&offset=12";



window.onload = function() {
    fetchHeadlines();
};

const fetchHeadlines = async () => {
    const response = await fetch(HEALTH_NEWS);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.news;
    } else {
        // handle errors and some debugging
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = 
        `<div class="container">
            <div class="row my-5 justify-content-center">
                <div class="col-7 text-center">
                    <h3 class="display-5">Oopss, no data available</h3>
                    <img class="img-fluid" src="./img/404.png">
                </div>
            </div>
        </div>`;
        return;
    }

    displayNews();
}

//this will now create and display contents in the HTML from the contents received from the API
function displayNews() {

    newsdetails.innerHTML = "";

    newsDataArr.forEach(news => {

        var date = news.publish_date.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-10 col-md-6 col-lg-3 my-3 card card-styles shadow";

        var card = document.createElement('div');
        card.className ="p-1 my-1 justify-content-center";

        var image = document.createElement('img');
        // image.setAttribute("height","matchparent");
        // image.setAttribute("width","100%");
        // image.setAttribute("height", "200px");
        image.className="rounded img-fluid img-height";
        image.src=news.image;
        image.setAttribute("onerror", "'this.onerror=null';this.src='./img/no-img.png';");

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title title-height line-clamp fs-4 fw-semibold";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="cutoff-text fs-5";
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