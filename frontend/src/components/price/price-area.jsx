import NoticeTwo from '@/src/svg/notice-2';
import React, { useEffect, useState } from 'react';

import header_img from "../../../public/assets/img/price/price-4.1.png";
import Image from 'next/image';
import Link from 'next/link';
import api from '@/src/utils/api';

const PriceArea = () => {
   const [plans, setPlans] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchPlans = async () => {
         try {
            const { data } = await api.get('investment-plans');
            setPlans(data);
         } catch (error) {
            console.error("Error fetching plans:", error);
         } finally {
            setLoading(false);
         }
      };
      fetchPlans();
   }, []);

   const header_text = <>Choose your <span>Investment Plan</span> and <br /> start growing your <span>wealth</span></>;

   if (loading) return <div>Loading plans...</div>;

   return (
      <>
         <div className="tp-price-area mb-120">
            <div className="container">
               <div className="price-tab-content">
                  <div className="tab-content" id="nav-tabContent">

                     <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                        <div className="tp-price-table price-inner-white-bg z-index-3">
                           <div className="tp-price-table-wrapper">
                              <div className="row g-0 align-items-center">
                                 <div className="col-4">
                                    <div className="tp-price-header">
                                       <div className="tp-price-header-img">
                                          <Image src={header_img} alt="theme-pure" />
                                       </div>
                                       <div className="tp-price-header-content">
                                          <p>{header_text}</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-8">
                                    <div className="tp-price-top-wrapper">
                                       {plans.map((item, i) =>
                                          <div key={i} className={`tp-price-top-item text-center ${i === 1 ? 'active' : ''}`}>
                                             <div className="tp-price-top-tag-wrapper">
                                                <span>{item.name}</span>
                                                <p>{item.description}</p>
                                             </div>
                                             <div className="tp-price-top-title-wrapper">
                                             
                                                <div className="mb-15">
                                                   <p className="mb-0"><strong>Min:</strong> ${item.min_amount}</p>
                                                   <p className="mb-0"><strong>Max:</strong> ${item.max_amount}</p>
                                                   <p className="mb-0"><strong>Duration:</strong> {item.duration_days} Days</p>
                                                </div>
                                                <Link className="tp-btn-service" href="/available-plans">Join Batch</Link>
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default PriceArea;