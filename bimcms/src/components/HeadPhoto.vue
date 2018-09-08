<template>
  <div class="dropdown" id=headPhoto>
    <img src="http://www.w3school.com.cn/ui2017/compatible_chrome.png" class="dropdown-toggle" data-toggle="dropdown" id=dropDownMenu/>
    <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropDownMenu" style="min-width: 90px;text-align: center">
      <li role="presentation">
        <a role="menuitem" tabindex="-1" data-target="#userMessage" data-toggle="modal">资料</a>
      </li>
      <li role="presentation" class="message" >
        <a role="menuitem" tabindex="-1">消息</a>
      </li>
      <li role="presentation">
        <a role="menuitem" tabindex="-1" @click='userQuit'>退出</a>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HeadPhoto',
    methods:{
      userQuit(){
        this.$router.push('/')
      }
    },
    mounted() {
      var target = this
      $('.message').click(() => {
        if (!target.$parent.messageBox) {
          target.$parent.messageBox = true
          $('.messageBox').animate({ right: 0 }, 200)
        } else {
          target.$parent.messageBox = false
          $('.messageBox').animate({ right: '-300px' }, 200)
        }
      })
    }
  }
</script>
<style>
  #headPhoto {
    position: absolute;
    top: 50%;
    margin-top: -24px;
    right: 40px;
  }

  #headPhoto img {
    height: 48px;
  }
</style>