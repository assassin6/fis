<template>
    <div id="mstore-login" class="ms-position-relative">
        <div class="mstore-login">
            <div class="mstore-login-title">
                <span>MSTORE</span>
                <img src="../templets/86/cms/images/title.png" />
            </div>
            <form>
                <input type="text" name="peopleName" placeholder="用户名" />
                <input type="password" name="peoplePassword" placeholder="密码" />
                <button type="button">登录</button>
            </form>
            <p class="mstore-login-prompt">温馨提示：首次登录需微信扫码登录，登录成功在您的个人中心绑定邮箱号并且设置密码，绑定成功的邮箱与设置的密码为此账号密码</p>
        </div>
    </div>
</template>
<script>
    new Vue({
        name: 'Login',
        data() {
            return {
                errorText: "",//错误提示
                error: "",//输入框错误的显示
                peopleName: "",//用户名输入框
                peoplePassword: "",//密码输入框
            }
        },
        watch: {
            peopleName: function () {
                var pattern = /[^\w\u4E00-\u9FA5]/ig;
                if (!validator.isNull(this.peopleName) && this.peopleName.indexOf(" ") < 0 && validator.isLength(this.peopleName, { min: 6, max: 20 }) && pattern.test(this.peopleName) == false && this.error == 'peopleName') {
                    this.errorText = "";
                    this.error = "";
                }
            },
            peoplePassword: function () {
                if (!validator.isNull(this.peoplePassword) && this.peoplePassword.indexOf(" ") < 0 && validator.isLength(this.peoplePassword, { min: 6, max: 20 }) && this.error == 'peoplePassword') {
                    this.errorText = "";
                    this.error = "";
                }
            },
        },
        methods: {
            //错误提示显示
            errorShow: function (msg, type) {
                this.errorText = msg;
                this.error = type;
            },
            //判断用户名
            checkPeopleName: function () {
                var pattern = /[^\w\u4E00-\u9FA5]/ig;
                if (validator.isNull(this.peopleName)) {
                    this.errorShow("用户名不能为空", 'peopleName');
                    return;
                } else if (this.peopleName.indexOf(" ") >= 0) {
                    this.errorShow("用户名不能包含空格", 'peopleName');
                    return;
                } else if (!validator.isLength(this.peopleName, { min: 6, max: 20 })) {
                    this.errorShow("用户名为6~20个字符", 'peopleName');
                    return;
                } else if (pattern.test(this.peopleName)) {
                    this.errorShow("用户名不能包含特殊字符", 'peopleName');
                    return;
                }
            },
            //判断密码
            checkPeoplePassword: function () {
                if (validator.isNull(this.peoplePassword)) {
                    this.errorShow("密码不能为空", 'peoplePassword');
                    return;
                } else if (!validator.isLength(this.peoplePassword, { min: 6, max: 20 })) {
                    this.errorShow("密码长度在6~20位之间!", 'peoplePassword');
                    return;
                } else if (this.peoplePassword.indexOf(" ") >= 0) {
                    this.errorShow("密码是不能包含空格", 'peoplePassword');
                    return;
                }
            },
            //登录
            login: function () {
                this.checkPeoplePassword();
                this.checkPeopleName();
            }
        }
    })
</script>