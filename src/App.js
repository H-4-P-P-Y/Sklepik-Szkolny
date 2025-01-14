import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Szkolny Sklepik</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Produkty</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">Historia zamówień</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Panel administratora</Link>
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary" to="/login">Zaloguj</Link>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <footer className="bg-light text-center py-3">
        &copy; 2025 Szkolny Sklepik
      </footer>
    </Router>
  );
}

function ProductList() {
  const products = [
    { id: 1, name: 'Długopis', description: 'Długopis żelowy', price: 3.5 },
    { id: 2, name: 'Zeszyt', description: 'Zeszyt 60 kartkowy', price: 5.0 },
    { id: 3, name: 'Ołówek', description: 'Ołówek z gumką', price: 2.0 },
  ];

  return (
    <div className="row">
      {products.map(product => (
        <div key={product.id} className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Cena: {product.price.toFixed(2)} zł</p>
              <button className="btn btn-primary">Dodaj do koszyka</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderForm() {
  const [orderItems, setOrderItems] = useState([
    { product: '', quantity: 1 },
  ]);

  // Funkcja do aktualizacji zamówienia dla konkretnego indeksu
  const updateOrderItem = (index, key, value) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index][key] = value;
    setOrderItems(updatedOrderItems);
  };

  // Funkcja do dodawania nowego produktu do zamówienia
  const addOrderItem = () => {
    setOrderItems([...orderItems, { product: '', quantity: 1 }]);
  };

  // Funkcja do usuwania produktu z zamówienia
  const removeOrderItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Zamówienie: ${orderItems
        .map((item) => `${item.product} (ilość: ${item.quantity})`)
        .join(', ')}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Formularz zamówienia</h3>
      {orderItems.map((item, index) => (
        <div key={index} className="mb-3">
          <label className="form-label">Produkt</label>
          <input
            type="text"
            className="form-control"
            value={item.product}
            onChange={(e) => updateOrderItem(index, 'product', e.target.value)}
          />
          <label className="form-label mt-2">Ilość</label>
          <input
            type="number"
            className="form-control"
            value={item.quantity}
            min="1"
            onChange={(e) => updateOrderItem(index, 'quantity', e.target.value)}
          />
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => removeOrderItem(index)}
          >
            Usuń produkt
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={addOrderItem}
      >
        Dodaj kolejny produkt
      </button>
      <button type="submit" className="btn btn-primary">
        Złóż zamówienie
      </button>
    </form>
  );
}


function OrderHistory() {
  const orders = [
    { id: 1, product: 'Długopis', quantity: 2 },
    { id: 2, product: 'Zeszyt', quantity: 1 },
  ];

  return (
    <ul className="list-group">
      {orders.map(order => (
        <li key={order.id} className="list-group-item">
          {order.product} - Ilość: {order.quantity}
        </li>
      ))}
    </ul>
  );
}

function AdminDashboard() {
  const products = [
    { id: 1, name: 'Długopis', price: 3.5 },
    { id: 2, name: 'Zeszyt', price: 5.0 },
  ];

  return (
    <div>
      <h3>Lista produktów</h3>
      <ul className="list-group mb-3">
        {products.map(product => (
          <li key={product.id} className="list-group-item">
            {product.name} - Cena: {product.price.toFixed(2)} zł
          </li>
        ))}
      </ul>
      <button className="btn btn-success">Dodaj nowy produkt</button>
    </div>
  );
}

function Login() {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Hasło</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Zaloguj</button>
    </form>
  );
}

function Register() {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Imię i nazwisko</label>
        <input type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Hasło</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Zarejestruj</button>
    </form>
  );
}

export default App;