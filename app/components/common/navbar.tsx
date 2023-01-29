import { Link } from "@remix-run/react";
import { useUserStore } from "~/store/user";
import { CategoryImg } from "../miscellaneous/img";



export default function Navbar() {
  const _useUserStore: any = useUserStore();

  return (
    <nav className="bg-gray-800">
      <div className="container flex">


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