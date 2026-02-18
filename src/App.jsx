import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StockValidation from './components/StockValidation';
import PhoneValidation from './components/PhoneValidation';
import AdminLogout from './components/AdminLogout';
import formatDate from './utils/formatDate';

const App = () => {
    const [products, setProducts] = useState([]);
    const [admin, setAdmin] = useState(false);

    // Fetch products from an API or database (mocked here)
    useEffect(() => {
        const fetchProducts = async () => {
            // Mocked API call
            const response = await fetch('/api/products');
            const productData = await response.json();
            setProducts(productData.map(product => ({
                ...product,
                id: product.id || generateStableId(product.name) // Ensure stable IDs
            })));
        };
        fetchProducts();
    }, []);

    const generateStableId = (name) => {
        // Simple hash function for generating stable IDs based on product name
        return name.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
    };

    return (
        <Router>
            <div>
                <h1>Samsul Grocery</h1>
                <Switch>
                    <Route path="/stock" component={StockValidation} />
                    <Route path="/phone-validation" component={PhoneValidation} />
                    <Route path="/admin/logout" component={AdminLogout} />
                    <Route path="/">
                        <h2>Welcome to Samsul Grocery</h2>
                        <ul>
                            {products.map(product => (
                                <li key={product.id}> 
                                    {product.name} - {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    <span className="date">{formatDate(new Date(product.dateAdded))}</span>
                                </li>
                            ))}
                        </ul>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;