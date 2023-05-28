import { Component } from '@angular/core';

@Component({
  selector: 'app-document-panel',
  templateUrl: './document-panel.component.html',
  styleUrls: ['./document-panel.component.scss']
})
export class DocumentPanelComponent {
  
  totalDocs=271;
  generatedDocs=29;
  pendingDocs=6;
  availableDocs=4;
}
