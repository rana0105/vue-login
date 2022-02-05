import { createWebHistory, createRouter } from "vue-router";
import Layout from "@/components/partial/Layout.vue";
import Login from "@/components/partial/Login.vue";
import Dashboard from "@/components/Dashboard.vue";
import UnAuthorized from "@/components/partial/UnAuthorized.vue";

const routes = [
    { name: "layout", path: "/", component: Layout, meta: {
            requiresAuth: false
        } 
    },
    { name: "un-authorized", path: "/un-authorized", component: UnAuthorized, meta: {
            requiresAuth: false
        } 
    },
    { name: "login", path: "/login", component: Login, meta: {
            requiresAuth: false
        }
    },
    { name: "dashboard", path: "/dashboard", component: Dashboard, meta: {
            requiresAuth: true
        }
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const record = to.matched.some(record => record.meta.requiresAuth);
    if (record) {
        if (localStorage.getItem('token') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('token') == null) {
            next()
        }
        else {
            next()
        }
    } else {
        next()
    }
});

export default router;
