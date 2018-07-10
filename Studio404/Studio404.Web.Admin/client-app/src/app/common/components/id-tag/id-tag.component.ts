import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-id-tag',
  templateUrl: './id-tag.component.html',
  styleUrls: ['./id-tag.component.css']
})
export class IdTagComponent implements OnInit {

  @Input() value: number = -1;

  constructor() { }

  ngOnInit() {
  }
}
