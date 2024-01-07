import Categories from "./components/Categories";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart"
import Search from "./components/Search"
import { useState } from "react";
import SearchMenu from "./components/SearchMenu";
import Product from "./components/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCartShopping, faHome } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function App() {

  const [klik, setKlik] = useState(false);
  const brojProdukta = useSelector(state => state.korpa)
  //uzimamo sve produkte da bismo ih prebrojali
  return (
    <BrowserRouter>
      <div className="flex flex-col relative">
        <div className="bg-gray-900 p-4 flex items-center justify-around px-4">
          <SearchMenu />
        </div>
          <div className="bg-black py-4 text-white flex items-center justify-end gap-x-2 px-6">
          <Link to='/' className="hover:text-gray-300 px-12 transition">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          
          <div className="relative inline-block text-left">
              <button onClick={() => setKlik(!klik)} className="hover:text-gray-300 px-12 transition">Categories <FontAwesomeIcon icon={faAngleDown} /></button>
              <div className={`origin-top-right ${klik ? 'flex flex-col' : 'hidden'} absolute z-50 right-0 mt-2 w-40 rounded-md shadow-lg bg-white `}>
                  <div className="py-2">
                      <Link to="/mens-clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Men's clothing</Link>
                      <Link to="/womens-clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Women's clothing</Link>
                      <Link to="/jewelery" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Jewelery</Link>
                      <Link to="/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Electronics</Link>
                  </div>
              </div>
          </div>
          <div className="relative">
            <Link to='/cart' className="hover:text-gray-300 px-12 transition">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            {brojProdukta.length > 0 && 
            <p className="bg-white text-black absolute rounded-full top-3 right-8 px-[5px] font-bold text-[10px]">{brojProdukta.length}</p>}
          </div>
          
        </div>
        <div className="h-full">
          <Routes>
              <Route path="/product/:id" exact element={<Product />} />
              <Route path="/" exact element={<Home />}/>
              <Route path="/:id" exact element={<Categories />}/>
              <Route path="/cart" exact element={<Cart />}/>
              <Route path="/search/:id" exact element={<Search />}/>
            </Routes>
        </div>
            
      </div>
      <div className="bg-black h-96 flex flex-col justify-center items-center">
        <div className="border border-gray-700 w-96 text-center">
          <Link to="/mens-clothing" className="block px-4 py-2 text-sm text-gray-700">Men's clothing</Link>
          <Link to="/womens-clothing" className="block px-4 py-2 text-sm text-gray-700 ">Women's clothing</Link>
          <Link to="/jewelery" className="block px-4 py-2 text-sm text-gray-700">Jewelery</Link>
          <Link to="/electronics" className="block px-4 py-2 text-sm text-gray-700">Electronics</Link>
        </div>
        <p className="text-gray-900 text-xs mt-12 italic">EPOS, React + Redux</p>
        <p className="text-gray-900 text-xs mt-2 italic">Matija, Dušan, Veljko</p>
      </div>
    </BrowserRouter>
  );
}

export default App;
