import { IEntity } from '../../models/entity';
import { TableComponent } from '../table/table.component';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class TableEditableComponent<T extends IEntity> extends TableComponent<T> implements OnInit {

    private newItemIndex: number;

    protected abstract createNewItem(): T;
    protected abstract validate(id: number): boolean;
    protected abstract saveItem(id: number): Observable<T>;
    protected abstract deleteItem(id: number): Observable<void>;

    ngOnInit() {
        super.ngOnInit();
        this.newItemIndex = -1;
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

    onSaveEdit(id: number): void {
        if (!this.validate(id)) {
            return;
        }

        const response = this.rowProcessingWrapper<T>(id, () => this.saveItem(id));

        if (response) {
            response.subscribe({
                next: (newData: T) => {
                    const oldData = this.loadedItems.find(x => x.id === id);
                    Object.assign(oldData, newData);
                    if (newData.id !== id) {
                        delete this.table.rows[id];
                        this.updateRows();
                    } else {
                        this.table.rows[id].isEditting = false;
                    }
                }
            });
        }
    }

    onDeleteRow(id: number): void {
        if (id < 0) {
            this.deleteRow(id);
            return;
        }

        const response = this.rowProcessingWrapper<void>(id, () => this.deleteItem(id));

        if (response) {
            response.subscribe({
                next: () => this.deleteRow(id)
            });
        }
    }

    private deleteRow(id: number): void {
        this.loadedItems = this.loadedItems.filter(x => x.id !== id);
        this.showedItems = this.showedItems.filter(x => x.id !== id);
        delete this.table.rows[id];
    }
}
