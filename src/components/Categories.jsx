import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import fetchItems from '../utilities/fetchData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'
import { FidgetSpinner } from 'react-loader-spinner'

const Categories = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const [produkti, setProdukti] = useState([])
  const [filtriranje, setFiltriranje] = useState('');

  const handleFiltriranjeChange = (e) => {
    const selectedValue = e.target.value;
    setFiltriranje(selectedValue);
  
    switch (selectedValue) {
      case 'Cheapest':
        setProdukti([...produkti].sort((a, b) => a.price - b.price));
        break;
      case 'Most Expensive':
        setProdukti([...produkti].sort((a, b) => b.price - a.price));
        break;
      case 'Rating Lowest':
        setProdukti([...produkti].sort((a, b) => a.rating.rate - b.rating.rate));
        break;
      default:
        setProdukti([...produkti].sort((a, b) => b.rating.rate - a.rating.rate));
        break;
    }
  };
  
  const fetchData = async (filter) => {
    try {
        const items = await fetchItems(`/category/${filter}`);
        setProdukti(items);
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    switch(id){
      case "electronics":
        fetchData('electronics')
        break;
      case "mens-clothing":
        fetchData("men's clothing")
        break;
      case "womens-clothing":
        fetchData("women's clothing")
        break;
      case "jewelery":
        fetchData('jewelery')
        break;
      default:
        navigate('/')
    }
  }, [id])
  

  return (
    <div className='m-4 p-12 shadow-gray-400 flex flex-col shadow-lg'>
      <div className='border border-gray-300 p-4'>
        <label htmlFor='filtriranje' className="mr-2">Filtriraj po:</label>
        <select
          id='filtriranje'
          value={filtriranje}
          onChange={handleFiltriranjeChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value='Cheapest'>Najjeftinije</option>
          <option value='Most Expensive'>Najskuplje</option>
          <option value='Rating Lowest'>Najniža ocena</option>
          <option value='Rating Highest'>Najviša ocena</option>
        </select>
      </div>
      <div className='border border-gray-300 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        {produkti.length ? produkti.map((prod, key) => (
          <div className='border border-gray-300 py-4 mb-4 flex flex-col items-center rounded-lg' key={key}>
            <div className="h-48 overflow-hidden">
            <img className='w-32 object-cover' src={prod.image} alt="" />
            </div>
            <div className='mt-3'>
              <h1 className='text-md font-semibold w-48 truncate mb-6'>{prod.title}</h1>
              <p className='text-yellow-500 font-semibold'>Rating {prod.rating.rate} <FontAwesomeIcon icon={faStar} /> </p>
              <p className='text-gray-800 text-xl font-semibold'>{prod.price} $</p>
              <Link className='block bg-red-700 text-white px-4 py-2 rounded-lg mt-3 hover:bg-red-600' to={`/product/${prod.id}`}>
                  <FontAwesomeIcon icon={faShoppingCart} /> Purchase
              </Link>
            </div>
        </div>
        ))
        : 
      
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
        }
      </div>
    </div>
  )
}

export default Categories