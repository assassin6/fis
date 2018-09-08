<template>
    <div class="login" style="background: url('../../static/images/background14.png') right">
      <div class='box'>
        <div class="title" style="margin-bottom: 50px">
          <span>欢迎使用BIMCms</span>
          <a>注册</a>
        </div>
        <div style="text-align: center;margin-bottom: 68px">
          <i class="iconfont icon-chenggong" style="color: #78c430;font-size:60px"></i>
          <br/>
          <span style="font-size: 16px;color: #333333">恭喜您注册成功</span>
        </div>
        <div style="text-align: center;color: #999999;font-size: 12px;">
          <span>欢迎加入我们，<span v-text='countTime' style="color: #0099ff"></span>秒后将自动跳转到登录界面</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'LoginSuccess',
      data(){
        return{
          countTime:5
        }
      },
      methods: {
      },
      mounted(){
        var target=this
        setTimeout(()=>{
         target.$router.push('/')
        },5000)
      }
    }
  </script>