import { useNavigate } from "@remix-run/react";
import { supabase } from "~/lib/supabase";
import { useUserStore } from "~/store/user";
import { UserImg } from "./img";

export default function SideNav(props) {
  const { uData } = props;
  const _useUserStore: any = useUserStore();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const {data, error} =  await supabase.auth.signOut().catch(console.error);
      console.log('data :: error :: ', data, error);
      if(!error) {
        localStorage.removeItem('uid_zone')
        localStorage.removeItem('utype_zone')
        _useUserStore.setData({
          state: false,
          udata: null
        })
        navigate('/auth/signin')
      }
    } catch (error) {
      console.log('error :: ', error);
    }
  }

  return (
    <div className="col-span-3">
      <div className="px-4 py-3 shadow flex items-center gap-4">
        <div className="flex-shrink-0">
          <UserImg  />
        </div>
        <div className="flex-grow">
          <p className="text-gray-600">Hello,</p>
          <h4 className="text-gray-800 font-medium">{uData.name}</h4>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
        <div className="space-y-1 pl-8">
          <a href="#" className="relative text-primary block font-medium capitalize transition">
            <span className="absolute -left-8 top-0 text-base">
              <i className="fa-regular fa-address-card"></i>
            </span>
            Manage account
          </a>
          <a href="#" className="relative hover:text-primary block capitalize transition">
            Profile information
          </a>
          <a href="#" className="relative hover:text-primary block capitalize transition">
            Manage addresses (Coming soon)
          </a>
          <a href="#" className="relative hover:text-primary block capitalize transition">
            Change password (Coming soon)
          </a>
        </div>

        <div className="space-y-1 pl-8 pt-4">
          <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
            <span className="absolute -left-8 top-0 text-base">
              <i className="fa-solid fa-box-archive"></i>
            </span>
            My order history
          </a>
          <a href="#" className="relative hover:text-primary block capitalize transition">
            My returns
          </a>
          <a href="#" className="relative hover:text-primary block capitalize transition">
            My Cancellations
          </a>
          <a href="#" className="relative hover:text-primary block capitalize transition">
            My reviews (Coming soon)
          </a>
        </div>

        <div className="space-y-1 pl-8 pt-4">
          <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
            <span className="absolute -left-8 top-0 text-base">
              <i className="fa-regular fa-credit-card"></i>
            </span>
            Payment methods
          </a>
          <a href="#" className="relative hover:text-primary block capitalize transition">
            voucher (Coming soon)
          </a>
        </div>

        {uData.uType === 'farmer' &&
          <div className="space-y-1 pl-8 pt-4">
            <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
              <span className="absolute -left-8 top-0 text-base">
                <i className="fa-regular fa-heart"></i>
              </span>
              My wishlist
            </a>
          </div>
        }

        <div className="space-y-1 pl-8 pt-4">
          <button onClick={logoutHandler} className="text-red-500 font-bold bg-red-100 px-10 py-2 rounded-md relative hover:text-primary block capitalize transition">
            <span className="absolute -left-8 top-0 text-base">
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
            Logout
          </button>
        </div>

      </div>
    </div>

  )
}