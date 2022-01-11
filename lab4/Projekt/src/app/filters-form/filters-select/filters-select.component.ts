import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DropdownSettings } from 'src/shared/models/dropdown-settings.model';

type eventObj = {filterAttr: string, value: any}

@Component({
  selector: 'app-filters-select',
  templateUrl: './filters-select.component.html',
  styleUrls: ['./filters-select.component.scss']
})
export class FiltersSelectComponent {
  @Output() itemSelected = new EventEmitter<eventObj>();
  @Output() itemDeSelected = new EventEmitter();
  @Output() selectedAll = new EventEmitter();
  @Output() deSelectedAll = new EventEmitter();
  @Input() filterName!: string
  @Input() settings!: DropdownSettings
  @Input() dropDownList: any = []
  @Input() filterAttr!: string
  selectedItems = []
  
  constructor() {}

  onItemSelect(filterValue: any) {
    this.itemSelected.emit(this.createEventObj(filterValue));
  }

  onSelectAll(filterValues: any) {
    this.selectedAll.emit(this.createEventObj(filterValues));
  }

  onItemDeSelect(filterValue: any) {
    this.itemDeSelected.emit(this.createEventObj(filterValue));
  }

  onDeSelectAll(filterValues: any) {
    this.deSelectedAll.emit(this.createEventObj(filterValues));
  }

  private createEventObj(value: any): eventObj {
    return {
      filterAttr: this.filterAttr,
      value
    }
  }
}
