import hero from "../assets/hero.svg";
import { Link } from "react-router-dom"

// components/assets/hero.svg

const MainPageInfoComponent = () => {
    
    return(
    <>
        <div className="grid w-[90%] mx-auto md:grid-cols-2 h-[calc(100vh-96px)] gap-10">
            <div className="col-span-1 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl uppercase text-white font-[Inter]">
                <i className="fas fa-rocket text-center mr-1"></i> Elevate Your TOEFL Score with Instant AI Feedback 
                </h1>

                <p className="text-base xl:text-lg text-white font-[Inter] mt-5">
                Experience rapid improvement in TOEFL writing and boost your learning efficiency.
                </p>

                <Link to="/toefl-grader" className="text-xs xl:text-lg rounded-lg bg-white mt-5 w-[60%] p-2 text-center">
                Try It Now !
                </Link>
            </div>
            <div className="col-span-1 relative flex items-center">
                <img src={hero} className="absolute"></img>
            </div>
        </div>
    </>
 )
}

export default MainPageInfoComponent;