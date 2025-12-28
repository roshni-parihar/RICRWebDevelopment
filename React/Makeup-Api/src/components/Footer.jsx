import React from "react";
import { Link } from "react-router-dom";
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";

const Footer = () => {
  return (
    <>
      {" "}
      <footer
        className="bg-rose-300  
       border-t border-rose-400" 
      >
        <div className="grid grid-cols-4  gap-12 mb-10 p-5">
          <div className="me-3.5">
            <h3 className="text-2xl">AURA</h3>
            <p className="text-sm text-neutral-600">For the modern woman.</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-full hover:bg-rose-100  text-neutral-600 hover:text-rose-600"
                aria-label="Instagram"
              >
                <TiSocialInstagram  />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-rose-100  text-neutral-600 hover:text-rose-600"
                aria-label="Facebook"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-rose-100  text-neutral-600 hover:text-rose-600"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="mailto:hello@aurabeauty.com"
                className="p-2 rounded-full hover:bg-rose-100  text-neutral-600 hover:text-rose-600"
                aria-label="Email"
              >
                <TbMailFilled />
              </a>
            </div>
          </div>

          <div>
            <h4 className=" mb-4 text-neutral-900">Shop</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link to="/products" className="hover:text-rose-600 ">
                  All Products
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600">
                  Gift Sets
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className=" mb-4 text-neutral-900 ">Company</h4>
            <ul className=" text-sm text-neutral-600">
              <li>
                <Link to="/about" className="hover:text-rose-600 ">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rose-600 ">
                  Contact
                </Link>
              </li>
             
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-neutral-900">Support</h4>
            <ul className=" text-sm text-neutral-600">
              <li>
                <a href="#" className="hover:text-rose-600 ">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600 ">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600 ">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-rose-200 flex flex-col justify-between items-center gap-4 text-sm text-neutral-700 ">
          <p>© 2024 AURA Beauty. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-rose-600 ">
              Terms
            </a>
            <a href="#" className="hover:text-rose-600">
              Privacy
            </a>
            <a href="#" className="hover:text-rose-600 ">
              Cookies
            </a>
          </div>
        </div>
      </footer>
      ;
    </>
  );
};

export default Footer;
