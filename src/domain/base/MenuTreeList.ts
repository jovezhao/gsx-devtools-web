import { MenuItem, MenuTree } from "@/types/base/MenuTree";

 export class MenuTreeList {
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
