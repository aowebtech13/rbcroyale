import React from 'react';

const PolicyArea = ({ title, content }) => {
    return (
        <div className="policy-area pt-120 pb-120">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="policy-wrapper bg-white shadow-lg p-50 rounded-24 border border-slate-100">
                            <h2 className="font-black text-32 mb-30 text-slate-900">{title}</h2>
                            <div className="policy-content text-slate-600 font-medium">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .rounded-24 { border-radius: 24px; }
                .p-50 { padding: 50px; }
                .text-32 { font-size: 32px; }
            `}</style>
        </div>
    );
};

export default PolicyArea;
