export declare class GoogleChartsLoaderService {
    private chartPackage;
    private googleScriptLoadingNotifier;
    private googleScriptIsLoading;
    constructor();
    load(chartType: string): Promise<any>;
    private loadGoogleChartsScript();
}
