import React, {useState} from "react";
import { GoOctoface } from "react-icons/go";
import axios from "axios";

const Form = (props) => {
    const [username, setUsername] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        axios.get(`https://api.github.com/users/${username}`).then((resp) =>{
        props.onSubmit(resp.data)
        });
        setUsername('');

    }     

    return (
        <form onSubmit={submitHandler} className="w-full max-w-sm mx-auto">
            <div className='mt-10 flex'>
                <GoOctoface  size={50} className="mr-5"/>
                <input
                    type='text'
                    placeholder='Search a GitHub username'
                    className='form-input block w-full py-2 px-5 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150'
                    required
                    value={username}
                    onChange={(event)=>setUsername(event.target.value)}
                />
                <button
                    type='submit'
                    className='ml-2 py-2 px-3 border border-blue-300 rounded-md text-sm leading-3 font-large text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out'
                >
                    Search
                </button>
            </div>
        </form>
    )
}

export default Form