<template>
    <div>
        <van-nav-bar
                :title="$t('l.token.import.title')"
                @click-left="onClickLeft"
                left-arrow
                :fixed="true"
                :placeholder="true"/>
        <div>
            <div style="text-align: center">
                <el-button @click="addcoin" style="font-size: 16px;margin: 10px 0px;" type="text">
                    {{$t('l.token.add.title')}}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ImportToken',
    data() {
      return {
        list: [],
        result: [],
        loading: false,
      };
    },
    methods: {
      addcoin() {
        this.$router.push({ path: '/AddToken' });
      },
      

      onClickLeft() {
        this.$router.back(-1);
      },
    },
    async created() {
      this.loading = true;
      let list = await this.$g.account.tokenlist(this.$store.state.network.blockExplorerUrls[0], this.$store.state.wallet.addr);
      this.$store.state.wallet.list.forEach(item => {
        list.forEach(items => {
          if (item.contract.toLocaleLowerCase() == items.contractAddress.toLocaleLowerCase()) {
            items.radio = items.contractAddress.toLocaleLowerCase();
          }
        });
      });
      this.list = list;
      this.loading = false;
    },
  };
</script>

<style scoped>

</style>
