import BlogDetail from "../components/BlogDetail";
import Blogs from "../components/Blogs";
import CategoryPage from "../components/CategoryPage";
import Index from "../components/Index";
import Moto from "../components/Moto";
import Payment from "../components/Payment";
import Policy from "../components/Policy";
import Refund from "../components/Refund";
import { Register } from "../components/Register";
import Shop from "../components/Shop";
import ShopDetail from "../components/ShopDetail";
import Supplier from "../components/Supplier/Supplier";
import Terms from "../components/Terms";
import AddTickets from "../components/Tickets/AddTickets";
import UserTickets from "../components/Tickets/UserTickets";
import ViewTicket from "../components/Tickets/ViewTicket";
import Topup from "../components/Topup";
import AddFlashSale from "../components/User-Components/AddFlashSale";
import AddProducts from "../components/User-Components/AddProducts";
import AddPromotion from "../components/User-Components/AddPromotion";
import Dashboard from "../components/User-Components/Dashboard";
import EditProfile from "../components/User-Components/EditProfile";
import MyFlashSales from "../components/User-Components/MyFlashSales";
import MyLeads from "../components/User-Components/MyLeads";
import MyPromotions from "../components/User-Components/MyPromotions";
import MySubscriptions from "../components/User-Components/MySubscriptions";
import Products from "../components/User-Components/Products";
import Profile from "../components/User-Components/Profile";
import RecentActivities from "../components/User-Components/RecentActivities";
import Subscription from "../components/User-Components/Subscription";
import UserNotifications from "../components/User-Components/UserNotifications";
import { ROLES } from "../utils/Roles.utils";
import Aboutus from "../components/Aboutus";
import AddDealership from "../components/User-Components/AddDealership";
import Thankyou from "../components/Thankyou";
import ProductDetails from "../components/ProductDetails";
import ApplyDealership from "../components/User-Components/ApplyDealership";
import Demoproduct from "../components/Demoproduct";
import MyDealership from "../components/User-Components/MyDealerships";
import Addopp from "../components/Addopp";
import EditOpportunity from "../components/EditOpportunity";

// <Route path="/Register" exact element={<Register />}></Route>
// <Route path="/Distributor/Dashboard" element={
//   <ProtectedRoute isAllowed={isAuthorized} redirectPath={redirectPath}>
//     <Dashboard />
//   </ProtectedRoute>
// }></Route>
export const routes = [
  {
    path: "/",
    component: <Index />,
    role: [],
    isAuthorized: false,
  },
  {
    path: "/Shop",
    component: <Shop />,
    role: [],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Payment/:id",
    component: <Payment />,
    role: [],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Category",
    component: <CategoryPage />,
    role: [],
    isAuthorized: false,
    isUnProtected: true,
  },
  {
    path: "/product-details6",
    component: <ProductDetails />,
    role: [],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/product-details",
    component: <Demoproduct />,
    role: [],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/ShopDetail/:slug",
    component: <ShopDetail />,
    role: [],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/AddDealership",
    component: <AddDealership />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/ApplyDealership",
    component: <ApplyDealership />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Supplier/:id",
    component: <Supplier />,
    role: [],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Register",
    component: <Register />,
    role: [],
    isAuthorized: false,
    isUnProtected: true,
  },
  {
    path: "/Subscription",
    component: <Subscription />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/My-Profile",
    component: <Profile />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/Edit-Profile",
    component: <EditProfile />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/Distributor/Dashboard",
    component: <Dashboard />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/MyProducts",
    component: <Products />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/notifications",
    component: <UserNotifications />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/MyLeads",
    component: <MyLeads />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/mydealerships",
    component: <MyDealership/>,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  }, {
    path: "/Recent-Activities",
    component: <RecentActivities />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/MySubscriptions",
    component: <MySubscriptions />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/AddProducts",
    component: <AddProducts />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/AddFlashSale",
    component: <AddFlashSale />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/View/My-FlashSales",
    component: <MyFlashSales />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/AddPromotions",
    component: <AddPromotion />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/View/My-Promotions",
    component: <MyPromotions />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/View/My-Tickets",
    component: <UserTickets />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/blog-detail/:id",
    component: <BlogDetail />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/View/Add-Ticket",
    component: <AddTickets />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/View/View-Ticket/:id",
    component: <ViewTicket />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/View/blogs",
    component: <Blogs />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Topup",
    component: <Topup />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: true,
    isUnProtected: false,
  },
  {
    path: "/Privacy",
    component: <Policy />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Terms",
    component: <Terms />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Moto",
    component: <Moto />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Refund",
    component: <Refund />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Aboutus",
    component: <Aboutus />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/Thankyou",
    component: <Thankyou />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/add-oppotunity",
    component: <Addopp />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },
  {
    path: "/edit-oppotunity",
    component: <EditOpportunity />,
    role: [ROLES.DISTRIBUTOR, ROLES.DEALER, ROLES.MANUFACTURER, ROLES.USER],
    isAuthorized: false,
    isUnProtected: false,
  },

  // {
  //   path: "/admin/*",
  //   component: <BackendDashBoard />,
  //   role: [ROLES.ADMIN],
  //   isAuthorized: true,
  // },
  // {
  //   path: "/user/*",
  //   component: <Dashboard />,
  //   role: [ROLES.USER],
  //   isAuthorized: true,
  // },
  {
    path: "*",
    component: <Index />,
    role: [],
  },
];
