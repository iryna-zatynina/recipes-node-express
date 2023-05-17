const toCurrency = price => {
    return new Intl.NumberFormat('de-DE', {
        currency: 'EUR',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(Number(node.textContent))
})

const $cart = document.querySelector('#cart')
if ($cart) {
    $cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id

            fetch('/cart/remove/' + id, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(cart => {
                    if (cart.dishes.length) {
                        $cart.querySelector('tbody').innerHTML = cart.dishes.map(d => {
                            return `
                                <tr>
                                    <td>${d.title}</td>
                                    <td>${d.count}</td>
                                    <td>
                                        <button class="btn brn-small js-remove" data-id="${d.id}">delete</button>
                                    </td>
                                </tr>
                            `
                        }).join('')
                        $cart.querySelector('.price').textContent = toCurrency(cart.price)
                    } else {
                        $cart.innerHTML = '<p>Card is Empty</p>'
                    }
                })
        }
    })
}