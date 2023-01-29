import { Link } from "@remix-run/react";
import { useUserStore } from "~/store/user";
import { CategoryImg } from "../miscellaneous/img";



export default function Navbar() {
  const _useUserStore: any = useUserStore();

  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
          <span className="text-white">
            <i className="fa-solid fa-bars"></i>
          </span>
          <span className="capitalize ml-2 text-white">All Categories</span>

          {/*  */}
          <div
            className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
              <CategoryImg />
              <span className="ml-6 text-gray-600 text-sm">Sofa</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
              <CategoryImg />
              <span className="ml-6 text-gray-600 text-sm">Terarce</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
              <CategoryImg />
              <span className="ml-6 text-gray-600 text-sm">Bed</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
              <CategoryImg />
              <span className="ml-6 text-gray-600 text-sm">office</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
              <CategoryImg />
              <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
              <CategoryImg />
              <span className="ml-6 text-gray-600 text-sm">Mattress</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between flex-grow pl-12">
          <div className="flex items-center space-x-6 capitalize">
            <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>
            {_useUserStore?.udata?.uType === 'customer' &&
              <Link to="/shop" className="text-gray-200 hover:text-white transition">Shop</Link>
            }

            {_useUserStore?.udata?.uType === 'farmer' &&
              <>
                <Link to="/farmer/add-product" className="text-gray-200 hover:text-white transition">Add Product</Link>
                <Link to="/farmer/your-products" className="text-gray-200 hover:text-white transition">Your Products</Link>
              </>
            }

            <Link to="#" className="text-gray-200 hover:text-white transition">About us</Link>
            <Link to="#" className="text-gray-200 hover:text-white transition">Contact us</Link>
          </div>
          {!_useUserStore.state && <Link to="/auth/signin" className="text-gray-200 hover:text-white transition">Login/Register</Link>}
        </div>
      </div>
    </nav>
  );
}