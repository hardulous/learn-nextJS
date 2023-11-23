import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  // Here session contain info of logged in user and status is current status of user either authenticated or unauthenticated
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log(session, status);

  return (
    <nav className="header">
      <h1 className="logo">
        <a href="#">NextAuth</a>
      </h1>
      {/* Adding css to fix flickering when ui changes from signin to signout or vice-versa */}
      <ul className={`main-nav ${!session && loading ? "loading" : "loaded"}`}>
        <li>
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/auth/dashboard" legacyBehavior>
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/auth/blog" legacyBehavior>
            <a>Blog</a>
          </Link>
        </li>
        {/* */}
        {session && !loading ? (
          <li>
            <Link href="/api/auth/signout" legacyBehavior>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign Out
              </a>
            </Link>
          </li>
        ) : (
          <li>
            {/* Here when we click on Sign In we will make request to our route defined in [...nextauth].js and from there we will be redirected to github login page */}
            <Link href="/api/auth/signin" legacyBehavior>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn("github");   // Here passing argument github will automatically sign in without showing default sign in page of nextAuth but if not passed then calling it will redirect to default signIn page 
                }}
              >
                Sign In
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

// Here when successfully login a cookie with name "next-auth.session-token" , "next-auth.callback-url" , "next-auth.csrf-token" will be added which shows that user is authenticated and when click on Sign out then all cookies will be removed automatically.

// Here useSession hook return session object using which we can access currently logged in user details and using it we can hide or unhide sigin/signout button.

//
