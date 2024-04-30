import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRecoilState, atom } from "recoil";
import { userAtom} from "./atoms/user-atom";
import { useNavigate } from 'react-router-dom';

const ToeflGrader = () => {
    
    const[score,setScore] = useState(undefined); 
    const [improvedContent, setImprovedContent] = useState(undefined);
    // const[userToken,setuserToken] = useState(undefined);
    const [article, setarticle] = useState(undefined);
    const wordCount = useRef(0); // 0 , [ABC123]
    const [articleLimitError, setArticleLimitError] = useState(false);
    const [user, setUser] = useRecoilState(userAtom); 

    //page reload, need to reflects the value coming from backend: endpoint, header:Data, [component mount once]

    useEffect(() => {
        const getProfile = async () => {
            const response = await axios.post('http://localhost:3000/profile', {}, { headers: { authorization: user.jwt } });
            setUser(response.data)
        }

        if (user.user) {
            getProfile()
        }
    }, [])

    const fetchScore = async () => {

        try {
          const response = await axios.post('http://localhost:3000/submit-paper', {
                content: article,
            }, {
                headers: {
                    authorization: user.jwt
                }
            }); // {score: "Example", remaining_token: 1}
          setScore(response.data.score);    
            // Create a new user object with updated remaining_tokens
            const updatedUser = {
            ...user, // spread the existing user object to copy all its properties
            user: {
                ...user.user,
                remaining_tokens: response.data.remaining_token // update the remaining_tokens property
            }
        };

        // Set the updated user object in the state
            setUser(updatedUser);


        } catch (error) {
          console.error("Error fetching data: ", error);
        }
    };
// how to pass value to a post request : after endpoint,{passing in object}

    const fetchContent = async () => {
        try {
          const response = await axios.post('http://localhost:3000/improve', {
            content: article,
          }, {
            headers: {
                authorization: user.jwt
            }
          }); // {content: "Example", remaining_token: 0}
          setImprovedContent(response.data.content); 
          const updatedUser = {
            ...user, // spread the existing user object to copy all its properties
            user: {
                ...user.user,
                remaining_tokens: response.data.remaining_token // update the remaining_tokens property
            }
        };
        setUser(updatedUser);
        // {content: "Renewed Content"}
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
    };
  
    const limitWord = async (event) =>{
        const text = event.target.value;

        wordCount.current = countWords(text);

        if (wordCount.current >= 500) { // 0 [ABC123]
            setArticleLimitError(true)
        } else {
            setarticle(text);
            setArticleLimitError(false);
        }

    }
    
    function countWords(str) {

        // Remove leading and trailing spaces, then split the string into words based on spaces
        const words = str.trim().split(/\s+/);
      
        // Filter out any empty strings that might result from consecutive spaces
        const filteredWords = words.filter(word => word.length > 0);

        // The length of the filtered array is the word count
        return filteredWords.length;
    }

    
    const navigate = useNavigate(); 
        
    useEffect(() => {
        if (!user.user) {
            navigate('/login');
        }
    }, [navigate, user.user])

    return (
        <div className="flex flex-col my-20 w-96 md:w-[700px] mx-auto gap-5">
            <div className='flex gap-1 justify-center'>
                <span className='text-base xl:text-lg text-[#F4A5A1] font-[Inter] font-bold text-center'>{user?.user?.remaining_tokens}</span>
                <p className='text-base xl:text-lg text-white font-[Inter]'>token remaining today!</p>  
            </div>

            <div>
                <h1 className='text-base xl:text-lg text-white font-[Inter] mb-3'>Step One - Paste Your Article </h1> 
                <textarea className="w-full rounded-lg shadow-md shadow-white" rows="9" onChange={(event)=>limitWord(event)}></textarea>
                <div className='text-xs text-gray-300 text-right'>{`wordcount:${wordCount.current}`}</div>
                {articleLimitError && (
                    <div className='bg-red-500 text-red-50 p-2 rounded-lg text-sm text-center'>You have reached the word-count limit!</div>
                )}
            </div>

            <div className='flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
                <h1 className='text-base xl:text-lg text-white font-[Inter] text-left'>Step Two </h1>
                <button className='text-black font-[Inter] text-xs xl:text-lg rounded-lg bg-white w-[60%] p-2 text-center' onClick={() => fetchScore()}>Check My Score</button>
            </div>
                {score && (
                    <div className='text-base xl:text-lg text-white font-[Inter] text-center'>Current Result: <span className='text-base xl:text-lg text-[#F4A5A1] font-[Inter] font-bold text-center'>{score}!</span></div>
                ) }
            </div>
            
            {score && (
            <>
                <div>
                <div className='flex justify-between items-center'>
                    <h1 className='text-base xl:text-lg text-white font-[Inter] text-left'>Step Three</h1>
                    <button className="'text-black font-[Inter] text-xs xl:text-lg rounded-lg  w-[60%] bg-white p-2 text-center"onClick={() =>fetchContent()}>Help me improve!</button>
                </div>
                </div>

                <div className='text-center'>
                    {improvedContent && (
                        <div className='text-base xl:text-lg text-white font-[Inter] text-center'>{`Revised according to the TOEFL Grading Rubrics: ${improvedContent}`}</div>
                    ) }
                    </div>
                
                
            </>
            ) }
        </div>
    )
}

export default ToeflGrader;