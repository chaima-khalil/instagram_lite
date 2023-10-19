import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
function Header() {
    const user = JSON.parse(localStorage.getItem("insta-lite"))
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const menuItems = [
        {
            title: 'Home',
            path: '/home',
        },
        {
            title: 'Add Post',
            path: '/addpost',
        },
        {
            title: 'Shares',
            path: '/shares',
        },
        {
            title: 'Profile',
            path: `/profile/${user.id} `,
        },
    ];
    return (

        <div className='p-3 bg-primary rounded-md' >
            {!showMenu && (
                <div className='md:flex justify-end  hidden bg-primary -mb-8'>
                    <AiOutlineMenu size={30} color='white' className='cursor-pointer' onClick={() => setShowMenu(true)} />
                </div>
            )}
            <div className='flex items-center justify-between'>


                <div onClick={() => navigate('/home')} className='cursor-pointer' >
                    <h1 className='text-2xl font-semibold text-white'>INSTAGRAM</h1>
                    <span className='text-white'>{user.email.substring(0, user.email.length - 10)}</span>
                </div>

                {/*web view*/}
                <div className='flex space-x-10 justify-end items-center md:hidden'>
                    {menuItems.map((item) => {
                        return <Link to={`${item.path}`} className={`text-gray ${item.path == location.pathname && 'bg-white text-black rounded py-1 px-3  '}`}
                            onClick={() => setShowMenu(false)}
                        >
                            {item.title}</Link>;
                    }
                    )
                    }
                    <h1 className='text-gray cursor-pointer'
                        onClick={() => {
                            localStorage.removeItem('insta-lite')
                            navigate('/login')
                        }}>Logout</h1>
                </div>
                { /*{mob view}*/}
                {showMenu && (
                    <div className='md:flex space-x-10 justify-end flex-col items-end space-y-5 hidden'>
                        {menuItems.map((item) => {
                            return <Link to={`${item.path}`} className={`text-gray ${item.path == location.pathname && 'bg-white text black rounded py-1 px-3  '}`}>{item.title}</Link>;
                        }
                        )
                        }
                        <h1 className='text-gray'
                            onClick={() => {
                                localStorage.removeItem('insta-lite')
                                navigate('/login')
                            }}>Logout</h1>
                    </div>)}
            </div>
        </div>
    );
}

export default Header;