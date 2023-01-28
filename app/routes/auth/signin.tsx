import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { signinUser } from "~/lib/auth.server";
import { getUserDetails } from "~/lib/user.server";

export default function Signin() {
  return (
    <>
      <main className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">
            welcome back customer
          </p>
          <Form action="#" method="post" autoComplete="off">
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                <input type="email" name="email" id="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com" />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                <input type="password" name="password" id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input type="checkbox" name="remember" id="remember" disabled
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label htmlFor="remember" className="text-gray-600 ml-3 cursor-pointer">Remember me</label>
              </div>
              {/* <a href="#" className="text-primary">Forgot password</a> */}
            </div>
            <div className="mb-2" >
              <p>You are :</p>
              <div className="flex justify-evenly" >
                <div>
                  <input type={'radio'} name='registerAs' value={'farmer'} id="registerAsFarmer" />
                  <label htmlFor="registerAsFarmer" className="mx-2" >Farmer</label>
                </div>
                <div>
                  <input type={'radio'} name='registerAs' value={'customer'} id="registerAsCustomer" />
                  <label htmlFor="registerAsCustomer" className="mx-2" >Customer</label>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Login</button>
            </div>
          </Form>

          <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or login with</div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
          </div>
          <div className="mt-4 flex gap-4">
            <a href="#"
              className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
            <a href="#"
              className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
          </div>

          <p className="mt-4 text-center text-gray-600">Don't have account? <a href="register.html"
            className="text-primary">Register
            now</a></p>
        </div>
      </main>
    </>
  )
}


export const action = async (actionData) => {
  // console.log('actionData :: ', actionData);

  const formData = await actionData.request.formData();
  const values = Object.fromEntries(formData);

  if (!values.email || !values.password || !values.registerAs) {
    return {
      status: false,
      msg: 'Please enter all the fields'
    }
  }

  const authRes = await signinUser(values);
  console.log('authRes :: ', authRes);
  
  if(!authRes.status) {
    return authRes;
  }

  const userRes = await getUserDetails(authRes.data?.user?.uid, values.registerAs);
  console.log('userRes :: ', userRes);
  if (!userRes.status) {
    return userRes;
  }

  return redirect(`/${values.registerAs}/profile/${authRes.data?.user?.uid}`);
};
