import React from "react";

export function Advertisement() {
   return (
      <div className="ads-STORE-frame">
         <video
            className={"ads-video"}
            autoPlay={true}
            loop
            muted
            playsInline
            data-video-media=""
            >
               <source type="video/mp4" src="video/phoneshop.mp4" />
            </video>
      </div>
   );
}