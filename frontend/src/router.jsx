import Layout from "./components/misc/Layout";
import LoginPage from "./pages/Auth/Login.page";
import Landing from "./pages/Landing/Landing.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/CreatePost.page";
import ProtectedRoute from "./services/ProtectedRoute";
import useBoundStore from "./store/Store";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import PostPage from "./pages/Post/Post.page";
import { postDetailsLoader, postsLoader } from "./services/PostService";
import PostDetailsPage from "./pages/Post/PostDetails.page";

/**
 * CLIENT-SIDE ROUTER
 *
 * [Public Pages]: Anyone can see these pages
 * / - Landing Page
 *
 * [Private Routes]: Must be authenticated to see
 * /login - Login Page
 * /posts - See All Posts
 * /posts/:id - See details of a specific post
 * /posts/create - Create a post
 *
 * /<unknown> - 404 Not Found
 */

/**
 *   new method
 *  1- making a router constant (<BrowserRouter>)  with (createBrowserRouter) to pass it to the (RouterProvider) function as props in ( App.jsx )
 *  *  1.5- (<BrowserRouter>) wraps all app within and allows us to route to the other components with the help of <Route></Route>
 *
 *  2- making routes and elements with (createRoutesFromElements) function to pass it to the Upper function (createBrowserRouter)
 *
 *  3- dont use plural <Routes></Routes> instead use singular <Route></Route> to make the routes tree
 *
 *  4- sending the child route using (element={<Layout />}) in the parent Route to be placed in the desired place with use of <Outlet />
 *
 *  5- (loader) allows us to fetch the data from backend to be ready before loading the the page (loader={postsLoader})
 *  5.5- in the page with useLoaderData() hook we get the data and no need to use useEffect to fetch the data in page
 *
 *  6- in order to get params like :id passed to the Url in the regular functions use useParams() to get params
 *  6.5- to get params in the (loader) function just add {id} in to the parameters of the related loader function to fetch the data with id
 *
 *  7- use (errorElement={<NotFound />}) in parent router and use (useRouteError()) to get the thrown error generated in fetching data in NotFound page
 *  7.5- this also will load the NotFound page in the wrong Url entry
          
 *  8- <ProtectedRoute> checks if there is an authenticated user, wraps the component as a child to be renderd
 */

export const Router = () => {
  //simply checking if any user exist in the store?
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />} errorElement={<NotFound />}>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="posts"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostPage />
            </ProtectedRoute>
          }
          loader={postsLoader}
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostDetailsPage />
            </ProtectedRoute>
          }
          loader={postDetailsLoader}
        />
        <Route
          path="/posts/create"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id/create/:postId"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <CreatePostPage />
            </ProtectedRoute>
          }
          loader={postDetailsLoader}
        />
        <Route path="/" element={<Landing />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    )
  );
  return router;
};
