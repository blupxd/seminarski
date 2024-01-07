import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import fetchItems from '../utilities/fetchData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
  const {id} = useParams()
  const [produkti, setProdukti] = useState([])
  const fetchData = async () => {
    try {
        const items = await fetchItems('');
        setProdukti(items.filter((prod) => prod.title.includes(id)));
    } catch (error) {
        console.error(error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [id])
  return (
    <div className='m-12 p-8 border border-gray-300 rounded-lg'>
      <h1 className='text-xl font-semibold text-gray-600 mb-12'>Search results for: <span className='text-yellow-500 italic'>"{id}"</span></h1>
      {produkti.length ? 
      <div className='grid gap-12 lg:grid-cols-4 md:grid-cols-2 grid-cols-1'>
        {produkti.map((prod, key) => (
          <div className='border border-gray-300 p-4 mb-4 rounded-lg' key={key}>
            <div className="relative h-48 w-48 mx-auto flex justify-center overflow-hidden">
                <img className='object-cover' src={prod.image} alt="" />
                <div className='bg-black/50 w-full flex justify-center items-center opacity-0 hover:opacity-100 transition-all duration-300 h-48 absolute top-0 left-0 z-2'>
                    <Link className='text-white p-2 border border-white rounded-xl hover:p-4 transition-all duration-300 ' to={`/product/${prod.id}`}>Check out</Link>
                </div>
            </div>
            <div className='mt-3'>
            <h1 className='text-lg font-semibold w-32 h-14 overflow-y-hidden mb-6'>{prod.title}</h1>
            <p className='text-gray-800 font-semibold'>{prod.price} $</p>
            <Link to={`/product/${prod.id}`} className='block bg-red-700 text-white px-4 py-2 rounded-lg mt-3 hover:bg-red-600'>
                <FontAwesomeIcon icon={faShoppingCart} /> Purchase
            </Link>
            </div>
        </div>
        ))}
      </div>
    : <p>Nema rezultata za "{id}"</p>}
    </div>
  )
}

export default Search