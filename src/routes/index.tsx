import {createBrowserRouter} from 'react-router-dom'
import { Login, AdminPanel, AddAdmin } from '../pages';

const routes = createBrowserRouter([{
    path:'/',
    element:<><Login/></>
},
{
    path:'/admin',
    element:<><AdminPanel/></>
},
{
    path:'/addAdmin',
    element:<><AddAdmin/></>
}

])
export default routes;


