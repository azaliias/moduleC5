//Задание 1
const parser = new DOMParser();
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const listNode = xmlDOM.querySelector("list");
const studentNode = listNode.querySelectorAll("student");
let list = {};
let result = [];

studentNode.forEach(function(item, index){
  let nameNode = item.querySelector("name");
  result[index] = {
    name: nameNode.querySelector("first").textContent + ' ' + nameNode.querySelector("second").textContent,
    age: item.querySelector('age').textContent,
    prof: item.querySelector('prof').textContent,
    lang: nameNode.getAttribute('lang'),
  };
})

list.list = result
console.log('Задание 1', list)

//Задание 2
const jsonString = `
{
  "list": [
   {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   },
   {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   }
  ]
 }
`;

const data = JSON.parse(jsonString);
console.log('Задание 2', data);

//Задание 3
function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');

function displayResult(apiData) {
  let cards = '';
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
    
  resultNode.innerHTML = cards;
}

btnNode.addEventListener('click', () => {
  const value = document.querySelector('#input-3').value;
  if(value === ''){
    document.querySelector('.info-3').textContent = 'Введите число'
    document.querySelector('.info-3').classList.add('label__hint')
  } else if (value > 0 && value < 11){
    useRequest('https://picsum.photos/v2/list/?limit='+value, displayResult);
    document.querySelector('.info-3').textContent = ''
    document.querySelector('.info-3').classList.remove('label__hint')
  } else {
    document.querySelector('.info-3').textContent = 'Число вне диапазона от 1 до 10'
    document.querySelector('.info-3').classList.add('label__hint')
  }
})

//Задание 4
const result4Node = document.querySelector('.j-result-4');
const btn4Node = document.querySelector('.j-btn-request-4');

function displayResult4(apiData) {
  let card = '';
    const cardBlock = `
      <div class="card">
        <img
          src="${apiData.url}"
          class="card-image"
        />
      </div>
    `;
    card = card + cardBlock;
    
  result4Node.innerHTML = card;
}

btn4Node.addEventListener('click', () => {
  const value1 = document.querySelector('#input-41').value;
  const value2 = document.querySelector('#input-42').value;
  if(value1 === '' || value2 === ''){
    document.querySelector('.info-4').textContent = 'Введите два числа'
    document.querySelector('.info-4').classList.add('label__hint')
  } else if ((value1 > 99 && value1 < 301) && (value2 > 99 && value2 < 301)){
    fetch('https://picsum.photos/'+value1+'/'+value2)
    .then((response) => {
      displayResult4(response)
    })
    .then((data) => {
      console.log(data);
    })
    .catch(() => { console.log('error') });
    document.querySelector('.info-4').textContent = ''
    document.querySelector('.info-4').classList.remove('label__hint')
  } else {
    document.querySelector('.info-4').textContent = 'Одно из чисел вне диапазона от 100 до 300'
    document.querySelector('.info-4').classList.add('label__hint')
  }
})

//Задание 5

const result5Node = document.querySelector('.j-result-5');
const btn5Node = document.querySelector('.j-btn-request-5');

btn5Node.addEventListener('click', () => {
  const value1 = document.querySelector('#input-51').value;
  const value2 = document.querySelector('#input-52').value;
  let validate1 = false;
  let validate2 = false;

  if(value1 !== '' || value2 !== '' || (value1 === '' || value2 === '')){
    if(value1 === ''){
      document.querySelector('.info-51').textContent = 'Номер страницы не может быть пустым'
      document.querySelector('.info-51').classList.add('label__hint')
    } else if(value1 < 1 || value1 > 10){
      document.querySelector('.info-51').textContent = 'Номер страницы вне диапазона от 1 до 10'
      document.querySelector('.info-51').classList.add('label__hint')
    } else {
      document.querySelector('.info-51').textContent = ''
      document.querySelector('.info-51').classList.remove('label__hint')
      validate1 = true;
    }
    if(value2 === ''){
      document.querySelector('.info-52').textContent = 'Лимит не может быть пустым'
      document.querySelector('.info-52').classList.add('label__hint')
    } else if(value2 < 1 || value2 > 10){
      document.querySelector('.info-52').textContent = 'Лимит вне диапазона от 1 до 10'
      document.querySelector('.info-52').classList.add('label__hint')
    } else {
      document.querySelector('.info-52').textContent = ''
      document.querySelector('.info-52').classList.remove('label__hint')
      validate2 = true
    }
  }

  if(validate1 && validate2){
    sendRequest(value1, value2)
  }
})

function sendRequest(page, limit){
  if(page !== '' && (0 < page < 11) && limit !== '' && (0 < limit < 11)){
    fetch('https://picsum.photos/v2/list?page='+page+'&limit='+limit)
    .then((response) => {
      const result = response.json();
      return result;
    })
    .then((data) => {
      displayResult5(data)
    })
    .catch(() => { console.log('error') });
  } else {
    return false;
  }

};

function displayResult5(apiData) {
  let cards = '';
  
  apiData.forEach(item => {
    console.log(item.download_url)
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
    
  result5Node.innerHTML = cards;
}