import CryptoJS from 'crypto-js';

import Dexie from 'dexie';

let db = new Dexie('neatsend');
db.version(1).stores({
  msg: 'key,value',
});
import axios from 'axios';

import Web3 from 'web3';

let web3 = new Web3();

let base64icon = 'data:image/png;base64,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';


export default {
  prv: '',
  coin: '',
  coinindex: '',
  model: '',
  numberToHex(txt) {
    return web3.utils.numberToHex(txt);
  },
  imageToBase64(url) {
    return new Promise(function(resolve) {
      let canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
      img.crossOrigin = '*';
      img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
        canvas = null;
      };
      img.onerror = function(error) {
        resolve(base64icon);
      };
      img.src = url;
    });
  },
  fromWei(num, type) {
    return web3.utils.fromWei(num, type);
  },
  formatDateTime(timeStamp) {
    let date = new Date(timeStamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  subname(txt) {
    if (txt) {
      if (txt.length > 41) {
        return txt.substring(0, 5) + '...' + txt.substring(38, 42);
      } else {
        return txt;
      }
    }
  },
  showprv() {
    alert(this.prv);
  },
  encrypt(key, pass) {
    return CryptoJS.AES.encrypt(key, pass).toString();
  },
  decrypt(encryptPass, keyPass) {
    return new Promise(function(resolve) {
      let bytes = CryptoJS.AES.decrypt(encryptPass, keyPass);
      let plaintext;
      try {
        plaintext = bytes.toString(CryptoJS.enc.Utf8);
      } catch (e) {
        plaintext = '';
      }
      resolve({
        plaintext: plaintext,
        pass: keyPass,
      });
    });
  },
  del(key) {
    db.msg.where(key)
      .delete().then((deleteCount) => {
      console.log('Deleted ' + deleteCount + ' objects');
    });
  },
  select(key) {
    return new Promise(function(resolve) {
      db.msg.get(key)
        .then((model) => {
          if (typeof model != 'undefined') {
            resolve(model.value);
          } else {
            resolve('');
          }
        });
    });
  },
  selectAll() {
    return new Promise(function(resolve) {
      db.msg.orderBy(':id').toArray().then(res => {
        resolve(res);
      });
    });
  },
  save(model) {
    return new Promise(async (resolve, reject) => {
      db.msg.put({ key: model.key, value: model.value }).then(res => {
        resolve('');
      });
    });
  },
  address(prv) {
    let address = '';
    try {
      let account = web3.eth.accounts.privateKeyToAccount(prv);
      address = account.address;
      return address;
    } catch (e) {
      return address;
    }
  },
  async getowner(rpc, contract, walletaddr, id) {
    return new Promise(async (resolve, reject) => {
      let ownerOfabi = web3.eth.abi.encodeFunctionCall({
        name: 'ownerOf',
        type: 'function',
        inputs: [
          {
            type: 'uint256',
            name: '_tokenId',
          }],
      }, [id]);
      let res1 = await axios.post(rpc, {
        'jsonrpc': '2.0',
        'method': 'eth_call',
        'params': [
          {
            'to': contract,
            'data': ownerOfabi,
          },
          'latest',
        ],
        'id': 1,
      });
      let addr = res1.data.result;
      if (addr == '0x0000000000000000000000000000000000000000000000000000000000000000') {
        resolve(false);
      } else {
        if (res1.data.error) {
          resolve(2);
          return;
        }
        addr = '0x' + addr.split('0x000000000000000000000000')[1];
        if (walletaddr.toLocaleLowerCase() == addr) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  },
  hens: {
    getAllProperties(name, is) {
      return new Promise(async (resolve, reject) => {
        let getAllPropertiesabi = web3.eth.abi.encodeFunctionCall({
          name: 'getAllProperties',
          type: 'function',
          inputs: [{
            type: 'string',
            name: 'name_',
          }],
        }, [name]);
        let response = await fetch('https://rpc.neatio.net', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify( {
            'jsonrpc': '2.0',
            'method': 'eth_getBalance',
            'params': [
              {
                'to': '0x79E6e00Bb3B7986d1Dd550237738EC8Ca2D90D23',
                'data': getAllPropertiesabi,
              },
              'latest',
            ],
            'id': 1,
          }),
        });
        let res=await response.json()
        console.log(res);
        let tt = web3.utils.hexToString(res.result);
        let textlist =
          [
            {
              txt: 'Url',
              get: 'getUrl',
              set: 'setUrl',
              val: '',
            }, {
            txt: 'Telegram',
            get: 'getOrgTelegram',
            set: 'setOrgTelegram',
            val: '',
          }, {
            txt: 'Notice',
            get: 'getNotice',
            set: 'setNotice',
            val: '',
          }, {
            txt: 'Keywords',
            get: 'getKeywords',
            set: 'setKeywords',
            val: '',
          }, {
            txt: 'IpfsUrl',
            get: 'getIpfsUrl',
            set: 'setIpfsUrl',
            val: '',
          }, {
            txt: 'Email',
            get: 'getEmail',
            set: 'setEmail',
            val: '',
          }, {
            txt: 'Description',
            get: 'getDescription',
            set: 'setDescription',
            val: '',
          }, {
            txt: 'Twitter',
            get: 'getComTwitter',
            set: 'setComTwitter',
            val: '',
          }, {
            txt: 'Reddit',
            get: 'getComReddit',
            set: 'setComReddit',
            val: '',
          }, {
            txt: 'Github',
            get: 'getComGithub',
            set: 'setComGithub',
            val: '',
          }, {
            txt: 'Avatar',
            get: 'getAvatar',
            set: 'setAvatar',
            val: '',
          },
          ];
        let txt = tt.substring(33);
        let listcoin = [];
        if (txt != '' && txt.split('+').length > 10) {
          textlist.forEach((item, index) => {
            item.val = txt.split('+')[index].trim();
            item.val = txt.split('+')[index].trim();
            try {
              item.val = web3.utils.hexToString(item.val);
            } catch (e) {
              try {
                item.val = web3.utils.hexToNumber(item.val);
              } catch (e) {
                item.val = item.val;
              }
            }
          });
          if (txt.split('+')[11] != '') {
            let addripfs = txt.split('+')[11].trim();
            if (addripfs != '' && addripfs.length > 10 && is) {
              let response = await fetch('https://api.neatio.net/ipfs/?id=' + addripfs, {
                method: 'Get',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              let ress=await response.json()
              listcoin = ress;
            }
          }
        }
        console.log({
          textlist: textlist,
          listcoin: listcoin,
        });
        resolve({
          textlist: textlist,
          listcoin: listcoin,
        });
      });
    },
    async getNameOfOwner(addr) {
      return new Promise(async (resolve, reject) => {
        let getNameOfOwnerabi = web3.eth.abi.encodeFunctionCall({
          name: 'getNameOfOwner',
          type: 'function',
          inputs: [{
            type: 'address',
            name: 'addr_',
          }],
        }, [addr]);
        let abi = await axios({
          method: 'post',
          url: 'https://rpc.neatio.net',
          data: {
            'jsonrpc': '2.0',
            'method': 'eth_call',
            'params': [
              {
                'to': '0x79E6e00Bb3B7986d1Dd550237738EC8Ca2D90D23',
                'data': getNameOfOwnerabi,
              },
              'latest',
            ],
            'id': 1,
          },
        });
        if (abi.data.error) {
          resolve('');
          return;
        }
        let tt = web3.utils.hexToString(abi.data.result);
        let txt = tt.substring(33);
        resolve(txt);
      });
    },
    async getTokenIdOfName(name) {
      return new Promise(async (resolve, reject) => {
        let web3 = new Web3();
        name = name.slice(0, name.length - 4);
        let getTokenIdOfNameabi = web3.eth.abi.encodeFunctionCall({
          name: 'getTokenIdOfName',
          type: 'function',
          inputs: [{
            type: 'string',
            name: '_name',
          },
          ],
        }, [name]);
        let abi = await axios({
          method: 'post',
          url: 'https://rpc.neatio.net',
          data: {
            'jsonrpc': '2.0',
            'method': 'eth_call',
            'params': [
              {
                'to': '0x79E6e00Bb3B7986d1Dd550237738EC8Ca2D90D23',
                'data': getTokenIdOfNameabi,
              },
              'latest',
            ],
            'id': 1,
          },
        });
        if (abi.data.error) {
          resolve('');
          return;
        }
        let number = web3.utils.hexToNumber(abi.data.result);
        resolve(number);
      });
    },
    async getOwner(name) {
      return new Promise(async (resolve, reject) => {
        let getAllPropertiesabi = web3.eth.abi.encodeFunctionCall({
          name: 'getOwner',
          type: 'function',
          inputs: [{
            type: 'string',
            name: 'name_',
          }],
        }, [name]);
        let res1 = await axios({
          method: 'post',
          url: 'https://rpc.neatio.net',
          data: {
            'jsonrpc': '2.0',
            'method': 'eth_call',
            'params': [
              {
                'to': '0x79E6e00Bb3B7986d1Dd550237738EC8Ca2D90D23',
                'data': getAllPropertiesabi,
              },
              'latest',
            ],
            'id': 1,
          },
        });
        let addr = res1.data.result;
        if (addr == '0x0000000000000000000000000000000000000000000000000000000000000000') {
          resolve('');
        } else {
          if (res1.data.error) {
            resolve('');
            return;
          }
          addr = '0x' + addr.split('0x000000000000000000000000')[1];
          resolve(addr);

        }
      });
    },
  },
  account: {
    async create() {
      return new Promise(function(resolve) {

        let account = web3.eth.accounts.create(web3.utils.randomHex(32));
        if (account.privateKey.indexOf('0x') == 0) {
          account.privateKey = account.privateKey.substr(2, account.privateKey.length);

        }
        resolve({
          address: account.address,
          privateKey: account.privateKey,
        });
      });
    },
    async selectAll() {
      return new Promise(function(resolve) {
        db.msg.orderBy(':id').toArray().then(res => {
          let list = [];
          res.forEach(item => {
            if (item.key.length == 42) {
              list.push(item);
            }
          });
          resolve(list);
        });
      });
    },
    async login(_this) {
      return new Promise(async (resolve, reject) => {
        let select = await _this.$g.select('addr');
        if (select != '') {
          let model = await _this.$g.select(select.addr);
          resolve(model);
        } else {
          let selectAll = await _this.$g.selectAll();
          if (selectAll.length > 0) {
            if (selectAll[0].key && selectAll[0].key.length == 42) {
              _this.$g.save({
                key: 'addr',
                value: {
                  addr: selectAll[0].key,
                },
              });
              resolve(selectAll[0].value);
            } else {
              resolve('');
            }
          } else {
            resolve('');
            console.log('Neat Err');
          }
        }
      });
    },
    async getprv() {
      return new Promise(async (resolve, reject) => {
        chrome.runtime.sendMessage(
          { getprv: 'getprv' },
          function(response) {
            resolve(response);
          },
        );
      });
    },
    async transferdata(model) {
      return new Promise(async (resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            setprv: {
              addr: model.addr,
              pass: model.pass,
            },
          },
          function(response) {
            console.log(response);
            resolve('');
          },
        );
        chrome.runtime.sendMessage(
          { addr: model.addr },
          function(response) {
          },
        );
      });
    },
    async get_balance(model) {
      return new Promise(async (resolve, reject) => {
        console.log(model, 'balancebalance');
        let api = model.network.blockExplorerUrls[0];
        let addr = model.wallet.addr;
        let decimals = model.network.nativeCurrency.decimals;
        if (api.charAt(api.length - 1) != '/') api = api + '/';
        console.log(model.network.rpcUrls[0]);
        console.log(JSON.stringify({
          'jsonrpc': '2.0',
          'method': 'eth_getBalance',
          'params': [addr, 'latest'],
          'id': 1,
        }));
        axios({
          method: 'post',
          url: 'https://rpc.neatio.net',
          data: {
            'jsonrpc': '2.0',
            'method': 'eth_getBalance',
            'params': [addr, 'latest'],
            'id': 1,
          },
        }).then(res => {
          let balance = web3.utils.hexToNumberString(res.data.result);
          balance = Math.floor(balance / Math.pow(10, decimals) * 10000) / 10000;
          resolve(balance);
          console.log(balance);
        }).catch(err => {
          resolve(0);
        });
      });
    },
    async getNonce(model) {
      return new Promise((resolve, reject) => {
        let nonce = -1;
        axios({
          method: 'post',
          url: model.rpc,
          data: {
            'jsonrpc': '2.0',
            'method': 'eth_getTransactionCount',
            'params': [model.addr, 'latest'],
            'id': 1,
          },
        }).then(res => {
          nonce = web3.utils.toDecimal(res.data.result);
          resolve(nonce);
        }).catch(err => {
          resolve(-1);
        });
      });
    },
    async eth_sendRawTransaction(rpc, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: rpc,
          data: {
            'jsonrpc': '2.0',
            'method': 'eth_sendRawTransaction',
            'params': [data],
            'id': 1,
          },
        }).then(res => {
          let msg = '';
          if (res.data.error && res.data.error.msg) {
            msg = res.data.error.msg;
          }
          resolve({
            transaction: res.data.result,
            error: msg,
          });
        }).catch(err => {
          resolve('400');
        });
      });
    },
    async eth_estimateGas(rpc, data) {
      return new Promise((resolve, reject) => {
        console.log( {
          'jsonrpc': '2.0',
          'method': 'eth_estimateGas',
          'params': [data],
          'id': 1,
        });
        axios({
          method: 'post',
          url: rpc,
          data: {
            'jsonrpc': '2.0',
            'method': 'eth_estimateGas',
            'params': [data],
            'id': 1,
          },
        }).then(res => {
          console.log(res);
          let count = parseInt(data.data.length / 1000);
          if (count <= 1) {
            count = 2;
          }
          if (data.data.indexOf('0xa9059cbb') == 0) {
            count = 3;
          }
          let feegaslimit = (web3.utils.hexToNumber(res.data.result) * count);

          resolve(feegaslimit);
        }).catch(err => {
          resolve(21000);
        });
      });
    },
    async tokenlist(rpc, addr) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: rpc + 'api?module=account&action=tokenlist&address=' + addr,
        }).then(res => {
          let list = [];
          res.data.result.forEach(item => {
            if (item.type == 'ERC-20') {
              item.tokenlistis = true;
              item.radio = '';
              item.balance = Math.floor(item.balance / Math.pow(10, item.decimals) * 10000) / 10000;
              list.push(item);
            }
          });
          resolve(list);
        }).catch(err => {
          resolve([]);
        });
      });
    },
    async getToken_balance(rpc, model) {
      return new Promise(async (resolve, reject) => {
        let getbalanceOf = web3.eth.abi.encodeFunctionCall({
          name: 'balanceOf',
          type: 'function',
          inputs: [
            {
              type: 'address',
              name: 'account',
            },
          ],
        }, [model.addr]);
        let ress = await axios.post(rpc, {
          'jsonrpc': '2.0',
          'method': 'eth_call',
          'params': [
            {
              'to': model.contract,
              'data': getbalanceOf,
            },
            'latest',
          ],
          'id': 1,
        });
        let balance = web3.utils.hexToNumberString(ress.data.result);
        resolve(Math.floor(balance / Math.pow(10, model.decimals) * 10000) / 10000);
      });
    },
    isAddress(addr) {
      return web3.utils.isAddress(addr);
    },
  },
  network: {
    async init(_this) {
      return new Promise(async (resolve, reject) => {

        let list = [{
          chainId: '0x203',
          rpcUrls: ['https://rpc.neatio.net'],
          'chainName': 'Neatio',
          nativeCurrency: { name: 'NEAT', decimals: 18, symbol: 'NEAT' },
          'blockExplorerUrls': ['https://scan.neatio.net'],
          icon: 'data:image/png;base64,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',
        }];
        await _this.$g.save({
          key: 'networklist',
          value: list,
        });
        await _this.$g.save({
          key: 'network',
          value: list[0],
        });
        await _this.$g.save({
          key: 'connectlist',
          value: [],
        });
      });
    },
    getnetwork(_this) {
      return _this.$g.select('network');
    },
  },
  async loadbalance(_this) {
    for (let i = 0; i < _this.$store.state.wallet.list.length; i++) {
      let model = _this.$store.state.wallet.list[i];
      if (model.contract != '' && model.chainId == _this.$store.state.network.chainId) {
        model.sum = await _this.$g.account.getToken_balance(_this.$store.state.network.rpcUrls[0],
          {
            contract: model.contract,
            addr: _this.$store.state.wallet.addr,
            decimals: model.decimals,
          });
      }
    }
    _this.$g.save({
      key: _this.$store.state.wallet.addr,
      value: _this.$store.state.wallet,
    });
  },
  tabsUrl() {
    return new Promise(async (resolve, reject) => {
      let queryOptions = { active: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      let url = tab.url;
      let urltop = url.substring(0, url.indexOf('//') + 2);
      let urlbottom = url.substring(url.indexOf('//') + 2, url.length);
      urlbottom = urlbottom.substring(0, urlbottom.indexOf('/'));
      resolve({
        url: urltop + urlbottom,
        favIconUrl: tab.favIconUrl,
      });
    });
  },
};
