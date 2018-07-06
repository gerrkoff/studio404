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

    // to be overrided by children if necessary
    init(): void {}
    abstract async loadItemsCore(): Promise<T[]>;
}