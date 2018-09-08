import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login";
import Sign from "../components/Sign";
import ForgetPas from '../components/ForgetPas';
import SignSuccess from '../components/SignSuccess'
import Program from '../components/Program'
import ViewProgram from '../components/ViewProgram'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/sign",
      name: "Sign",
      component: Sign
    },
    {
      path:'/forgetPas',
      name:"ForgetPas",
      component:ForgetPas
    },
    {
      path:'/signSuccess',
      name:"SignSuccess",
      component:SignSuccess
    },
    {
      path:'/program',
      name:"Program",
      component:Program
    },{
      path:'/viewProgram',
      name:"viewProgram",
      component:ViewProgram
    }
  ]
});
