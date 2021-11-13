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


