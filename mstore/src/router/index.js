import Vue from "vue";
import Router from "vue-router";
import Shared from "../components/people/Shared";
import Share from "../components/people/Share";
import Download from "../components/people/Download";
import Support from "../components/people/Support";
import Order from "../components/people/Order";
import ShareUpgrate from "../components/people/ShareUpgrader";
import UserList from "../components/people/UserList";
import Center from "../components/people/Center";
import MstoreShow from "../components/Show";
import Upgrader from "../components/people/ShareUpgrader";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Center",
      component: Center,
      children: [
        {
          path: "/",
          name: "Shared",
          component: Shared
        },
        {
          path: "/share",
          name: "Share",
          component: Share
        },
        {
          path: "/download",
          name: "Download",
          component: Download
        },
        {
          path: "/support",
          name: "Support",
          component: Support
        },
        {
          path: "/order",
          name: "Order",
          component: Order
        },
        {
          path: "/shareUpgrate",
          name: "ShareUpgrate",
          component: ShareUpgrate
        },
        {
          path: "/userList",
          name: "UserList",
          component: UserList
        },
        {
          path: "/upgrader/:id",
          name: "Upgrader",
          component: Upgrader
        }
      ]
    },
    {
      path: "/show",
      name: "MstoreShow",
      component: MstoreShow
    }
  ]
});
