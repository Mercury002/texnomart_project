const boxes = document.querySelector('.products').children
const prev = document.querySelector('.main-prev-button')
const next = document.querySelector('.main-next-button')
const maxItem = 4;
let index = 1;

prev.addEventListener('click', function () {
    index--
    check()
    showItems()
})
next.addEventListener('click', function () {
    index++
    check()
    showItems()
})
// Check products on every page
function check() {
    if (index === Math.ceil(boxes.length / maxItem)) {
        next.setAttribute('disabled', 'disabled')
    } else {
        next.removeAttribute('disabled')
    }
    if (index === 1) {
        prev.setAttribute('disabled', 'disabled')
    } else {
        prev.removeAttribute('disabled')
    }
}
// hide or show products
function showItems() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove('show')
        boxes[i].classList.add('hidden')

        if (i >= (index * maxItem) - maxItem && i < index * maxItem) {
            boxes[i].classList.remove('hidden')
            boxes[i].classList.add('show')
        }
    }
}