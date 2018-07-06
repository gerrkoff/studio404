import { Component, OnInit } from '@angular/core';
import { Table } from "../models/table";
import { IEntity } from '../models/entity';

export abstract class TableComponent<T extends IEntity> implements OnInit {

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

    private updateRows(): void {
        this.loadedItems.forEach(x => 
            this.table.rows[x.id] = {
              isEditting: false,
              isProcessing: false,
              data: Object.assign({}, x)
            }
        );
    }

    onSort(sort: { key: string, value: string }): void {
        this.table.sortName = sort.key;
        this.table.sortValue = sort.value;
        this.onSearch();
    }

    onSearch(): void {
        if (!this.loadedItems)
          return;
          
        const filteredItems = this.loadedItems.filter(x => x[this.itemSearchFieldName].toLocaleLowerCase().indexOf(this.table.searchValue.toLocaleLowerCase()) !== -1);
        if (this.table.sortName) {
          this.showedItems = filteredItems.sort((a, b) => (this.table.sortValue === 'ascend') ? (a[this.table.sortName] > b[this.table.sortName] ? 1 : -1) : (b[this.table.sortName] > a[this.table.sortName] ? 1 : -1));
        } else {
          this.showedItems = filteredItems;
        }
    }

    protected async rowProcessingWrapper (
        rowId: string | number,
        rowProcessFunc: () => Promise<void>
    ): Promise<void> {
        if (!this.table.rows[rowId].isProcessing) {
            this.table.rows[rowId].isProcessing = true;
            try {
                await rowProcessFunc();
            }
            finally {
                this.table.rows[rowId].isProcessing = false;
            }
        }
    }

    // to be overrided by children if necessary
    init(): void {}
    abstract async loadItemsCore(): Promise<T[]>;
    abstract itemSearchFieldName: string;
}