import testimonial_data from '@/src/data/testimonial-data';
import testimonial_svg from '@/src/data/testimonial-svg';
import RightArrow from '@/src/svg/right-arrow';
import StartTwo from '@/src/svg/start-2';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React,{useState, useEffect, useRef} from 'react';
import Slider from 'react-slick'; 


const tp_setting = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false, 
}

const brands_setting  = {	
    slidesToShow: 5,
    slidesToScroll: 1, 
    dots: false,
    arrows: false,
    focusOnSelect: true,
    centerPadding: '0',
    centerMode: true,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                slidesToShow: 1,
            }
        }
        
    ]
}

const TestimonialArea = () => { 
   const sliderRef = useRef(null)
   const [slider1, setSlider1] = useState(null);
   const [slider2, setSlider2] = useState(null);
   
   let g_title = new gsap.timeline(); 
   let title_anim = useRef(null)        
    useEffect(() => {   
        g_title.from(title_anim.current, {  
            duration: 1, 
            delay: 0.3, 
            opacity: 0, 
            rotationX: -60, 
            force3D: true, 
            transformOrigin: "top center -50", 
            stagger: 0.2             
        }); 
    });


    return (
        <>
                  
        </>
    );
};

export default TestimonialArea;