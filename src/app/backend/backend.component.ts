import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  query,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-backend',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.scss',
})
export class BackendComponent implements OnInit {
  rowHeight = '57vh';

  constructor(
    private firestore: Firestore,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.rowHeight = '82vh'; // Adjust for smaller screens
        } else {
          this.rowHeight = '57vh'; // Default for larger screens
        }
      });
  }

  @ViewChildren('btn') btn!: QueryList<HTMLButtonElement>;

  allPostings!: CollectionReference<DocumentData, DocumentData>;
  approvedPostings!: CollectionReference<DocumentData, DocumentData>;
  querySnapshot!: QuerySnapshot;
  postingList: DocumentData[] = [];
  documentIDs: string[] = [];
  display: boolean = false;

  async ngOnInit() {
    this.allPostings = collection(this.firestore, 'all-job-postings');
    this.approvedPostings = collection(this.firestore, 'approved-postings');
    this.querySnapshot = await getDocs(query(this.allPostings));
    this.querySnapshot.forEach((doc) => {
      this.postingList.push(doc.data());
      this.documentIDs.push(doc.id);
    });
    this.display = true;

    this.cdr.detectChanges();
  }

  submit(index: number) {
    addDoc(this.approvedPostings, this.postingList[index]);
    deleteDoc(doc(this.firestore, 'all-job-postings', this.documentIDs[index]));
    this.btn.toArray()[index].disabled = true;
  }
}
