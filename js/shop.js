let balance = 1000;

let articles = {
    beer: 100,
    wine: 50,
    pepsi: 80,
}
let prices = {
    beer: 29,
    wine: 123,
    pepsi: 21
}
let quantities = [];


const sell = (article, count) => {
    articles[article] = articles[article] - count;
    balance += prices[article] * count;
    quantities.push(prices[article] * count);
}

let sum = () => quantities.reduce((t, num) => t + num, 0);
let resetArr = () => quantities = [];

const checkBalance = () => balance;
const checkBeerCount = () => articles.beer;
const checkWineCount = () => articles.wine;
const checkPepsiCount = () => articles.pepsi;



let find_double = function (string, item, lastCount, newCount) {
    let arr = string.split('\n');
    arr = arr.map(elem => {
        if (item.test(elem)) {
            let elemArr = elem.split(' ');
            elemArr = elemArr.map(item => item == lastCount ? item = newCount + '' : item);
            elem = elemArr.join(' ');
            return elem;
        } else return elem;
    })
    string = arr.join('\n');
    return string;
}

let checkRegex = function (value) {
    if (value == 'Пиво') return /^(пиво)/i;
    if (value == 'Пепсі') return /^(Пепсі)/i;
    if (value == 'Вино') return /^(Вино)/i;
}

export {
    checkRegex,
    find_double,
    resetArr,
    sum,
    sell,
    checkBeerCount,
    checkBalance,
    checkWineCount,
    checkPepsiCount
};