const txt = "Я к вам пишу — чего же боле? Что я могу еще сказать? Теперь, я знаю, в вашей воле Меня презреньем наказать. Но вы, к моей несчастной доле Хоть каплю жалости храня, Вы не оставите меня. Сначала я молчать хотела; Поверьте: моего стыда Вы не узнали б никогда, Когда б надежду я имела Хоть редко, хоть в неделю раз В деревне нашей видеть вас, Чтоб только слышать ваши речи, Вам слово молвить, и потом Все думать, думать об одном И день и ночь до новой встречи. Но, говорят, вы нелюдим; В глуши, в деревне всё вам скучно, А мы  ничем мы не блестим, Хоть вам и рады простодушно. Зачем вы посетили нас? В глуши забытого селенья Я никогда не знала б вас, Не знала б горького мученья. Души неопытной волненья Смирив со временем (как знать?), По сердцу я нашла бы друга, Была бы верная супруга И добродетельная мать. Другой! Нет, никому на свете Не отдала бы сердца я! То в вышнем суждено совете То воля неба: я твоя; Вся жизнь моя была залогом Свиданья верного с тобой;Я знаю, ты мне послан богом, До гроба ты хранитель мой Ты в сновиденьях мне являлся, Незримый, ты мне был уж мил, Твой чудный взгляд меня томил, В душе твой голос раздавался Давно  нет, это был не сон!Ты чуть вошел, я вмиг узнала, Вся обомлела, запылала И в мыслях молвила: вот он!Не правда ль? Я тебя слыхала: Ты говорил со мной в тиши, Когда я бедным помогала Или молитвой услаждала Тоску волнуемой души? И в это самое мгновенье Не ты ли, милое виденье, В прозрачной темноте мелькнул, Приникнул тихо к изголовью? Не ты ль, с отрадой и любовью, Слова надежды мне шепнул? Кто ты, мой ангел ли хранитель, Или коварный искуситель: Мои сомненья разреши. Быть может, это все пустое, Обман неопытной души!И суждено совсем иное Но так и быть! Судьбу мою Отныне я тебе вручаю, Перед тобою слезы лью, Твоей защиты умоляю Вообрази: я здесь одна, Никто меня не понимает, Рассудок мой изнемогает, И молча гибнуть я должна. Я жду тебя: единым взором Надежды сердца оживи Иль сон тяжелый перерви, Увы, заслуженным укором! Кончаю! Страшно перечесть Стыдом и страхом замираю Но мне порукой ваша честь, И смело ей себя вверяю"

const textInput = document.querySelector('[data-input]')
const buttonMarkov = document.querySelector('[data-markov]')
const textOutput = document.querySelector('[data-output]')
const ctrl = {
  hint: document.querySelector('[data-hint]'),
  defaulttext: document.querySelector('[data-ctrl-default-text]'),
  order: document.querySelector('[data-ctrl-order]'),
  resultLength: document.querySelector('[data-ctrl-length]'),
}

let resultLength = 150
let order = 3
let ngrams = {}

init()
buttonMarkov.onclick = () => {
  order = +ctrl.order.value
  resultLength = +ctrl.resultLength.value

  if (ctrl.defaulttext.checked) {
    ngrams = collectNgrams(txt)
  } else {
    ngrams = collectNgrams(textInput.value)
  }
  generateText()
}

function init() {
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  }

  ctrl.hint.title = txt

  ngrams = collectNgrams(txt)
  generateText()

  ctrl.order.addEventListener('input', saveToLS)
  ctrl.resultLength.addEventListener('input', saveToLS)

  loadSettings()
}

function collectNgrams(text) {
  let res = {}

  for (let i = 0; i <= text.length - order; i++) {
    let gram = text.substring(i, i + order)
    let next = text.charAt(i + order)
    
    if (!res[gram]) res[gram] = []
    res[gram].push(next)
  }

  return res
}

function generateText() {
  let res = Object.keys(ngrams).random()

  if (!res) {
    textOutput.textContent = 'Что-то пошло не так'
    return
  }

  for (let i = 0; i < resultLength; i++) {
    let current = res.substring(i, i + order)
    if (!ngrams[current]) continue
    res += ngrams[current].random()
  }

  textOutput.textContent = res
}


function saveToLS(ev) {
  let dataset = ev.target.dataset
  let key = Object.keys(dataset)[0].replace('ctrl', '').toLowerCase()
  let value = ev.target.value
  
  localStorage.setItem(key, value)
}


function loadSettings() {
  order = Number(localStorage.getItem('order')) || order
  resultLength = Number(localStorage.getItem('length')) || resultLength
  ctrl.order.value = order
  ctrl.resultLength.value = resultLength
}