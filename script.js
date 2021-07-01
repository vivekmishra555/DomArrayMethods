const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showBillioniars = document.getElementById('show-billioniars');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

let data = [];
//fetch random user

const FetchRandomUser = async() => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0]; 
    const newUser = {
        user: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()* 1000000)
    }
    AddData(newUser);
}
function AddData(obj){
    data.push(obj);
    UpdateDom();
}
function UpdateDom(ProvidedData = data){
    //clear main div
    main.innerHTML = `<h2><strong>Person</strong><strong>Wealth</strong></h2>`;
    ProvidedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.user}</strong><strong>${formatMoney(item.money)}</strong>`;
        main.appendChild(element); 
    })
}
function formatMoney(number){
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
function DoubleMoney(){
    data = data.map((item) => {
        return {...item,
                money: item.money*2
                };
    });
    UpdateDom();
}
function sortByRichest(){
    data = data.sort((a,b) => {
        return b.money - a.money;
    });
    UpdateDom();
}
function filterBillioniars(){
    data = data.filter((item) => {
        return item.money >= 1000000;
    })
    UpdateDom();
}
function totalWealth(){
    wealth = data.reduce((acc,item) => (acc += item.money),0);
    wealthEl = document.createElement('div');
    wealthEl.classList.add('person');
    wealthEl.innerHTML = `<strong>Total Wealth</strong><strong>${formatMoney(wealth)}</strong>`;
    main.appendChild(wealthEl);
}
FetchRandomUser();
FetchRandomUser();
FetchRandomUser();
addUser.addEventListener('click',FetchRandomUser);
double.addEventListener('click',DoubleMoney);
sort.addEventListener('click',sortByRichest);
showBillioniars.addEventListener('click',filterBillioniars);
calculateWealth.addEventListener('click',totalWealth);