import { useState } from 'react';
import { Checkbox } from './components/forms/Checkbox';
import { Input } from './components/forms/Input';
import { ProductCategoryRow } from './components/products/ProductCategoryRow';
import { ProductRow } from './components/products/ProductRow';
import { Range } from './components/forms/Range';

const PRODUCTS = [
    { category: 'Fruits', price: 1, stocked: true, name: 'Apple' },
    { category: 'Fruits', price: 1, stocked: true, name: 'Dragonfruit' },
    { category: 'Fruits', price: 2, stocked: false, name: 'Passionfruit' },
    { category: 'Vegetables', price: 2, stocked: true, name: 'Spinach' },
    { category: 'Vegetables', price: 4, stocked: false, name: 'Pumpkin' },
    { category: 'Vegetables', price: 1, stocked: true, name: 'Peas' }
];

function App() {
    const [showStockedOnly, setShowStockedOnly] = useState(false);
    const [search, setSearch] = useState('');
    const [price, setPrice] = useState(5);

    // derivated value
    const visibleProducts = PRODUCTS.filter((product) => {
        if (showStockedOnly && !product.stocked) {
            return false;
        }

        if (search && !product.name.includes(search)) {
            return false;
        }

        if (price && product.price > price) {
            return false;
        }

        return true;
    });

    return (
        <div className="container my-3">
            <SearchBar
                showStockedOnly={showStockedOnly}
                search={search}
                price={price}
                onStockedOnlyChange={setShowStockedOnly}
                onSearchChange={setSearch}
                onPriceChange={setPrice}
            />
            <ProductTable products={visibleProducts} showStockedOnly={showStockedOnly} />
        </div>
    );
}

function SearchBar({
    showStockedOnly,
    search,
    price,
    onStockedOnlyChange,
    onSearchChange,
    onPriceChange
}) {
    return (
        <div>
            <div className="mb-3">
                <Input placeholder="Rechercher..." value={search} onChange={onSearchChange} />
                <Checkbox
                    id="stocked"
                    label="N'afficher que les produits en stock"
                    checked={showStockedOnly}
                    onChange={onStockedOnlyChange}
                />
                <Range
                    id="price"
                    label={`Prix : ${price}`}
                    value={price}
                    min={0}
                    max={5}
                    onChange={onPriceChange}
                />
            </div>
        </div>
    );
}

function ProductTable({ products }) {
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (product.category != lastCategory) {
            rows.push(<ProductCategoryRow key={product.category} name={product.category} />);
        }
        lastCategory = product.category;

        rows.push(<ProductRow key={product.name} product={product} />);
    });

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prix</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
export default App;
