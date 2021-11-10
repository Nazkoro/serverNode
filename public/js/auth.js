const auth = () => {
	const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const buttonOut = document.querySelector('.button-out')
const buttonCart = document.querySelector('.button-cart')
const userName = document.querySelector('.user-name')
const buttonAuth = document.querySelector('.button-auth')
const logInForm = document.getElementById('logInForm')
const inputLogin = document.getElementById('login')
const inputTel = document.getElementById('tel')

const login = (user) => {
	buttonOut.style.display ='flex'
	userName.style.display ='flex'
	buttonCart.style.display ='flex'

	buttonAuth.style.display ='none'
	modalAuth.style.display ='none'

	userName.textContent = user.login
}

const logout = (r) => {
	buttonOut.style.display ='none'
	userName.style.display ='none'
	buttonCart.style.display ='none'

	buttonAuth.style.display ='flex'
	userName.textContent = ''
	localStorage.removeItem('user')
}

buttonAuth.addEventListener('click', () => {
	modalAuth.style.display ='flex'
})

buttonOut.addEventListener('click', () => {
	logout()
})

closeAuth.addEventListener('click', () => {
	modalAuth.style.display ='none'
})

logInForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const user = {
		login: inputLogin.value,
		tel: inputTel.value,
	}
	if(inputLogin.value ===''){
		alert('Ошибка, сначала ведите логин')
		return false
	}

	localStorage.setItem('user', JSON.stringify(user))
	login(user)
})

if(localStorage.getItem('user')){
	login(JSON.parse(localStorage.getItem('user')));
}
}
auth()