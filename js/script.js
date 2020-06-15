'use strict';

import * as shop from './shop.js';

const getSel = sel => document.querySelector(sel);
const stock = document.forms['stock'];
const custom = document.forms['custom'];
const base = {};
let translate = {
    'beer': 'Пиво',
    'pepsi': 'Пепсі',
    'wine': 'Вино'
};

let miniCounter = {
    'beer': 0,
    'pepsi': 0,
    'wine': 0
};

const pushInInput = () => {
    stock.beer.value = shop.checkBeerCount() + ' шт.';
    stock.bank.value = shop.checkBalance() + 'грн';
    stock.wine.value = shop.checkWineCount() + ' шт.';
    stock.pepsi.value = shop.checkPepsiCount() + ' шт.';

}
pushInInput();

getSel('.custom__btn-add').addEventListener('click', function () {
    let count = custom.count.value;
    let article = custom.choose_article.value;
    if (article) {
        if (count && article && count <= parseInt(stock[article].value) && miniCounter[article] + +count<= parseInt(stock[article].value)) {
            if (!base.hasOwnProperty(article)) {
                base[article] = count;
                miniCounter[article] += +count;
                getSel('.custom__order').value += `${translate[article]}: ${count} шт.\n`;
            } else {
                miniCounter[article] += +count;
                let string = getSel('.custom__order').value;
                let rgArticle = shop.checkRegex(translate[article]);
                getSel('.custom__order').value = shop.find_double(string, rgArticle, base[article], +base[article] + +count);
                base[article] = +base[article] + +count;
            }
        } else if ((count >= parseInt(stock[article].value)) || (+base[article] + +count >= parseInt(stock[article].value))) {
            getSel('.window').classList.remove('hide');
            getSel('.window__warning').textContent = `Вибачте, але на складі залишилось ${translate[article]}
             тільки ${parseInt(stock[article].value) - miniCounter[article]} штук`;
        } else false
        custom.reset()
    }
})

getSel('.custom__btn-buy').addEventListener('click', function () {
    if (getSel('.custom__order').value) {
        getSel('.check').innerHTML = '';
        for (const key in base) {
            shop.sell(key, base[key]);
            getSel('.check').innerHTML += `${translate[key]}: ${base[key]}шт.<br>`;
            delete base[key];
            miniCounter[key] = 0;
        }
        pushInInput();
        getSel('.check').innerHTML += `Всього: ${shop.sum()} гривень`
        getSel('.custom__order').value = '';
        shop.resetArr();
    }
})


getSel('.window__btn').addEventListener('click', function () {
    getSel('.window').classList.add('hide');
})


getSel('.window__icon').addEventListener('click', function () {
    getSel('.window').classList.add('hide');
})