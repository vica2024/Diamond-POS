import Mock from 'mockjs';
import setupMock, {successResponseWrap} from '@/utils/setup-mock';
// import { ServiceRecord } from '@/api/list';

setupMock({
    setup() {

        Mock.mock(new RegExp('/user/user_Info'),()=>{
            return successResponseWrap({
                "uid": 23080,
                "avatar": "https:\/\/multi-store.crmeb.net\/uploads\/attach\/2023\/04\/20230426\/ed8f8cf4cfbd6b46c821b082ce2e4e76.png",
                "phone": "136****8599",
                "nickname": "136****8599",
                "now_money": "20.00",
                "integral": 194,
                "level": 0,
                "is_money_level": 0,
                "is_ever_level": 0,
                "overdue_time": "1970-01-01 08:00:00",
                "vip_name": ""
            })
        })

        // rules preset
        Mock.mock(new RegExp('/store/recharge_info'), () => {
            return successResponseWrap({
                "recharge_quota": [
                    {
                        "id": 2198,
                        "price": 0.1,
                        "give_money": 1
                    },
                    {
                        "id": 2199,
                        "price": 50,
                        "give_money": 6
                    },
                    {
                        "id": 2200,
                        "price": 100,
                        "give_money": 20
                    },
                    {
                        "id": 2201,
                        "price": 200,
                        "give_money": 50
                    },
                    {
                        "id": 2202,
                        "price": 1000,
                        "give_money": 200
                    }
                ],
                "recharge_attention": [
                    "充值后帐户的金额不能提现，可用于商城消费使用",
                    "佣金导入账户之后不能再次导出、不可提现",
                    "账户充值出现问题可联系商城客服，也可拨打商城客服热线：400-8888-888"
                ]
            });
        });


    },
});
