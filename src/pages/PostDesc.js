import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { fireDb } from '../firebaseConfig'
import { useParams } from 'react-router-dom'
import { AiFillHeart, AiOutlineComment,AiOutlineClose, AiOutlineShareAlt } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment/moment'

function PostDesc() {
    const currentuser = JSON.parse(localStorage.getItem('insta-lite'))
    const [alreadyLiked , setAlreadyLiked]=useState(true)
    const [showLikes ,setshowLikes]=useState(false)
    const [showComments ,setshowComments]=useState(false)
    const [commentText ,setcommentText]=useState('')
    const [post, setPost] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getUserName = (text) => {
        const email = text
        const username = email.substring(0, email.length - 10)
        return username
    }
    const getData = () => {
        dispatch({ type: 'showLoading' })
        getDoc(doc(fireDb, 'posts', params.id)).then((response) => {
            setPost({ ...response.data(), id: response.id });
            if(response.data().likes.find((user)=>user.id ===currentuser.id))
            {
                setAlreadyLiked(true)
            }else{
                setAlreadyLiked(false)
            }
            dispatch({ type: 'hideLoading' });
        }

        ).catch(() => {
            dispatch({ type: 'hideLoading' });


        })
    }
    useEffect(() => {
        getData()
    }, [])
    const likeorunlikepost = () => {
        let updatedLikes = post.likes
        if(alreadyLiked)
        {
            updatedLikes=post.likes.filter((user)=>user.id!==currentuser.id)
        }else{
            updatedLikes.push({
                id: currentuser.id,
                email: currentuser.email
            })
        }
      
        setDoc(doc(fireDb, 'posts', post.id), { ...post, likes: updatedLikes }).then(() => {
            getData()
            toast.success('post liked successfully')
        }).catch(() => {
            toast.error('An error occurred')
        })

    }
const addComment=()=>{
    let updatedComments  = post.comments
    
        updatedComments.push({
            id: currentuser.id,
            email: currentuser.email,
            commentText,
            createdOn:moment().format("DD-MM-YYYY")
        })
    
  
    setDoc(doc(fireDb, 'posts', post.id), { ...post, comments: updatedComments }).then(() => {
        getData()
        setcommentText('')
    }).catch(() => {
        toast.error('An error occurred')
    })

}
    return <DefaultLayout>
        
        <div className='flex w-full  justify-center space-x-5'>

            {post && (
             
              <>
              {/*likes display purpose*/}
             {showLikes&&(
                 <div className='w-96'>
                    <div className='flex justify-between' >
                    <h1 className='text-xl font-semibold text-gray-500'>Liked by</h1>
                   <AiOutlineClose  color='gray' className ='cursor-pointer'onClick={()=>setshowLikes(false)}/>
                    </div>
                    <hr/>
                    {post.likes.map((like) =>{
                        return  <div className='flex item items-center card-sm p-2 mt-2'>
                        <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-white mr-2'>
                            <span className='text-2xl '>{getUserName(like.email)[0]}</span>
                        </div>
                        <span>{getUserName(like.email)}</span>
                    </div>

                    })}

                 </div>
             )}
              {/*post info purpose*/}
                <div
                    className='cursor-pointer h-[300px] w-[300px]'>
                    <div className='flex item items-center card-sm p-2'>
                        <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-white mr-2'>
                            <span className='text-2xl '>{getUserName(post.user.email)[0]}</span>
                        </div>
                        <span>{getUserName(post.user.email)}</span>
                    </div>

                    <div className='w-full text-center flex justify-center card-sm'>
                        <img src={post.imageURL} alt="" className="h-full w-full" />

                    </div>


                    <div className='card-sm p-2 flex w-full items-center space-x-5'>
                        <div className='flex space-x-2 item-center'>
                            <AiFillHeart size={25} onClick={likeorunlikepost}  color={alreadyLiked ? 'red' : 'gray'}/>
                            <h1 className='underline font-semibold cursor-pointer' onClick={()=>setshowLikes(true)}>{post.likes.length}</h1>
                        </div>
                        <div className='flex space-x-2 item-center'>
                            <AiOutlineComment size={25} />
                            <h1 className='underline text-xl cursor-pointer'onClick={()=>setshowComments(true)}>{post.comments.length}</h1>
                        </div>
                        <div>
                            <AiOutlineShareAlt onClick={()=>navigate(`/sharepost/${post.id}`)} size={25} color='gray' className='cursor-pointer'/>
                        </div>
                    </div>
                </div>
        {/*comments info purpose*/}
              {showComments &&  
              <div className='w-96'>
<div className='flex justify-between' >
                    <h1 className='text-xl font-semibold text-gray-500'>Comments</h1>
                   <AiOutlineClose  color='gray' className ='cursor-pointer'onClick={()=>setshowComments(false)}/>
                    </div>                {post.comments.map((comment)=>{
                    return <div className='card-sm mt-2 p-2'>
                        <h1 className='text-xl text-gray-700'>{comment.commentText}</h1>
                    <hr/>
                    <h1 className='text-right text-md'>
                        by <b>{getUserName(comment.email)} </b> On {comment.createdOn}
                    </h1>
                    </div>
                })}
                <div className='flex flex-col'>
                    <textarea 
                    className='border-dashed border-gray-500 border-2   md:w-full my-5 p-5  w-full'
                    rows='2' value={commentText} onChange={(e)=>setcommentText(e.target.value)}></textarea>
                       <button
              className='bg-primary h-10 rounded-sm text-white px-5 mt-2 w-20 text-center '
              onClick={addComment}>
              Add
                       </button>
                </div>
              </div>
              }
                </>
            )}


        </div>

    </DefaultLayout>;

}

export default PostDesc;