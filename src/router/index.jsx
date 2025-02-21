import {createHashRouter} from 'react-router-dom'
import FrontLayout from '../layout/FrontLayout';
import Home from '../page/Home';
import ProductsPage from '../page/ProductsPage';
import ProductIdPage from '../page/ProductIdPage';
import CartPage from '../page/CartPage';
import NotFound from '../page/NotFound';

const router = createHashRouter( [
    {
        path:'/',
        element:<FrontLayout/>,
        children:[
            {
                path:'',
                element:< Home/>
            },
            {
                path:'products',
                element:<ProductsPage/>
            },
            {
                path:'products/:id',
                element:<ProductIdPage/>
            },
            {
                path:'cart',
                element:<CartPage/>
            },
            {
                path:'*',
                element:<NotFound/>
            }

        ]
    }
])


export default router;