export interface IParkinsonPayload {
    blobURL: string;
    blob: {
        size: BigInteger;
        type: string;
    };
}
