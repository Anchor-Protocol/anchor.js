export declare type InputEntry = [
    boolean | (() => boolean),
    string
];
export declare const validateInput: (inputEntries: InputEntry[]) => boolean;
