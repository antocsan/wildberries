const getGoods = () => {

    const links = document.querySelectorAll('.navigation-link')

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list')

        // goods.forEach(good => {
        // localStorage.setItem('goods', JSON.stringify(goods))
        goodsContainer.innerHTML = ''
        goods.forEach((goodsItem) => {
                goodsContainer.insertAdjacentHTML('beforeend', ` <div class="col-lg-3 col-sm-6">
                <div class="goods-card">
                    <span class="label ${goodsItem.label ? null : 'd-none'}">${goodsItem.label}</span>
                    <img src="db/${goodsItem.img}" alt="${goodsItem.name}" class="goods-image">
                    <h3 class="goods-title">${goodsItem.name}</h3>
                
                    <p class="goods-description">Yellow/Lilac/Fuchsia/Orange</p>
                    
                    <button class="button goods-card-btn add-to-cart" data-id="${goodsItem.id}">
                        <span class="button-price">$${goodsItem.price}</span>
                    </button>
                </div>
               
            </div>`)
            })
            // })
    }

    const getData = (value, category) => {
        fetch('db/db.json')
            .then((res) => res.json())
            .then((data) => {
                const array = category ? data.filter((item) => item[category] === value) : data

                localStorage.setItem('goods', JSON.stringify(array));

                if (window.location.pathname !== "/goods.html") {
                    window.location.href = "/goods.html"
                } else {
                    renderGoods(array)
                }
            })
    }
    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault()
            const linkValue = link.textContent
            const category = link.dataset.field
            getData(linkValue, category)
        })

    })
    if (localStorage.getItem('goods') && window.location.pathname === "/goods.html") {
        renderGoods(JSON.parse(localStorage.getItem('goods')))
    }
}

getGoods()