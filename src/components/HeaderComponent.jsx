import { useState } from "react";

const HeaderComponent = () => {
    const [user, setUser] = useState(undefined);
    const [menu, setMenu]= useState(false);

    return (
        <div className="text-[#FFE148] w-[90%] mt-5 mx-auto flex justify-between font-[Raleway]">
            <div className="font-extrabold text-lg">
                WriteRight
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
                                <a href="./" className="p-2">User Info</a>
                                <a href="./" className="p-2">My Submits</a>
                                <button className="p-2 text-left">Log Out</button>
                            </div>
                        )
                        }
                        </>
                    ) : (
                        <a href="./login">Join</a>
                    )}
                </div>
            </div>
        </div>
    )
}
// when user click my profile, the state of menu= true; the menu shows



export default HeaderComponent;