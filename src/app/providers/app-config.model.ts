export enum SpecMode {
	SCRIPT = "script",
	URL = "url"
}

export interface IAppConfig {
    env: {
        name: string;
    };    
    getSpec: {
    	mode: SpecMode,
    	value: string
    };
    getSpecList: {
    	mode: SpecMode,
    	value: string
    };
    saveSpec: {
        mode: SpecMode,
        value: string
    };
}