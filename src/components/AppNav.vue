<template>
  <aside class="b-nav">
    <ul class="dots-wrapper">
      <li>
        <router-link active-class="active" class="dots" to="/main"></router-link>
      </li>
      <li>
        <router-link active-class="active" class="dots" to="/learning-stages"></router-link>
      </li>
      <li>
        <router-link active-class="active" class="dots" to="/description"></router-link>
      </li>
      <li>
        <router-link active-class="active" class="dots" to="/our-coach"></router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'AppNav'
}
</script>

<style scoped lang="less">
  @import "../assets/less/_importants";
  .b-nav {
    position: fixed;
    right: 50px;
    top: 50%;
    z-index: 9999;
    .dots-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      >li {
        &:not(&:last-child) {
          margin-bottom: 20px;
        }
        .dots {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          background-size: 15px 15px;
          &::after {
            content: '';
            display: inline-block;
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #fff;
          }
          &.active {
            &::after {
              background: red;
            }
          }
        }
      }
    }
  }
</style>
