import React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBarContainer from "../components/navbar/navbar_container";
import UserProfile from "./users/UserProfile";
import ErrorBoundary from "../ErrorBoundary";
const LogInFormContainer = React.lazy(() =>
  import("./session_form/login_form_container")
);
const HomePageContainer = React.lazy(() =>
  import("../pages/home_page_container")
);
const SplashPage = React.lazy(() => import("./splash/splash_page"));
const AllUsers = React.lazy(() => import("../pages/all_users"));
const Profile = React.lazy(() => import("./users/profile"));
const SingleTask = React.lazy(() => import("./home/single_task"));
const AdminDashboard = React.lazy(() => import("../pages/admin_tools"));
const AddCategory = React.lazy(() =>
  import("./admintools/product/create_product")
);
const ManageCategories = React.lazy(() =>
  import("./admintools/product/manage_products")
);
const ProductIndexContainer = React.lazy(() =>
  import("./admintools/product/product_index_container")
);
const EditProfile = React.lazy(() => import("./users/edit_profile"));
const ManageLeaves = React.lazy(() =>
  import("./admintools/leave/manage_leaves")
);
const SingleLeave = React.lazy(() => import("./admintools/leave/single_leave"));
const MeetingState = React.lazy(() => import("../actions/mom"));
const AlertState = React.lazy(() => import("./admintools/meetings/AlertState"));

const MeetingPage = React.lazy(() =>
  import("./admintools/meetings/meeting_page")
);
const ManageTaskContainer = React.lazy(() =>
  import("./admintools/tasks/manage_task_container")
);
const profileIndexContainer = React.lazy(() =>
  import("./admintools/usertools/profile_index_container")
);
const RegisterForm = React.lazy(() => import("./splash/splash_register"));

const loading = () => (
  <p className="animated fadeIn pt-3 text-center">Loading...</p>
);
const App = () => {
  function errorRenderMethodCalled() {}
  return (
    <div className="app">
      <header className="home-page-header">
        <NavBarContainer />
      </header>
      <div>
        <ErrorBoundary render={errorRenderMethodCalled}>
          <React.Suspense fallback={loading()}>
            <Switch>
              <AuthRoute exact path="/" component={SplashPage} />
              <AuthRoute exact path="/login" component={LogInFormContainer} />
            </Switch>
            <div className="main-app">
              <Switch>
                <ProtectedRoute
                  exact
                  path="/user/signup"
                  component={RegisterForm}
                />
                
                <ProtectedRoute exact path="/" component={HomePageContainer} />
                <ProtectedRoute
                  exact
                  path="/user/allusers"
                  component={AllUsers}
                />
                <ProtectedRoute
                  exact
                  path="/user/:userId"
                  component={Profile}
                />
                <ProtectedRoute path="/task/:taskId" component={SingleTask} />
                <ProtectedRoute
                  path="/profile/edit/:userId"
                  component={EditProfile}
                />
                <ProtectedRoute
                  path="/user/pofile"
                  component={profileIndexContainer}
                />
                <ProtectedRoute path="/products" component={AdminDashboard} />
                <ProtectedRoute path="/profile/:id" component={UserProfile} />
                <ProtectedRoute
                  path="/admin/tasks"
                  component={ManageTaskContainer}
                />

                <ProtectedRoute
                  path="/admin/create/product"
                  exact
                  component={AddCategory}
                />
                <ProtectedRoute
                  path="/admin/products"
                  exact
                  component={ManageCategories}
                />
                <ProtectedRoute
                  exact
                  path="/admin/manage/:categoryId"
                  component={ProductIndexContainer}
                />
                <ProtectedRoute
                  exact
                  path="/admin/leaves"
                  component={ManageLeaves}
                />
                {/* <ProtectedRoute
        exact
        path="/admin/mom"
        component={ManageMeetingContaniner}
      /> */}
                <ProtectedRoute
                  exact
                  path="/admin/leaves/:leaveId"
                  component={SingleLeave}
                />
                <MeetingState>
                  <AlertState>
                    <div className="container">
                      <ProtectedRoute
                        exact
                        path="/admin/mom"
                        component={MeetingPage}
                      />
                    </div>
                  </AlertState>
                </MeetingState>
              </Switch>
            </div>
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
