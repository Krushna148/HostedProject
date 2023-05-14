
import Booking from "views/Bookings/Booking";
import BookTravel from "views/BookTravel/BookTravel";
import Dashboard from "views/Dashboard.js";
import Travel from "views/Travel";
import UpdateProfile from "views/Profile/UpdateProfile";
import Setting from "views/Settings/Setting";
import SelectSeat from "views/BookTravel/SelectSeat";
import ManageTravel from "views/ManageTravels/ManageTravels"
import UserBooking from 'views/Bookings/UserBookings'

export const AgencyRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    isNavMenu: true,
    layout: "/user"
  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: "nc-icon nc-bullet-list-67",
    component: Booking,
    isNavMenu: true,
    layout: "/user"
  },
  {
    path: "/manage-travels",
    name: "Manage Travels",
    icon: "nc-icon nc-delivery-fast",
    component: ManageTravel,
    isNavMenu: true,
    layout: "/user"
  },
  // {
  //   path: "/feedback",
  //   name: "Feedback",
  //   icon: "nc-icon nc-email-85",
  //   component: Travel,
  //   isNavMenu: true,
  //   layout: "/user"
  // },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: UpdateProfile,
    isNavMenu: true,
    layout: "/user"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-email-85",
    component: Setting,
    isNavMenu: true,
    layout: "/user"
  },
]

export const UserRoutes = [
  {
    path: "/book-travel",
    name: "Book Travel",
    icon: "nc-icon nc-bus-front-12",
    component: BookTravel,
    isNavMenu: true,
    layout: "/user"
  },
  {
    path: "/userBookings",
    name: "User Bookings",
    icon: "nc-icon nc-bullet-list-67",
    component: UserBooking,
    isNavMenu: true,
    layout: "/user"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: UpdateProfile,
    isNavMenu: true,
    layout: "/user"
  },
  // {
  //   path: "/rewards",
  //   name: "Rewards",
  //   icon: "nc-icon nc-bank",
  //   component: Travel,
  //   isNavMenu: true,
  //   layout: "/user"
  // },
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-email-85",
    component: Setting,
    isNavMenu: true,
    layout: "/user"
  },
  {
    path: "/select-seat",
    name: "Select Seat",
    icon: "nc-icon nc-bank",
    component: SelectSeat,
    layout: "/user",
    isNavMenu: false
  }
]

export default [AgencyRoutes, UserRoutes]

