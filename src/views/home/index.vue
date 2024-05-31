<template>
	<section class="home-wrap">
		<section class="header">
			<div class="left">
				<span class="title">{{ $t("home.head.name") }}</span>
			</div>
			<div class="right">
				<span class="title">{{ $t("login.form.login") }}</span>
			</div>
		</section>
		<section class="content">

		</section>
	</section>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from 'vue-i18n';

const count = ref(0);
const { t } = useI18n()

function handleClick() {
	count.value++;
}
</script>
<style lang="less" scoped>
.home-wrap {
	position: relative;
}
.header {
	position: sticky;
	top: 0;
	left: 0;
	height: 60px;
	z-index: 111;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	padding: 0 10px;
	background-color: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(6px);

	.left,
	.right {
		display: flex;
		align-items: center;
	}
	.title {
		font-weight: bold;
		font-size: 16px;
	}
}
.content {
	position: relative;
}
// .one {
// 	height: 300vh;
// }
// .two {
// 	position: sticky;
// 	top: 60px;
// 	left: 0;
// 	height: 40px;
// }
// .three {
// 	height: 300vh;
// }
</style>
