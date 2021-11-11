interface MenuItem {
    title: string;
    key: string;
    icon?: string;
    points?: string[]
    parentKey?: string
    fixed?: boolean
}
interface MenuTree extends MenuItem {
    children?: Array<MenuTree>
    parent?: MenuTree
}

interface TabInfo {
    //标题
    title: string,
    //key，对应为path
    key: string,
    icon?: string,
    closable?:boolean,
}

export {
    MenuItem, MenuTree, TabInfo
}