<template>
<ContentField v-if="!$store.state.user.pulling_info">
    <div class="row justify-content-md-center">
        <div class="col-3">
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="username" class="form-label">用户名</label>
                    <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">密码</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                </div>
                <div class="error_message">{{error_message}}</div>
                <button type="submit" class="btn btn-primary">提交</button>
            </form>
        </div>
    </div>
</ContentField>
</template>

<script>
import ContentField from '@/components/ContentField'
import { useStore } from 'vuex';
import { ref } from 'vue'
import router from '@/router/index';
//import store from '@/store';


export default{
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        const router_name = store.getters.router_name;
        let username = ref('');
        let password = ref('');
        let error_message = ref('');

        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
            store.commit("updateToken", jwt_token);
            store.commit("is_jwt", true);
            //console.log(router_name);     // 刷新定向到原页面尝试
            store.dispatch("getinfo", {
                success() {
                    router.push({name: router_name });
                    store.commit("updatePullingInfo", false);
                },
                error() {
                    store.commit("updatePullingInfo", false);
                }
            })
        } else {
            store.commit("updatePullingInfo", false);
        }

        // 触发函数
        const login = () => {
            error_message.value = "";
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    store.dispatch("getinfo", {
                        success() {
                            router.push({name: "home"});
                        },
                        error() {
                            console.log("login函数调用失败");
                        }
                    })
                },
                error() {
                    error_message.value = "用户名或密码错误";
                }
            })
        }

        return {
            username,
            password,
            error_message,
            login,
        }
    }
}

</script>

<style scoped>

button {
    width: 100%;
}

div.error_message {
    color: red;
}

</style>