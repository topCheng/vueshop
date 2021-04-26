import {
    getAddressData,
    delAddressData,
    addAddressData,
    getAddressInfoData,
    modifyAddressData,
    getDefaultAddressData
} from "../../../api/address/address"

export default {
    namespaced: true,
    state: {
        address: []
    },
    mutations: {
        ["SET_ADDRESS"](state, payload) {
            state.address = payload.address;
        },
        ["DEL_ADDRESS"](state, payload) {
            state.address.splice(payload.index, 1);
        }
    },
    actions: {
        getAddress(conText, payload) {
            getAddressData(conText.rootState.user.uid).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_ADDRESS", {address: res.data});
                }
            });
        },
        delAddress(conText, payload) {
            delAddressData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    if(payload.index) {
                        conText.commit("DEL_ADDRESS", {index: payload.index});
                    }
                    if(payload.success) {
                        payload.success();
                    }
                }
            });
        },
        addAddress(conText, payload) {
            addAddressData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                if (payload.success) {
                    payload.success(res)
                }
            });
        },
        getAddressInfo(conText, payload) {
            getAddressInfoData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        modifyAddress(conText, payload) {
            modifyAddressData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getDefaultAddress(conText, payload) {
            getDefaultAddressData(conText.rootState.user.uid).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    if (payload.success) {
                        payload.success(res);
                    }
                }
            })
        }
    }
}