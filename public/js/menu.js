const menu = () => {
	const cardsMenu = document.querySelector('.cards-menu')
	// const cartArray = localStorage.getItem('cart') ?
	// JSON.parse(localStorage.getItem('cart')):[]

const changeTitle = (restaurant) => {

	let title = document.querySelector('.restaurant-title')
	let category = document.querySelector('.category')
	let rating = document.querySelector('.rating')
	let price = document.querySelector('.price')
	
	title.textContent = restaurant.name
	category.textContent = restaurant.kitchen
	rating.textContent = restaurant.stars
	price.textContent = restaurant.price
	
}

const addToCart = (cartItem) => {
		const cartArray = localStorage.getItem('cart') ?
	JSON.parse(localStorage.getItem('cart')):[]
	if(cartArray.some((item) => item.id === cartItem.id)){
		cartArray.map((item) => {
			if(item.id === cartItem.id){
				item.count++
			}

			return item
		})
	} else {
		cartArray.push(cartItem)
	}
	
	localStorage.setItem('cart' , JSON.stringify(cartArray))
}


const renderitems = (data) => {

	data.forEach(({ description, id, image, name, price}) =>{
		const card = document.createElement('div')
		
		card.classList.add('card')

		card.innerHTML = `
			<img src="${image}" alt="${name}" class="card-image" />
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title card-title-reg">${name}</h3>
				</div>
				<div class="card-info">
					<div class="ingredients">
						${description}
					</div>
				</div>
				<div class="card-buttons">
					<button class="button button-primary button-add-cart">
						<span class="button-card-text">В корзину</span>
						<span class="button-cart-svg"></span>
					</button>
					<strong class="card-price-bold">${price} ₽</strong>
				</div>
			</div>
`
	card.querySelector('.button-card-text').addEventListener('click' , () => {
		addToCart({name, price, id, count: 1})
	})
	cardsMenu.append(card)
	});
}



	if(localStorage.getItem('restaurant')) {
		const restaurant = JSON.parse(localStorage.getItem('restaurant'))
		changeTitle(restaurant)

		fetch(`./db/${restaurant.products}`)
		.then((res) => res.json())
		.then((data) => renderitems(data))
		.catch((err) => console.log(err))
	}  else {
		window.location.href = '/'
	}
}

menu()