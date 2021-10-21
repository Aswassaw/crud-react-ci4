import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Router>
      <div className='container mt-4'>
        <Switch>
          <Route exact path='/'>
            <ProductList />
          </Route>
          <Route path='/add-product'>
            <AddProduct />
          </Route>
          <Route path='/edit-product/:id'>
            <EditProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
