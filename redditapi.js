export default {
	search: function(searchTerm, searchLimit, sortBy) {
		return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
		//get request in json to parse 
		.then(res => res.json())
		//get our data from api
		.then(data => data.data.children.map(data => data.data))
		.catch(err => console.log(err));
	}
};