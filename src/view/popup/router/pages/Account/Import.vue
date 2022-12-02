<template>
    <div>
        <van-nav-bar
                :title="$t('l.account.import.title')"
                @click-left="onClickLeft"
                left-arrow
                :fixed="true"
                :placeholder="true"/>
        <div>
            <van-tabs v-model="active">
                <van-tab :title="$t('l.account.import.txt')">
                    <van-cell-group>
                        <van-cell class="walletxt" :border="false" :title="$t('l.account.import.txt')"/>
                        <van-field
                                v-model="privatekey.key"
                                rows="2"
                                type="textarea"
                                :placeholder="$t('l.account.import.txt1')"/>
                        <van-cell class="walletxt" :border="false" :title="$t('l.account.import.txt2')"/>
                        <van-field v-model="privatekey.name"
                                   :placeholder="$t('l.account.import.txt3')"/>
                        <div v-if="passshow">
                            <van-cell class="walletxt" :border="false" :title="$t('l.account.import.txt4')"/>
                            <van-field v-model="privatekey.pass1" type="password"
                                       :placeholder="$t('l.account.import.txt5')"/>

                            <van-cell class="walletxt" :border="false"
                                      :title="$t('l.account.import.txt6')"/>
                            <van-field v-model="privatekey.pass2" type="password"
                                       :placeholder="$t('l.account.import.txt7')"/>

                        </div>

                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button @click="privatekeySave" round block type="info">{{$t('l.account.import.btn')}}
                        </van-button>
                    </div>
                </van-tab>
                               <van-tab title="Mnemonic">Mnemonic</van-tab>
                           <van-tab title="Address">Address</van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Import',
    data() {
      return {
        active: 0,
        privatekey: {
          key: '',
          name: '',
          pass1: '',
          pass2: '',
        },
        passshow: true,
      };
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1);
      },
      async privatekeySave() {
        if (this.privatekey.name.trim() == '') {
          this.$message({
            showClose: true,
            message: 'Wallet Name cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.privatekey.pass1.trim() == '') {
          this.$message({
            showClose: true,
            message: 'Wallet Password cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.privatekey.pass1.trim() != this.privatekey.pass2.trim()) {
          this.$message({
            showClose: true,
            message: 'The wallet password is different twice',
            type: 'error',
          });
          return;
        }
        if (this.privatekey.pass1.length < 9) {
          this.$message({
            showClose: true,
            message: 'Password length must be greater than 9 digits',
            type: 'error',
          });
          return;
        }
        if (this.privatekey.key.indexOf('0x') == 0) {
          this.privatekey.key = this.privatekey.key.slice(2);
        }

        let img = 'data:image/png;base64,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';
        let addr = this.$g.address(this.privatekey.key);
        if(addr==''){
          this.$message({
            showClose: true,
            message: 'Wrong privatekey',
            type: 'error',
          });
         return
        }
        let model = {
          name: this.privatekey.name,
          addr: addr,
          imgis:true,
          img:img,
          encrypt: this.$g.encrypt(this.privatekey.key, this.privatekey.pass1),
          list: [
            {
              sum: 0,
              logo: img,
              decimals: 18,
              symbol: 'NEAT',
              contract: '',
            },
          ],
        };
        await this.$g.save({
          key: addr,
          value: model,
        });
        await this.$g.save({
          key: 'addr',
          value: {
            addr: addr,
          },
        });

        this.$g.account.transferdata({
          addr: addr,
          pass: this.privatekey.pass1,
        });
        this.$store.commit('setWallet', model);
        this.$router.push({ path: '/' });

      },
    },
    async created() {
      let wallet = await this.$g.account.login(this);
      let accountlist = await this.$g.account.selectAll();
      this.privatekey.name = 'wallet' + (accountlist.length + 1);

      if (wallet != '') {
        this.$store.commit('setWallet', wallet);
        let prv = await this.$g.account.getprv();
        if (prv == '') {
          alert('error');
        } else {
          this.privatekey.pass1 = prv.pass;
          this.privatekey.pass2 = prv.pass;
          this.passshow = false;
        }
      } else {
        await this.$g.network.init(this);
      }
    },
  };
</script>

<style scoped>

</style>
