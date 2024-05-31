import localeMessageBox from "@/components/message-box/locale/zh-CN";
import localeHome from "@/views/home/locale/zh-CN";
import localeLogin from "@/views/login/locale/zh-CN";

import localeWorkplace from "@/views/dashboard/workplace/locale/zh-CN";

import localeMonitor from "@/views/dashboard/monitor/locale/zh-CN";

import localeCardList from "@/views/list/card/locale/zh-CN";
import localeSearchTable from "@/views/list/search-table/locale/zh-CN";
import localeAnimation from "@/views/list/table-animation/locale/zh-CN";
import localeList from "@/views/list/tableList/locale/zh-CN";

import localeGroupForm from "@/views/form/group/locale/zh-CN";
import localeStepForm from "@/views/form/step/locale/zh-CN";

import localeBasicProfile from "@/views/profile/basic/locale/zh-CN";

import localeDataAnalysis from "@/views/visualization/data-analysis/locale/zh-CN";
import localeMultiDAnalysis from "@/views/visualization/multi-dimension-data-analysis/locale/zh-CN";

import localeError from "@/views/result/error/locale/zh-CN";
import localeSuccess from "@/views/result/success/locale/zh-CN";

import locale403 from "@/views/exception/403/locale/zh-CN";
import locale404 from "@/views/exception/404/locale/zh-CN";
import locale500 from "@/views/exception/500/locale/zh-CN";

import localeUserInfo from "@/views/user/info/locale/zh-CN";
import localeUserSetting from "@/views/user/setting/locale/zh-CN";

import localeSettings from "./zh-CN/settings";

export default {
	"menu.cashier": "销售",
	"menu.refund": "退货",
	"menu.deposit": "定金",
	"menu.write-off": "核销",
	"menu.order": "订单",
	"menu.user": "用户",
	"menu.dashboard": "仪表盘",
	"menu.server.dashboard": "仪表盘-服务端",
	"menu.server.workplace": "工作台-服务端",
	"menu.server.monitor": "实时监控-服务端",
	"menu.list": "列表页",
	"menu.result": "结果页",
	"menu.exception": "异常页",
	"menu.form": "表单页",
	"menu.profile": "详情页",
	"menu.visualization": "数据可视化",
	"menu.arcoWebsite": "Arco Design",
	"menu.faq": "常见问题",
	"navbar.docs": "文档中心",
	"navbar.action.locale": "切换为中文",

	"modal.title.add": "新增",
	"modal.title.edit": "编辑",
	"modal.title.view": "查看",
	"modal.footer.cancel": "取消",
	"modal.footer.ok": "确定",
	"modal.footer.save": "保存",
	"modal.footer.delete": "删除",

	"message.success.add": "新增成功",
	"message.success.edit": "编辑成功",
	"message.success.delete": "删除成功",
	"message.success.operations": "操作成功",
	"message.error.add": "新增失败",
	"message.error.edit": "编辑失败",
	"message.error.delete": "删除失败",
	"message.error.operations": "操作失败",

	...localeSettings,
	...localeMessageBox,
	...localeLogin,
	...localeHome,
	...localeWorkplace,

	...localeMonitor,
	...localeSearchTable,
	...localeCardList,
	...localeAnimation,
	...localeList,
	...localeStepForm,
	...localeGroupForm,
	...localeBasicProfile,
	...localeDataAnalysis,
	...localeMultiDAnalysis,
	...localeSuccess,
	...localeError,
	...locale403,
	...locale404,
	...locale500,
	...localeUserInfo,
	...localeUserSetting,
};
