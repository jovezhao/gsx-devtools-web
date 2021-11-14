export interface MenuItem {
    title: string;
    key: string;
    icon?: string;
    points?: string[]
    parentKey?: string
    fixed?: boolean
}
 export interface MenuTree extends MenuItem {
    children?: Array<MenuTree>
    parent?: MenuTree
}


