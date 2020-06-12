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
    if (count && article && count <= parseInt(stock[article].value)) {
        base[article] = count;
        getSel('.custom__order').value += `${translate[article]}: ${count} шт.\n`;
    } else if (count >= parseInt(stock[article].value)) {
        getSel('.window').classList.remove('hide');
        getSel('.window__warning').textContent = `Вибачте, але на складі залишилось ${translate[article]}
         тільки ${parseInt(stock[article].value)} штук`;

    } else false
    custom.reset()

})

getSel('.custom__btn-buy').addEventListener('click', function () {
    getSel('.check').innerHTML = '';
    for (const key in base) {
        shop.sell(key, base[key]);
        getSel('.check').innerHTML += `${translate[key]}: ${base[key]}шт.<br>`;
        delete base[key];
    }
    pushInInput();
    getSel('.check').innerHTML += `Всього: ${shop.sum()} гривень`
    getSel('.custom__order').value = '';
    shop.resetArr();
})


getSel('.window__btn').addEventListener('click', function () {
    getSel('.window').classList.add('hide');
})


getSel('.window__icon').addEventListener('click', function () {
    getSel('.window').classList.add('hide');
})



