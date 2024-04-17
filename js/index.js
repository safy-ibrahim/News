
var newsContainer = document.querySelector('.display-news');

var countryLinks = document.querySelectorAll('nav .container ul a');

var categoryLinks = document.querySelectorAll('aside ul a');

var currentCountryCode = 'eg';
var currentCategory = 'business';

//
//(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${countryCode}&max=10&apikey=ec749e3a2a4581f951a38e1f0f658705`)


///////////////////  get data
async function getNews(category, countryCode) {
    var response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=0fff18a6aa124754a313635cd22d00ad`);

    var data = await response.json();
    console.log(data);
    displayNews(data.articles);
}

getNews('business', 'eg');


/////////////////////  display news

var placholderImg = 'https://sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png';

function displayNews(arr) {
    newsContainer.innerHTML = '';

    var descMaxLength = 80;
    var titleMaxLenght = 50;

    for (var i = 0; i < arr.length; i++) {
        var newsDescription = arr[i].description;
       
        if(newsDescription != null){
            var appendNewsDescription = newsDescription.length > descMaxLength ? newsDescription.substring(0, descMaxLength) + '...' : newsDescription
        } else {
            appendNewsDescription = 'Description not available';
            // document.querySelector('.card-body p').style.margin = '20px 0px'
        }

        var titleNews = arr[i].title;
        var title = titleNews.length > titleMaxLenght ? titleNews.substring(0, titleMaxLenght)+ '...'  : titleNews



        newsContainer.innerHTML += `
        <article class="col-md-6 col-lg-4">
           <div class="card shadow-lg">
                <div class="card-img w-100">
                   <img src="${arr[i].urlToImage || placholderImg}" alt="this is article image" class="w-100">
                </div>
                <div class="card-body">
                   <h2 class="h5">${title}</h2>
                   <p>${appendNewsDescription}</p>
                   <a href="${arr[i].url}" class="btn btn-primary">Read more</a>
                </div>
            </div>
        </article>
        `
    }
}

//----------------------------------------------

for (var i = 0; i < countryLinks.length; i++) {
    countryLinks[i].addEventListener('click', function (e) {
        var activeElem = document.querySelector('nav ul .active');
        activeElem.classList.remove('active');
        e.target.classList.add('active');
        currentCountryCode = e.target.getAttribute('data-country');

        getNews(currentCategory, currentCountryCode);
    })
}

for (var j = 0; j < categoryLinks.length; j++) {
    categoryLinks[j].addEventListener('click', function (e) {
        var activelink = document.querySelector('aside ul .active');
        activelink.classList.remove('active');
        e.target.classList.add('active');
        currentCategory = e.target.getAttribute('data-category');
        getNews(currentCategory, currentCountryCode);
    })
}
