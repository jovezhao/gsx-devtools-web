import { MenuTreeList } from "@/domain/base/MenuTreeList";

const menuData: Array<MenuItem> = [
    {
        title: "首页",
        key: "00",
        icon: "icon-shaojiandengji",
        points: ["abc", "bbc"],
        fixed: true
    },
    {
        title: "模块1",
        key: "01",
        icon: "icon-shaojiandengji",
        points: ["abc", "bbc"]
    },
    {
        title: "模块2",
        key: "02"
    }, {
        title: "模块3",
        key: "03"
    }, {
        title: "主菜单1-1",
        key: "0101",
        icon: "icon-caidanguanli",
        parentKey: "01"
    }, {
        title: "菜单1-1-1",
        key: "010101",
        icon: "icon-kaohe",
        parentKey: "0101"
    }, {
        title: "菜单1-1-2",
        key: "010102",
        parentKey: "0101",
        icon: "icon-bumenbaodao"
    }, {
        title: "主菜单1-2",
        key: "0102",
        parentKey: "01",
        icon: "icon-bumenbaodao"
    }, {
        title: "菜单1-2-1",
        key: "010201",
        parentKey: "0102",
        icon: "icon-bumenbaodao"
    }, {
        title: "主菜单1-3",
        key: "0103",
        parentKey: "01",
        icon: "icon-bumenbaodao"
    }, {
        title: "主菜单2-1",
        key: "0201",
        parentKey: "02",
        icon: "icon-bumenbaodao"
    }]

const menuTreeList = new MenuTreeList(menuData);

export const menuModule = {
    state: menuTreeList
}
