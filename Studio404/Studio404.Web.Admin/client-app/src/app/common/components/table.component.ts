import { Component, OnInit } from '@angular/core';
import { Table } from '../models/table';
import { IEntity } from '../models/entity';

export abstract class TableComponent<T extends IEntity> implements OnInit {

    abstract itemSearchFieldName: string;

    loadedItems: T[];
    showedItems: T[];
    table: Table<T>;

    private newItemIndex: number;

    ngOnInit() {
        this.table = {
          rows: {},
          isLoading: false,
          searchValue: '',
          sortName: null,
          sortValue: null
        };
        this.newItemIndex = -1;
        this.showedItems = [];
        this.init();
        this.loadItems();
    }

    protected async loadItems(): Promise<void> {
        if (!this.table.isLoading) {
            this.table.isLoading = true;
            try {
                this.loadedItems = await this.loadItemsCore();
                this.showedItems = [...this.loadedItems];
                this.updateRows();
            }
            finally {
                this.table.isLoading = false;
            }
        }
    }

    protected async rowProcessingWrapper (
        id: string | number,
        rowProcessFunc: () => Promise<void>
    ): Promise<void> {
        if (!this.table.rows[id].isProcessing) {
            this.table.rows[id].isProcessing = true;
            try {
                await rowProcessFunc();
            }
            finally {
                if (this.table.rows[id]) {
                    this.table.rows[id].isProcessing = false;
                }
            }
        }
    }

    protected async rowUpdatingWrapper (
        id: string | number,
        rowUpdateFunc: () => Promise<T>
    ): Promise<void> {
        return this.rowProcessingWrapper(id, async() => {
            const newData = await rowUpdateFunc();
            const oldData = this.loadedItems.find(x => x.id === id);
            Object.assign(oldData, newData);
            if (newData.id !== id) {
                delete this.table.rows[id];
                this.updateRows();
            }
        });
    }

    protected deleteRow(id: number): void {
        this.loadedItems = this.loadedItems.filter(x => x.id !== id);
        this.showedItems = this.showedItems.filter(x => x.id !== id);
        delete this.table.rows[id];
    }

    private updateRows(): void {
        this.loadedItems.forEach(x => {
            if (!this.table.rows[x.id]) {
                this.table.rows[x.id] = {
                    isEditting: false,
                    isProcessing: false,
                    data: Object.assign({}, x)
                };
            }
        });
    }

    onSort(sort: { key: string, value: string }): void {
        this.table.sortName = sort.key;
        this.table.sortValue = sort.value;
        this.onSearch();
    }

    onSearch(): void {
        if (!this.loadedItems) {
            return;
        }

        const filteredItems = this.loadedItems
            .filter(x => x[this.itemSearchFieldName].toLocaleLowerCase().indexOf(this.table.searchValue.toLocaleLowerCase()) !== -1);

        if (this.table.sortName) {
          this.showedItems = filteredItems
            .sort((a, b) => (this.table.sortValue === 'ascend')
                ? (a[this.table.sortName] > b[this.table.sortName] ? 1 : -1)
                : (b[this.table.sortName] > a[this.table.sortName] ? 1 : -1));
        } else {
          this.showedItems = filteredItems;
        }
    }

    onStartEdit(id: number): void {
        this.table.rows[id].isEditting = true;
    }

    onCancelEdit(id: number): void {
        this.table.rows[id].isEditting = false;
    }

    onAddRow(): void {
        const newItem = this.createNewItem();
        newItem.id = this.newItemIndex--;
        this.loadedItems.push(newItem);
        this.showedItems = [newItem, ...this.showedItems];
        this.updateRows();
        this.table.rows[newItem.id].isEditting = true;
    }

    async onRefreshData(): Promise<void> {
        await this.loadItems();
        this.onSearch();
    }

    // to be overrided by children if necessary
    init(): void {}

    createNewItem(): any {
        return {};
    }

    abstract async loadItemsCore(): Promise<T[]>;
}
