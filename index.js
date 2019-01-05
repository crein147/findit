import reddit from './redditapi.js';

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", e => {
	//get search term
	const searchTerm = searchInput.value;
	console.log(searchTerm);
	//get sort
	const sortBy = document.querySelector('input[name="sortby"]:checked').value;
	//get limit
	const searchLimit = document.getElementById("limit").value;
	//check input
	if (searchTerm === '') {
    // Show message
    	showMessage('Please add a search term', 'alert-danger');
 	}
  	//Search reddit 
  	reddit.search(searchTerm, searchLimit, sortBy)
  	.then(results => {
  		console.log(results);
  		//creates card columns per result
  		let output = '<div class="card-columns">';
  		results.forEach(post => {
  			//if post.preview exists in obj, get url, ? is like if statement
  			let image = post.preview ? post.preview.images[0].source.url : "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjs0_qL1dffAhUFTd8KHSkyDkYQjRx6BAgBEAU&url=https%3A%2F%2Fwww.reddit.com%2Fr%2FLogos%2Fcomments%2F23pyog%2Fsimple_reddit_front_page_logo_rendition%2F&psig=AOvVaw2HSogof_cZ9ABlKkPk9zji&ust=1546812855582819";
  			//add to our page per result
  			//get title, text, etc through api
  			output += `
  			<div class="card">
 			<img src="${image}" class="card-img-top" alt="...">
  			<div class="card-body">
    			<h5 class="card-title">${post.title}</h5>
    			<p class="card-text">${truncateText(post.selftext, 100)}</p>
   				 <a href="${post.url}" class="btn btn-primary">Click me</a>
   				 <hr>
   				 <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
   				 <span class="badge badge-dark">Score: ${post.score}</span>
 			</div>
		</div>
  			`;

  		});
  		output += '<div>';
  		//implements onto html
  		document.getElementById("results").innerHTML = output;
  	});

  	//clear search
  	searchInput.value = '';

	e.preventDefault(); //prevents form from submitting to file
});

//Show Message
function showMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text node to put in div
  div.appendChild(document.createTextNode(message));
  // Get parent container
  const searchContainer = document.getElementById('search-container');
  // Get form
  const search = document.getElementById('search');
  // Insert alert
  searchContainer.insertBefore(div, search);

  // Timeout after 3 sec
  setTimeout(() => document.querySelector('.alert').remove());
}

//truncate text
function truncateText(text, limit) {
	const shortened = text.indexOf(" ", limit);
	if(shortened == -1) return text;
	return text.substring(0, shortened);
}