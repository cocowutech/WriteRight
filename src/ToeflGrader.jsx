import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ToeflGrader = () => {
    
    const[score,setScore] = useState(undefined); 
    const [improvedContent, setImprovedContent] = useState(undefined);
    const[userToken,setuserToken] = useState(undefined);
    const[article, setarticle] = useState(undefined);
    const wordCount = useRef(0); // 0 , [ABC123]
    const [articleLimitError, setArticleLimitError] = useState(false);
    
    const fetchScore = async () => {
        try {
          const response = await axios.post('http://localhost:3000/submit-paper'); // {score: "Example", remaining_token: 1}
          setScore(response.data.score);
          setuserToken(response.data.remaining_token)
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
    };

    const fetchContent = async () => {
        try {
          const response = await axios.post('http://localhost:3000/improve'); // {content: "Example", remaining_token: 0}
          setImprovedContent(response.data.content); // {content: "Renewed Content"}
          setuserToken(response.data.remaining_token)
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

    return (
        <div className="flex flex-col my-20 w-96 md:w-[700px] mx-auto gap-5">
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
                    <div className='text-base xl:text-lg text-white font-[Inter] text-center'>Your Current Score is <span className='text-base xl:text-lg text-[#F4A5A1] font-[Inter] font-bold text-center'>{score}!</span></div>
                ) }
            </div>
            
            {score && (
            <>
                <div>
                <div className='flex justify-between items-center'>
                    <h1 className='text-base xl:text-lg text-white font-[Inter] text-left'>Step Three</h1>
                    <button className="'text-black font-[Inter] text-xs xl:text-lg rounded-lg  w-[60%] bg-white p-2 text-center"onClick={() =>fetchContent()}>Improve Now!</button>
                </div>
                </div>

                <div className='text-center'>
                    {improvedContent && (
                        <div className='text-base xl:text-lg text-white font-[Inter] text-center'>{`Revised according to the TOEFL Grading Rubrics: ${improvedContent}`}</div>
                    ) }
                    </div>
                
                <div className='flex gap-1 justify-center'>
                    <span className='text-base xl:text-lg text-[#F4A5A1] font-[Inter] font-bold text-center'>{userToken}</span>
                    <p className='text-base xl:text-lg text-white font-[Inter]'>token remaining today!</p>  
                </div>
            </>
            ) }
        </div>
    )
}

export default ToeflGrader;