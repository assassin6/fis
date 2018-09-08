<template>
  <div class="login" style="background: url('../../static/images/background14.png') right">
    <div class='box'>
      <div class="title">
        <span>欢迎使用BIMCms</span>
        <a>注册</a>
      </div>
      <form role="form">
        <div class="form-group">
          <input type="text" class="form-control" id="name" placeholder="邮箱">
        </div>

        <div class="form-group" style="padding-left: 0px;">
          <input type="text" class="form-control login-float code" id="name" placeholder="验证码" maxlength="4">
          <img id="ms-login-code" class="login-code-img login-float" src="http://192.168.0.54:8080/code" @click="changeCode" />
          <p class="login-float login-code-text" style="float: right;">
            <span>看不清?</span>
            <br/>
            <a href=# class="login-code-change" @click="changeCode">换一张</a>
          </p>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="name" placeholder="密码">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" id="name" placeholder="确认密码">
          </div>
        <button type="submit" class="btn btn-default" style="margin-bottom: 12px">注册</button>
      </form>
      <div>
        <span>已有账号？
          <a @click="loginPage">立即登录</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sign',
    methods: {
      changeCode: function () {
        $("#ms-login-code").attr("src", "http://192.168.0.54:8080/code?t=" + new Date().getTime())
      },
      loginPage(){
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  #loginBox {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -176px;
    /* negative half of the height */
    font-size: 12px;
    margin-left: -170px;
    width: 340px;
    padding: 30px;
    background-color: #ffffff;
  }

  #loginBox a {
    text-decoration: none
  }

  .form-group {
    margin-bottom: 12px
  }

  #title {
    margin-bottom: 30px
  }

  #title span {
    font-size: 16px;
    font-weight: bolder
  }

  #title a {
    float: right;
    font-size: 14px;
    color: #666666
  }

  .login-float {
    float: left;
  }

  .code {
    width: 150px;
    margin-right: 10px
  }

  .login-code-img {
    height: 34px;
  }
</style>