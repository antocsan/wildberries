const search = () => {
    const input = document.querySelector('.search-block > input')
    const searchBtn = document.querySelector('.search-block > button')

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list')

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

    const getData = (value) => {
        fetch('db/db.json')
            .then((res) => res.json())
            .then((data) => {
                const array = data.filter(good => {
                    return good.name.toLowerCase().includes(value.toLowerCase())
                })


                localStorage.setItem('goods', JSON.stringify(array));

                if (window.location.pathname !== "/goods.html") {
                    window.location.href = "/goods.html"
                } else {
                    renderGoods(array)
                }
            })
    }



    searchBtn.addEventListener('click', () => {
        getData(input.value)

    })
}

search()