import $ from 'jquery'

export default {
    state: {
        id : "",
        username: "",
        password: "",
        photo: "",
        token: "",
        is_login: false,
    },
    getters: {
    },
    mutations: {
        updatedUser(state, user) {
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
            console.log("调用logout()2");
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url:"http://127.0.0.1:3000/user/account/token/",
                type:"post",
                data: {
                    username:data.username,
                    password: data.password,
                },
                success(resp) {
                    if (resp.error_message === "success") {
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
                        context.commit("updatedUser", {
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
            context.commit("logout");
        }
    },
    modules: {
    }
}