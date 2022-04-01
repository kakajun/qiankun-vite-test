<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"/>
    <HelloWorld msg="Vue.js Demo"/>

    <el-button @click="dialogVisible = true" type="text">Open Dialog</el-button>
    <div>
        <el-button @click="changeGlobState" type="text">改变全局变量</el-button>
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
        name: '我vue触发name',
      },
    });
      }
    },
  };
</script>
