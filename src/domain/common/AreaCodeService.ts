import { IndexDb, AreaCode } from '@/infrastructure/indexdb';

export class AreaCodeService {
    private indexDb: IndexDb;
    constructor() {
        this.indexDb = new IndexDb();
    }

    async getName(code: string): Promise<string | undefined> {
        const areacode = await this.indexDb.areaCodes.get(code);
        return areacode?.name;
    }

    async getAreaInfo(code: string) {
        const codeLen = /0*$/.exec(code)?.index
        const areaInfo = {} as AreaInfo;

        if (codeLen && codeLen > 9) {
            const townCode = code.substring(0, 9).padEnd(12, "0")
            areaInfo.town = await this.indexDb.areaCodes.get(townCode)
        } else if (codeLen && codeLen > 6) {
            const countyCode = code.substring(0, 6).padEnd(12, "0")
            areaInfo.county = await this.indexDb.areaCodes.get(countyCode)
        } else if (codeLen && codeLen > 4) {
            const cityCode = code.substring(0, 4).padEnd(12, "0")
            areaInfo.city = await this.indexDb.areaCodes.get(cityCode)
        } else if (codeLen && codeLen > 2) {
            const provinceCode = code.substring(0, 2).padEnd(12, "0")
            areaInfo.province = await this.indexDb.areaCodes.get(provinceCode)
        }

        return areaInfo;
    }

    async getProvinceList(): Promise<AreaCode[]> {
        return this.indexDb.areaCodes
            .where("level").equals(1)
            .toArray()
    }
    async getCityList(provinceCode: string): Promise<AreaCode[]> {
        const provincePrefix = provinceCode.substring(0, 2)
        return this.indexDb.areaCodes
            .where("level")
            .equals(2)
            .and(p => p.code.startsWith(provincePrefix))
            .toArray()
    }
    async getCountyList(cityCode: string): Promise<AreaCode[]> {
        const cityPrefix = cityCode.substring(0, 4)
        return this.indexDb.areaCodes
            .where("code").startsWith(cityPrefix)
            .and(p => p.level == 3)
            .toArray()
    }
    async getTownList(countyCode: string): Promise<AreaCode[]> {
        const countyPrefix = countyCode.substring(0, 6)
        return this.indexDb.areaCodes
            .where("code").startsWith(countyPrefix)
            .and(p => p.level == 4)
            .toArray()
    }
    async getChildren(areaCode: string): Promise<AreaCode[]> {
        const codeLen = /0*$/.exec(areaCode)?.index
        if (codeLen == 2)
            return this.getCityList(areaCode);
        else if (codeLen == 4)
            return this.getCountyList(areaCode);
        else
            return this.getTownList(areaCode)

    }



}

interface AreaInfo {
    province?: AreaCode;
    city?: AreaCode;
    county?: AreaCode;
    town?: AreaCode;
}
