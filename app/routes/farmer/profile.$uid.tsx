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

  // useEffect(() => {
  //   if (_useUserStore.state) return;

  //   const uid = localStorage.getItem('uid_zone');
  //   if(!uid) {
  //     navigate('/auth/signin')
  //   }
  //   submit({uid}, { action: '/auth/is-valid-user', method: 'post'}, )

  // }, [_useUserStore.state])

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
          <h4 className="text-lg font-medium capitalize mb-4">
            Profile information
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mr-4" htmlFor="first">First name</label>
                <input type="text" name="first" id="first" className="font-semibold input-box" value={_useUserStore.udata.name} readOnly />
              </div>
              <div>
                <label className="mr-4" htmlFor="last">Last name</label>
                <input type="text" name="last" id="last" className="font-semibold input-box" value={_useUserStore.udata.name} readOnly />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mr-4" htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" className="font-semibold input-box" value={_useUserStore.udata.email} readOnly />
              </div>
              {/* <div>
                <label htmlFor="phone">Phone number</label>
                <input type="text" name="phone" id="phone" className="input-box" />
              </div> */}
            </div>
          </div>

          {/* <div className="mt-4">
            <button type="submit"
              className="py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">save
              changes</button>
          </div> */}
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

  return true;
}