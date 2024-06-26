import { useState } from "react";
import { useRecoilState, atom } from "recoil";
import { userAtom } from "../atoms/user-atom";
import { useNavigate } from 'react-router-dom';

const HeaderComponent = (props) => {

    const [user, setUser] = useRecoilState(userAtom); 
    const [menu, setMenu]= useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear 'userData' from local storage
        // localStorage.removeItem('userData');
        setUser("");
        navigate('/');
    }
    
    // const [user, setUser] = useState(undefined);

    // useEffect(() => {
    //     const userData = localStorage.getItem('userData');

    //     if (!user && userData) {
    //         setUser(userData)
    //     }

    //     if (user && userData) {
    //         setUser("")
    //     }

    // }, [user])

    return (
        <div className="text-[#FFE148] w-[90%] mt-5 mx-auto flex justify-between font-[Raleway] z-50">
            <div className="font-extrabold text-lg">
                <a href="/">WriteRight</a>
            </div>
            <div className="flex gap-5">
                <div>
                    <a href="./toefl-grader">TOEFL Writing Grader</a>
                </div>
                <div>
                    <a href="./about-us">About Us</a>
                </div>
                <div>
                    {user ? (
                        <>
                        <button onClick={() => setMenu(!menu)} className="relative">My Center</button>
                        {menu && (
                            <div className="flex flex-col absolute z-10 bg-[#004255] border border-white divide-y rounded-lg text-left text-sm">
                                <a href="./user-profile" className="p-2">User Info</a>
                                {/* <a href="./" className="p-2">My Submits</a> */}
                                <button className="p-2 text-left" onClick={handleLogout}>Log Out</button>
                            </div>
                        )
                        }
                        </>
                    ) : (
                        <a href="./register">Join/Login</a>
                    )}
                </div>
            </div>
        </div>
    )
}
// when user click my profile, the state of menu= true; the menu shows
// when user click log out, it clears the local storage of the userdata

export default HeaderComponent;