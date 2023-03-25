<template>
    <div>
        <!-- NAV BAR -->
        <!-- <div style="padding:10px 0px;background: #f7f8fa">
            <van-row>
                <van-col span="4">
           
                </van-col>
                <van-col @click="switchChain=true" span="16"
                         style="text-align: center;line-height: 40px;cursor: pointer">
                    <div style="color: #2F4266;font-size:14px;height: 30px;width: 80%;margin-left: 10%;margin-top: 8px;line-height: 30px;">
                        {{$store.state.network.chainName}}
                        <van-icon color="#2F4266" name="arrow-down"/>
                    </div>
                </van-col>
            
                <van-col span="4" @click="switchAcc">
                    <div style="overflow: hidden;position: relative;border: 2px solid #037dd6;cursor: pointer;width: 40px;height: 40px;border-radius: 50%">
                        <img v-if="$store.state.wallet.img&&!$store.state.wallet.imgis"
                             style="position: absolute;top: -20px;width: 80px;left: -20px;"
                             :src="$store.state.wallet.img"/>
                        <img v-if="$store.state.wallet.img&&$store.state.wallet.imgis"
                             style="position: absolute;width: 40px;"
                             :src="$store.state.wallet.img"/>
                    </div>
                </van-col>
            </van-row>
        </div> -->


        <div style="height:64px;background: #192841;width: 100%;border-bottom: 1px solid #ebedf0;">
          <van-col span="4" @click="switchAcc">
                    <div style="overflow: hidden;position: relative;border: 2px solid #037dd6;cursor: pointer;width: 40px;height: 40px;border-radius: 50%">
                        <img v-if="$store.state.wallet.img&&!$store.state.wallet.imgis"
                             style="position: absolute;top: -20px;width: 80px;left: -20px;"
                             :src="$store.state.wallet.img"/>
                        <img v-if="$store.state.wallet.img&&$store.state.wallet.imgis"
                             style="position: absolute;width: 40px;"
                             :src="$store.state.wallet.img"/>
                    </div>
                </van-col>
            <van-col span="12" class="addrcopy" style="text-align: center;height: 100%;cursor: pointer"
                     v-clipboard:copy="$store.state.wallet.addr"
                     v-clipboard:success="onCopy"
                     v-clipboard:error="onError">
                <el-tooltip class="item" effect="dark" :content="copytxt" placement="bottom">
                    <div>
                        <div style="color: #323233;font-size: 18px;margin-top: 10px">{{$store.state.wallet.name}}</div>
                        <div style="margin-top: 4px">{{$g.subname($store.state.wallet.addr)}}
                            <img style="width: 10px" src="../../../../assets/copy.png"></div>
                    </div>
                </el-tooltip>

            </van-col>
            <van-col span="6" style="text-align: right;">
                <el-dropdown @command="handleCommand"
                             style="height: 60px;width: 60px; line-height: 60px;text-align: center;" trigger="click">
                      <span style="cursor: pointer;font-size: 20px;" class="el-dropdown-link">
                       <i class="el-icon-more"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="lock" icon="el-icon-lock">
                            Lock Wallet
                        </el-dropdown-item>

                        <!-- <el-dropdown-item @click="switchAcc" icon="el-icon-share">
                            Wallets
                        </el-dropdown-item> -->

                        <el-dropdown-item command="accountDetails" icon="el-icon-user">
                          Account Detail
                        </el-dropdown-item>
                        <el-dropdown-item command="viewAsset" icon="el-icon-paperclip">
                          View On Explorer
                        </el-dropdown-item>
                        <el-dropdown-item command="hide" icon="el-icon-delete">
                          Manage Accounts
                        </el-dropdown-item>
                        <!-- <el-dropdown-item command="language" icon="el-icon-setting">
                            Language
                        </el-dropdown-item> -->


                    </el-dropdown-menu>
                </el-dropdown>
            </van-col>
        </div>
        <div v-if="$store.state.wallet.list">
            <div style="text-align: center;margin-top: 14px">
                <img style="cursor: pointer;width: 40px;height: 40px;border-radius: 50%"
                     :src="$store.state.wallet.list[0].logo"/>
            </div>
            <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 28px">
                <span v-if="$store.state.wallet.list">{{$store.state.wallet.list[0].sum}}</span>
                {{$store.state.wallet.list[0].symbol}}
            </div>
            <!-- <div @click="accountSend" style="text-align: center;margin-top: 14px">
                <el-button type="primary" icon="el-icon-top-right" square></el-button>
                <div style="color: #037dd6;font-size: 14px;margin-top: 6px">
                    Send
                </div>
            </div> -->
            <button class="btnSend">SEND</button>

        </div>
        <div v-if="$store.state.wallet.list" style="margin-top: 20px;">
            <van-tabs :title-active-color="'#037dd6'" v-model:active="activeName">
                <van-tab title="Assets">
                    <div v-for="(item,index) in $store.state.wallet.list"
                         @click="accountTransaction(index,item)"
                    >
                        <div class="addrcopy"
                             style="cursor: pointer;position: relative;display: flex;align-items: center;height: 80px;border-bottom: 1px solid #f2f2f2"
                             v-if="item.contract==''">
                            <img style="width: 46px;margin-left: 16px;border-radius: 50%"
                                 :src="item.logo">
                            <div style="margin-left: 16px;position: relative;font-size: 18px;">
                                {{item.sum}} {{item.symbol}}
                            </div>
                            <div style="position: absolute;right: 12px">
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                        <div class="addrcopy"
                             style="cursor: pointer;position: relative;display: flex;align-items: center;height: 80px;border-bottom: 1px solid #f2f2f2"
                             v-if="item.contract!=''&&item.chainId==$store.state.network.chainId">
                            <img style="width: 46px;margin-left: 16px;border-radius: 50%"
                                 :src="item.logo">
                            <div style="margin-left: 16px;position: relative;font-size: 18px;">
                                {{parseFloat(item.sum).toLocaleString()}} {{item.symbol}}
                            </div>
                            <div style="position: absolute;right: 12px">
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <!-- <van-tab title="NFT-test">
                    <van-collapse v-model="activeNames" v-if="nftlist.length!=0">
                        <van-collapse-item
                                v-for="item in nftlist"
                                :key="item.contract"
                                :title="item.name" :name="item.contract">
                            <div @click="selectnftfn(item,index)" style="cursor: pointer;float: left;overflow: hidden"
                                 v-for="(items,index) in item.list">
                                <el-image
                                        :key="items.image"
                                        style="width: 100px; height: 100px;padding-right: 15px;"
                                        :src="items.image"
                                        :error="'error'">
                                    <div slot="error" style="height: 100px;line-height: 100px;text-align: center;"
                                         class="image-slot">
                                        Error
                                    </div>
                                </el-image>
                                <div style="cursor: pointer;padding-bottom: 10px;">
                                    # {{items.nftname}}
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                    <div style="text-align: center;margin-top: 20px">
                        <div style="color: #646566;font-size: 14px">
                            Don't see your NFT?
                        </div>
                        <div>
                            <el-button @click="addnft=true" style="font-size: 16px;    margin-top: 10px;" type="text">
                                Add NFT
                            </el-button>
                        </div>
                        <div style="height: 20px;width: 100%">
                        </div>
                    </div>
                </van-tab> -->
            </van-tabs>
        </div>
        <Loginshow :windowis="is" :show="show"></Loginshow>
         <!-- ACC LIST-->
        <van-popup
                class="popup"
                v-model="switchaccountshow"
                closeable
                position="left"
                :style="{ width: '100%',height: '100%' }">
            <div style="margin-top: 50px;position: relative">
                <div style="height: 502px;">
                    <div v-for="item in accountlist" @click="switchaccount(item)" :key="item.key" style="overflow: hidden;cursor: pointer;background-color: #192841;display: flex;flexDirection: row;align-items: center;position: relative;
            margin: 14px;margin-top: 4px;height: 80px;border-radius: 5px;padding-bottom: 0;padding-top: 0;position: relative;box-shadow: 0 0 9px rgba(14, 61, 118, .16);">
                        <div style="float: left;overflow: hidden;position: relative;margin-left: 14px;cursor: pointer
                        ;width: 70px;height: 52px;
                        border-radius: 50%">
                            <img v-if="!item.value.imgis"
                                 style="position: absolute;top: -24px;width: 100px;left: -24px;"
                                 :src="item.value.img"/>
                            <img v-if="item.value.imgis" style="position: absolute;width: 40px;"
                                 :src="item.value.img"/>
                        </div>
                        <div style="height: 100%;width: 100%;margin-left: 4px;margin-right: 14px">
                            <div style="margin-top:12px;overflow: hidden">
                                <div class="txtCr" style="width: 40%;float: left">
                                    {{item.value.name}}
                                </div>
                                <div class="txtCr" style="margin-top: 3px;width: 60%;float: left;text-align: right;">
                                    {{item.value.list[0].sum}} {{item.value.list.symbol}}
                                </div>
                            </div>
                            <div style="font-size: 12px;color: #b4b4b4;text-align: left;margin-top: 8px;word-break: break-all;">
                                {{item.value.addr}}
                            </div>
                        </div>

                        <div v-if="$store.state.wallet.addr==item.value.addr"
                             style="position: absolute;top:0;left: 0;background-color: #3C7BFF;width: 26px;height: 20px;border-top-left-radius: 6px;border-bottom-right-radius: 20px">
                            <img style="width: 20px;height: 20px;margin-left: 2px" src="../../../../assets/select.png"/>
                        </div>
                    </div>
                </div>
                <div style="font-size: 16px;width:100%;bottom: 0;height: 48px; border-top:1px solid #efeff4;line-height: 48px;text-align: center;">
                    <div @click="accountImport"
                         style="cursor: pointer;width: 50%;background-color: #192841;float: left;height: 100%;color: #3C7BFF">
                        {{ $t('l.index.txt2')}}
                    </div>
                    <div @click="accountCreate"
                         style="cursor: pointer;width: 50%;background-color: #3C7BFF;float: left;height: 100%;color: #192841;">
                        {{ $t('l.index.txt3')}}
                    </div>
                </div>
            </div>
        </van-popup>
         <!-- ACC L END -->
        <van-popup
                class="Transaction popup"
                v-model="accountDetails"
                closeable
                position="left"
                :style="{ height: '100%',width:'100%' }">
            <div>
                <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 22px">
                    {{ $t('l.index.txt5')}}
                </div>
                <div v-if="$store.state.wallet.list" style="text-align: center;margin-top: 14px">
                    <img style="cursor: pointer;width: 40px;height: 40px;border-radius: 50%"
                         :src="$store.state.wallet.list[0].logo"/>
                </div>
                <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 18px">
                    <div v-if="!walletnameis">
                        {{$store.state.wallet.name}}
                        <el-button @click="walletnamefn" style="font-size: 14px;;margin-left: 10px" :size="'mini'"
                                   icon="el-icon-edit-outline"
                                   circle>
                        </el-button>
                    </div>
                    <div v-if="walletnameis" style="position: relative;width: 74%;margin: 0 auto">
                        <el-input v-model="walletname"></el-input>
                        <div style="position: absolute;top: 4px;right: -40px;">
                            <el-button @click="walletnamesavefn" style="font-size: 14px;;margin-left: 10px"
                                       :size="'mini'"
                                       icon="el-icon-check"
                                       circle>
                            </el-button>
                        </div>
                    </div>
                </div>
                <div style="text-align: center">
                    <canvas id="canvas"></canvas>
                </div>
                <div style="height:64px;padding-bottom: 40px;background: #192841;width: 100%;border-bottom: 1px solid #ebedf0;">
                    <van-col span="4"></van-col>
                    <van-col span="16" class="addrcopy" style="text-align: center;height: 100%;cursor: pointer"
                             v-clipboard:copy="$store.state.wallet.addr"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError">
                        <el-tooltip class="item" effect="dark" :content="copytxt" placement="bottom">
                            <div>
                                <div style="margin-top: 4px;font-size: 16px;word-break: break-word;">
                                    {{$store.state.wallet.addr}}
                                    <img style="width: 10px" src="../../../../assets/copy.png"></div>
                            </div>
                        </el-tooltip>
                    </van-col>
                    <van-col span="4"></van-col>
                </div>
                <div style="position: absolute;bottom: 20px;width: 100%">
                    <div style="margin: 16px;">
                        <van-button @click="openblock" round block type="info">View account at blockscout.com
                        </van-button>
                    </div>
                    <div style="margin: 16px;">
                        <van-button @click="exportprivate" round block type="info">{{
                            $t('l.account.transaction.txt6')}}
                        </van-button>
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup
                class="popup"
                v-model="showprv"
                closeable
                position="left"
                :style="{ height: '100%',width:'100%' }">
            <div>
                <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 22px">
                    {{ $t('l.account.transaction.txt7')}}
                </div>
                <div style="text-align: center;margin-top: 14px">
                    <img style="cursor: pointer;width: 40px;height: 40px;border-radius: 50%"
                         :src="$g.coin.logo"/>
                </div>
                <el-alert
                        style="margin-bottom: 40px;margin-top: 40px"
                        :title="$t('l.account.transaction.txt8')"
                        type="info"
                        effect="dark">
                </el-alert>

                <div style="height:86px;padding-bottom: 40px;background: #192841;width: 100%">
                    <van-col span="2"></van-col>
                    <van-col span="20" class="addrcopy"
                             style="border: 1px solid #ebedf0;;text-align: center;height: 100%;cursor: pointer"
                             v-clipboard:copy="wif.plaintext"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError">
                        <el-tooltip class="item" effect="dark" :content="copytxt" placement="bottom">
                            <div>
                                <div style="padding: 10px;;margin-top: 4px;font-size: 16px;word-break: break-word;">
                                    {{wif.plaintext}}
                                    <img style="width: 10px" src="../../../../assets/copy.png"></div>
                            </div>
                        </el-tooltip>
                    </van-col>
                    <van-col span="2"></van-col>
                </div>
                <el-alert
                        :title="$t('l.account.transaction.txt9')"
                        type="warning"
                        effect="dark">
                </el-alert>
            </div>
        </van-popup>
        <van-popup
                class="popup"
                v-model="hide"
                closeable
                position="left"
                :style="{ height: '100%',width:'100%' }">
            <div>
                <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 22px">
                    {{ $t('l.index.txt7')}}?
                </div>
                <div v-if="$store.state.wallet.list" style="text-align: center;margin-top: 14px">
                    <img style="cursor: pointer;width: 40px;height: 40px;border-radius: 50%"
                         :src="$store.state.wallet.list[0].logo"/>
                </div>
                <div style="text-align: center;padding: 20px 16px;font-weight: 500;font-size: 18px;word-break: break-word;">
                    {{$store.state.wallet.name}}
                </div>
                <div style="text-align: center;padding: 20px 16px;font-weight: 500;font-size: 16px;word-break: break-word;">
                    {{$store.state.wallet.addr}}
                </div>
                <div style="color: rgb(100, 101, 102);font-size: 16px;padding: 20px 16px;word-break: break-word;">
                    {{ $t('l.index.txt8')}}
                </div>
                <div style="position: absolute;bottom: 0;width: 100%">
                    <div style="margin: 16px;">
                        <van-button @click="hidefn" round block type="info">{{ $t('l.index.txt7')}}</van-button>
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup
                class="popup"
                v-model="switchChain"
                closeable
                position="left"
                :style="{ width: '100%',height: '100%' }">
            <div style="margin-top: 50px;position: relative">
                <div style="height: 502px;overflow-y: scroll">
                    <div @click="switchChainfn(item)" v-for="(item,index) in networklist" :key="index" style="overflow: hidden;cursor: pointer;background-color: #192841;display: flex;flexDirection: row;align-items: center;position: relative;
            margin: 14px;margin-top: 4px;height: 80px;border-radius: 5px;padding-bottom: 0;padding-top: 0;position: relative;box-shadow: 0 0 9px rgba(14, 61, 118, .16);">
                        <img style="width: 52px;margin-left: 14px;border-radius: 50%"
                             :src="item.icon"/>
                        <div style="height: 100%;width: 100%;margin-left: 4px;margin-right: 14px">
                            <div style="margin-top:22px;overflow: hidden">
                                <div class="txtCr" style="font-size: 14px;float: left">
                                    {{item.chainName}}
                                </div>
                            </div>
                            <div style="font-size: 12px;color: #b4b4b4;text-align: left;margin-top: 8px;word-break: break-all;">
                                ChainId: {{item.chainId}}
                            </div>
                        </div>
                        <div v-if="item.chainId==$store.state.network.chainId"
                             style="position: absolute;top:0;left: 0;background-color: #3C7BFF;width: 26px;height: 20px;border-top-left-radius: 6px;border-bottom-right-radius: 20px">
                            <img style="width: 20px;height: 20px;margin-left: 2px" src="../../../../assets/select.png"/>
                        </div>
                        <div style="position: absolute;top: 20px;right: 10px;">
                            <el-button @click.stop="chainfn(index)" style="font-size: 14px;;margin-left: 10px"
                                       :size="'mini'"
                                       icon="el-icon-edit-outline"
                                       circle>
                            </el-button>
                        </div>
                    </div>
                </div>
                <div style="font-size: 16px;width:100%;bottom: 0;height: 48px; border-top:1px solid #efeff4;line-height: 48px;text-align: center;">
                    <div @click="addChain=true"
                         style="cursor: pointer;width: 100%;background-color: #3C7BFF;float: left;height: 100%;color: #192841;">
                        {{ $t('l.index.txt9')}}
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup
                class="addChain"
                v-model="addChain"
                closeable
                position="left"
                :style="{ width: '100%',height: '100%' }">
            <div style="">
                <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 22px">
                    {{ $t('l.index.txt9')}}
                </div>
                <div style="margin-top: 10px">
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt10')"/>
                    <van-field v-model="addChainModel.chainName" :placeholder="$t('l.index.txt11')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt12')"/>
                    <van-field v-model="addChainModel.chainId" :placeholder="$t('l.index.txt13')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt14')"/>
                    <van-field v-model="addChainModel.rpcUrls[0]" :placeholder="$t('l.index.txt15')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt16')"/>
                    <van-field v-model="addChainModel.nativeCurrency.symbol" :placeholder="$t('l.index.txt17')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt18')"/>
                    <van-field v-model="addChainModel.blockExplorerUrls[0]"
                               :placeholder="$t('l.index.txt19')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt20')"/>
                    <van-field v-model="addChainModel.nativeCurrency.decimals" :placeholder="$t('l.index.txt21')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt22')"/>
                    <van-field v-model="addChainModel.iconUrls[0]" :placeholder="$t('l.index.txt23')"/>
                    <van-cell style="visibility: hidden;padding: 0 !important;" class="walletxt" :border="false"
                              title=""/>
                </div>
                <div>
                    <div style="margin: 0px 16px;">
                        <van-button @click="saveChain" round block type="info">Save</van-button>
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup
                class="addChain"
                v-model="updateChain"
                closeable
                position="left"
                :style="{ width: '100%',height: '100%' }">
            <div style="">
                <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 22px">
                    Update Chain
                </div>
                <div v-if="updateChainModel.chainId" style="margin-top: 10px">
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt10')"/>
                    <van-field v-model="updateChainModel.chainName" :placeholder="$t('l.index.txt11')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt12')"/>
                    <van-field v-model="updateChainModel.chainId" :placeholder="$t('l.index.txt13')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt14')"/>
                    <van-field v-model="updateChainModel.rpcUrl" :placeholder="$t('l.index.txt15')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt16')"/>
                    <van-field v-model="updateChainModel.symbol" :placeholder="$t('l.index.txt17')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt18')"/>
                    <van-field v-model="updateChainModel.blockExplorerUrl"
                               :placeholder="$t('l.index.txt19')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt20')"/>
                    <van-field v-model="updateChainModel.decimals" :placeholder="$t('l.index.txt21')"/>
                    <van-cell class="walletxt" :border="false" :title="$t('l.index.txt22')"/>
                    <van-field v-model="updateChainModel.iconUrl" :placeholder="$t('l.index.txt23')"/>
                    <van-cell style="visibility: hidden;padding: 0 !important;" class="walletxt" :border="false"
                              title=""/>
                </div>
                <div style="border-top: 1px solid #ebedf0;background-color: #192841;height: 44px;padding: 10px 0;width: 100%;position: fixed;bottom: 0">
                    <el-row v-if="updateChainModel.chainId!=$store.state.network.chainId">
                        <el-col :span="12">
                            <div style="width: 80%;margin-left: 10%">
                                <van-button @click="delchain" round block type="default">Delete</van-button>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div style="width: 80%;margin-left: 10%">
                                <van-button @click="update" round block type="info">Update</van-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="updateChainModel.chainId==$store.state.network.chainId">
                        <el-col :span="24">
                            <div style="width: 80%;margin-left: 10%">
                                <van-button @click="update" round block type="info">Update</van-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </van-popup>
        <van-popup
                class="Transaction"
                v-model="connectmodel"
                closeable
                position="left"
                :style="{ width: '100%',height: '100%' }">
            <div style="">
                <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 22px">
                    Connect List
                </div>
                <div style="margin-top: 20px">
                    <div v-if="taburl!=''" style="overflow: hidden;cursor: pointer;background-color: #192841;display: flex;flexDirection: row;align-items: center;position: relative;
            margin: 14px;margin-top: 4px;border-radius: 5px;padding-bottom: 0;padding-top: 0;position: relative;box-shadow: 0 0 9px rgba(14, 61, 118, .16);">
                        <div style="padding: 20px 0px;overflow: hidden;height: 100%;width: 100%;margin-left: 4px;margin-right: 14px">
                            <div style="overflow: hidden">
                                <div class="txtCr" style="margin-left: 8px;font-size: 14px;float: left">
                                    {{taburl}}
                                </div>
                            </div>
                        </div>
                        <div style="position: absolute;top: 12px;right: 10px;">
                            <el-button @click.stop="connectaddfn()" style="font-size: 14px;;margin-left: 10px"
                                       :size="'mini'"
                                       icon="el-icon-connection"
                                       circle>
                            </el-button>
                        </div>
                    </div>
                    <div v-for="(item,index) in connectlist" :key="index" style="overflow: hidden;cursor: pointer;background-color: #192841;display: flex;flexDirection: row;align-items: center;position: relative;
            margin: 14px;margin-top: 4px;border-radius: 5px;padding-bottom: 0;padding-top: 0;position: relative;box-shadow: 0 0 9px rgba(14, 61, 118, .16);">
                        <div style="padding: 20px 0px;overflow: hidden;height: 100%;width: 100%;margin-left: 4px;margin-right: 14px">
                            <div style="overflow: hidden">
                                <div class="txtCr" style="margin-left: 8px;font-size: 14px;float: left">
                                    {{item.key}}
                                </div>
                            </div>
                        </div>
                        <div style="position: absolute;top: 12px;right: 10px;">
                            <el-button @click.stop="connectdelfn(index)" style="font-size: 14px;;margin-left: 10px"
                                       :size="'mini'"
                                       icon="el-icon-delete"
                                       circle>
                            </el-button>
                        </div>
                    </div>
                    <el-empty v-if="connectlist.length==0" description="No Connect"></el-empty>
                </div>
            </div>
        </van-popup>
        <van-popup
                v-loading="nftloading"
                v-model="addnft"
                closeable
                position="left"
                :style="{ width: '100%',height: '100%' }">
            <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 22px">
                Import NFT
            </div>
            <div style="margin-top: 10px">
                <van-cell class="walletxt" :border="false" title="Contract"/>
                <van-field v-model="nft.contract" placeholder="0x..."/>
                <van-cell class="walletxt" :border="false" title="ID"/>
                <van-field v-model="nft.id" placeholder="ID"/>
                <van-cell style="visibility: hidden;padding: 0 !important;" class="walletxt" :border="false"
                          title=""/>
            </div>
            <div style="border-top: 1px solid #ebedf0;background-color: #192841;height: 44px;padding: 10px 0;width: 100%;position: fixed;bottom: 0">
                <el-row>
                    <el-col :span="12">
                        <div style="width: 80%;margin-left: 10%">
                            <van-button @click="addnft=false" round block type="default">
                                Cancel
                            </van-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div style="width: 80%;margin-left: 10%">
                            <van-button @click="savenft" round block type="info">Add</van-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </van-popup>
        <van-popup
                v-model="selectnft"
                closeable
                position="left"
                :style="{ width: '100%',height: '100%' }">
            <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 22px">
                {{nftmodel.name}}
            </div>

            <div v-if="nftmodel.list" style="margin-top: 10px">
                <div style="text-align: center">
                    <el-image
                            style="width: 200px; height: 200px;"
                            :src="nftmodel.list[nftmodelindex].image"
                            :preview-src-list="srclist"
                            :error="'error'">
                        <div slot="error" style="height: 100px;line-height: 100px;text-align: center;"
                             class="image-slot">
                            Error
                        </div>
                    </el-image>
                </div>
                <van-cell class="walletxt" :border="false" title="ID"/>
                <van-field readOnly v-model="nftmodel.list[nftmodelindex].id"/>
                <van-cell class="walletxt" :border="false" title="Nft Name"/>
                <van-field readOnly v-model="nftmodel.list[nftmodelindex].nftname||nftmodel.name"/>
                <van-cell class="walletxt" :border="false" title="contract"/>
                <van-field readOnly v-model="nftmodel.contract"/>
                <van-cell style="visibility: hidden;padding: 0 !important;" class="walletxt" :border="false"
                          title=""/>

            </div>
            <div style="border-top: 1px solid #ebedf0;background-color: #192841;height: 44px;padding: 10px 0;width: 100%;position: fixed;bottom: 0">
                <el-row>
                    <el-col :span="12">
                        <div style="width: 80%;margin-left: 10%">
                            <van-button @click="delnft" round block type="default">
                                Delete
                            </van-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div style="width: 80%;margin-left: 10%">
                            <van-button @click="shownftis=true" round block type="info">Send</van-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </van-popup>
        <!-- <van-popup
                v-model="language"
                closeable
                position="left"
                :style="{ width: '100%',height: '100%' }">
            <div style="">
                <div style="text-align: center;margin-top: 14px;font-weight: 500;font-size: 22px">
                    {{$t('l.account.index.txt4')}}
                </div>
                <div style="margin-top: 20px">
                    <div @click="languageFn(item)" v-for="item in lang" style="overflow: hidden;cursor: pointer;background-color: #192841;display: flex;flexDirection: row;align-items: center;position: relative;
            margin: 14px;margin-top: 4px;border-radius: 5px;padding-bottom: 0;padding-top: 0;position: relative;box-shadow: 0 0 9px rgba(14, 61, 118, .16);">
                        <div style="padding: 20px 0px;overflow: hidden;height: 100%;width: 100%;margin-left: 4px;margin-right: 14px">
                            <div style="overflow: hidden">
                                <div class="txtCr" style="margin-left: 8px;font-size: 14px;float: left">
                                    {{item}}
                                </div>
                            </div>
                        </div>
                        <div v-if="item==$store.state.lang"
                             style="position: absolute;top:0;left: 0;background-color: #3C7BFF;width: 26px;height: 20px;border-top-left-radius: 6px;border-bottom-right-radius: 20px">
                            <img style="width: 20px;height: 20px;margin-left: 2px"
                                 src="../../../../assets/select.png"/>
                        </div>
                    </div>

                </div>
            </div>
        </van-popup> -->
        <van-dialog showCancelButton :cancelButtonText="'Cancel'" :confirmButtonText="'Send'" :beforeClose="sendNft"
                    v-model:show="shownftis" title="Send Nft">
            <van-cell :border="false" :title="$t('l.account.send.txt')"/>
            <van-field v-model="sendnftto" type="txt"
                       :placeholder="$t('l.account.send.txt1')"/>
        </van-dialog>
    </div>
</template>

<script>
  import Loginshow from './../../../../components/loginshow';

  const { isConfusing, confusables, rectifyConfusion } = require('unicode-confusables');

  var QRCode = require('qrcode');
  import Web3 from 'web3';
  import axios from 'axios';

  let web3 = new Web3();
  export default {
    components: {
      Loginshow,
    },
    data() {
      return {
        sendnftto: '',
        shownftis: false,
        lang: [
          'en-US',
        ],
        language: false,
        selectnft: false,
        activeNames: [],
        nftloading: false,
        addnft: false,
        updateChain: false,
        connectmodel: false,
        updateChainModel: {},
        addChainModel: {
          'chainId': 515,
          'rpcUrls': ['https://rpc.neatio.net'],
          'chainName': 'Neatio',
          'nativeCurrency': { 'name': 'NEAT', 'decimals': 18, 'symbol': 'NEAT' },
          'blockExplorerUrls': ['https://rpc.neatio.net'],
          'iconUrls': ['https://github.com/neatio-network/resources/blob/main/Logo/transparent-512x512.png'],
        },
        addChain: false,
        switchChain: false,
        hide: false,
        showprv: false,
        wif: '',
        walletnameis: false,
        walletname: '',
        accountDetails: false,
        activeName: 'Assets',
        copytxt: 'Click to copy address',
        prv: '',
        show: false,
        is: false,
        switchaccountshow: false,
        accountlist: [],
        networklist: [],
        chainindex: 0,
        connectlist: [],
        taburl: '',
        isconnect: true,
        faucet: '',
        nft: {
          id: '',
          contract: '',
          url: '',
          name: '',
        },
        nftlist: [],
        nftmodel: '',
        nftmodelindex: -1,
        srclist: [],
      };
    },
    methods: {
      async sendNft(action, done) {
        if (action == 'cancel') {
          done();
          return;
        }
        try {
          if (this.sendnftto.trim() == '') {
            this.$message({
              showClose: true,
              message: 'To address cannot be empty',
              type: 'error',
            });
            return;
          } else {
            let isAddress = this.$g.account.isAddress(this.sendnftto);
            let addr = '';
            if (!isAddress) {
              if (isConfusing(this.sendnftto)) {
                this.$message({
                  showClose: true,
                  message: this.$t('l.account.send.txt10'),
                  type: 'error',
                });
                done();
              }
              let hensjson = await this.$g.hens.getAllProperties(this.sendnftto, true);
              hensjson.listcoin.forEach(item => {
                if (item.val.toLocaleLowerCase() == this.$g.coin.symbol.toLocaleLowerCase()) {
                  addr = item.addr;
                }
              });
              if (addr == '') {
                addr = await this.$g.hens.getOwner(this.sendnftto);
              }
              isAddress = this.$g.account.isAddress(addr);
              if (!isAddress) {
                this.$message({
                  showClose: true,
                  message: 'Wrong address format',
                  type: 'error',
                });
                done();
                return;
              }
              this.sendnftto = addr;
              done();
              setTimeout(() => {
                this.shownftis = true;
              });
              return;
            }
            addr = this.sendnftto;
            let safeTransferFrom = '';
            if (this.nftmodel.contract.toLowerCase() != '0x03f4a95d964d364614e514e8638d61cdeed4f8d4'.toLowerCase()) {

              safeTransferFrom = web3.eth.abi.encodeFunctionCall({
                name: 'transferFrom',
                type: 'function',
                inputs: [{
                  type: 'address',
                  name: '_from',
                },
                  {
                    type: 'address',
                    name: '_to',
                  }, {
                    type: 'uint256',
                    name: '_tokenId',
                  }],
              }, [this.$store.state.wallet.addr, addr, this.nftmodel.list[this.nftmodelindex].id]);
            } else {
              let getNameOfTokenId = web3.eth.abi.encodeFunctionCall({
                name: 'getNameOfTokenId',
                type: 'function',
                'inputs': [
                  {
                    'internalType': 'uint256',
                    'name': 'tokenId_',
                    'type': 'uint256',
                  },
                ],
              }, [this.nftmodel.list[this.nftmodelindex].id]);
              let getName = await axios.post(this.$store.state.network.rpcUrls[0], {
                'jsonrpc': '2.0',
                'method': 'eth_call',
                'params': [{
                  'to': this.nftmodel.contract,
                  'data': getNameOfTokenId,
                }, 'latest'],
                'id': 1,
              });

              function hex_to_ascii(str1) {
                let hex = str1.toString();
                let str = '';
                for (let n = 0; n < hex.length; n += 2) {
                  str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
                }
                return str;
              }

              let tt = web3.eth.abi.decodeLog(['bytes'], getName.data.result);
              let name = web3.utils.hexToString(tt[0]);
              if (isConfusing(name)) {
                name = hex_to_ascii(tt[0]);
                name = JSON.stringify(name);
                name = name.split('u0000')[1];
                name = name.split('"')[0];
              }
              name = name.toLowerCase();
              name=name.slice(0, -4)
              safeTransferFrom = web3.eth.abi.encodeFunctionCall({
                name: 'transfer',
                type: 'function',
                inputs: [{
                  type: 'address',
                  name: 'to',
                }, {
                  type: 'string',
                  name: 'name_',
                }],
              }, [addr, name]);
            }


            let prv = await this.$g.account.getprv();

            let wif = await this.$g.decrypt(this.$store.state.wallet.encrypt, prv.pass);

            let nonce = await this.$g.account.getNonce({
              rpc: this.$store.state.network.rpcUrls[0],
              addr: this.$store.state.wallet.addr,
            });
            let model = {
              nonce: web3.utils.toHex(nonce),
              to: this.nftmodel.contract,
              gas: 26000,
              value: '0x0',
              gasPrice: web3.utils.toWei('1', 'Gwei'),
              data: safeTransferFrom,
              common: {
                baseChain: 'mainnet',
                hardfork: 'petersburg',
                customChain: {
                  name: this.$store.state.network.chainName,
                  chainId: web3.utils.hexToNumber(this.$store.state.network.chainId),
                  networkId: web3.utils.hexToNumber(this.$store.state.network.chainId),
                },
              },
            };
            let gas = {
              'from': this.$store.state.wallet.addr,
              'to': model.to,
              'data': model.data,
            };
            if (gas.data == '0x0') {
              delete gas.data;
            }
            if (gas.value == '0' || gas.value == '0x0') {
              delete gas.value;
            }
            let feegaslimit = await this.$g.account.eth_estimateGas(this.$store.state.network.rpcUrls[0], gas);
            if (model.gas < feegaslimit) {
              model.gas = feegaslimit;
            }
            let tx = await web3.eth.accounts.signTransaction(model, wif.plaintext);

            let hash = await this.$g.account.eth_sendRawTransaction(this.$store.state.network.rpcUrls[0], tx.rawTransaction);

            if (hash != '404') {
              this.$message({
                showClose: true,
                message: 'Send Success:' + hash.transaction,
                type: 'success',
              });
              this.delnft();
            } else {
              this.$message({
                showClose: true,
                message: 'Send Error',
                type: 'error',
              });
            }
            done();
          }
        } catch (e) {

        }

      },
      languageFn(item) {
        this.$store.commit('setLang', item);
        this.$i18n.locale = item;
        this.language = false;
      },
      async delnft() {
        let nftlist = await this.$g.select('nftlist');
        if (nftlist == '') {
          nftlist = [];
        }
        let t = -1;
        nftlist.forEach((item, index) => {
          if (item.contract == this.nftmodel.contract && item.chainId == this.nftmodel.chainId
            && item.addr == this.nftmodel.addr) {
            t = index;
          }
        });
        if (t != -1) {
          nftlist[t].list.splice(this.nftmodelindex, 1);
          if (nftlist[t].list.length == 0) {
            nftlist.splice(t, 1);
          }
        }
        await this.$g.save({
          key: 'nftlist',
          value: nftlist,
        });
        this.loadnft();
        this.selectnft = false;

      },
      async selectnftfn(item, index) {
        this.selectnft = true;
        this.nftmodel = item;
        this.nftmodelindex = index;
        this.srclist = [item.list[index].image];
      },
      async savenft() {
        if (this.nft.contract.trim() == '') {
          this.$message({
            showClose: true,
            message: 'NFT contract cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.nft.id.trim() == '') {
          this.$message({
            showClose: true,
            message: 'NFT id cannot be empty',
            type: 'error',
          });
          return;
        }
        this.nftloading = true;

        let owner = await this.$g.getowner(this.$store.state.network.rpcUrls[0], this.nft.contract, this.$store.state.wallet.addr,
          this.nft.id);
        if (owner == 2) {
          this.$message({
            showClose: true,
            message: 'Wrong contract address',
            type: 'error',
          });
          this.nftloading = false;
          return;
        }
        if (!owner) {
          this.$message({
            showClose: true,
            message: this.$t('l.index.txt24'),
            type: 'error',
          });
          this.nftloading = false;
          return;
        }
        let tokenNAMEabi = web3.eth.abi.encodeFunctionCall({
          name: 'name',
          type: 'function',
          inputs: [],
        }, []);
        let res = await axios.post(this.$store.state.network.rpcUrls[0], {
          'jsonrpc': '2.0',
          'method': 'eth_call',
          'params': [
            {
              'to': this.nft.contract,
              'data': tokenNAMEabi,
            },
            'latest',
          ],
          'id': 1,
        });
        let name = web3.utils.hexToString(res.data.result);
        name = name.substring(33);
        this.nft.name = name;

        let tokenURIabi = web3.eth.abi.encodeFunctionCall({
          name: 'tokenURI',
          type: 'function',
          inputs: [
            {
              type: 'uint256',
              name: '_tokenId',
            }],
        }, [this.nft.id]);

        let ress = await axios.post(this.$store.state.network.rpcUrls[0], {
          'jsonrpc': '2.0',
          'method': 'eth_call',
          'params': [
            {
              'to': this.nft.contract,
              'data': tokenURIabi,
            },
            'latest',
          ],
          'id': 1,
        });
        let url = web3.utils.hexToString(ress.data.result);
        url = url.substring(33);
        if (url.indexOf('ipfs://') == 0) {
          url = 'https://ipfs.io/ipfs/' + url.split('ipfs://')[1];
        }
        this.nft.url = url;
        this.nft.chainId = this.$store.state.network.chainId;
        let imgurl = await axios.post('https://api.neatio.net/json', {
          json: this.nft.url,
        });
        if (imgurl.data == '') {
          this.$message({
            showClose: true,
            message: this.$t('l.index.txt25'),
            type: 'error',
          });
          this.nftloading = false;
        } else {
          if (imgurl.data.image.indexOf('ipfs://') == 0) {
            imgurl.data.image = 'https://ipfs.io/ipfs/' + imgurl.data.image.split('ipfs://')[1];
          }
          this.nft.image = imgurl.data.image;
          this.nft.nftname = imgurl.data.name;
        }


        let nftlist = await this.$g.select('nftlist');
        if (nftlist == '') {
          nftlist = [];
        }
        let t = '';
        nftlist.forEach(item => {
          if (item.contract == this.nft.contract && item.chainId == this.nft.chainId
            && item.addr == this.$store.state.wallet.addr) {
            t = item;
          }
        });
        if (t == '') {
          nftlist.push({
            name: this.nft.name,
            contract: this.nft.contract,
            chainId: this.nft.chainId,
            addr: this.$store.state.wallet.addr,
            list: [
              {
                id: this.nft.id,
                image: this.nft.image,
                nftname: this.nft.nftname,
              },
            ],
          });
        } else {
          t.list.push({
            id: this.nft.id,
            image: this.nft.image,
            nftname: this.nft.nftname,
          });
        }
        await this.$g.save({
          key: 'nftlist',
          value: nftlist,
        });
        this.nftloading = false;

        this.loadnft();
        this.addnft = false;
      },
      async accountCreate() {
        let accountlist = await this.$g.account.selectAll();
        let name = 'wallet' + (accountlist.length + 1);
        let account = await this.$g.account.create();
        let prv = await this.$g.account.getprv();
        if (prv == '') {
          this.show = true;
        } else {
          let img = 'data:image/png;base64,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';
          let model = {
            name: name,
            addr: account.address,
            encrypt: this.$g.encrypt(account.privateKey, prv.pass),
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
            key: account.address,
            value: model,
          });
          await this.$g.save({
            key: 'addr',
            value: {
              addr: account.address,
            },
          });

          this.$g.account.transferdata({
            addr: account.address,
            pass: prv.pass,
          });
          this.$store.commit('setWallet', model);
          this.accountlist = await this.$g.account.selectAll();

        }

      },
      async lock() {
        let _this = this;
        await this.$g.account.transferdata('');
        window.close();

      },
      async connectaddfn() {
        this.connectlist.unshift({
          key: this.taburl,
          val: [],
        });
        await this.$g.save({
          key: 'connectlist',
          value: this.connectlist,
        });
        this.taburl = '';
        this.connctlistfn1();

      },
      async connectdelfn(index) {
        this.connectlist.splice(index, 1);
        await this.$g.save({
          key: 'connectlist',
          value: this.connectlist,
        });
        this.connctlistfn1();

      },
      async connectListfn() {
        this.connectmodel = true;
        this.connctlistfn1();
      },
      async connctlistfn1() {
        this.connectlist = await this.$g.select('connectlist');
        if (this.connectlist == '') {
          this.connectlist = [];
        }
        this.taburl = '';
        let tab = await this.$g.tabsUrl();
        let taburl = tab.url;
        let listindex = -1;
        this.connectlist.forEach((item, index) => {
          if (item.key == taburl) {
            listindex = index;
          }
        });
        if (listindex != -1) {
          let item = this.connectlist.splice(listindex, 1);
          this.connectlist.unshift(item[0]);
          this.isconnect = true;
        } else {
          this.taburl = taburl;
          this.isconnect = false;
        }
      },
      async delchain() {
        let list = await this.$g.select('networklist');
        list.splice(this.chainindex, 1);
        await this.$g.save({
          key: 'networklist',
          value: list,
        });
        this.networklist = await this.$g.select('networklist');
        this.updateChain = false;
        this.$message({
          showClose: true,
          message: 'Delete Chain Success',
          type: 'success',
        });
      },
      async saveChain() {
        if (this.addChainModel.chainId.trim() == '') {
          this.$message({
            showClose: true,
            message: 'ChainId cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.addChainModel.chainName.trim() == '') {
          this.$message({
            showClose: true,
            message: 'ChainName cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.addChainModel.blockExplorerUrls[0].trim() == '') {
          this.$message({
            showClose: true,
            message: 'BlockExplorerUrl cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.addChainModel.nativeCurrency.symbol.trim() == '') {
          this.$message({
            showClose: true,
            message: 'Symbol cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.addChainModel.nativeCurrency.decimals.trim() == '') {
          this.$message({
            showClose: true,
            message: 'Decimals cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.addChainModel.rpcUrls[0].trim() == '') {
          this.$message({
            showClose: true,
            message: 'RpcUrl cannot be empty',
            type: 'error',
          });
          return;
        }
        let list = await this.$g.select('networklist');
        let t = true;
        list.forEach(item => {
          if (item.chainId == web3.utils.numberToHex(this.addChainModel.chainId)) {
            t = false;
          }
        });
        if (t) {
          let img = await this.$g.imageToBase64(this.addChainModel.iconUrls[0]);
          let model = {
            'chainId': web3.utils.numberToHex(this.addChainModel.chainId),
            'rpcUrls': this.addChainModel.rpcUrls,
            'chainName': this.addChainModel.chainName,
            'nativeCurrency': this.addChainModel.nativeCurrency,
            'blockExplorerUrls': this.addChainModel.blockExplorerUrls,
            'icon': img,
          };


          list.push(model);
          await this.$g.save({
            key: 'networklist',
            value: list,
          });
          this.networklist = await this.$g.select('networklist');
          this.addChain = false;
          this.$message({
            showClose: true,
            message: 'Add Chain Success',
            type: 'success',
          });
        } else {
          this.$message({
            showClose: true,
            message: 'The network is already listed',
            type: 'error',
          });
        }

      },
      accountSend() {
        this.$g.coinindex = 0;
        this.$g.coin = this.$store.state.wallet.list[0];
        this.$router.push({ path: '/AccountSend' });

      },
      async update() {

        if (this.updateChainModel.chainId.trim() == '') {
          this.$message({
            showClose: true,
            message: 'ChainId cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.updateChainModel.chainName.trim() == '') {
          this.$message({
            showClose: true,
            message: 'ChainName cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.updateChainModel.blockExplorerUrl.trim() == '') {
          this.$message({
            showClose: true,
            message: 'BlockExplorerUrl cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.updateChainModel.symbol.trim() == '') {
          this.$message({
            showClose: true,
            message: 'Symbol cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.updateChainModel.decimals.trim() == '') {
          this.$message({
            showClose: true,
            message: 'Decimals cannot be empty',
            type: 'error',
          });
          return;
        }
        if (this.updateChainModel.rpcUrl.trim() == '') {
          this.$message({
            showClose: true,
            message: 'RpcUrl cannot be empty',
            type: 'error',
          });
          return;
        }

        let list = await this.$g.select('networklist');
        let t = true;

        let img = this.updateChainModel.icon;
        img = await this.$g.imageToBase64(this.updateChainModel.iconUrl);

        let model = {
          'chainId': web3.utils.numberToHex(this.updateChainModel.chainId),
          'rpcUrls': [this.updateChainModel.rpcUrl],
          'chainName': this.updateChainModel.chainName,
          'nativeCurrency': {
            name: this.updateChainModel.symbol,
            decimals: this.updateChainModel.decimals,
            symbol: this.updateChainModel.symbol,
          },
          'blockExplorerUrls': [this.updateChainModel.blockExplorerUrl],
          'icon': img,
        };

        list[this.chainindex] = model;
        await this.$g.save({
          key: 'networklist',
          value: list,
        });
        this.networklist = await this.$g.select('networklist');
        this.addnetwork();

        this.updateChain = false;
        this.$message({
          showClose: true,
          message: 'Update Chain Success',
          type: 'success',
        });
      },
      chainfn(index) {
        this.chainindex = index;
        let updateChainModel = JSON.parse(JSON.stringify(this.networklist[index]));
        this.updateChainModel.chainName = updateChainModel.chainName;
        this.updateChainModel.chainId = updateChainModel.chainId;
        this.updateChainModel.rpcUrl = updateChainModel.rpcUrls[0];
        this.updateChainModel.symbol = updateChainModel.nativeCurrency.symbol;
        this.updateChainModel.blockExplorerUrl = updateChainModel.blockExplorerUrls[0];
        this.updateChainModel.decimals = updateChainModel.nativeCurrency.decimals;
        this.updateChainModel.iconUrl = '';
        this.updateChainModel = JSON.parse(JSON.stringify(this.updateChainModel));
        this.updateChain = true;
      },
      async switchChainfn(item) {
        await this.$g.save({
          key: 'network',
          value: item,
        });
        this.load();
        this.switchChain = false;
        chrome.runtime.sendMessage(
          { switchChain: { key: 'switchChain', val: '' } },
          function(response) {
          },
        );
      },
      async hidefn() {
        let prv = await this.$g.account.getprv();
        if (prv != '' && prv.pass) {
          this.$g.del({
            key: this.$store.state.wallet.addr,
          });
          let select = await this.$g.account.selectAll();
          if (select[0]) {
            let key = await this.$g.decrypt(select[0].value.encrypt, prv.pass);
            await this.$g.save({
              key: 'addr',
              value: {
                addr: select[0].key,
              },
            });
            this.$g.account.transferdata({
              addr: select[0].key,
              pass: prv.pass,
            });
            this.load();
            this.hide = false;
          } else {
            this.hide = false;
            this.$router.push({ path: '/AccountIndex' });
          }

        } else {
          alert('error');
        }


      },
      async exportprivate() {
        let prv = await this.$g.account.getprv();
        this.wif = await this.$g.decrypt(this.$store.state.wallet.encrypt, prv.pass);
        this.showprv = true;
      },
      async walletnamesavefn() {
        if (this.walletname != '') {
          this.$store.state.wallet.name = this.walletname;
          this.walletnameis = false;
          this.accountDetails = false;
          await this.$g.save({
            key: this.$store.state.wallet.addr,
            value: this.$store.state.wallet,
          });
          this.$message({
            showClose: true,
            message: 'Save Success',
            type: 'success',
          });
        }
      },
      walletnamefn() {
        this.walletname = '';
        this.walletname = this.$store.state.wallet.name;
        this.walletnameis = true;
      },
      openblock() {
        window.open(this.$store.state.network.blockExplorerUrls[0] + '/address/' + this.$store.state.wallet.addr);
      },
      handleCommand(command) {
        if (command == 'hide') {
          this.hide = true;
        }
        if (command == 'accountDetails') {
          this.accountDetails = true;
          this.$nextTick(() => {
            var canvas = document.getElementById('canvas');

            QRCode.toCanvas(canvas, this.$store.state.wallet.addr, function(error) {
              if (error) console.error(error);
            });
          });
        }
        if (command == 'viewAsset') {
          this.openblock();
        }
        if (command == 'lock') {
          this.lock();
        }
        if (command == 'language') {
          this.language = true;
        }

        if (command == 'faucet') {
          window.open(this.faucet);
        }
      },
      async switchaccount(item) {
        let prv = await this.$g.account.getprv();
        if (prv != '' && prv.pass) {
          let key = await this.$g.decrypt(item.value.encrypt, prv.pass);
          await this.$g.save({
            key: 'addr',
            value: {
              addr: item.key,
            },
          });
          this.$g.account.transferdata({
            addr: item.key,
            pass: prv.pass,
          });
          this.load();
        } else {
          alert('error');
        }
        this.switchaccountshow = false;
      },
      async switchAcc() {
        this.accountlist = await this.$g.account.selectAll();
        this.switchaccountshow = true;
      },
      onCopy() {
        this.copytxt = 'Copy success';
        setTimeout(() => {
          this.copytxt = 'Click to copy address';
        }, 3000);
      },
      onError() {
        this.copytxt = 'Copy error';
        setTimeout(() => {
          this.copytxt = 'Click to copy address';
        }, 3000);
      },
      accountImport() {
        this.$router.push({ path: '/AccountImport' });
      },
      importToken() {
        this.$router.push({ path: '/ImportToken' });
      },
      accountTransaction(index, item) {
        this.$g.coin = item;
        this.$g.coinindex = index;
        this.$router.push({ path: '/AccountTransaction' });
      },
      async load() {
        let wallet = await this.$g.account.login(this);
        if (wallet != '') {
          this.$store.commit('setWallet', wallet);
          let prv = await this.$g.account.getprv();

          if (typeof (prv) == 'undefined' || prv == '') {
            this.show = true;
          }
          let network = await this.$g.network.getnetwork(this);
          this.$store.commit('setNetwork', network);
          await this.loadnft();
          this.hens();
          this.faucetlist.forEach(item => {
            if (item.id == network.chainId) {
              this.faucet = item.url;
            }
          });


          let balance = await this.$g.account.get_balance(this.$store.state);
          this.$store.state.wallet.list[0].sum = balance;
          this.$store.state.wallet.list[0].logo = network.icon;
          this.$store.state.wallet.list[0].symbol = network.nativeCurrency.symbol;

          await this.$g.save({
            key: this.$store.state.wallet.addr,
            value: this.$store.state.wallet,
          });
          this.$g.loadbalance(this);

        } else {
          this.$router.push({ path: '/AccountIndex' });
        }
      },
      async loadnft() {
        let nftlist = await this.$g.select('nftlist');
        if (nftlist == '') {
          nftlist = [];
        }
        this.nftlist = [];
        this.activeNames = [];

        nftlist.forEach(item => {
          if (item.addr == this.$store.state.wallet.addr && item.chainId == this.$store.state.network.chainId) {
            this.nftlist.push(item);
            this.activeNames.push(item.contract);
          }
        });
      },
      async hens() {
        let txt = await this.$g.hens.getNameOfOwner(this.$store.state.wallet.addr);
        if (txt == '') {
          let img = 'data:image/png;base64,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';
          this.$store.state.wallet.img = img;
          this.$store.state.wallet.imgis = true;
          await this.$g.save({
            key: this.$store.state.wallet.addr,
            value: this.$store.state.wallet,
          });
        } else {
          let number = await this.$g.hens.getTokenIdOfName(txt);
          if (number != '') {
            let img = await this.$g.imageToBase64('https://json.hens.domains/hens/' + number + '/hens.jpg');
            this.$store.state.wallet.img = img;
            this.$store.state.wallet.imgis = false;

            await this.$g.save({
              key: this.$store.state.wallet.addr,
              value: this.$store.state.wallet,
            });
          }
        }
      },
      addnetwork() {
        let list = [{
          chainId: '0x203',
          rpcUrls: ['https://rpc.neatio.net'],
          chainName: 'Neatio',
          nativeCurrency: { name: 'NEAT', decimals: 18, symbol: 'NEAT' },
          blockExplorerUrls: ['https://scan.neatio.net'],
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACbVBMVEUAAAAKRVAA/PwHdXwA/P0A//8BzM8HfYQA5eYA7+8FkpgA9fUA9fYEoqcA5+gA7O0LPEcDtroA4+QA+fkDtLgDsrYA7/AJV2AB09UA/f0JX2gCycwA7u8HeYAA5OUA7e4Gho0B2tsA9vYEn6QA5ucLOkUA9PQErLAA4uMDrrIA6uoJU1wA+PgKTFYJVF4Cx8oA7u4IZG0He4IB2NoA8vMA/v4A3N4Eq7AA6eoKT1kA9/cKTlgKSlQCxMcA+/sIYGkHcHgB19kA8fIGhYwA7e0FmJ4A3uAA3+AEqK0JWGEA6usA6ekKS1UDub0JUFoA+voA5uYLP0oEo6gA+foCw8YLPkgA8PAFm6AJXmcEqq8A4eIHfoUB19gA8PEA8vIGgYgGgIcFj5UKQUsA3d4CyMoFmp8JXWYA6OkBz9ECwcQKSFIHb3cA6+wJW2QA4OEIanIGh40LPkkB290Bz9IFnKEIY2sFlJoA6+sLPUgB0dMDt7sDtbgIbXUKRU8DtbkGi5ECyswJXGUA+PkGjJMB29wJUVsCwsUHdHwIZ3AA7OwB0NIA9PUIanMA8/MFk5kA8fEA9/gIZW4Ia3MGgYcHcnkGf4YKRE4Fl5wDubwDuLsEpqsB0tQKUFkB1tgB1dcKQk0CwMMDsbUEpKkKSVMA9vcCvcEEqq4Cv8IJWGIA+vsIaXELQEsIbnYEoKUCwMQEqa0CvcAJVl8GiI8GiI4JW2UB2dsCzM4FnaIKQUwDu74KR1EEpqoFkJYIZm4KTVcB1NYA6OgDvL8FlpwHcnoCvsEFmZ4Cy80A+/wDs7cA//8A/v8B//8A//4A/v4AAADkY/X4AAAAyXRSTlMADs1AzdGdSLfBYMfHcLm9BIW1y4OBwSCjzyiZv0S1v1Krx263AsV6s367HMkUHpe/Lkapw8+tersYyRYSk80qPKfDUr9mr7F2Iru7FIcay7cGcsuTBsFoKHizSqfBw05MXAqvl2gmuZ+REDq9JLE0VAarn2ouYr0EoYWDOA6DWJkmyVirGpFAMr2hxTTFYMPJMDZOPkwMZIeHdKMYp6UKj4FyEseNeI8iyzQIOG6PeI0gVFQkqZtqCokQdF4wFqW5i2Q+jWabzYGGnhb1AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAADP9JREFUeNrt3fubVlUVwPHNC1sYhkuCXMYGUMJhlCExHaRJCIGQi4JJoCGQlUleQjMR6J6JJEWQll3M1LLsZll2MbvfO0D/UweeCIQZZs2svfbap/l+fvZ5PGu/3+fMyzn7PScEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOc1qqU02nuCAZ3noMdIJvM+/jxGVUrxAu8RBhKVg3kffx7qAKrYGus9RP8IQEIfQL1U47yn6BcBSKQIoIpt3mP0hwAkkgRQxTjee5BzEYBEmgDq5Wr3nuQcBCCRKoAqTpjoPctZCEAiWQD1ik3yHub1CEAiYQBVnPwG73HORAASKQOoF+1C73nOQAASaQOo4hTvgU4jAInEAVRx6kXeI51CABKpA6gXbpr3TP9FABLpA6ji9BneU51EABIGAdRrN9N7rBMIQMIkgDIuCRCAhE0AVey42HsyAhAxCqBevzd6j0YAEmYBVLFzlu9oBCBhF0C9hLNdRyMACcsAqjjHczQCkDANoN4oconfaAQgYRtAVXVc6jbaYAEcJYBgH0AV577JaTTOABLmAdQrOc9nNAKQyBBAvVHkMo/RCEAiRwBV1TXfYTQCkMgTQBW7849GABKZAqg3imTfLUYAEikCOCr6r+LlmUcjAIlcZ4ATK3rFgqyjEYDE+QM4ljaBnoU5RyMAiYxngCrzJQECkMgbQL1R5M3ZRiMAicwB1Ot6Za7RCEAiewBVXJRpNAKQyB9A/UyZq7KMRgASDgGcuDmQYzQCkHAJoN4o8hb70QhAwieAeqPI1eajEYBEtgDOvl4cr7EejQAkvM4A9QL3Gl8VIgAJvwDMvwsSgIRnAPWfAcsHSxGAhGsA9SovthuNACScA6hij9loBCDhHUB9SeBao9EIQMI9gHqll7zVZDQCkCgggKrqe5vFaAQgUUQANhtFCECijACqOOa65KMRgEQhAdTrvTT1aAQgUUwA6R8mQAAS5QRQxWVvTzoaAUgUFEDqZ8oQgERRAdRXhZanG40AJMoKoN4ocn2y0QhAorQAqrgi1WgEIFFcAHUBK9OMNlgAxwkglBhAvfSrkozGGUCixADqk8A7EoxGABKFBXDq58hxtX40ApAoLIDTy3+DejQCkBjVqaRc5oHXf8Ia5Wjaybw/moZYu84sgfU3eg8HiZuiVQJzN3jPBpGNZieBC7xHg8jNZgWMe6f3bJC4xaqAatO7vGeDxOYtZieBLA8TgNqtvVYFbLzNezZIvLvL7CTg+/IhSG01K2Cd92gQud3qkkDs2OY9G0Qmm50EtnuPBpHFLasCdrzHezZI3DHX7qqQ92wQWWRWwJb3es8GiQVm1wXjVu/ZIPG+JWYngfd7zwaRO80KaP+A92yQuKvHLIGd3rNBxO7PQHvelw9hmD64zCyBu71ng8g4bg+NcNeaFTD1Hu/ZIHGv3T3i+7xng8g8u5PAh7xng8S0dq4KjXC7uCQwwtltG2/d7z0bJGZMt7tD6D0bRLrHWBVwzVjv2SDxgNlGkV42ijSD3Z+B9d6jQWS2WQFxivdskPiw3R3CB71ng8hHBi/gmODz7qeAroe8Z4PE7qlmJ4GHvWeDyB673xHv9Z4NEvtaZgl81Hs2iJy8NHxU/Xn3UwD/GmiGj9ndI+aZMo3w8XajAqo4zXs2SHxiUr8ngeND/bz7KWDdDO/hIPFJu38QzvSeDSJ2G0UmeY8GEel+wSFfHIyti71ng8SnzJ4ut/HT3rM1w6iotOczugPYbneHUMn7o8lD/76AR3brjuCzE8yeJqALyPujySPBCyPio8pjMDsJEMDgUrwxJE7arzuIKSUWQABD0HpMdxS7zV45QACDSPTOoNimPI7riyuAAIa2XK0DugP53KZyEjhOAMNJQLs5+/FyCiCAYa3YHOWxHCzqmwABDH3Jencpj8bsiSIEMJC0L46MXcrDWV9OAQQwrFX7vPIpfl+Y6/3BE4By3ZR3YhfuLOQkQADDXbhDC3WHdGEZ3wUJYPhLp/0HYV8JBRCAYu26lUdl9mApAjibzevjY8983WF98bB7AgSgW74rlAfmfo+YAJTrd+RLuiPb1eGbAAGoV/Cg8thWuBZAAPolnKc8uG7PAgggwRq2luqO7gnHSwIEkGQVlQWEVW4FEECaZVy2XHeAT24kAEvWAejf7fBlp5MAASRbycnKYzzoUgABpFvK3q/oDnJzLwFYyRHAiTuEuqN8ymGjCAEkXc32r+qO82t9w/+fD++hEwSQOAHlVaH9Zg8ZJYBMC6p9ydPX8xZAAMlXNH5Dd6xPmz1ThgAMnfF0D/XL381ePUMAmRa153Ld4d66I0MCxwjAMIE1ygMe0jNlhvfg8YoADJz6t1jsVG4ant2R54AJwGxlr9Qd8sQ8vyMmALul1W4b35rk0vAgD6smAMMCWt/UHfXoDBtFCMB0dZXPlAlzzAsgANvlXfWE7sCfsS6AAKwX+Abdkc9aZJsAAZgXoL05YLtRhAAGorm68vol7lU+WOoeywIIIIPWt3RH/6zhPWICyCG2j9cd/3NmBRBAHtpXf689ZJQAAWSi/i54k00BBJCtgBXKt/4e3GiRAAHko36+oMUTRQggo9j3vG6MiekLIIC8CXxbN8fe5C8fIoDMBaz/jm6ScYl/PkQAub3wXd0o30u7aZgAslNvFEl6SYAAHApojdJNc3vCAgjAJYEXdeN8vzNZAgTgU4D2YQKLUxVAAE4F/ED51t87lqVJgADcElinnGlfkgIIwK+A+EPdULNTFEAAjlozdVP9KMFGEQLwFLcr57pTXcBICUD9lnWjAjqUV4Ue6OH18Vm0We3Jio97jwaRbR1WBWxX7hdEHvvNfqjXu817NoisM/szMNd7NIj8uMfqu2B8yXs2iNidBHYq7xAij5+YfROYoNwqhEwS3YTp5ySg3SiCPMxe9xhbl3nPBomfdhkVUMWXvWeDxLOTzE4C2h+QIY9brN7tEKf+zHs2SFzUbnYSUL58CJkk2Y7RbwHxLu/ZILHS7A5h62nv2SBi9hS/uMV7NIisblkVcHiW92yQ+Hkf1wVHOLuNIm2veM8GiV/YbRT5pfdsELG7R/yg92gQ+ZVZAV2/9p4NEld1mSUw6VXv4SDxmNk3ga4bvWeDyBizk4DymTLIxG6jyBTv0SDyvFkBPb/xng0Sr203S2CP92wQ+a1ZAY8s8J4NEi/PNUvgUe/ZIDLF7pKA92gQmWf2MIHWPu/ZIGK3UaTNezSImL36O64Y7T0bJH5ntlFE+/IhZGJ3SWCO92gQ+f0g3wWPD7uAXrYJNIPdRhG2CjXDTLMCDj3sPRsk7t/EVaER7j67k8AfvGeDxB87zBJQvoMOmdhtFOn2Hg0iRm/9PbFRhGfKNMJou3vE871na4hRnTra79x/MivgiHKyTu+PJg/t+wLUj/T+s9nNAW1B3h9NHu4BhNBdZgEEkCsAu38NEMDgSgggjF9RYAIEkC+A9K/+JgCpQgIIf3mhtJMAAWQNIITS/gwQQOYA7J4vSADnUVAA4SmzO4QEMKCSAgjh0oIKGJEBHHUOINy7sZgERmQAQ5f87Y6TSymAAHwCsHu+IAH0p7wAwuYyLg0TgFcAIdxdQgEE4BdA+Guf98dPAK4BhA3r3U8CBOAZQAh/m+qcAAH4BuC+UYQAvANw3ihCAO4BhL/vcEyAAPwDcL1HTAAlBBAeMvvlAAGcVHoAIRxyKoAACgnAa6MIAZQSQDhg9soBAmhEAINdEhj6LgYC+J9mBBAOLMt+EiCAkgIwfMgoATQjgPBM5gIIoLAAwmt5vwsSQGkBhPCP4RbQ39fEY/8+eu5/cYwASg4gLD+iPNwhGPEBHBMtU94Awtol2f4MjPgAZDIHEMKLub4JEECZAYSQ6bcjBFBqAJk2ihBAsQGElw4RQCqNDCDsPWx/EiCAggOo7xH3WidAAEUHEEKXcQEEUHgA1htFCKD0AMJY00sCBFB8ACF0GhZAAA0IIFzyTwLQaXgA4ck2s8eNe380eTQ9ALuNIgTQkADCBpsCCKApAYTrTF5ESQCNCSCEpT0EMEz9ByB/fW8ZAYTb0p8ERnQAgzm9W6iQAEJ4bsgFDPJ7EgIQKSaAcHXi344QQMMCSL1RhAAaF0BY00UAQ/V/FUB4NeFGEQJoYAAh3Jzs5UME0MgAwr9SbRomgGYGkGyjCAE0NYCwMslGEQJobAAhTE9QAAE0OICwWl8AATQ5gPDKFm0CIyWAls4e7wEG1KacrOU9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFC8/wA2TFpcRmApFwAAAABJRU5ErkJggg==',
        }];

        list.forEach(item => {
          let t = true;
          this.networklist.forEach(i => {
            if (item.chainId == i.chainId) {
              t = false;
            }
          });
          if (t) {
            this.networklist.push(item);
          }
        });

      },
    },
    async mounted() {

      this.load();

      this.networklist = await this.$g.select('networklist');

      this.addnetwork();

      this.connctlistfn1();
    },
  };

</script>

<style>
.popup {
  background-color: #000000;
}

  .btnSend {
  font-size: 12px;
  width: 120px;
  height: 36px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  color: #00ffff;
  border: 1px solid #00ffffa4;
  background-color: transparent;
  background-position: center;
  transition: background 0.4s;
  margin: 0 10px;
}


.btnSend:hover {
  color: #000;
  text-transform: uppercase;
  background: #00ffff radial-gradient(circle, transparent 1%, red 1%)
    center/15000%;
}

.van-tabs__nav {
  background: #000000;
}

    .el-image-viewer__wrapper {
        z-index: 2100 !important;
    }

    .addChain .van-cell {
        padding: 6px 16px;
    }

    .addChain .van-field {
        padding: 0px 16px 6px 16px;

    }

    .Transaction .el-alert {
        border-radius: 0px !important;
    }

    .Transaction .el-button .el-icon-edit-outline {
        font-size: 14px !important;
    }

    .Transaction .el-button .el-icon-delete {
        font-size: 14px !important;
    }

    .Transaction .el-button .el-icon-check {
        font-size: 14px !important;
    }

    .Transaction .el-button .el-icon-connection {
        font-size: 14px !important;
    }

    .van-tabs__wrap {
        border-bottom: 1px solid #496858;
    }

    .van-tabs__line {
        background: #037dd6 !important;

    }

    .el-button--primary {
        color: #496785;
        background-color: #037dd6 !important;
        border-color: #00BFFF !important;
    }

    .addrcopy {
        color: #496785 !important;
    }

    .addrcopy:hover {
        background: #00BFFF !important;
    }
</style>
