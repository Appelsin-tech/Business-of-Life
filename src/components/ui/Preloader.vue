<template>
  <div class="preloader">
    <div class='spinner'>
      <div class='dot'></div>
      <div class='dot'></div>
      <div class='dot'></div>
    </div>
    <svg>
      <defs>
        <filter id='goo'>
          <feGaussianBlur in='SourceGraphic' stdDeviation='8' result='blur' />
          <feColorMatrix in='blur' mode='matrix' values='
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 50 -8' result='goo' />
          <feBlend in='SourceGraphic' in2='goo' />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style scoped lang="less">
  .preloader {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.85);
    z-index: 999;
  }

  @keyframes rotate {
    from {
      transform: translateX(0) translateY(0);
    }
    20% {
      transform: translateX(0) translateY(0);
    }
    25% {
      transform: translateX(0) translateY(calc(var(--spinner-size) - var(--dot-size)));
    }
    45% {
      transform: translateX(0) translateY(calc(var(--spinner-size) - var(--dot-size)));
    }
    50% {
      transform: translateX(calc(var(--spinner-size) - var(--dot-size))) translateY(calc(var(--spinner-size) - var(--dot-size)));
    }
    70% {
      transform: translateX(calc(var(--spinner-size) - var(--dot-size))) translateY(calc(var(--spinner-size) - var(--dot-size)));
    }
    75% {
      transform: translateX(calc(var(--spinner-size) - var(--dot-size))) translateY(0);
    }
    95% {
      transform: translateX(calc(var(--spinner-size) - var(--dot-size))) translateY(0);
    }
  }
  .spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    height: var(--spinner-size);
    width: var(--spinner-size);
    transform: translateX(-50%) translateY(-50%);
    > .dot {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      filter: url('#goo');
      &:nth-of-type(1) {
        &:before {
          animation-delay: var(--delay);
        }
      }
      &:nth-of-type(2) {
        transform: rotate(90deg);

        &:after {
          animation-delay: calc(var(--duration) / 12);
        }
        &:before {
          animation-delay: calc(var(--duration) / 12 + var(--delay));
        }
      }
      &:nth-of-type(3) {
        transform: rotate(180deg);

        &:after {
          animation-delay: calc(var(--duration) / 6);
        }
        &:before {
          animation-delay: calc(var(--duration) / 6 + var(--delay));
        }
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: #101a63;
        height: calc(var(--dot-size));
        width: calc(var(--dot-size));
        border-radius: 50%;
        animation: rotate var(--duration) linear infinite;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(16, 26, 99, 0.76);
        height: var(--dot-size);
        width: var(--dot-size);
        border-radius: 50%;
        animation: rotate var(--duration) linear infinite;
      }
    }
  }
</style>
