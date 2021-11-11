import { MenuItem, MenuTree } from "@/service/types"


class MenuList {
    data: Array<MenuTree>;

    constructor(menuData: Array<MenuItem>) {
        this.data = menuData.map<MenuTree>((p: MenuItem) => ({
            title: p.title,
            key: p.key,
            icon: p.icon,
            parentKey: p.parentKey,
            fixed: p.fixed
        }));

        this.data.map((p) => {
            p.children = this.data.filter((q) => p.key == q.parentKey);
            p.parent = this.data.find((q) => p.parentKey == q.key);
            return p;
        })
    }
    getMoudleList(): Array<MenuItem> {
        return this.data.filter(p => !p.parentKey)
    }
    getMenuTree(moudleKey: string): Array<MenuTree> | undefined {
        return this.data.find(p => p.key == moudleKey)?.children;
    }
    getMenu(key: string): MenuTree | undefined {
        return this.data.find(p => p.key == key);
    }

}

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

const menuList = new MenuList(menuData);

const moduleMenu = {
    state: menuList.data
}
export {
    moduleMenu, menuList
}
