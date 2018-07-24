import { Component, OnInit } from '@angular/core';
import { Table, FieldInvalid } from '../../models/table';
import { IEntity } from '../../models/entity';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export abstract class TableComponent<T extends IEntity> implements OnInit {

    loadedItems: T[];
    showedItems: T[];
    table: Table<T>;

    protected abstract itemSearchFieldName: string;
    protected abstract loadItemsCore(): Observable<T[]>;

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

    protected loadItems(searchAfterLoading: boolean = false): void {
        if (this.table.isLoading) {
            return;
        }

        this.table.isLoading = true;
        this.loadItemsCore()
            .pipe(
                finalize(() => this.table.isLoading = false)
            )
            .subscribe({
                next: data => {
                    this.loadedItems = data;
                    this.showedItems = [...this.loadedItems];
                    this.updateRows(true);

                    if (searchAfterLoading) {
                        this.onSearch();
                    }
                }
            });
    }

    protected rowProcessingWrapper<T> (id: string | number, rowProcessFunc: () => Observable<T>): Observable<T> {
        if (this.table.rows[id].isProcessing) {
            return null;
        }
        
        this.table.rows[id].isProcessing = true;
        return rowProcessFunc().pipe(
            finalize(() => {
                if (this.table.rows[id]) {
                    this.table.rows[id].isProcessing = false;
                }
            })
        );
    }

    protected updateRows(hardUpdate: boolean = false): void {
        this.loadedItems.forEach(x => {
            if (!this.table.rows[x.id]) {
                this.table.rows[x.id] = {
                    isEditting: false,
                    isProcessing: false,
                    fieldInvalid: new FieldInvalid(),
                    data: Object.assign({}, x)
                };
            } else if (hardUpdate) {
                this.table.rows[x.id].data = Object.assign({}, x);
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
                .filter(x => (x[this.itemSearchFieldName] || '')
                                .toLocaleLowerCase().indexOf(this.table.searchValue.toLocaleLowerCase()) !== -1)
            : [...this.loadedItems];

        if (this.table.sortName) {
          this.showedItems = this.sort(filteredItems, this.table.sortName, this.table.sortValue === 'ascend');
        } else {
          this.showedItems = filteredItems;
        }
    }

    onRefreshData(): void {
        this.loadItems(true);
    }
}
