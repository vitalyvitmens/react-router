import { Routes, Route, NavLink, Outlet, useParams } from 'react-router-dom'
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
					<NavLink to={`product/${id}`}>{name}</NavLink>
				</li>
			))}
		</ul>
		<Outlet />
	</div>
)
const ProductNotFound = () => <div>Такой товар не существует</div>
const Product = () => {
	const params = useParams()

	const product = fetchProduct(params.id)

	if (!product) {
		return <ProductNotFound />
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
				</Route>
				<Route path="/contacts" element={<Contacts />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}
