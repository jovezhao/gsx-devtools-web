import Dexie from "dexie";
import { AreaCode } from "../../types/base/AreaCode";

export class IndexDb extends Dexie {

    areaCodes: Dexie.Table<AreaCode, string>;

    constructor() {
        super("IndexDB");
        this.version(6).stores({
            areaCodes: "code,level"
        })
            .upgrade(tx => {

                const getdata = async () => {
                    console.log("get from url");
                    return [
                        { code: "510000000000", name: "四川省", level: 1 },
                        { code: "440000000000", name: "广东省", level: 1 },
                        { code: "440100000000", name: "广州市", level: 2 },
                        { code: "440103000000", name: "荔湾区", level: 3 },
                        { code: "440104000000", name: "越秀区", level: 3 },
                        { code: "440104001000", name: "洪桥街道", level: 4 },
                        { code: "440104003000", name: "北京街道", level: 4 },
                        { code: "440104011000", name: "东山街道", level: 4 },
                        { code: "440200000000", name: "深圳市", level: 2 },
                        { code: "440201000000", name: "宝安区", level: 3 },
                        { code: "440201001000", name: "aa街道", level: 4 },


                    ] as AreaCode[]
                }

                getdata().then(async p => {
                    await tx.table("areaCodes").clear();
                    return tx.table("areaCodes").bulkAdd(p);
                })


            });

        this.areaCodes = this.table("areaCodes")
    }
}


