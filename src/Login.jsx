import loginpic from "./assets/loginpic.svg"
import {useState} from "react";
import axios from 'axios';
import { useRecoilState, atom } from "recoil";
import { userAtom } from "./atoms/user-atom";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [user, setUser] = useRecoilState(userAtom);

    const [emailUsername,setemailUsername]=useState('')
    // const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    const [validationMessage, setValidationMessage] = useState({
        emailUsername:"",
        // username:"",
        password:""
    });
   
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();

        // Reset validation messages
        setValidationMessage({
            emailUsername: '',
            // username: '',
            password: ''
        });
    
        

        
        // Check each field and set the validation message if empty
        if (!emailUsername) {
            setValidationMessage(prev => ({ ...prev, emailUsername: 'Please type in your email/username.' }));
        }
        // if (!username) {
        //     setValidationMessage(prev => ({ ...prev, username: 'Please pick a username.' }));
        // }
        if (!password) {
            setValidationMessage(prev => ({ ...prev, password: 'Please choose a password.' }));
        }

        // If all fields are filled, proceed with the form submission logic
        if (emailUsername && password) {
            // Form submission logic here
            console.log("Form submitted:", { emailUsername, password });
            verifyUser(emailUsername,password).then((response) => {
                if (response.status === 200) {
                    setUser(response.data);
                    navigate('/toefl-grader');
                }
            })
        }
    };

    const verifyUser = async (emailUsername,password) => {
          return await axios.post(`${import.meta.env.VITE_BACKENDAPI}/login`, {
            emailUsername: emailUsername,
            password: password
          }); 
    };
    

    return (
        <div className="grid md:grid-cols-2 w-[90%] mx-auto h-[calc(100vh-48px)] gap-10">
            <div className="col-span-1 flex justify-center">
                <img className="scale-75" src={loginpic}></img>
            </div>

            <div className="col-span-1 flex flex-col">
                <div className="max-w-md mx-auto my-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white shadow-md rounded px-20 pt-8 pb-8 mb-4" style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
                    
                    <div className="flex flex-col gap-2">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
                            Email/Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="emailUsername" type="text" placeholder="Type in email/username" onChange={(e) => setemailUsername(e.target.value)}></input>
                        {validationMessage.emailUsername && <p className="text-red-500 text-xs italic">{validationMessage.emailUsername}</p>}
                    </div>

                    {/* <div class="flex flex-col gap-2">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                        {validationMessage.username && <p className="text-red-500 text-xs italic">{validationMessage.username}</p>}
                    </div> */}

                    <div className="flex flex-col gap-2">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)}></input>
                        {validationMessage.password && <p className="text-red-500 text-xs italic">{validationMessage.password}</p>}
                    </div>

                    <div className="flex flex-col gap-2 justify-center my-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Log In
                        </button>
                        {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a> */}
                    </div>
                    
                    <div className="flex justify-center">
                        <a href="./register" className="text-black text-xs italic">Oops, I need to register!</a>
                    </div>
                </form>
                </div>

            </div>

        </div>
    )
}

export default Login;