import {
	Routes,
	Route,
	NavLink,
	Outlet,
	useParams,
	// useMatch,
	useNavigate,
} from 'react-router-dom'
import styles from './app.module.css'
import { useEffect, useState } from 'react'

const dataBase = {
	productList: [
		{ id: 1, name: 'Телевизор' },
		{ id: 2, name: 'Смартфон' },
		{ id: 3, name: 'Планшет' },
	],
	products: {
		1: { id: 1, name: 'Телевизор', price: 29900, amount: 15 },
		2: { id: 2, name: 'Смартфон', price: 13900, amount: 48 },
		3: { id: 3, name: 'Планшет', price: 18400, amount: 23 },
	},
}

const LOADING_TIMEOUT = 2000

const fetchProductsList = () => dataBase.productList

const fetchProduct = (id) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(dataBase.products[id])
		}, 1500)
	})

const MainPage = () => <div>Контент главной страницы</div>

const Catalog = () => (
	<div>
		<h3>Контент каталога</h3>
		<ul>
			{fetchProductsList().map(({ id, name }) => (
				<li key={id}>
					<NavLink to={`product/${id}`}>{name}</NavLink>
				</li>
			))}
		</ul>
		<Outlet />
	</div>
)
const ProductNotFound = () => <div>Такой товар не существует</div>
const ProductLoadError = () => (
	<div>Ошибка загрузки товара, попробуйте ещё раз позднее</div>
)
const Product = () => {
	const [product, setProduct] = useState(null)
	const params = useParams()
	const navigate = useNavigate()

	// const urlMatchData = useMatch('/catalog/:type/:id')
	// console.log(urlMatchData.params)
	// console.log(urlMatchData.params.type)
	// console.log(urlMatchData.params.id)

	useEffect(() => {
		let isLoadingTimeout = false
		let isProductLoaded = false

		setTimeout(() => {
			isLoadingTimeout = true

			if (!isProductLoaded) {
				navigate('/product-load-error', { replace: true })
			}
		}, LOADING_TIMEOUT)

		fetchProduct(params.id).then((loadedProduct) => {
			isProductLoaded = true

			if (!isLoadingTimeout) {
				if (!loadedProduct) {
					navigate('/product-not-found')
					return
				}

				setProduct(loadedProduct)
			}
		})
	}, [params.id, navigate])

	if (!product) {
		return null
	}

	const { name, price, amount } = product

	return (
		<div>
			<h3>Товар - {name}</h3>
			<div>Цена: {price}</div>
			<div>На складе: {amount}</div>
		</div>
	)
}

const Contacts = () => <div>Контент контактов</div>
const NotFound = () => <div>Такая страница не существует</div>

const ExtendedLink = ({ to, children }) => (
	<NavLink to={to}>
		{({ isActive }) =>
			isActive ? (
				<>
					<span>{children}</span>
					<span>*</span>
				</>
			) : (
				children
			)
		}
	</NavLink>
)

export const App = () => {
	return (
		<div className={styles.app}>
			<div>
				<h3>Меню</h3>
				<ul>
					<li>
						<ExtendedLink to="/">Главная</ExtendedLink>
					</li>
					<li>
						<ExtendedLink to="/catalog">Каталог</ExtendedLink>
					</li>
					<li>
						<ExtendedLink to="/contacts">Контакты</ExtendedLink>
					</li>
				</ul>
			</div>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/catalog" element={<Catalog />}>
					<Route path="product/:id" element={<Product />} />
					<Route path="service/:id" element={<Product />} />
				</Route>
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/product-load-error" element={<ProductLoadError />} />
				<Route path="/product-not-found" element={<ProductNotFound />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}
