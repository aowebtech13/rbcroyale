import PriceDotLine from "@/src/svg/price-dot-line";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import PriceList from "@/src/svg/price-list";
import { apiFetch } from "@/src/utils/api-client";


const price_content = {
    title: "Partner with our successful traders today",
    sub_title: "Choose a plan tailored to your needs",
    save_btn: <> EARN <br /> 70%</>
}
const {title, sub_title, save_btn}  = price_content


const PriceArea = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await apiFetch('/investment-plans');
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <>
      <div className="tp-price__area tp-price__pl-pr p-relative pt-110 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 wow tpfadeUp" data-wow-duration=".9s" data-wow-delay=".3s" >
              <div className="tp-price__section-box text-center mb-35">
                <h2 className="tp-section-title">{title}</h2>
                <p>{sub_title}</p>
              </div>
            </div>
          </div>

          <div
            className="row wow tpfadeUp"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
          >
            <div className="col-12">
              <div className="tp-price__btn-box p-relative mb-50 d-flex justify-content-center">
                <div className="tp-price-offer-badge-wrap d-none d-sm-block">
                  <div className="price-shape-line">
                    <PriceDotLine />
                  </div>
                  <div className="price-offer-badge">
                    <span>{save_btn}</span>
                  </div>
                </div>
                <nav>
                  <div
                    className="nav nav-tab tp-price__btn-bg"
                    id="nav-tab"
                    role="tablist"
                  >
                    <button 
                      className="nav-link active monthly" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                      type="button" role="tab" aria-controls="nav-home" aria-selected="true" tabIndex={-1}>
                    Partner
                    </button>
                    <span className="test"></span>
                  </div>
                </nav>
              </div>
            </div>
          </div>

          <div className="price-tab-content">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0" >
                <div className="row">
                  {loading ? (
                    <div className="col-12 text-center">
                      <p>Loading plans...</p>
                    </div>
                  ) : (
                    plans.map((plan, i) => (
                      <div key={plan.id} className="col-xl-3 col-lg-6 col-md-6 mb-30">
                        <div className={`tp-price__item p-relative ${i === 1 ? 'active' : ''} ${plan.name.toLowerCase().includes('leximan') || plan.name.toLowerCase().includes('xman') ? 'leximan-xman' : ''}`}>
                          <div className="tp-price__title-box">
                            <h4 className="tp-price__title-sm">{plan.name}</h4>
                            <p>{plan.description}</p>
                          </div>
                          <div className="tp-price__feature">
                            <ul>
                              <li>
                                <span><PriceList /></span>
                                70:30 Int share
                              </li>
                              <li>
                                <span><PriceList /></span>
                                Min: ${plan.min_amount.toLocaleString()}
                              </li>
                              <li>
                                <span><PriceList /></span>
                                Max: {plan.max_amount === 1000000 ? 'Unlimited' : '$' + plan.max_amount.toLocaleString()}
                              </li>
                              <li>
                                <span><PriceList /></span>
                                Duration: {plan.duration_days} days
                              </li>
                            </ul>
                          </div>
                          <div className="tp-price__btn tp-btn-price">
                            <span>Subscribe </span>
                            <Link href={`/invest/${plan.id}`}>
                              Purchase Now <i className="fal fa-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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
