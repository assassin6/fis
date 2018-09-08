<template>
  <div class=program>
    <div class=top>
      <div id=createProgram>
        <img src="../assets/images/BIMCms.png" style="margin-top: 20px;margin-left: 30px" />
        <button type="button" class="btn btn-default">+创建项目</button>
      </div>
      <div class="btn-group btn-group-xs">
        <button type="button" class="btn btn-default">全部</button>
        <button type="button" class="btn btn-default">我创建</button>
        <button type="button" class="btn btn-default">我参与</button>
      </div>
      <headPhoto></headPhoto>
    </div>
    <div id=content>
      <div class=projects v-for='(item,index) in myProject' :key='index'>
        <div class="projectImg">
          <img src="../assets/images/线条图.png" />
        </div>
        <div style="margin-left: 5px;height: 40px;max-width: 255px;float: left;overflow: hidden;">
          <div style="margin: 8px 0 8px 5px;width: 24px;height: 24px;float: left;" v-for="(imgs,index) in item.projectPeoples" v-bind:key='index'>
            <img src="http://www.w3school.com.cn/ui2017/compatible_chrome.png" style="width:100%" />
          </div>
        </div>
        <div style="height: 40px;width: 40px;text-align: center;float: right;">
          <span style="line-height: 40px">5人</span>
        </div>
        <div class="operate">
          <div style="height: 180px;">
            <div style="margin: auto;height:60px;max-width: 242px;margin-top: 60px">
              <button class="btn btn-default operateBtn" @click='viewProgram'>
                <i class="iconfont icon-yanjing" style="margin-left: -4px"></i>
              </button>
              <button class="btn btn-default operateBtn" data-toggle="modal" data-target="#editProject">
                <i class="iconfont icon-bianji"></i>
              </button>
              <button class="btn btn-default operateBtn" data-toggle="modal" data-target="#invitePeople">
                <i class="iconfont icon-yaoqing"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <messageBox></messageBox>
    <modals></modals>
  </div>
</template>
<script>
  import HeadPhoto from './HeadPhoto.vue'
  import MessageBox from './MessageBox.vue'
  import Modals from './Modals.vue'
  import projects from "../../static/json/people/bimcms/project/list.json";
  export default {
    name: "Program",
    components: {
      'messageBox': MessageBox,
      'headPhoto': HeadPhoto,
      'modals':Modals
    },
    data() {
      return {
        myProject: projects,
        messageBox: false
      };
    },
    methods: {
      viewProgram() {
        this.$router.push('/viewProgram')
      },
      closeMessageBox() {
        this.messageBox = false
      }
    },
    mounted() {
      var target = this
      $(".projectImg").mouseenter(function () {
        $(this).parent().find(".operate")
          .stop(false, true)
          .fadeIn(100);
      });
      $(".operate").mouseleave(function () {
        $(this)
          .stop(false, true)
          .fadeOut(100);
      });
    }
  };
</script>
<style>
  .program {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #fafafa;
    overflow-x: hidden;
  }

  .top {
    height: 70px;
    position: relative;
    background-color: #ffffff;
    box-shadow: 0 0 5px #666666;
  }

  #createProgram+.btn-group {
    position: absolute;
    top: 50%;
    right: 120px;
    margin-top: -13px;
  }

  .btn-group>.btn {
    width: 56.7px;
    height: 26px;
  }

  #createProgram {
    width: 400px;
    position: relative;
  }

  #createProgram>.btn {
    width: auto !important;
    position: absolute;
    top: 50%;
    margin-top: -7px;
    left: 220px;
  }

  .projects {
    height: 220px;
    width: 300px;
    position: relative;
    background-color: #fdfdfd;
  }

  .projects {
    float: left;
    margin: 0 13px 20px 0px;
  }

  .projectImg img {
    width: 100%;
    height: 180px;
  }

  #content {
    height: 100%;
    padding: 40px 0 40px 11px;
  }

  .operate {
    height: 220px;
    width: 300px;
    position: relative;
    position: absolute;
    background-color: #0099ff;
    top: 0px;
    opacity: 0.8;
    display: none;
    /* Opera */
  }

  .operateBtn {
    text-align: center;
    height: 60px !important;
    width: 60px;
    border: 1px solid #fafafa;
    border-radius: 30px;
    margin: 0 9px;
  }

  .operateBtn:hover {
    background-color: #ffffff;
  }

  .iconHover {
    color: #0099ff;
  }

  .operate i {
    font-size: 25px;
  }

  .btn-group>button:hover {
    background-color: #ffffff;
  }

  .confirmEdit {
    width: 360px;
    background-color: #e6e6e6;
    border: none;
    color: #bbbbbb;
  }

  .deleteEdit {
    width: 360px;
    background-color: #f5b8b8;
    border: none;
    color: #f39c9c;
  }
</style>
<style scoped>
  .modal-backdrop {
    display: none;
  }

  .dropdowm-menu {
    min-width: 100px;
  }
</style>