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
  useCatch,
} from "@remix-run/react";
import Header from "./components/common/header";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import Copyright from "./components/common/copyright";
import { Error } from "./components/pages/Error";

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
  return (
    <Document >
      <Outlet />
    </Document >
  );
}


export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <>
            <p>
              {caughtResponse.data?.message ||
                'Something went wrong. Please try again later.'}
            </p>
            <p>
              Back to <Link to="/">safety</Link>.
            </p>
          </>
        </Error>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document title="An error occurred">
      <main>
        <Error title="An error occurred">
          <>
            <p>
              {error.message || 'Something went wrong. Please try again later.'}
            </p>
            <p>
              Back to <Link to="/">safety</Link>.
            </p>
          </>
        </Error>
      </main>
    </Document>
  );
}
