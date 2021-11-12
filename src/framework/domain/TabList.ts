
export class TabList {
    static defaultKey: string = "00";
    openTabs: Array<TabInfo>;
    currentKey: string = TabList.defaultKey;

    constructor() {
        this.openTabs = [];
    }
    openTab(tabInfo: TabInfo): void {
        const index = this.openTabs.findIndex(p => p.key == tabInfo.key)
        if (index < 0) {
            this.openTabs.push(tabInfo);
        }
        this.currentKey = tabInfo.key;

    }
    close(key: string): string {
        const index = this.openTabs.findIndex(p => p.key == key);
        let nextKey = ""
        if (key != this.currentKey) {
            nextKey = this.currentKey
        } else if (index == 0 && this.openTabs.length == 1) { //关闭第一项，并且没有其它打开的内容
            nextKey = TabList.defaultKey
        } else if (index == this.openTabs.length - 1 && this.openTabs.length > 1) { //关闭第一项，并且有其它打开的内容，默认值设置为下一项。
            nextKey = this.openTabs[index - 1].key;
        } else {
            nextKey = this.openTabs[index + 1].key
        }

        this.openTabs.splice(index, 1);
        this.currentKey = nextKey;

        return nextKey;
        // if (this.currentKey == key) {
        //     console.log("22222", index);

        //     this.currentKey = index === 0 ? TabList.defaultKey : this.openTabs[index - 1].key;
        // }

    }
    closeAll(): string {
        // this.openTabs.splice(0, this.openTabs.length);
        this.closeOther();
        return this.close(this.currentKey);
    }
    closeOther() {
        // this.openTabs.splice(0, this.openTabs.length);
        this.closeLeft();
        this.closeRight();
        // return this.currentKey;
    }
    closeLeft() {
        const index = this.openTabs.findIndex(p => p.key == this.currentKey);
        let remove = this.openTabs.splice(0, index);
        this.openTabs.splice(0, 0, ...remove.filter(p => !p.closable))
    }
    closeRight() {
        const index = this.openTabs.findIndex(p => p.key == this.currentKey);
        let remove = this.openTabs.splice(index + 1, this.openTabs.length - index);
        this.openTabs.push(...remove.filter(p => !p.closable))
    }

}
