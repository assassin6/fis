<template>
  <div class="login" style="background: url('../../static/images/background14.png') right">
    <div class='box'>
      <div class="title">
        <span>欢迎使用BIMCms</span>
        <a>登录</a>
      </div>
      <form role="form">
        <div class="form-group">
          <input type="text" class="form-control" id="name" placeholder="邮箱">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="name" placeholder="密码">
        </div>
        <div class="form-group" style="padding-left: 0px;">
          <input type="text" class="form-control login-float code" id="name" placeholder="验证码" maxlength="4">
          <img id="ms-login-code" class="login-code-img login-float" src="http://192.168.0.54:8080/code"  />
          <p class="login-float login-code-text" style="float: right;">
            <span>看不清?</span>
            <br/>
            <a  href=# class="login-code-change" >换一张</a>
          </p>

        </div>
        <button type="submit" class="btn btn-default" style="margin-bottom: 12px">登录</button>
      </form>
      <div>
        <span>还没有账号？
          <a @click='signPage'>立即注册</a>
        </span>
        <span style="float: right;"><a @click="forgetPas">忘记密码</a></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    methods: {
      signPage() {
        this.$router.push('/sign')
      },
      forgetPas(){
        this.$router.push('/forgetPas')
      }
    }
  }
</script>
