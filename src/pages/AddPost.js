import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fireDb } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate;
  const dispatch = useDispatch();
  const addPost = () => {
    dispatch({ type: "showLoading" })

    const storage = getStorage();
    const storageRef = ref(storage, `/posts/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(ref(storage, `/posts/${image.name}`)).then((url) => {
        addDoc(collection(fireDb, 'posts'), {
          description,
          imageURL: url,
          likes: [],
          comments: [],
          user: JSON.parse(localStorage.getItem('insta-lite'))
        }).then(() => {
          toast.success("post created successfully");
          dispatch({ type: "hideLoading" });
          navigate('/');
        })
          .catch(() => {
            dispatch({ type: "hideLoading" });
            toast.error("somthing went wrong");
          });
      });

    }).catch((error) => {
      console.log(error)
      toast.error('error uploading')
    });
  }

  const onImageChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <DefaultLayout>
      <div><h1 className='text-3xl text-gray-600'>Add New Post</h1>
        <div classname=' w-screen  flex flex-col'>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-dashed border-gray-500 border-2  w-1/2 md:w-full my-5 p-5 ' rows='3'></textarea>
          <input type="file" onChange={(e) => onImageChange(e)} />
          {image && (
            <img src={URL.createObjectURL(image)} alt="" className='mt-5 h-52 w-52 rounded' />
          )}

        </div>
        {description &&
          image && (
            <button
              className='bg-primary h-10 rounded-sm text-white px-10 mt-10 '
              onClick={addPost}>
              ADD POST
            </button>
          )
        }
      </div>

    </DefaultLayout>
  )
}

export default AddPost;