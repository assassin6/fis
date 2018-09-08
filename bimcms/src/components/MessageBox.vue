<template>
  <div class="messageBox">
    <div class=messageBoxHead>
      <span>消息中心</span>
      <button type="button" class="close">&times;</button>
    </div>
    <div class=messageBoxContent>
      <div v-for="(messageItem,index) in messageList" :key='index' class="messageItem">
        <div>
          <i class='iconfont icon-xiaoxi' style="color: #0099ff;"></i>
          <span>messageType</span>
          <span style="float: right;max-width: 124px;">messageTime</span>
        </div>
        <div>
          <span class=messageBase>消息内容</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MessageBox",
    data(){
      return{
        messageList:[1,2,3]
      }
    },
    mounted(){
      var target = this
      $('.messageBoxHead button').click(()=>{
        target.$parent.closeMessageBox()
        $('.messageBox').animate({right:'-300px'},200)
      })
    }
  }
</script>
<style>
  .messageBox {
    position: absolute;
    height: 100%;
    width:300px;
    top: 92px;
    right: -300px;
    background-color: #ffffff;
  }
  .messageBoxHead{
    width: 100%;
    padding: 18px;
    border-bottom: #fafafa 2px solid
  }
  .messageBoxHead button{
    background-color:#ffffff;
    border:none;
  }
  .messageBoxContent{
    padding: 18px
  }
  .messageItem{
    margin-bottom: 12px;
  }
</style>