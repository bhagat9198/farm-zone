import { useActionData, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { UserImg } from "~/components/miscellaneous/img";
import SideNav from "~/components/miscellaneous/sideNav";
import SideNave from "~/components/miscellaneous/sideNav";
import { getUserDetails } from "~/lib/user.server";
import { useUserStore } from "~/store/user";



export default function Profile() {
  let userData = useLoaderData();
  const _useUserStore: any = useUserStore();
  const navigate = useNavigate();

  const submit = useSubmit();


  useEffect(() => {
    console.log('userData :: ', userData);

    // if (_useUserStore.state === userData.status) return;

    if (userData.status) {
      _useUserStore?.setData({
        state: true,
        udata: { ...userData.data, uType: 'farmer' }
      })
      localStorage.setItem('uid_zone', userData.data.uid)
      localStorage.setItem('utype_zone', 'farmer')
    } else {
      _useUserStore?.setData({
        state: false,
        udata: null
      })
      localStorage.removeItem('uid_zone')
      localStorage.removeItem('utype_zone')
    }

  }, [userData.status])

  if (!userData.status) {
    return (
      <div className="container w-full text-center items-start p-16">
        <p className="text-2xl text-red-400" > {userData.msg} </p>
      </div>
    )
  }

  return (
    <>
      <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        <SideNav uData={{ ...userData, uType: 'farmer' }} />

        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7">
          <div>
            <h4 className="text-lg font-medium capitalize mb-4">
              Profile information
            </h4>
            <div>
              <label className="mr-4" htmlFor="first">First name</label>
              <input type="text" name="first" id="first" className="font-semibold input-box w-full" value={_useUserStore.udata.name} readOnly />
            </div>

            <div className="w-full my-4">
              <label className="mr-4" htmlFor="email">Email Address</label>
              <input type="email" name="email" id="email" className="font-semibold w-full" value={_useUserStore.udata.email} readOnly />
            </div>
          </div>


          <div>
            <div className="mt-10 mb-5" >
              <h4 className="text-lg font-medium capitalize mb-4">
                Orders information
              </h4>

              {userData && userData?.data?.orders && userData?.data?.orders.map(_o => (
                <div className="flex justify-center items-center" >
                  <div className="shadow rounded bg-white px-4 pt-6 pb-8 my-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-800 text-lg">Order Id: ${_o.uid}</h3>
                      <a href="#" className="text-primary">Edit</a>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-gray-700 font-medium">Total Cost : {_o.cost}</h4>
                      <p className="text-gray-800">Quantity : {_o.qty}</p>
                      <p className="text-gray-800">Product : {_o.productId}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-gray-700 font-medium">{_o.address}</h4>
                      <p className="text-gray-800">{_o.city}</p>
                      <p className="text-gray-800">{_o.state}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-gray-700 font-medium">Delivery Date : {new Date(_o.order_deliver_date).toLocaleDateString()}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export async function loader({ params }) {
  console.log('LOADER :: ', params);
  const uid = params.uid;
  const res = await getUserDetails(uid, 'farmer');
  if (!res.status) {
    return res
  }

  return {
    status: true,
    data: res.data
  }


}