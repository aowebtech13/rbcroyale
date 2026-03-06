import RightArrow from '@/src/svg/right-arrow';
import Link from 'next/link';
import Image from 'next/image';
import React, { useRef } from 'react';
import useTitleAnimation from "@/src/hooks/useTitleAnimation";  

// icon import 
import icon_1 from "../../../../public/assets/img/feature/fea-icon-1.png";
import icon_2 from "../../../../public/assets/img/feature/fea-icon-2.png";
import icon_3 from "../../../../public/assets/img/feature/fea-icon-3.png";
import feature_bottom_shape from "../../../../public/assets/img/feature/fea-bg-shape-1.png";

// feature data
const feature_data = [
   {
      id: 1,
      img: icon_1,
      title: <>A Unified View of The Customer</>,
      delay: ".4s",
   },
   {
      id: 2,
      img: icon_2,
      title: <>Industry Leading Procedures</>,
      delay: ".6s",
   },
   {
      id: 3,
      img: icon_3,
      title: <>Collaboration Across <br /> All Areas</>,
      delay: ".8s",
   },
]

// feature content
const feature_content = {
   title: "Our Exciting Features",
   sub_title: "More than 15,000 companies trust and choose Itech",
}
const { title, sub_title } = feature_content

const FeatureArea = () => {
   let titleRef = useRef(null)
   useTitleAnimation(titleRef)

   return (
      <>
        

      </>
   );
};

export default FeatureArea;