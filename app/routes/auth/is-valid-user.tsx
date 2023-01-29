import { useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { getUserDetails } from "~/lib/user.server";
import { useUserStore } from "~/store/user";

const IsUserValid = () => {
  const userData = useActionData();

  const navigate = useNavigate();
  
  const _useUserStore: any = useUserStore();
  console.log('_useUserStore :: ', _useUserStore);

  useEffect(() => {
    if (!_useUserStore || !userData) return;

    if (_useUserStore.status) return;

    console.log('userData :: ', userData);
    const utype_zone = localStorage.getItem('utype_zone');
    if (userData.status) {
      _useUserStore?.setData({
        state: true,
        udata: { ...userData.data, uType: utype_zone }
      })
      navigate(`/${utype_zone}/profile/${userData.data.uid}`)
      // console.log('location_zone :: ', location_zone);

      // if(location_zone) {
      //   return navigate(location_zone, {replace: true})
      // }
    }
    // else {
    //   setTimeout(() => {
    //     console.log('userData :: ', userData);
    //     return navigate('/auth/signin')
    //   }, 2000)
    // }
  }, [userData?.status])


  return <>
    <div>Hello</div>
  </>
}

export default IsUserValid;

export const loader = async () => {

  return true;
}

export const action = async (actionData) => {
  console.log('isValidUser :: actionData :: ', actionData);
  const formData = await actionData.request.formData();
  const values = Object.fromEntries(formData);
  console.log('isValidUser :: values :: ', values);

  const dbRes = await getUserDetails(values.uid, values.utype)
  if (!dbRes) {
    return dbRes;
  }
  // const dbRes = await getUserDetails()

  return dbRes;
}
