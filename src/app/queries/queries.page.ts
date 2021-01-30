import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.page.html',
  styleUrls: ['./queries.page.scss'],
})
export class QueriesPage implements OnInit {

  queries: string = 'question';

  queryForm: FormGroup;
  queryList: any;

  answer: any;

  constructor(private fireStoreService: FireStoreService,private firestore: AngularFirestore,
    public fb: FormBuilder , private afauth:AngularFirestore) { }


  ngOnInit() {

    // this.queryForm = this.fb.group({
    //   answer: ['', [Validators.required]]
		// })

    this.fireStoreService.read_Query().subscribe(data => {
			this.queryList = data.map(e => {
				return {
					id: e.payload.doc.id,
					isEdit: false,
					userid: e.payload.doc.data()['userid'],
					query: e.payload.doc.data()['query'],
          Product_id: e.payload.doc.data()['Product_id'],
          answer: e.payload.doc.data()['answer']
				};
			});
			console.log(this.queryList);
		});

  }

  update(query) {
    
    alert(this.answer);
		this.firestore.collection('Query').doc(query.id).update({
      answer: this.answer
    });
    
    console.log(query);
    // alert(row);
  }
  // read_Query(){
  //   return this.afauth.collection('Query',(ref)=>ref.where('answer','==','undefined')).snapshotChanges();
  // }

  RemoveRecord(rowID) {
    // alert("Delete Disabled");
    console.log(rowID);
    this.fireStoreService.delete_Query(rowID);
  }



  

}
