let wikiInputEl = document.getElementById('wikiInputId');
let searchResultsEl = document.getElementById('searchResultsId');
let spinnerEl = document.getElementById('spinner');

function createAndAppendSearchResult(result){
        
        // Div Container -resultItem
        let {title, link, description} = result;
        let resultItemEl = document.createElement('div');
        resultItemEl.classList.add('result-item');
        searchResultsEl.appendChild(resultItemEl);

        //Anchor Title -- result-title

        let titleEl = document.createElement('a');
        titleEl.textContent = title;
        titleEl.href = link;
        titleEl.target = '_blank';
        titleEl.classList.add('result-title');
        resultItemEl.appendChild(titleEl);

        //break element

        let titleBreakEl = document.createElement('br');
        resultItemEl.appendChild(titleBreakEl);

        let urlElement = document.createElement('a');
        urlElement.href = link;
        urlElement.textContent = link;
        urlElement.classList.add('result-url')
        urlElement.target = '_blank';
        resultItemEl.appendChild(urlElement);
        //break element
        let lineBreakEl= document.createElement('br');
        resultItemEl.appendChild(lineBreakEl);
        //description 
        let descriptionEl = document.createElement('p');
        descriptionEl.textContent = description;
        resultItemEl.appendChild(descriptionEl);

}

function displayInfo(search_results){
        spinnerEl.classList.toggle('d-none');
        for (let result of search_results){
                createAndAppendSearchResult(result);
        }
        
}

function wikiSearch(eventObject){
               
        if (eventObject.key === 'Enter'){
                        
                        searchResultsEl.textContent = '';
                        spinnerEl.classList.toggle('d-none');
                        let inputSearch = wikiInputEl.value;
                        console.log(inputSearch);
                        let url = 'https://apis.ccbp.in/wiki-search?search=' + inputSearch;
                        let options = {
                                method: 'GET'
                        };
                        fetch(url, options)
                        
                        .then(function(r){
                                return r.json();
                        })
                        
                        .then(function(jsonData){
                                let {search_results} = jsonData;
                                displayInfo(search_results);
                        });
                        

                
                
                }
        }

wikiInputEl.addEventListener('keydown', wikiSearch);