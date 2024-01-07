import React, { useEffect, useState } from 'react'
import fetchItems from '../utilities/fetchData';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { dodajKorpa } from '../actions/actions';

const Product = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const [produkt, setProdukt] = useState(null)
  const fetchData = async (filter) => {
    try {
        const items = await fetchItems(`/${filter}`);
        setProdukt(items);
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    fetchData(id);
    console.log(id)
  },[id])
  return (
    <div className='m-4 p-2 border border-gray-300 rounded-lg'>
      {produkt && <div className='m-2 p-12 flex lg:flex-row flex-col gap-12 border border-gray-300 rounded-lg'>
        <div className='p-12 border w-full lg:w-1/3 flex items-center justify-center border-gray-400 rounded-xl'>
          <img className='w-48 lg:w-full' src={produkt.image} alt="slika" />
        </div>
        <div className='p-4 w-full lg:w-1/3'>
          <p className='text-gray-400'>Product ID: #{produkt.id}</p>
          <h1 className='text-2xl mb-16 font-semibold'>{produkt.title}</h1>
          <p className='text-red-600'>TAX Free price {Math.round((produkt.price - produkt.price*0.1)*100)/100}$</p>
          <h1 className='text-3xl'>{produkt.price}$</h1>
          <p className='text-orange-400 text-sm'><FontAwesomeIcon icon={faStar} /> Rating {produkt.rating.rate} ({produkt.rating.count})</p>
          <button onClick={() => dispatch(dodajKorpa(produkt, Date.now()))} className='px-4 mt-8 py-2 bg-yellow-500 font-semibold rounded text-lg'>Add to cart <FontAwesomeIcon icon={faShoppingCart} /></button>
          <hr className='bg-red-500 my-12 p-[1px]' />
          <p className='w-full lg:h-24 h-full overflow-auto'>{produkt.description}</p>
        </div>
      </div>}
    </div>
  )
}

export default Product