window.addEventListener("DOMContentLoaded", () => {
    'use strict'
    let btn = document.querySelector('.start_btn')
    let number = document.querySelector('.start_number')
    let start_section = document.querySelector('.start_section')
    let hero_viktorina = document.querySelector('.hero_viktorina')
    let end = document.querySelector('.end_result')
    let result = document.querySelector('.result')
    let end_btn = document.querySelector('.end_btn')
    let template = document.querySelector('template').content
    let count = 5;
    let idx = 0;
    let trues = 0;
    let falses = 0;
    let Interval;
    function handleTypeFuction(type, element, TruesFalses) {
        if (type === 'block') {
            element.classList.add('d-block')
            element.classList.remove('d-none')
        } else if (type === 'none') {
            element.classList.add('d-none')
            element.classList.remove('d-block')
        } else if (type === 'trues' && TruesFalses === true) {
            element.classList.add('bg-success')
            element.classList.remove('bg-dark')
        } else if (type === 'falses' && TruesFalses === false) {
            element.classList.add('bg-danger')
            element.classList.remove('bg-dark')
        }
    }
    end_btn.addEventListener('click', () => {
        window.location.reload()
    })
    function handleResult() {
        handleTypeFuction('block', end)
        if (trues === 10) {
            result.textContent = `Tabriklayman Darajang Junior Haqqoniy 10 tadan   ${trues} ta  !`
            result.classList.add('text-success')
            result.classList.remove('text-dark')
            end_btn.textContent = 'Winner Winner Chicken Dinner'
        } else if (trues < 5) {
            result.textContent = `Bratishka osson savoldan utolmading Hali uqi sen 10 tadan ${trues} ta topding bu kam `
            result.classList.add('text-danger')
            result.classList.remove('text-dark')
            end_btn.textContent = ' Eee... Latta 👎'
        } else {
            result.textContent = `Juniorga Bir amallab ilinding hali uqi Bratishka ... 10 tadan ${trues} ta bu urtacha `
            result.classList.add('text-light')
            result.classList.remove('text-dark')
            end_btn.textContent = 'Normal good !'
        }
    }
    function cetInterval() {
        Interval = setInterval(() => {
            if (count > 0) {
                count--
                number.textContent = count;
            } else {
                clearInterval(Interval)
                handleTypeFuction('none', start_section)
                handleTypeFuction('block', hero_viktorina)
                gameViktorina([quizs[idx]])
            }
        }, 1000)
    }
    btn.addEventListener('click', (event) => {
        event.target.classList.add('d-none')
        handleTypeFuction('block', number)
        cetInterval()
    })
    function gameViktorina(arr) {
        if (arr?.length) {
            hero_viktorina.innerHTML = null
            for (let i = 0; i < arr.length; i++) {
                let clone = template.cloneNode(true)
                let quiz = clone.querySelector('.quiz')
                quiz.textContent = arr[i].savol
                let variants_ul = clone.querySelector('.variants_ul')
                let vars = arr[i].variants
                if (vars?.length) {
                    for (let si = 0; si < vars.length; si++) {
                        let li = document.createElement('li')
                        li.className = 'variant bg-dark p-2 rounded text-light text-center fs-3  my-2',
                            variants_ul.appendChild(li)
                        li.textContent = vars[si]
                    }
                }
                hero_viktorina.appendChild(clone)
            }
        }
    }
    function handleTrues(li) {
        trues++
        handleTypeFuction('trues', li, true)
    }
    function handleFalses(li) {
        falses++
        handleTypeFuction('falses', li, false)
    }
    function handleNext() {
        if (quizs.length - 1 > idx) {
            idx++
            gameViktorina([quizs[idx]])
        } else {
            handleTypeFuction('none', hero_viktorina)
            handleResult()
        }
    }
    window.addEventListener('click', (event) => {
        if (event.target.matches('.variant')) {
            let text = event.target.textContent
            if (text === quizs[idx].javob) {
                handleTrues(event.target)
            } else {
                handleFalses(event.target)
            }
            setTimeout(() => {
                handleNext()
            }, 300);
        }
    })
})