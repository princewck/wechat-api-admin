<template>
  <div class="detail">
    <div class="img">
      <img :src="data.pict_url" :title="data.num_iid" />
    </div>
    <div class="info">
      <h1><a target="_blank" :href="data.click_url">{{ data.title }}</a></h1>
      <p>
        <label>一口价：{{ data.reserve_price }}</label>
        <label>折扣价：{{ data.zk_final_price }}</label>
      </p>
      <p>
        <label v-if="data.coupon_click_url">红包：<a :href="data.coupon_click_url">{{ data.coupon_info }}</a></label>
        <label v-if="data.coupon_click_url">{{ data.coupon_start_time }} - {{ data.coupon_end_time }}</label>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: ['data'],
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';
.detail {
  @include Flex(row nowrap, flex-start, center);
  height: 150px;
  .img {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    margin-right: 25px;
    img {
      width: 100px;
    }
  }

  .info {
    h1 {
      font-size: 16px;
      margin-bottom: 15px;
    }

    p {
      line-height: 1.5;
      margin-bottom: 10px;
      label {
        &:last-child {
          margin-left: 25px;
        }
      }
    }
  }
}

a {
  color: #666;
  text-decoration: none;
  &:hover {
    color: rgb(235, 27, 165);
  }
}
</style>