// 获取页面中的一些元素，并将它们存储在对应的变量中。
const screens = document.querySelectorAll('.screen');
const get_element_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_insect = {}

// 点击事件监听器，当点击开始按钮时，将第一个屏幕元素添加一个 up 类，以隐藏该屏幕。
start_btn.addEventListener('click', () => screens[0].classList.add('up'))

// 当点击选择昆虫按钮时，从按钮中提取图片的 src 和 alt 属性，并将其存储在 selected_insect 对象中。
get_element_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}
// 将秒数转化成分钟和秒，并显示在页面上
function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

// 生成元素
function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}
// 用于元素生成的位置，这里是随机生成元素位置
function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}
// 当元素被点击后，增加分数，并2秒后移除
function catchInsect() {
    increaseScore() //增加分数
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects() //添加更多的元素
}
// 赠加更多的元素
function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}
// 用于赠加分数，超过19分，弹出消息
function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}
