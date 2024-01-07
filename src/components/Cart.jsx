import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isprazniKorpu, ukloniKorpa } from '../actions/actions'
import { Link, useNavigate } from 'react-router-dom'
const Cart = () => {
  const produkti = useSelector(state => state.korpa)
  //uzimamo produkte da bismo ih prikazali
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className='m-12 p-12 border flex flex-col lg:flex-row gap-5 border-gray-300'>
      <div className='p-8 border border-gray-400 w-full flex flex-col gap-2 rounded-lg'>
        {produkti.length > 0 ?
        produkti.map((prod,key) => (
          <div className='bg-gray-300 text-center flex md:flex-row flex-col items-center gap-12 px-12 py-2'>
            <img src={prod.item.image} className='w-16 border rounded-md p-1 bg-white border-gray-400 h-16 object-cover' alt="" />
            <Link className='font-semibold lg:text-md text-sm' to={`/product/${prod.item.id}`}>{prod.item.title}</Link>
            <p className='text-indigo-500'>Category: {prod.item.category};</p>
            <p className='text-indigo-800'>Price: {prod.item.price}$; x 1</p>
            <button className='text-red-600 text-lg' onClick={() => dispatch(ukloniKorpa(prod.id))}><FontAwesomeIcon icon={faTrash} /></button>
          </div>)
        ): <h1 className='text-3xl w-full'>There are no items in your cart!</h1>}
      </div>
      <div className='p-8 border w-full border-gray-400'>
          {produkti &&
            <div className='m-2 p-2 border border-gray-300'>
              <h1 className='text-2xl border-b border-gray-300 mb-24'>Total Cost: </h1>
              <p className='text-xl'>{produkti.reduce((suma, trenutniItem) => suma + trenutniItem.item.price, 0)}$</p>
              <button disabled={produkti.length === 0}  onClick={() =>{
                if(produkti.length){
                  alert('Successfully purchased!')
                  dispatch(isprazniKorpu())
                  navigate('/')
                } else alert('The cart is empty!') 
                }} className='bg-yellow-600 px-4 py-2 mt-2 font-semibold'>Submit Order</button>
            </div>}
        </div>
    </div>
  )
}

export default Cart