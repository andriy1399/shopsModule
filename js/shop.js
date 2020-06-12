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

export {
    resetArr,
    sum,
    sell,
    checkBeerCount,
    checkBalance,
    checkWineCount,
    checkPepsiCount
};