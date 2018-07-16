import { Component, OnInit } from '@angular/core';
import { Table, FieldInvalid } from '../../models/table';
import { IEntity } from '../../models/entity';

export abstract class TableComponent<T extends IEntity> implements OnInit {

    protected abstract itemSearchFieldName: string;
    protected abstract async loadItemsCore(): Promise<T[]>;

    loadedItems: T[];
    showedItems: T[];
    table: Table<T>;

    ngOnInit() {
        this.table = {
          rows: {},
          isLoading: false,
          searchValue: '',
          sortName: null,
          sortValue: null
        };        
        this.showedItems = [];
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

    protected updateRows(): void {
        this.loadedItems.forEach(x => {
            if (!this.table.rows[x.id]) {
                this.table.rows[x.id] = {
                    isEditting: false,
                    isProcessing: false,
                    fieldInvalid: new FieldInvalid(),
                    data: Object.assign({}, x)
                };
            }
        });
    }

    protected sort(array: T[], sortName: string, sortDirection: boolean): T[] {
        return array
                .sort((a, b) => sortDirection
                    ? (a[sortName] > b[sortName] ? 1 : -1)
                    : (b[sortName] > a[sortName] ? 1 : -1));
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

        const filteredItems = this.itemSearchFieldName
            ? this.loadedItems
                .filter(x => x[this.itemSearchFieldName].toLocaleLowerCase().indexOf(this.table.searchValue.toLocaleLowerCase()) !== -1)
            : [...this.loadedItems];

        if (this.table.sortName) {
          this.showedItems = this.sort(filteredItems, this.table.sortName, this.table.sortValue === 'ascend');
        } else {
          this.showedItems = filteredItems;
        }
    }

    async onRefreshData(): Promise<void> {
        await this.loadItems();
        this.onSearch();
    }
}
