import { TabInfo } from '@/service/types';
import { Router } from "vue-router";
import { Store } from "vuex";
import { menuList } from "@/service/menu";
import { TabList } from "@/store/tabs";



export class NavUtils {
    tabList: TabList;
    router: Router;

    constructor(store: Store<any>, router: Router) {
        this.tabList = store.state.tabs as TabList;
        this.router = router
    }
    to(key: string) {
        //根据菜单key转向
        //1. 获取key对应的路由，发起路由跳转。
        //2. 根据key获取菜单信息，设置tab信息。

        let route = this.router.getRoutes().find((p) => p.meta.menuKey == key);
        if (route == null) {
            route = this.router.getRoutes().find((p) => p.name == "404");
        }
        this.router.push({
            name: route?.name,
        });

        const menu = menuList.getMenu(key)
        console.log(menu);

        this.tabList.openTab({ key: menu?.key, title: menu?.title, icon: menu?.icon, closable: !menu?.fixed } as TabInfo)
    }
    close(key: string) {
        // 关闭页面
        //1. 根据key获取关闭的选项卡位置获取下一个选项卡，并且移出当前选项卡
        const nextKey = this.tabList.closeTab(key);
        //2. 跳转到下一个选项卡。
        this.to(nextKey);
    }
}