<template>
  <div class="home">
    <!-- 通过代理获取图片 -->
      <img alt="Vue logo" src="/vue2Asset/icon.png"/>
    <!-- 下面是相对路径引用 -->
    <img alt="Vue logo" src="../assets/logo.png"/>
    <HelloWorld msg="Vue.js Demo"/>

    <el-button @click="dialogVisible = true" type="text">Open Dialog</el-button>
    <div>
        <el-button @click="changeGlobState" type="text">改变全局变量</el-button>
    </div>
    <div>
        <el-button @click="gotoDetail" type="text">跳到嵌套三级路由</el-button>
    </div>


    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="Dialog"
      width="30%">
      <span>dialog message</span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button @click="dialogVisible = false" type="primary">ok</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'home',
    components: {
      HelloWorld,
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      gotoDetail(){
        this.$router.push('/services/1')
      },
      handleClose(done) {
        this.$confirm('Sure to close？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      changeGlobState(){
            // 这里是主动改变主工程全局变量
     this.$qiankun.setGlobalState &&
    this.$qiankun.setGlobalState({
      ignore: 'hhhhhh',
      user: {
        name: '我appvue触发name',
      },
    });
      }
    },
  };
</script>
