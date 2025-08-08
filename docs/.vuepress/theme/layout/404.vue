<script setup>
import '../styles/font.css'
import {ref} from "vue";
import {RouterLink} from "vue-router";
const is_flipped = ref(false)
</script>

<template>
  <div class="page-back font_size">
    <div class="container-box" :class="{flipped: is_flipped}">
      <div class="container-box-face">
        <div class="container-box-title title_1">404&nbsp;NotFount!</div>
        <div class="title_2">诡异的寂静</div>
        <div class="text">
          &nbsp;&nbsp;鼠标在进入未知星门的终端出口星系之后,立马就能看出在星门的这一端,
          很久以前曾经发生过一场惊天动地的大战。
          某些可能曾经存在生命的星球已经被炸得面目全非,而其它星球则被某
          种细小的灰尘所覆盖,粗略扫描显示那些灰尘其实是某种痛瘓的远古纳
          米机器。这就令我们怀疑,被锁定的星门到底是为了阻挡外界进入,还是为了
          阻挡里面的东西外逃 ··
        </div>
        <button @click="is_flipped = !is_flipped">这里发生了什么事?</button>
      </div>
      <div class="container-box-back">
        <div class="title_1">来自未知的通信</div>
        <div class="title_2">&nbsp;&nbsp;我们截获了来自未知生物的通讯,它们居然在使用着我们的语言!虽然音频噪杂,但我们还是能够获取些信息,下面是音频原文:</div>
        <br>
        <div class="title_1">"404&nbsp;NotFound!"</div>
        <br>
        <div style="display: flex;flex-direction: row;gap: 20px">
          <button @click="is_flipped = !is_flipped">返回正面</button>
          <router-link class="go_home" to="/" >我要回家</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.go_home {
  all:  unset;
  background-color:  #717171;
  display: flex;
  justify-content:  center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.go_home:hover{
  transition: background-color 0.25s;
  background-color: #a1a1a1;
}
.page-back {
  box-sizing: border-box;
  display: flex;
  background-color: white;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}
.container-box {
  display: flex;
  width: 500px;
  height: 500px;
  background-color: #2c2c2c;
  border-radius: 10px;
  color: azure;
  box-sizing: border-box;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  transform: rotateY(0deg);
}
.container-box.flipped {
  transform: rotateY(180deg);
}
.container-box-face, .container-box-back {
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
}
.container-box-back {
  transform: rotateY(180deg);
}
button {
  all:  unset;
  background-color:  #717171;
  display: flex;
  justify-content:  center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  transition: background-color 0.25s;
  background-color: #a1a1a1;
}
</style>