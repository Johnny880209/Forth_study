let dogs = [];
let searchBox = document.getElementById('searchInput');
let url;

const getDogsHead = async() => {
    try{
        let header = new Headers();
        let response = await fetch(url,{Headers:header});
        let data = await response.json();

        if (response.status == 200){
            dogs = data.message;

            console.log(data);

            render();
        } else {
            if (response.status == 404) {
                throw new Error ('검색된 결과가 없습니다.');
            };
            throw new Error(data.message);
        }
    } catch(error){
        console.log('Error', error.message);
        errorRender(error.message);
    }
};

const getDogs = async() => {
    url = new URL("https://dog.ceo/api/breed/hound/images/random/40");
    
    getDogsHead();
};

const getSearch = async() => {
    let searchValue = searchInput.value;
    url = new URL (`https://dog.ceo/api/breed/${searchValue}/images/random/8`);

    getDogsHead();
};

const getOption = async() => {
    let options = document.querySelector('.dog-selector > option:checked').value;
    url = new URL (`https://dog.ceo/api/breed/${options}/images/random/8`);

    getDogsHead();
};

const render = () => {
    let dogsHTML = '';

    dogsHTML = dogs.map(item=>{
        return `
            <div class="item">
                <div class="img" style="background-image:url(${item});">
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('dogsList').innerHTML = dogsHTML;
};


getDogs();

