<template>
  <div class="page">
    <div class="page-tixing">
      <p v-for="index in 4" :key="index">梯形demo1</p>
    </div>
    <div class="page-tixing2">
      <p>梯形demo2</p>
    </div>
    <div class="page-px1">
      <div>平行四边形demo</div>
    </div>
    <div class="page-qiej">
      <div>hello hello hello hello hello hello hello hello hello hello hello hello</div>
      <div>hello hello hello hello hello hello hello hello hello hello hello hello</div>
      <div>hello hello hello hello hello hello hello hello hello hello hello hello</div>
      <div>hello hello hello hello hello hello hello hello hello hello hello hello</div>
    </div>
    <div class="page-lx">
      <div>hhhhhhh</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &-tixing {
    font-size: 24px;
    margin: 2em 1em;
    display: flex;
    justify-content: space-between;
    p {
      position: relative;
      padding: 0.5em 2em;
      &::before {
        content: '';
        width: 7em;
        height: 4em;
        position: absolute;
        top: -1em;
        left: 0.5em;
        background: #f6dee9;
        z-index: -1;
        transform: scaleY(1.5) perspective(100px) rotateX(30deg);
        transform-origin: bottom;
        border-radius: 0.5em 0.5em 0 0;
        border: 4px solid #fbabd1;
        border-bottom: none;
        background-image: linear-gradient(
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0)
        );
        box-shadow: 0 0.1em white inset;
      }
      &:nth-child(2)::before {
        transform-origin: bottom left;
      }
      &:nth-child(3)::before {
        transform-origin: bottom right;
      }
    }
  }
  &-tixing2 {
    margin: 2em 1em;
    height: 0;
    width: 100px;
    border-top: 100px solid #f6dee9;
    border-right: 37px solid transparent;
    position: relative;
    // border-radius: .5em;
    // border-top-right-radius: .5em;
    // border-top-left-radius: .5em;
    // border-bottom-left-radius: .5em;
    p {
      position: absolute;
      left: calc(50% - 10px);
      top: -80px;
    }
  }
  &-px1 {
    // text-align: center;
    font-size: 24px;
    width: 5em;
    background: #f6dee9;
    margin: 0 auto;
  }
  &-qiej {
    width: 10em;
    font-size: 24px;
    margin: 2em auto;
    word-break: break-all;
    word-wrap: break-word;
    div {
      padding: 1em;
      background: #dab1b1;
      background: linear-gradient(-45deg, transparent 1em, #58a 0);
      margin-bottom: 1em;
      &:nth-child(2) {
        background: linear-gradient(-45deg, transparent 15px, #58a 0) right,
          linear-gradient(45deg, transparent 15px, #655 0) left;
        background-size: 50% 100%;
        background-repeat: no-repeat;
      }
      &:nth-child(3) {
        background: linear-gradient(-45deg, transparent 15px, #58a 0) bottom
            right,
          linear-gradient(45deg, transparent 15px, #58a 0) bottom left,
          linear-gradient(135deg, transparent 15px, #58a 0) top left,
          linear-gradient(-135deg, transparent 15px, #58a 0) top right;
        background-size: 50% 60%;
        background-repeat: no-repeat;
      }
      &:nth-child(4) {
        background: radial-gradient(
              circle at bottom right,
              transparent 15px,
              #58a 0
            )
            bottom right,
          radial-gradient(circle at bottom left, transparent 15px, #58a 0)
            bottom left,
          radial-gradient(circle at top left, transparent 15px, #58a 0) top left,
          radial-gradient(circle at top right, transparent 15px, #58a 0) top
            right;
        background-size: 50% 60%;
        background-repeat: no-repeat;
      }
    }
  }
  &-lx {
    width: 10em;
    height: 10em;
    font-size: 24px;
    margin: 4em auto;
    border: 1px solid #fbabd1;
    transform: rotate(45deg);
    div {
      padding: 3em;
      transform: rotate(-45deg);
    }
  }
}
</style>

