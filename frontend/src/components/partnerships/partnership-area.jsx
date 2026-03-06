import Link from "next/link";
import React, { useState, useEffect } from "react";
import { apiFetch } from "@/src/utils/api-client";

const partnership_content = {
    title: "Our Partnership Programs",
    sub_title: "Join our exclusive partnership network and grow together",
}
const { title, sub_title } = partnership_content;

const PartnershipArea = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerships = async () => {
      try {
        const data = await apiFetch('/partnerships');
        setPartnerships(data);
      } catch (error) {
        console.error('Error fetching partnerships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerships();
  }, []);

  return (
    <div className="tp-partnership__area tp-partnership__pl-pr p-relative pt-110 pb-80">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 wow tpfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
            <div className="tp-partnership__section-box text-center mb-50">
              <h2 className="tp-section-title">{title}</h2>
              <p>{sub_title}</p>
            </div>
          </div>
        </div>

        <div className="row gx-40">
          {loading ? (
            <div className="col-12 text-center">
              <p>Loading partnerships...</p>
            </div>
          ) : (
            partnerships.map((partnership, i) => (
              <div key={partnership.id} className="col-xl-3 col-lg-6 col-md-6 mb-40 wow tpfadeUp" data-wow-duration=".9s" data-wow-delay={`${0.5 + i * 0.2}s`}>
                <div className="tp-partnership__item p-relative h-100">
                  <div className="tp-partnership__item-header mb-20">
                    <h4 className="tp-partnership__title">{partnership.name}</h4>
                    <div className="tp-partnership__amount">
                      <span className="amount">${partnership.amount.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="tp-partnership__description mb-25">{partnership.description}</p>

                  {partnership.benefits && partnership.benefits.length > 0 && (
                    <div className="tp-partnership__benefits mb-30">
                      <h6 className="tp-partnership__benefits-title mb-15">Benefits:</h6>
                      <ul className="tp-partnership__benefits-list">
                        {partnership.benefits.map((benefit, idx) => (
                          <li key={idx} className="mb-10">
                            <i className="fas fa-check-circle me-2" style={{color: '#7c3aed'}}></i>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="tp-partnership__btn">
                    <Link href="/register" className="tp-btn-purple tp-btn-hover">
                      Join Now <i className="fal fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnershipArea;
