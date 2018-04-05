export class NavParamsMock {

    static returnParams: any = {};
    static setParams(key: any, value: any): any {
        NavParamsMock.returnParams[key] = value;
    }

    public get(key: any): any {
        if (NavParamsMock.returnParams[key]) {
            return NavParamsMock.returnParams[key];
        }
    }
}
