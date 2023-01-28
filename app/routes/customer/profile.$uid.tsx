import { useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { UserImg } from "~/components/miscellaneous/img";
import SideNav from "~/components/miscellaneous/sideNav";
import { getUserDetails } from "~/lib/user.server";
import { useUserStore } from "~/store/user";



export default function Profile() {
  const _useUserStore: any = useUserStore();
  // const { setData, state, udata } = _useUserStore;

  let userData = useLoaderData();
  if (!userData.status) {
    return (
      <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        <p className="text-2xl text-red-400" > {userData.msg} </p>
      </div>
    )
  } else {
    userData = userData.data;
  }

  useEffect(() => {
    if (_useUserStore.state === userData.status) return;

    if (userData.status) {
      _useUserStore?.setData({
        state: true,
        udata: { ...userData, uType: 'customer' }
      })
    } else {
      _useUserStore?.setData({
        state: false,
        udata: null
      })
    }

  }, [userData.status])

  return (
    <>
      <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        <SideNav uData={{ ...userData, uType: 'customer' }} />

        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7">
          <h4 className="text-lg font-medium capitalize mb-4">
            Profile information
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first">First name</label>
                <input type="text" name="first" id="first" className="input-box" />
              </div>
              <div>
                <label htmlFor="last">Last name</label>
                <input type="text" name="last" id="last" className="input-box" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="birthday">Birthday</label>
                <input type="date" name="birthday" id="birthday" className="input-box" />
              </div>
              <div>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" className="input-box">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" className="input-box" />
              </div>
              <div>
                <label htmlFor="phone">Phone number</label>
                <input type="text" name="phone" id="phone" className="input-box" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button type="submit"
              className="py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">save
              changes</button>
          </div>
        </div>

      </div>
    </>
  )
}

export async function loader({ params }) {
  console.log(' LOADER :: ', params);
  const uid = params.uid;
  const res = await getUserDetails(uid, 'customer');
  if (!res.status) {
    return res
  }

  return {
    status: true,
    data: res.data
  }
}