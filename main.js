const txt = "Я к вам пишу — чего же боле?Что я могу еще сказать?Теперь, я знаю, в вашей волеМеня презреньем наказать. Но вы, к моей несчастной долеХоть каплю жалости храня,Вы не оставите меня. Сначала я молчать хотела; Поверьте: моего стыдаВы не узнали б никогда, Когда б надежду я имелаХоть редко, хоть в неделю разВ деревне нашей видеть вас, Чтоб только слышать ваши речи, Вам слово молвить, и потомВсе думать, думать об одномИ день и ночь до новой встречи. Но, говорят, вы нелюдим; В глуши, в деревне всё вам скучно, А мы  ничем мы не блестим,Хоть вам и рады простодушно.Зачем вы посетили нас?В глуши забытого селеньяЯ никогда не знала б вас,Не знала б горького мученья.Души неопытной волненьяСмирив со временем (как знать?),По сердцу я нашла бы друга,Была бы верная супругаИ добродетельная мать.Другой!.. Нет, никому на светеНе отдала бы сердца я!То в вышнем суждено совете То воля неба: я твоя;Вся жизнь моя была залогомСвиданья верного с тобой;Я знаю, ты мне послан богом,До гроба ты хранитель мой Ты в сновиденьях мне являлся,Незримый, ты мне был уж мил,Твой чудный взгляд меня томил,В душе твой голос раздавалсяДавно  нет, это был не сон!Ты чуть вошел, я вмиг узнала,Вся обомлела, запылалаИ в мыслях молвила: вот он!Не правда ль? Я тебя слыхала:Ты говорил со мной в тиши,Когда я бедным помогалаИли молитвой услаждалаТоску волнуемой души?И в это самое мгновеньеНе ты ли, милое виденье,В прозрачной темноте мелькнул,Приникнул тихо к изголовью?Не ты ль, с отрадой и любовью,Слова надежды мне шепнул?Кто ты, мой ангел ли хранитель,Или коварный искуситель:Мои сомненья разреши.Быть может, это все пустое,Обман неопытной души!И суждено совсем иное Но так и быть! Судьбу моюОтныне я тебе вручаю,Перед тобою слезы лью,Твоей защиты умоляю Вообрази: я здесь одна,Никто меня не понимает,Рассудок мой изнемогает,И молча гибнуть я должна.Я жду тебя: единым взоромНадежды сердца оживиИль сон тяжелый перерви,Увы, заслуженным укором!Кончаю! Страшно перечесть Стыдом и страхом замираю Но мне порукой ваша честь,И смело ей себя вверяю"

const textInput = document.querySelector('[data-input]')
const buttonMarkov = document.querySelector('[data-markov]')
const textOutput = document.querySelector('[data-output]')

let order = 5
let ngrams = {}

init()
buttonMarkov.onclick = () => {
  generateText()
}

function init() {
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  }
  
  textInput.value = ''
  textInput.placeholder = txt
  
  ngrams = collectNgrams(txt)
  generateText()
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

  for (let i = 0; i < 100; i++) {
    let current = res.substring(i, i + order)
    if (!ngrams[current]) continue
    res += ngrams[current].random()
  }

  textOutput.textContent = res
}
