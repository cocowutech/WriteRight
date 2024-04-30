import { useRecoilState, atom } from "recoil";
import { userAtom } from "./atoms/user-atom";
import { useState } from "react";
import axios from "axios";

const UserProfile = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [userEdit, setUserEdit] = useState(false);
    const [passwordField,setPasswordField] = useState(false);

    const [username, setUsername] = useState(user.user.username);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const makeUserFieldEditable = () => {
        setUserEdit(!userEdit)
    }

    const makePasswordFieldVisible = () => {
        setPasswordField(!passwordField)
    }

    const saveProfile = async () => {
        const response = await axios.post('http://localhost:3000/update-profile', {
            username: username,
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                "authorization": user.jwt
            }
        })

        if (response.status === 200) {

            const response = await axios.post('http://localhost:3000/profile', {}, {
                headers: {
                    "authorization": user.jwt
                }
            })

            setUser(response.data)

            alert("Information is saved!")
        }
    }
    
    return (
        <div className="w-[90%] mx-auto font-[Raleway] flex justify-center"> 
            {/* make the width same as navbar; justify-center: main*/}
            <div className="h-[calc(100vh-96px)] flex flex-col justify-center items-center">

                <div className="flex items-center justify-center min-h-40 w-40 rounded-full bg-white my-10 -z-10">
                    <span className="text-5xl font-semibold text-gray-600 uppercase">{user.user.username[0]}</span>
                </div>

                <div className="flex flex-col gap-10">
                    <div className="flex justify-between gap-20 border-b-2 pb-1">
                        <div className="flex gap-5">
                            <div className="text-white">Username</div>
                            <div>
                                <input readOnly={userEdit} className="bg-transparent border-none text-white min-w-20 w-20" value={username} onChange={(event) => setUsername(event.target.value)} />
                            </div>
                        </div>
                        <button onClick={() => makeUserFieldEditable()} className="text-white">
                            Edit
                        </button>
                    </div>

                    <div className="flex justify-between gap-20 border-b-2 pb-1">
                        <div className="flex gap-5">
                            <div className="text-white">Password</div>
                        </div>
                        <button onClick={() => makePasswordFieldVisible()} className="text-white">
                            Manage My Password
                        </button>
                    </div>

                    {passwordField && (
                        <>
                            <div className="flex justify-between gap-20 border-b-2 pb-1">
                                <div className="flex gap-5">
                                    <div className="text-white">Enter Old Password : </div>
                                    <div>
                                        <input className="bg-transparent border-none text-white min-w-20 w-20" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between gap-20 border-b-2 pb-1">
                                <div className="flex gap-5">
                                    <div className="text-white">Enter New Password :</div>
                                    <div>
                                        <input className="bg-transparent border-none text-white min-w-20 w-20" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <button className="border border-white py-2 text-white" onClick={() => saveProfile()}>Save Profile</button>
                </div>

            </div>

        </div>
    )
}

export default UserProfile;