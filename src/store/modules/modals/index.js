import { defineStore } from 'pinia';

const useModalsStore = defineStore('modals', {
    state: () => ({
        isGoodsAttrs: false, // 新增的状态参数
    }),
    getters: {
        getIsGoodsAttrs(state) {
            return state.isGoodsAttrs;
        },
    },
    actions: {
        // 新增的动作，用于控制开关
        toggleGoodsAttrs(newState) {
            this.isGoodsAttrs = newState;
        },
    },
});

export default useModalsStore;
