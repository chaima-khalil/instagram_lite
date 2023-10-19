import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fireDb, app } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const{loading}=useSelector(store=>store )
 const navigate=useNavigate()
  const dispatch =useDispatch()
  const register = () => {

    dispatch({type:'showLoading'});
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user; 
        const userData = {
          email: user.email,
          profilPicUrl: '',
          bio: 'hi,im using instagram lite'
        };
        setDoc(doc(fireDb, 'users', user.uid), userData)
        dispatch({type:'hideLoading'})
toast.success('registration successfull')
navigate('/login')
      })
      .catch((error) => {
        dispatch({type:'hideLoading'})
        toast.error('somthing went wrong!')
        console.log(error)

      });


  };

  useEffect(()=>{
    if(localStorage.getItem('insta-lite')){
      navigate('/home')
    }
  }
  )
  return (
    <div className='h-screen flex justify-between flex-col overflow-x-hidden bg-primary'>
      {/* top corner */}
      {loading && <Loader/>}
      <div className=" flex justify-start">
        <div className="h-40 w-96 bg-white  transform -skew-x-[25deg] -ml-10 flex items-center justify-center">
          <h1 className="text-center text-6xl font-semibold skew-x-[25deg] text-primary "> Insta</h1>
        </div>
      </div>
      {/*form*/}
      <div className="flex justify-center bg-primary ">
        <div className='w-[420px] flex flex-col space-y-5 card p-10'>
          <h1 className='text-4xl text-gray-400 font-semibold'>Get---In</h1>
          <hr />
          <input type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className='border border-gray-600 h-10 rounded-sm focus: border-gray-500 pl-5 bg-transparent text-gray-400' />
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className='border border-gray-600 h-10 rounded-sm focus: border-gray-500 pl-5 bg-transparent text-gray-400' />
          <input type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder=" confirm password"
            className='border border-gray-600 h-10 rounded-sm focus: border-gray-500 pl-5 bg-transparent text-gray-400' />
          <div className='flex justify-end'>
            <button className='bg-white h-10 rounded-sm text-primary font-semibold px-10 ' onClick={register}> Register</button>
          </div>
          <hr />
          <Link to='/Login' className="text-[14px] text-gray-400  font-semibold">ALREADY REGISTRED? CLICK HERE TO LOGIN</Link>
        </div>
      </div>
      {/*bottom corner*/}
      <div className=" flex justify-end">
        <div className="h-40 w-96 bg-white transform skew-x-[25deg] -mr-10 flex items-center justify-center">
          <h1 className="text-center text-6xl font-semibold -skew-x-[25deg] text-primary"> Insta</h1>
        </div>
      </div>
    </div>
  )
}

export default Register