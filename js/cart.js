const cart = () => {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const closeBtn = document.querySelector('.modal-close')
    const goodsContainer = document.querySelector('.long-goods-list')
    const cartTable = document.querySelector('.cart-table__goods')
    const shortGoods = document.querySelector('.short-goods')
    const tFoot = document.querySelector('tfoot')
    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        console.log(cart);

        const newCart = cart.filter(good => {
            return good.id !== id
        })
        console.log(newCart);

        localStorage.setItem('cart', JSON.stringify(newCart))
        console.log(localStorage.getItem('cart'));

        renderCartGoods(JSON.parse(localStorage.getItem('cart')))


    }
    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        const newCart = cart.map(good => {
            if (good.id === id) {
                good.count++
            }
            return good
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }
    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        let newCart = cart.map(good => {
            if (good.id === id) {
                if (good.count > 0) {
                    good.count--
                }
                if (good.count === 0) {
                    deleteCartItem(id)
                    console.log('1', id);

                }

            }
            return good
        })
        newCart = newCart.filter(good => {
            return good.count > 0
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const addToCart = (goodId) => {
        const goods = JSON.parse(localStorage.getItem('goods'))
        const clickedGood = goods.find(good => good.id === goodId)
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []




        if (cart.some(good => good.id === clickedGood.id)) {
            cart.map(good => {
                if (good.id === clickedGood.id) {
                    good.count++
                }
                return good
            })


        } else {


            clickedGood.count = 1
            cart.push(clickedGood)
        }
        localStorage.setItem('cart', JSON.stringify(cart))

    }

    const renderCartGoods = (goods) => {
        let total = 0
        goods.forEach((good) => {
            total = total + (+good.price * +good.count)
        })
        cartTable.innerHTML = ''
        goods.forEach(good => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
            <td>${good.name}</td>
            <td>${good.price}$</td>
            <td><button class="cart-btn-minus">-</button></td>
            <td>${good.count}</td>
            <td><button class="cart-btn-plus">+</button>
            </td>
            <td>${+good.price * +good.count}$</td>
            <td>
                <button class="cart-btn-delete">x</button></td>
            `
            cartTable.append(tr)



            tr.addEventListener('click', (event) => {
                if (event.target.classList.contains('cart-btn-minus')) {
                    minusCartItem(good.id)

                } else if (event.target.classList.contains('cart-btn-plus')) {
                    plusCartItem(good.id)

                } else if (event.target.classList.contains('cart-btn-delete'))
                    deleteCartItem(good.id)

            })

        });
        const totalTr = document.createElement('tr')
        totalTr.innerHTML = `
            <th colspan=" 5 ">Total:</th>
            <th class="card-table__total " colspan="2 ">${total}$</th>
        `
        tFoot.innerHTML = ``
        tFoot.append(totalTr)
    }


    cartBtn.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        renderCartGoods(cartArray)

        cart.style.display = 'flex'
    })
    closeBtn.addEventListener('click', () => {
        cart.style.display = ''
    })

    if (shortGoods) {
        shortGoods.addEventListener('click', (event) => {
            if (event.target.closest('.add-to-cart')) {
                const btnToCart = event.target.closest('.add-to-cart')
                const goodId = btnToCart.dataset.id

                addToCart(goodId)
            }
        })
    }

    if (goodsContainer) {
        goodsContainer.addEventListener('click', (event) => {
            if (event.target.closest('.add-to-cart')) {
                const btnToCart = event.target.closest('.add-to-cart')
                const goodId = btnToCart.dataset.id

                addToCart(goodId)
            }
        })
    }
}

cart()