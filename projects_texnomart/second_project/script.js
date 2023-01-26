let products = [
    {
        "artNumber": "Телефоны",
        "name": "Xs Pro Max",
        "brand": "iPhone",
        "weight": "200gr",
        "quantity": "quantity",
        "price": "300$",
        "stock": 0
    },
    {
        "artNumber": "Телефоны",
        "name": "ROG Phone",
        "brand": "ASUS",
        "weight": "400gr",
        "quantity": "quantity",
        "price": "350$",
        "stock": 0
    },
    {
        "artNumber": "Мышка",
        "name": "TUF Gaming M5",
        "brand": "ASUS",
        "weight": "50gr",
        "quantity": "quantity",
        "price": "100$",
        "stock": 1
    },
    {
        "artNumber": "Телефоны",
        "name": "Samsung Galaxy A53",
        "brand": "Samsung",
        "weight": "200gr",
        "quantity": "quantity",
        "price": "300$",
        "stock": 1
    },
    {
        "artNumber": "Телефоны",
        "name": "Iphone 13 PRO",
        "brand": "iPhone",
        "weight": "200gr",
        "quantity": "quantity",
        "price": "300$",
        "stock": 1
    },
    {
        "artNumber": "Наушники",
        "name": "TUF Gaming H7",
        "brand": "ASUS",
        "weight": "100gr",
        "quantity": "quantity",
        "price": "200$",
        "stock": 1
    },
    {
        "artNumber": "Телефоны",
        "name": "Iphone 7",
        "brand": "iPhone",
        "weight": "200gr",
        "quantity": "quantity",
        "price": "300$",
        "stock": 0
    },
    {
        "artNumber": "Телефоны",
        "name": "Iphone 14",
        "brand": "iPhone",
        "weight": "200gr",
        "quantity": "quantity",
        "price": "300$",
        "stock": 1
    },
    {
        "artNumber": "Телефоны",
        "name": "Xioami 12T Pro",
        "brand": "Xiaomi",
        "weight": "200gr",
        "quantity": "quantity",
        "price": "300$",
        "stock": 1
    },
    {
        "artNumber": "Телефоны",
        "name": "Xiaomi Poco M5",
        "brand": "Xioami",
        "weight": "200gr",
        "quantity": "quantity",
        "price": "300$",
        "stock": 0
    },
    {
        "artNumber": "Телефоны",
        "name": "Samsung Galaxy Fold 3",
        "brand": "Samsung",
        "weight": "200gr",
        "quantity": "quantity",
        "price": "300$",
        "stock": 1
    },
    {
        "artNumber": "Телефоны",
        "name": "Iphone XR",
        "brand": "iPhone",
        "weight": "200gr",
        "quantity": "quantity",
        "price": "300$",
        "stock": 1
    },
    {
        "artNumber": "Monitor",
        "name": "TUFF GAMING",
        "brand": "ASUS",
        "weight": "800gr",
        "quantity": "quantity",
        "price": "800$",
        "stock": 1
    }
]
const productsDiv = document.getElementById('products')
const paginationDiv = document.getElementById('mainPaginations')
const searchInput = document.querySelector('.searchInput')

const renderProductsHTML = (data) => {
    return `<div class="product-col">
                <div class="product">
                    <strong class="product-artikul">${data.artNumber}</strong>
                    <p class="product-name">Модель: ${data.name}</p>
                    <p>Бренд: <strong>${data.brand}</strong></p>
                    <p>Вес: <strong>${data.weight}</strong></p>

                    <div>
                        <h3 class="product-price">${data.price}</h3>
                        <p class="product-stock">${data.stock ? 'есть в наличии' : 'не имеется'}</p>
                    </div>
                </div>
            </div>
            `
}

// render Start project
async function rendersObjects() {
    // await getData ()

    document.querySelector('#products').innerHTML = ''
    let html = products.map(renderProductsHTML).join('')
    document.querySelector('#products').insertAdjacentHTML('afterbegin', html)
    document.querySelector('.main-footer strong').innerHTML = products.length

    check()
    showItems()
}

rendersObjects()

// bu metodni coment qilib qoyganim sababi JSON filedan faqat malumotni proektni live-server qilib iwga tuwirganingizda
// muvaqqiyatli ola oladi. xozirda esa wuncaki html filega kirsangiz malumotlar js filega otqazib qoyilgan va bemalol productlarni olaveradi
// agar xoxlasangiz comentdan olib iwlatib koriwingiz xam mm faqat live-server bilan, json fileni ocirmadim.

//get data from JSON
// async function  getData() {
//     let data = await fetch('/data.json')
//     let allObj = await data.json();

//     products = allObj
// } 

searchInput.addEventListener('keyup', function(e) {
    const searchString = e.target.value.toLowerCase()
    const filteredProducts = products.filter((product) => {
        return product.brand.toLowerCase().includes(searchString)
    })

    productsDiv.innerHTML = ''
    let html = filteredProducts.map(renderProductsHTML).join('')
    productsDiv.insertAdjacentHTML("afterbegin", html)
    document.querySelector('.main-footer strong').innerHTML = filteredProducts.length
    
    check()
    showItems()
})