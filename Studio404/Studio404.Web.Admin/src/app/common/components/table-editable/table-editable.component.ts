import { IEntity } from '../../models/entity';
import { TableComponent } from '../table/table.component';

export abstract class TableEditableComponent<T extends IEntity> extends TableComponent<T> {

    private newItemIndex: number;

    protected abstract createNewItem(): T;
    protected abstract validate(id: number): boolean;
    protected abstract saveItem(id: number): Promise<T>;
    protected abstract deleteItem(id: number): Promise<void>;
    
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
        
        this.rowUpdatingWrapper(id, () =>
          this.saveItem(id)
        );
    }

    onDeleteRow(id: number): void {
        if (id < 0) {
          this.deleteRow(id);
          return;
        }
    
        this.rowProcessingWrapper(id, async () => {
          await this.deleteItem(id);
          this.deleteRow(id);
        });
    }

    private deleteRow(id: number): void {
        this.loadedItems = this.loadedItems.filter(x => x.id !== id);
        this.showedItems = this.showedItems.filter(x => x.id !== id);
        delete this.table.rows[id];
    }

    private async rowUpdatingWrapper (
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
            } else {
                this.table.rows[id].isEditting = false;
            }
        });
    }
}
