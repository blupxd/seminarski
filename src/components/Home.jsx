import React, { useEffect, useState } from 'react'
import fetchItems from '../utilities/fetchData'
import { Link } from 'react-router-dom';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FidgetSpinner } from 'react-loader-spinner';

const Home = () => {

    const [produkti, setProdukti] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await fetchItems('');
                setProdukti(items);
                console.log(items);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);    
  return (
    <div className='m-0 flex flex-col items-center'>
        <div className='w-full bg-red-800 flex justify-center p-2'>
            <img className='h-32' src="https://i.ibb.co/PGzvDVH/Untitled.png" alt="" />
        </div>
    {produkti.length ? (
        <div className='flex flex-col'>
            <div className='p-2 flex lg:flex-row flex-col border m-2 border-gray-300 rounded-lg items-center justify-around'>
                <div className='w-96 p-12'>
                    <h1 className='text-3xl text-red-700 font-bold mb-12'>Special Offer!</h1>
                    <h1 className='text-xl font-semibold text-indigo-400 w-64'>{produkti[0].title}</h1>
                    <p className='w-64 mb-12'>{produkti[0].description}</p>
                    <div className='inline-flex items-center gap-4'>
                        <h1 className='text-2xl'>{produkti[0].price}$</h1>
                        <Link to={`/product/${produkti[0].id}`} className='bg-yellow-500 rounded-xl text-white px-4 py-4'>Buy now</Link>
                    </div>
                </div>
                <div className='px-0 lg:px-12'>
                    <img  className='w-96 p-12' src={produkti[0].image} alt="slika" />
                </div>
            </div>
            <div className='p-2 inline-flex flex-wrap border m-2 gap-12 justify-around border-gray-300 rounded-lg items-center'>
            {produkti.slice(1, 6).map((prod, key) => (
                <div className='border border-gray-300 p-4 mb-4 rounded-lg' key={key}>
                    <div className="relative h-48 w-48 flex justify-center overflow-hidden">
                        <img className='w-48 object-cover' src={prod.image} alt="" />
                        <div className='bg-black/50 w-48 flex justify-center items-center opacity-0 hover:opacity-100 transition-all duration-300 h-48 absolute top-0 left-0 z-1'>
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
        </div>
    ): <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        />}
    </div>

  )
}

export default Home