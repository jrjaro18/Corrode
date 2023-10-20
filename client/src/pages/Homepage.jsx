import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import '../App.css'
{/* 
<Typewriter
  options={{
    strings: ['Hello', 'World'],
    autoStart: true,
    loop: true,
  }}
/> */}

const Homepage = () => {
  const strings = ['Used by Democrats . . . ', 'Used by Republicans . . . ', 'Used by Independents . . . ', 'Used by ISIS . . . ', 'Start Using Now . . . ']
  return (
    <div id="page" className="bg-[#090909] min-h-[100vh]">
      <div id="left" className="left-0 w-3/12 h-full absolute bg-gray-100 overflow-y-auto">
        <div className="flex items-center justify-center mt-9 flex-col">
          <div className="flex items-center">
            <a href='http://localhost:5173' id='left_title_name' className="text-gray-950 tracking-wider font-extralight text-[4vw] hover:text-[3.9vw] duration-200 focus:text-[4vw]">
              Corrodé
            </a>
          </div>
          <div id="typewriter_left_1" className="font-bold text-xs tracking-wider">
            <Typewriter
              options={{
                strings: strings,
                autoStart: true,
                loop: true,
                delay: 90,
                deleteSpeed: 50,
                pauseFor: 2000,
              }}
            />
          </div>
          <div className="p-3 tracking-wider leading-loose mt-5 text-justify">
            In the digital age, information has become the new weapon, wielding the power to shape opinions, influence decisions, and even spark revolutions. With data at our fingertips, the ability to harness and deploy information strategically can be as impactful as any traditional arsenal. Corrodé is a tool that allows you to do just that.
          </div>
        </div>
        <div className="p-3 tracking-wider leading-loose mt-5 text-end">
           a jrjaro18 product
        </div>
      </div>
      <div id="right" className="absolute right-0 bg-red-300 w-9/12 min-h-[100vh] px-10">
        <div className="text-white flex justify-center items-center min-h-[100vh]">
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In quibusdam
            perferendis perspiciatis reiciendis natus, quia voluptatem excepturi
            provident quis cumque rem numquam, nulla totam iure vel iusto sapiente
            exercitationem, neque doloremque ut esse quisquam error sequi! Et fuga
            natus repudiandae! Fuga ducimus minus cupiditate veritatis, debitis
            facere. Voluptatibus culpa minus corporis dolorum obcaecati est
            pariatur laborum maxime sed. Nulla, dignissimos molestias perspiciatis
            reprehenderit id recusandae. Animi, quisquam. Autem excepturi,
            laboriosam voluptates porro ipsum eaque deserunt qui commodi,
            explicabo animi, voluptate neque cum? Autem perspiciatis ullam quis
            eveniet minus cumque repellat hic, dolores dolore optio saepe
            voluptatem reiciendis consequatur ut repellendus dolorum! Obcaecati
            quidem soluta nemo enim dolorum eos itaque dicta, placeat error
            doloremque odit blanditiis. Soluta officiis excepturi voluptates
            provident eveniet illum amet vitae dolore, atque dolor inventore unde
            eaque perspiciatis quia nisi!
            <Typewriter
              options={{
                strings: ['Hello', 'World'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
