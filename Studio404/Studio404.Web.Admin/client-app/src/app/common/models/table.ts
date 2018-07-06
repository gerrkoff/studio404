export class Table<T> {
    public rows: Rows<T>;
    public isLoading: boolean;
}

export class Rows<T> {
    [id: string]: Row<T>;
}

export class Row<T> {
    public data: T;
    public isEditting: boolean;
    public isProcessing: boolean;
}