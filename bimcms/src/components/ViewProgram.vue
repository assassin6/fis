<template>
  <div class='program' id=viewProgram>
    <div class=top>
      <div id=backTo>
        <img src="../assets/images/BIMCms.png" style="margin-top: 20px;margin-left: 30px" />
        <button type="button" class="btn btn-default">
          <i class="iconfont icon-back"></i>返回项目管理</button>
        <div class="btn-group btn-group-md">
          <button type="button" class="btn btn-default" style="background-color: #ffffff">
            <i class="iconfont icon-qiehuan" style="line-height: 10px;color: #0099ff"></i>
          </button>
          <button type="button" class="btn btn-default" data-toggle="modal" data-target="#editProject">项目文件</button>
        </div>
      </div>
      <div id=projectName>
        <div style="max-width: 200px;float: left;padding: 10px 0;margin-right: 40px">
          <div style="border-right: 1px silver solid;padding:0 40px;">
            <span style="line-height: 28px;">XXXX项目管理</span>
          </div>
        </div>
        <headPhoto></headPhoto>
      </div>

    </div>
    <div id=content>
      <div class='operateGroup'>
        <div class="btn-group">
          <button type="button" class="btn btn-default">
            <i class="iconfont icon-renwu-copy" style="font-size: 25px"></i>
          </button>
        </div>
        <div class="btn-group toggle">
          <button type="button" class="btn btn-default toggleButton">
            <img src="../assets/images/剖切.png" />
          </button>
          <button type="button" class="btn btn-default">
            <img src="../assets/images/剖切-右.png" />
          </button>
          <button type="button" class="btn btn-default">
            <img src="../assets/images/剖切-左.png" />
          </button>
          <button type="button" class="btn btn-default">
            <img src="../assets/images/剖切-上.png" />
          </button>
          <button type="button" class="btn btn-default closeToggle">
            <a class="btn btn-default" style="height: 20px;width: 30px;padding: 3px;background-color: #0099ff;color: #ffffff;border-radius: 4px">
              退出
            </a>
          </button>
        </div>
        <div class="btn-group" style="margin: 4.5px 4.5px 4.5px -4.5px">
          <button type="button" class="btn btn-default">
            <i class="iconfont icon-baopo-" style="font-size: 25px"></i>
          </button>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-default">
            <img src="../assets/images/浏览器.png" />
          </button>
          <button type="button" class="btn btn-default" data-toggle="modal" data-target="#componentAttribute">
            <img src="../assets/images/属性.png" />
          </button>
          <button type="button" class="btn btn-default" data-toggle="modal" data-target="#componentStatus">
            <i class="iconfont icon-shezhi" style="font-size: 25px"></i>
          </button>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-default">
            <img src="../assets/images/剖切-1.png" />
          </button>
        </div>
      </div>
    </div>
    <messageBox></messageBox>
    <modals></modals>
  </div>
</template>
<script>
  import MessageBox from './MessageBox.vue'
  import HeadPhoto from './HeadPhoto.vue'
  import Modals from './Modals.vue'
  export default {
    name: 'ViewProgram',
    components: {
      'messageBox': MessageBox,
      'headPhoto': HeadPhoto,
      'modals': Modals
    },
    data() {
      return {
        messageBox: false
      }
    },
    methods: {
      closeMessageBox() {
        this.messageBox = false
      }
    },
    mounted() {
      var target = this
      $('.toggleButton').click(() => {
        $('.operateGroup').animate({ width: '565px' }, 400)
        $('.toggle').animate({ width: '240px' }, 400)
      })
      $('.closeToggle').click(() => {
        $('.operateGroup').animate({ width: '405px' }, 400)
        $('.toggle').animate({ width: '48px' }, 400)
      })
      $('.operateGroup img:eq(0)').mouseenter(() => {
        $('.operateGroup img:eq(0)').attr('src', '../../static/images/剖切-蓝.png')
      })
      $('.operateGroup img:eq(0)').mouseleave(() => {
        $('.operateGroup img:eq(0)').attr('src', '../../static/images/剖切.png')
      })
      $('.operateGroup img:eq(1)').mouseenter(() => {
        $('.operateGroup img:eq(1)').attr('src', '../../static/images/剖切-右蓝.png')
      })
      $('.operateGroup img:eq(1)').mouseleave(() => {
        $('.operateGroup img:eq(1)').attr('src', '../../static/images/剖切-右.png')
      })
      $('.operateGroup img:eq(2)').mouseenter(() => {
        $('.operateGroup img:eq(2)').attr('src', '../../static/images/剖切-左-蓝.png')
      })
      $('.operateGroup img:eq(2)').mouseleave(() => {
        $('.operateGroup img:eq(2)').attr('src', '../../static/images/剖切-左.png')
      })
      $('.operateGroup img:eq(3)').mouseenter(() => {
        $('.operateGroup img:eq(3)').attr('src', '../../static/images/剖切-上-蓝.png')
      })
      $('.operateGroup img:eq(3)').mouseleave(() => {
        $('.operateGroup img:eq(3)').attr('src', '../../static/images/剖切-上.png')
      })
    }
  }
</script>
<style>
  .program {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    background-color: #fafafa
  }

  .top {
    height: 70px;
    position: relative;
    background-color: #ffffff;
    box-shadow: 0 0 5px #666666
  }

  #projectName {
    position: absolute;
    top: 11px;
    width: 320px;
    right: 0px;
  }

  #backTo {
    height: 70px;
    max-width: 800px;
    position: relative;
  }

  #backTo>.btn {
    width: auto !important;
    position: absolute;
    top: 18px;
    left: 220px;
    margin-bottom: 0;
  }

  #backTo>.btn-group {
    position: absolute;
    top: 50%;
    margin-top: -18px;
    left: 365px;
  }

  #backTo>.btn-group>.btn {
    width: 82px;
    height: 34px;
  }

  .operateGroup .btn-group .btn {
    font-size: 12px;
    border-radius: 0px;
    height: 48px;
    width: 48px;
    padding: 5px;
    background-color: #e8e8e8;
    color: #666666;
    border: none
  }

  .operateGroup img {
    width: 25px;
    height: 25px;
  }

  .operateGroup .btn-group {
    margin: auto;
    display: block;
    margin: 4.5px;
    float: left;
  }

  .operateGroup {
    width: 400px;
    margin: auto;
    position: absolute;
    bottom: 100px;
    z-index: 5;
    left: 0px;
    right: 0px;
  }

  .operateGroup i:hover {
    color: #0099ff
  }

  .toggle {
    width: 48px;
    height: 48px;
    overflow: hidden;
  }

  .modal-backdrop {
    display: none
  }
</style>
<style scoped>
</style>