import React, { FC } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import RestrictedRoute from './routes/RestrictedRoute';
import ScrollToTop from './routes/ScrollToTop';

import Header from './components/navigation/Header';
import Index from './pages/Index';
import Authentication from './pages/Authentication';
import Footer from './components/navigation/Footer';
import AuthHeader from './components/navigation/authentication/AuthHeader';
import AuthFooter from './components/navigation/authentication/AuthFooter';
import Collection from './components/collection/Collection';
import Product from './components/shared/Product';
import Products from './components/products/Products';
import Manage from './components/admin/Manage';
import ProductEdit from './components/admin/ProductEdit';
import ProductAdd from './components/admin/ProductAdd';
import Cart from './components/cart/Cart';
import Contact from './components/contact/Contact';
import Checkout from './components/checkout/Checkout';
import CheckoutHeader from './components/navigation/checkout/CheckoutHeader';
import CheckoutFooter from './components/navigation/checkout/CheckoutFooter';
import Orders from './components/order/Orders';
import OrderReview from './components/order/OrderReview';

const App: FC = () => {
    return (
        <>
            <Router>
                <ScrollToTop />
                <Switch>
                    <Route path="/authentication" component={AuthHeader}/>
                    <Route path="/checkout" component={CheckoutHeader} />
                    <Route component={Header}/>
                </Switch>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route exact path="/collection" component={Collection} />
                    <Route exact path="/products" component={Products}/>
                    <Route exact path="/product/:id" component={Product} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/checkout" component={Checkout} />
                    <RestrictedRoute path="/authentication" component={Authentication} />
                    <PrivateRoute exact path="/orders" component={Orders} />
                    <PrivateRoute exact path="/orders/:id" component={OrderReview} />
                    <AdminRoute exact path="/manage" component={Manage}/>
                    <AdminRoute exact path="/manage/add" component={ProductAdd}/>
                    <AdminRoute exact path="/manage/edit/:id" component={ProductEdit}/>
                </Switch>
                <Switch>
                    <Route path="/authentication" component={AuthFooter}/>
                    <Route path="/checkout" component={CheckoutFooter}/>
                    <Route component={Footer}/>
                </Switch>
            </Router>
        </>
    )
}

export default App
