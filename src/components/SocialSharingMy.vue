<template>
  <div class="sharing-social">
    <p class="desc">Поделиться в соц. сетях</p>
    <social-sharing :url="`http://bol.mrpelktn.beget.tech/news/${shareObject.url}`"
                    :title="shareObject.title"
                    :description="shareObject.snippet"
                    quote="Vue is a progressive framework for building user interfaces."
                    twitter-user="vuejs"
                    inline-template>
      <div class="social">
        <network network="facebook" class="link fb">
          <icon-facebook class="g-icon"/>
        </network>
        <network network="odnoklassniki" class="link ok">
          <icon-odnoklassniki class="g-icon"/>
        </network>
        <network network="telegram" class="link tg">
          <icon-telegram class="g-icon"/>
        </network>
        <network network="twitter" class="link tw">
          <icon-twitter class="g-icon"/>
        </network>
        <network network="vk" class="link vk">
          <icon-vk class="g-icon"/>
        </network>
      </div>
    </social-sharing>
  </div>
</template>

<script>
export default {
  name: 'SocialSharingMy',
  props: ['shareObject'],
  computed: {
    // tags() {
    //   return this.shareObject.tags.join(' ')
    // }
  }
}
</script>

<style lang="less">
  .sharing-social {
    .desc {
      margin-bottom: 15px;
    }
    .social {
      .link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 6px;
        width: 30px;
        height: 30px;
        border-radius: 3px;
        cursor: pointer;
        &.fb {
          background: #3b5998;
        }
        &.ok {
          background: #ed812b;
        }
        &.tg {
          background: #0088cc;
        }
        &.tw {
          background: #1da1f2;
        }
        &.vk {
          background: #45668e;
        }
        .g-icon {
          width: 20px;
          height: 20px;
          color: #fff;
        }
      }
    }
  }
</style>
