import Logo from "../miscellaneous/img";


export default function Footer() {
  return (
    <footer className="bg-white p-16 border-t border-gray-100">
      <div className="container grid grid-cols-3">
        <div className="col-span-1 space-y-8 mr-2">
          <div className="w-28 h-24 flex justify-center items-center" >
            <Logo />
          </div>
            <div className="mr-2">
              <p className="text-green-500 font-semibold">
              Welcome to <span className=" text-2xl font-bold" > FARM - A - Zone </span><br /> Let's support our farmers
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500"><i
                className="fa-brands fa-facebook-square"></i></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><i
                className="fa-brands fa-instagram-square"></i></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><i
                className="fa-brands fa-twitter-square"></i></a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <i className="fa-brands fa-github-square"></i>
              </a>
            </div>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Solutions</h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Marketing</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Analitycs</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Commerce</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Insights</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Pricing</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Guides</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">API Status</a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Solutions</h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Marketing</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Analitycs</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Commerce</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Insights</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Pricing</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Guides</a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">API Status</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}