import PriceList from "../svg/price-list"

import pric_img_1 from "../../public/assets/img/price/price-icon-1.png";
import pric_img_2 from "../../public/assets/img/price/price-icon-2.png";
import pric_img_3 from "../../public/assets/img/price/price-icon-3.png";

const price_data_home_one = [
    {
        id: 1, 
        img: pric_img_1,
        title: "Doveman",
        desctiption: <>Perfect for beginners starting their journey.</>,
        cls: "",
        pric: "50",
        price_feature: [
            {
                list: "1.0% Daily ROI",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Minimum: $50",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Maximum: $50",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Email Support",
                icon: <PriceList />,
                cls: ""
            }
        ],
    }, 
    {
        id: 2, 
        img: pric_img_2,
        title: "Mr Roy",
        desctiption: <>For serious investors looking for stable returns.</>,
        cls: "active",
        pric: "100",
        price_feature: [
            {
                list: "1.5% Daily ROI",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Minimum: $100",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Maximum: $100",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Priority Support",
                icon: <PriceList />,
                cls: ""
            }
        ],
    }, 
    {
        id: 3, 
        img: pric_img_3,
        title: "Leximan",
        desctiption: <>Premium returns for dedicated partners.</>,
        cls: "",
        pric: "300",
        price_feature: [
            {
                list: "2.0% Daily ROI",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Minimum: $300",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Maximum: $300",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Dedicated Manager",
                icon: <PriceList />,
                cls: ""
            }
        ],
    },
    {
        id: 4, 
        img: pric_img_1, // Reusing icon
        title: "Xman",
        desctiption: <>Exclusive elite plan for top-tier partners.</>,
        cls: "",
        pric: "500",
        price_feature: [
            {
                list: "3.0% Daily ROI",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Minimum: $500",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Maximum: $500",
                icon: <PriceList />,
                cls: ""
            },
            {
                list: "Elite Support",
                icon: <PriceList />,
                cls: ""
            }
        ],
    },
]
export default price_data_home_one