import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Notfound from './Components/Notfound/Notfound.jsx';
import Students from './Components/Students/Students.jsx';





let routers = createHashRouter([
  { path:'/',element:<Layout/> , children:[
    {index:true,element:<Home/>},
    {path:'students' , element:<Students/>},
    {path:'*' , element:<Notfound/>},
  ]}
])



function App() {

return <>

  

  <RouterProvider router={routers}/>
  <Toaster></Toaster>

  </>
}

export default App;
