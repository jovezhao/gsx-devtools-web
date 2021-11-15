import { IndexDb } from '@/infrastructure/indexdb';
import { AreaCode } from '@/types/base/AreaCode';
import { AreaInfo } from '@/types/base/AreaInfo';

export class AreaCodeService {
    private indexDb: IndexDb;
    constructor() {
        this.indexDb = new IndexDb();
    }

    async getName(code: string): Promise<string | undefined> {
        const areacode = await this.indexDb.areaCodes.get(code);
        return areacode?.name;
    }

    async getAreaInfo(areaCode: string) {
        // const level = this.getLevel(areaCode)

        const codeLen = /0*$/.exec(areaCode)?.index
        const areaInfo = {} as AreaInfo;

        if (codeLen && codeLen > 9) {
            const townCode = areaCode.substring(0, 9).padEnd(12, "0")
            areaInfo.town = await this.indexDb.areaCodes.get(townCode)
        } else if (codeLen && codeLen > 6) {
            const countyCode = areaCode.substring(0, 6).padEnd(12, "0")
            areaInfo.county = await this.indexDb.areaCodes.get(countyCode)
        } else if (codeLen && codeLen > 4) {
            const cityCode = areaCode.substring(0, 4).padEnd(12, "0")
            areaInfo.city = await this.indexDb.areaCodes.get(cityCode)
        } else if (codeLen && codeLen > 2) {
            const provinceCode = areaCode.substring(0, 2).padEnd(12, "0")
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
    async getChildren(areaCode: string): Promise<AreaCode[] | undefined> {
        const level = this.getLevel(areaCode)

        if (level == 1)
            return this.getCityList(areaCode);
        else if (level == 2)
            return this.getCountyList(areaCode);
        else if (level == 3)
            return this.getTownList(areaCode)

    }

    getLevel(areaCode: string): number | undefined {
        const codeLen = /0*$/.exec(areaCode)?.index
        if (codeLen == 2) return 1;
        if (codeLen == 4) return 2;
        if (codeLen == 6) return 3;
        if (codeLen == 9) return 4;
    }
    getFullCode(areaCode: string): string[] {
        let result: string[] = [];

        const level = this.getLevel(areaCode)

        if (level && level >= 1)
            result.push(areaCode.substring(0, 2).padEnd(12, '0'))
        if (level && level >= 2)
            result.push(areaCode.substring(0, 4).padEnd(12, '0'))
        if (level && level >= 3)
            result.push(areaCode.substring(0, 6).padEnd(12, '0'))
        if (level && level >= 4)
            result.push(areaCode.substring(0, 9).padEnd(12, '0'))

        return result;

    }


}