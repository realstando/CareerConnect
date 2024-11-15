import { Component, AfterViewInit, OnInit } from '@angular/core';
import { collection, CollectionReference, DocumentData, Firestore, getDocs, getFirestore, query, QuerySnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-backend',
  standalone: true,
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.scss',
})
export class BackendComponent implements OnInit{

  constructor(private firestore: Firestore) {}

  allPostings!: CollectionReference<DocumentData, DocumentData>;
  querySnapshot!: QuerySnapshot;
  postingList: DocumentData[] = [];
  display: boolean = false;

  async ngOnInit() {
    this.allPostings = collection(this.firestore, 'all-job-postings');
    this.querySnapshot = await getDocs(query(this.allPostings));
    this.querySnapshot.forEach((doc) => {
      this.postingList.push(doc.data());
    });
    this.display = true;
  }

}
