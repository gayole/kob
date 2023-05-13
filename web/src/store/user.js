import $ from 'jquery'

export default {
    state: {
        id : "",
        username: "",
        password: "",
        photo: "",
        token: "",
        is_login: false,
        pulling_info: true,
        is_jwt:false,
        router_name: "home"
    },
    getters: {
        router_name : state => state.router_name,
        is_jwt : state => state.is_jwt
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },
        updateToken(state, token) {
            state.token = token;
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.token = "";
            state.is_login = false;
            state.pulling_info = false;
            state.is_jwt = false;
            console.log("调用logout()2");
        },
        updatePullingInfo(state, pulling_info) {
            state.pulling_info = pulling_info;
        },
        is_jwt(state,flag) {
            state.is_jwt = flag;
        },
        updateRouter(state, name) {
            state.router_name = name;
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url:"http://127.0.0.1:3000/user/account/token/",
                type:"post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        localStorage.setItem("jwt_token",resp.token);
                        //localStorage.setItem("from_router", "user_account_login");
                        context.commit("updateToken", resp.token);
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                }
            });
        },
        getinfo(context, data) {
            $.ajax({
                // ajax调用时，url要写全，加上http
                url:"http://127.0.0.1:3000/user/account/info/",
                type: "get",
                headers: {
                    Authorization: "Bearer " + context.state.token,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        context.commit("updateUser", {
                            ...resp,
                            is_login: true,
                        });
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                }
            });
        },
        logout(context) {
            console.log("调用logout()3");
            localStorage.removeItem("jwt_token");            
            context.commit("logout");
        }
    },
    modules: {
    }
}