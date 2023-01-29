import type { MetaFunction } from "@remix-run/node";
import tailwindStyles from "./styles/app.css"

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useActionData,
  useCatch,
  useFetcher,
  useMatches,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import Header from "./components/common/header";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import Copyright from "./components/common/copyright";
import { Error } from "./components/pages/Error";
import { useEffect } from "react";
import { useUserStore } from "./store/user";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});


export function links() {
  return [{ rel: "stylesheet", href: tailwindStyles }]
}


function Document(props) {
  
  return (
    <html lang="en">
      <head>
        <title>{props?.title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Navbar />
        {props?.children}
        <Footer />
        <Copyright />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const _useUserStore: any = useUserStore();
  const navigate = useNavigate();
  const submit = useSubmit();
  const fetcher = useFetcher();
  // const userData = useActionData();
  // console.log('userData :: ', userData);
  const matches = useMatches();
  console.log('matches :: ', matches);
  

  useEffect(() => {
    // if(matches)
    if (_useUserStore.state) return;
    const timer = setTimeout(async() => {
      const uid = localStorage.getItem('uid_zone');
      const utype = localStorage.getItem('utype_zone');
      console.log('uid :: ', uid);
      if (!uid) {
        navigate('/')
      } else {
        const formData = new FormData();
        formData.append('uid', uid)
        formData.append('utype', utype)
        const res = await submit(formData, { action: '/auth/is-valid-user', method: 'post' })
         console.log('ressss : ', res);
         
      }
    }, 2000)

    return () => clearTimeout(timer);

  }, [_useUserStore.state])

  return (
    <Document >
      <Outlet />
    </Document >
  );
}


// export function CatchBoundary() {
//   const caughtResponse = useCatch();

//   return (
//     <Document title={caughtResponse.statusText}>
//       <main>
//         <Error title={caughtResponse.statusText}>
//           <>
//             <p>
//               {caughtResponse.data?.message ||
//                 'Something went wrong. Please try again later.'}
//             </p>
//             <p>
//               Back to <Link to="/">safety</Link>.
//             </p>
//           </>
//         </Error>
//       </main>
//     </Document>
//   );
// }

// export function ErrorBoundary({ error }) {
//   return (
//     <Document title="An error occurred">
//       <main>
//         <Error title="An error occurred">
//           <>
//             <p>
//               {error.message || 'Something went wrong. Please try again later.'}
//             </p>
//             <p>
//               Back to <Link to="/">safety</Link>.
//             </p>
//           </>
//         </Error>
//       </main>
//     </Document>
//   );
// }
