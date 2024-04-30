import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus,faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// const AboutUs = () => {
    
//     const[showAnswer1,setshowAnswer1]= useState(false)
//     const[showAnswer2,setshowAnswer2]= useState(false)
//     const[showAnswer3,setshowAnswer3]= useState(false)
//     const[showAnswer4,setshowAnswer4]= useState(false)

//     const toggle1 = () => {
//         setshowAnswer1(!showAnswer1);
//       };

//     const toggle2 = () => {
//         setshowAnswer2(!showAnswer2);
//         };
    
//     const toggle3 = () => {
//         setshowAnswer3(!showAnswer3);
//         };

//     const toggle4 = () => {
//         setshowAnswer4(!showAnswer4);
//         };

//     return (
//         <div className="flex flex-col gap-5 mt-7 mx-5">
//         <div className='flex flex-col gap-2'>
//             <div className="bg-[#E3FEF7] rounded-lg flex justify-between items-center p-3 bg-opacity-90">
//                 <p>What is the main service provided by your website?</p>
//             {showAnswer1 ? (
//                 <FontAwesomeIcon icon={faSquareMinus} onClick={toggle1}/>)
//                 :( <FontAwesomeIcon icon={faSquarePlus} onClick={toggle1}/>
//                 )}
//             </div>
            
//             {showAnswer1 && (
//             <div className="bg-[#77B0AA] rounded-lg bg-opacity-90 text-sm p-3">
//                 <p>Our website specializes in offering an article polishing service tailored specifically for TOEFL examiners. We aim to enhance the quality, coherence, and readability of their assessments and feedback, ensuring they meet high academic standards.</p>
//             </div>)}
//         </div>

//         <div className='flex flex-col gap-2'>
//             <div className="bg-[#E3FEF7] rounded-lg flex justify-between items-center p-3 bg-opacity-90">
//                 <p>What is the main service provided by your website?</p>
//                 {showAnswer2? (
//                 <FontAwesomeIcon icon={faSquareMinus} onClick={toggle2}/>)
//                 :( <FontAwesomeIcon icon={faSquarePlus} onClick={toggle2}/>
//                 )}
//             </div>
            
//             {showAnswer2 && (
//             <div className="bg-[#77B0AA] rounded-lg bg-opacity-90 text-sm p-3">
//                 <p>Our website specializes in offering an article polishing service tailored specifically for TOEFL examiners. We aim to enhance the quality, coherence, and readability of their assessments and feedback, ensuring they meet high academic standards.</p>
//             </div>)}
//         </div>

//         <div className='flex flex-col gap-2'>
//             <div className="bg-[#E3FEF7] rounded-lg flex justify-between items-center p-3 bg-opacity-90">
//                 <p>What is the main service provided by your website?</p>
//                 {showAnswer3 ? (
//                 <FontAwesomeIcon icon={faSquareMinus} onClick={toggle3}/>)
//                 :( <FontAwesomeIcon icon={faSquarePlus} onClick={toggle3}/>
//                 )}
//             </div>
            
//             {showAnswer3 && (
//             <div className="bg-[#77B0AA] rounded-lg bg-opacity-90 text-sm p-3">
//                 <p>Our website specializes in offering an article polishing service tailored specifically for TOEFL examiners. We aim to enhance the quality, coherence, and readability of their assessments and feedback, ensuring they meet high academic standards.</p>
//             </div>)}
//         </div>

//         <div className='flex flex-col gap-2'>
//             <div className="bg-[#E3FEF7] rounded-lg flex justify-between items-center p-3 bg-opacity-90">
//                 <p>What is the main service provided by your website?</p>
//                 {showAnswer4 ? (
//                 <FontAwesomeIcon icon={faSquareMinus} onClick={toggle4}/>)
//                 :( <FontAwesomeIcon icon={faSquarePlus} onClick={toggle4}/>
//                 )}
//             </div>
            
//             {showAnswer4 && (
//             <div className="bg-[#77B0AA] rounded-lg bg-opacity-90 text-sm p-3">
//                 <p>Our website specializes in offering an article polishing service tailored specifically for TOEFL examiners. We aim to enhance the quality, coherence, and readability of their assessments and feedback, ensuring they meet high academic standards.</p>
//             </div>)}
//         </div>
//         </div>
//     )
// }

const questions = [
    {
        question: 'What is the main service provided by your website?',
        answer: 'Our website specializes in offering an article polishing service tailored specifically for TOEFL examiners. We aim to enhance the quality, coherence, and readability of their assessments and feedback, ensuring they meet high academic standards.',
        show: false,
    },
    {
        question: 'What is the main service provided by your website?',
        answer: 'Our website specializes in offering an article polishing service tailored specifically for TOEFL examiners. We aim to enhance the quality, coherence, and readability of their assessments and feedback, ensuring they meet high academic standards.',
        show: false,
    },
    {
        question: 'What is the main service provided by your website?',
        answer: 'Our website specializes in offering an article polishing service tailored specifically for TOEFL examiners. We aim to enhance the quality, coherence, and readability of their assessments and feedback, ensuring they meet high academic standards.',
        show: false,
    },
    {
        question: 'What is the main service provided by your website?',
        answer: 'Our website specializes in offering an article polishing service tailored specifically for TOEFL examiners. We aim to enhance the quality, coherence, and readability of their assessments and feedback, ensuring they meet high academic standards.',
        show: false,
    },
]

const AboutUs = () => {

    const [QA, setQA] = useState(questions);

    const handleVisibility = (index) => {
        const allItems = [...QA];
        allItems[index] = {
            ...allItems[index],
            show: !allItems[index].show
        } 
    // create a updated object
        setQA(allItems);
    }
    
    return (
        <div className="flex flex-col gap-5 mt-7 mx-5">
            {QA.map((item, index) => (
                <div key={index} className='flex flex-col gap-2'>
                    <div className="bg-[#E3FEF7] rounded-lg flex justify-between items-center p-3 bg-opacity-90">
                        <p>{item.question}</p>
                        
                        {item.show ? (
                            <FontAwesomeIcon icon={faSquareMinus} onClick={() => handleVisibility(index)}/>
                        ) : (
                            <FontAwesomeIcon icon={faSquarePlus} onClick={() => handleVisibility(index)}/>
                        )}
                    </div>
                    {item.show && (
                        <div className="bg-[#77B0AA] rounded-lg bg-opacity-90 text-sm p-3">
                            <p>{item.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}


export default AboutUs;

// {{quesiton:dddd, answer:dddd, show_answer:true},
// {quesiton:dddd, answer:dddd, show_answer:true},
// {quesiton:dddd, answer:dddd, show_answer:true}}

// if show_answer = true