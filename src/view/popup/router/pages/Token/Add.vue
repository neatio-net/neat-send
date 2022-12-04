<template>
    <div>
        <van-nav-bar
                :title="$t('l.token.add.title')"
                @click-left="onClickLeft"
                left-arrow
                :fixed="true"
                :placeholder="true"/>
        <div v-loading="loading">
            <div>
                <van-cell class="walletxt" :border="false" :title="$t('l.token.add.txt')"/>
                <van-field
                        @blur="selectContract"
                        v-model="model.contract"
                        :placeholder="$t('l.token.add.txt1')"/>
                <van-cell class="walletxt" :border="false" :title="$t('l.token.add.txt2')"/>
                <van-field
                        :disabled="is"
                        v-model="model.symbol"
                        :placeholder="$t('l.token.add.txt3')"/>
                <van-cell class="walletxt" :border="false" :title="$t('l.token.add.txt4')"/>
                <van-field
                        :disabled="is"
                        v-model="model.decimal"
                        :placeholder="$t('l.token.add.txt5')"/>
                <div>
                    <el-button v-if="is" @click="is=false" style="font-size: 16px;margin-left: 14px" type="text">
                        {{$t('l.token.add.txt6')}}
                    </el-button>
                </div>
                <van-cell class="walletxt" style="visibility: hidden" :border="false" title=""/>
            </div>

            <div style="margin: 16px;padding-bottom: 40px">
                <van-button @click="save" round block type="info">{{$t('l.token.add.btn')}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
  import Web3 from 'web3';
  import axios from 'axios';

  let web3 = new Web3();
  export default {
    name: 'AddCoin',
    data() {
      return {
        loading: false,
        model: {
          contract: '',
          symbol: '',
          decimal: '',
        },
        is: true,
      };
    },
    methods: {
      async selectContract() {
        this.loading = true;
        let getsymbol = web3.eth.abi.encodeFunctionCall({
          name: 'symbol',
          type: 'function',
          inputs: [],
        }, []);
        let res = await axios.post(this.$store.state.network.rpcUrls[0], {
          'jsonrpc': '2.0',
          'method': 'eth_call',
          'params': [
            {
              'to': this.model.contract,
              'data': getsymbol,
            },
            'latest',
          ],
          'id': 1,
        });
        this.model.symbol = web3.utils.hexToString(res.data.result);
        this.model.symbol = this.model.symbol.substring(33);
        let getdecimal = web3.eth.abi.encodeFunctionCall({
          name: 'decimals',
          type: 'function',
          inputs: [],
        }, []);
        let ress = await axios.post(this.$store.state.network.rpcUrls[0], {
          'jsonrpc': '2.0',
          'method': 'eth_call',
          'params': [
            {
              'to': this.model.contract,
              'data': getdecimal,
            },
            'latest',
          ],
          'id': 1,
        });
        this.model.decimal = web3.utils.hexToNumberString(ress.data.result);
        this.loading = false;
      },
      onClickLeft() {
        this.$router.back(-1);
      },
      async save() {
        if(this.model.contract.trim()==''){
          this.$message({
            showClose: true,
            message: 'Contract cannot be empty',
            type: 'error',
          });
          return;
        }
        if(this.model.decimal.trim()==''){
          this.$message({
            showClose: true,
            message: 'Decimal cannot be empty',
            type: 'error',
          });
          return;
        }
        if(this.model.symbol.trim()==''){
          this.$message({
            showClose: true,
            message: 'Symbol cannot be empty',
            type: 'error',
          });
          return;
        }
        
        let t = true;
        this.$store.state.wallet.list.forEach(item => {
          if (item.contract.toLocaleLowerCase() == model.contract.toLocaleLowerCase()
            && item.chainId == model.chainId) {
            t = false;
          }
        });
        if (t) {
          this.$store.state.wallet.list.push(model);
          await this.$g.save({
            key: this.$store.state.wallet.addr,
            value: this.$store.state.wallet,
          });
          this.$router.push({ path: '/' });
        } else
          {
          this.$message({
            showClose: true,
            message: this.$t('l.token.add.txt7'),
            type: 'error',
          });
        }
      },
    },
    async created() {
    },
  };
</script>

<style scoped>

</style>
