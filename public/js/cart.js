const cart = () => {
	const buttonCart = document.getElementById('cart-button')
	const modalCart = document.querySelector('.modal-cart')
	const close = document.querySelector('.close')
	const body = modalCart.querySelector('.modal-body')
	const buttonSend = modalCart.querySelector('.button-send')
	const cleanCart = modalCart.querySelector('.clear-cart')
	const modalThanks = document.querySelector('.modal-thanks')

	const resetCart = () => {
		body.innerHTML =''
		localStorage.removeItem('cart')
		modalCart.classList.remove('is-open')
		modalThanks.style.display ='flex'
		modalThanks.textContent = 'спасибо за заказ'
		
		setTimeout(() => {
			modalThanks.style.display ='none'
		}, 650);
		
	}

	const clearCart = () => {
		body.innerHTML =''
		localStorage.removeItem('cart')
		modalCart.classList.remove('is-open')
	}

		const incrementCount = (id) => {
		const cartArray = JSON.parse(localStorage.getItem('cart'))

		cartArray.map((item) => {
			if(item.id === id){
				item.count++
			}
			return item
		})

		localStorage.setItem('cart' , JSON.stringify(cartArray))
		renderItems(cartArray)

	}

	const decrementCount = (id) => {
		const cartArray = JSON.parse(localStorage.getItem('cart'))

		cartArray.map((item) => {
			if(item.id === id){
				item.count = item.count > 0 ? item.count - 1 : 0
			}
			return item
		})

		localStorage.setItem('cart' , JSON.stringify(cartArray))
		renderItems(cartArray)
		
	}

	const renderItems = (data) => {
		body.innerHTML =''
		data.forEach(({name, price, id, count}) =>{

			const cartElem = document.createElement('div')
			cartElem.classList.add('food-row')

			cartElem.innerHTML =`
					<span class="food-name">${name}</span>
					<strong class="food-price">${price} ₽</strong>
					<div class="food-counter">
						<button class="counter-button btn-dec" data-index="${id}">-</button>
						<span class="counter">${count}</span>
						<button class="counter-button btn-inc" data-index="${id}">+</button>
					</div>
			`

			body.append(cartElem)
		})
		;
	}

	body.addEventListener('click' , (e) => {
		e.preventDefault()
		if(e.target.classList.contains('btn-inc')){
			incrementCount(e.target.dataset.index)

		}	else if(e.target.classList.contains('btn-dec')){
			decrementCount(e.target.dataset.index)
		}
		
	} )

	buttonSend.addEventListener('click', () => {
		
		const cartArray = localStorage.getItem('cart')
		const userArray = localStorage.getItem('user')
		console.log('---------');
		// console.log(userArray);
		console.log(cartArray);
		
		console.log('parse',JSON.parse(cartArray));
		let arrCart = JSON.parse(cartArray);
		let arrUser = JSON.parse(cartArray);
		// console.log( typeof arr, arr);
		arrCart.unshift(arrUser);
		
		
		// console.log(JSON.parse(cartArray).unshift(userArray)) 
		// arr.push(cartArray,userArray)
		// console.log(cartArray);
		console.log('arrCart',arrCart);

		fetch('/user', {
			method: 'POST',
			body: cartArray,
			headers: {
			'Content-Type': 'application/json',
			// 'name': 'cartArray'
			}
		})
		.then(response => {
			if (response.ok) {
				console.log(1);
				// console.log(cartArray);
				resetCart()
			}
			
		})
		.catch(e => {
			console.log(2);
			console.error(e);
		})

		// fetch('/telegram.php', {
		// 	method: 'POST',
		// 	body: cartArray,
		// 	headers: {
		// 	'Content-Type': 'application/json',
		// 	'name': 'cartArray'
		// 	}
		// })
		// .then(response => {
		// 	if (response.ok) {
		// 		console.log(2);
		// 		resetCart()
		// 	}
			
		// })
		// .catch(e => {
		// 	console.error(e);
		// })
	})

	buttonCart.addEventListener('click' , () => {
		modalCart.classList.add('is-open')
		if(localStorage.getItem('cart')){
			renderItems(JSON.parse(localStorage.getItem('cart')))
		}
	})
	cleanCart.addEventListener('click' , () => {
		clearCart()
	})

	close.addEventListener('click' , () => {
		modalCart.classList.remove('is-open') 
	})
	
}
cart()