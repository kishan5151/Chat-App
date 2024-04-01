import React from "react";

const SidePage=()=>{
    return(
        <>
            {/* this contain logo and chat site name */}
            <div id="logocon">
                <img src="./images/toppng.com-free-speech-comment-chat-white-icon-1202x1164 (1).png" alt="logo" className=" logo text-center" />
                <h1 className="text-white">RK HOLA</h1>
            </div>

            {/* this contains public line */}
            <div className="quotes">
                <p>Share Your Smile With This World and Find Friends</p>
            </div>

            {/* extra logo for attraction */}
            <div id="logocon" className="attraction">
                <img src="./images/toppng.com-coffee-cup-tea-white-silhouette-icon-1146x1146.png" alt="logo" className=" img-fluid logo text-center" />
                <h1 className="text-white">Enjoy ..!</h1>
            </div>
        </>
    )
}

export default SidePage;