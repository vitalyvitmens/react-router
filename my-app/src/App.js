import { Routes, Route, Link, Outlet, useParams } from 'react-router-dom'
import styles from './app.module.css'

const fetchProductsList = () => [
	{ id: 1, name: 'Телевизор' },
	{ id: 2, name: 'Смартфор' },
	{ id: 3, name: 'Планшет' },
]

const fetchProduct = (id) =>
	({
		1: { id: 1, name: 'Телевизор', price: 29900, amount: 15 },
		2: { id: 2, name: 'Смартфор', price: 13900, amount: 48 },
		3: { id: 3, name: 'Планшет', price: 18400, amount: 23 },
	}[id])

const MainPage = () => <div>Контент главной страницы</div>

const Catalog = () => (
	<div>
		<h3>Контент каталога</h3>
		<ul>
			{fetchProductsList().map(({ id, name }) => (
				<li key={id}>
					<Link to={`product/${id}`}>{name}</Link>
				</li>
			))}
		</ul>
		<Outlet />
	</div>
)
const Product = () => {
  const params = useParams()
	const { name, price, amount } = fetchProduct(params.id)

	return (
		<div>
			<h3>Товар - {name}</h3>
			<div>Цена: {price}</div>
			<div>На складе: {amount}</div>
		</div>
	)
}

const Contacts = () => <div>Контент контактов</div>

export const App = () => {
	return (
		<div className={styles.app}>
			<div>
				<h3>Меню</h3>
				<ul>
					<li>
						<Link to="/">Главная</Link>
					</li>
					<li>
						<Link to="/catalog">Каталог</Link>
					</li>
					<li>
						<Link to="/contacts">Контакты</Link>
					</li>
				</ul>
			</div>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/catalog" element={<Catalog />}>
					<Route path="product/:id" element={<Product />} />
				</Route>
				<Route path="/contacts" element={<Contacts />} />
			</Routes>
		</div>
	)
}
