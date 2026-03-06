import Link from "next/link";
import React from "react";
import menu_data from "./menu-data";

const NavMenu = () => {
  return (
    <>
      <ul>
        {menu_data.map((menu_item, i) => (
          <li key={i}>
            <Link href={menu_item.link}>{menu_item.title}</Link>
          
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;
