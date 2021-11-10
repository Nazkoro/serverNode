const partners = () => {
	const cardRestaurants = document.querySelector('.cards-restaurants')

const renderitems = (data) => {
	data.forEach((item) =>{
		const { image, kitchen, name, price, products, stars, time_of_delivery} = item
		const a = document.createElement('a')
		a.setAttribute('href', '/restaurant.html')
		a.classList.add('card')
		a.classList.add('card-restaurant')
		a.dataset.products = products


		a.innerHTML = `
	<img src="${image}" alt="${name}" class="card-image" />
	<div class="card-text">
		<div class="card-heading">
			<h3 class="card-title">${name}</h3>
			<span class="card-tag tag">${time_of_delivery} мин</span>
		</div>
		<div class="card-info">
			<div class="rating">
				${stars}
			</div>
			<div class="price">От ${price} ₽</div>
			<div class="category">${kitchen}</div>
		</div>
`
		a.addEventListener('click', (e) => {
			e.preventDefault()
		if(localStorage.getItem('user')){
			localStorage.setItem('restaurant', JSON.stringify(item))
			window.location.href = './restaurant.html'
		} else {
			document.querySelector('.modal-auth').style.display ='flex'
		}
			
		})


	cardRestaurants.append(a)
		


	});
}





fetch(`https://test-97990-default-rtdb.firebaseio.com/db/partners.json`)
	.then((res) => res.json())
	.then((data) => renderitems(data))
	.catch((err) => console.log(err))

}
partners()