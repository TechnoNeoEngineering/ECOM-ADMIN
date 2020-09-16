
import { Component } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


interface CategoryData {
  Category: string;
  SubCategory : string;
}

@Component({
  selector: 'app-view',
  templateUrl: 'view.page.html',
  styleUrls: ['view.page.scss'],
})
export class ViewPage {

  public selectedCategory: any[];
  public selectedSubCategory: any[];

  categoryList = [];
  categoryForm: FormGroup;

  filtered: any[]= [];
  
  SubCategoryList = [];
  SubCategoryform: FormGroup;

  public sCat: any;
  public sSubCat: any;
  max_id: any;

  constructor(
    private fireStoreService: FireStoreService,
    public fb: FormBuilder
  ) {
  //  this.categoryData = {} as categoryData;
  }

  ngOnInit() {

    this.SubCategoryform = this.fb.group({
      cat_id: ['', [Validators.required]],
      SubCategory_id: ['', [Validators.required]],
      SubCategory: ['', [Validators.required]],
    })

    this.fireStoreService.read_category().subscribe(data => {
      this.categoryList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          cat_id: e.payload.doc.data()['cat_id'],
          Category: e.payload.doc.data()['Category'],
        };
      })
    });

    // ---------------Sub-Category--------------

    this.fireStoreService.read_subcategory().subscribe(data => {
      this.SubCategoryList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          cat_id: e.payload.doc.data()['cat_id'],
          SubCategory_id: e.payload.doc.data()['SubCategory_id'],
          SubCategory: e.payload.doc.data()['SubCategory'],
        };
      })
      this.cat_name();
      this.get_max_id();
    })
  }

  setCategoryValues(sCat) {
    this.selectedCategory = this.SubCategoryList.filter(Categoryvalue => Categoryvalue.cat_id == sCat.cat_id)
    // alert(sCat.id);
}
  CreateSubCategory() {
    console.log(this.SubCategoryform.value);
    this.fireStoreService.create_subcategory(this.SubCategoryform.value).then(resp => {
      this.SubCategoryform.reset();
      this.get_max_id();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    // this.fireStoreService.delete_subcategory(rowID);
    alert("Delete Disabled");
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditSubCategory = record.SubCategory;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['SubCategory'] = recordRow.EditSubCategory;
    this.fireStoreService.update_subcategory(recordRow.id, record);
    recordRow.isEdit = false;
  }
  cat_name(){
    const mergeById = (SubCategoryList, categoryList) =>
    SubCategoryList.map(itm => ({
      ...categoryList.find((item) => (item.cat_id === itm.cat_id) && item),
      ...itm
    }));
    
    this.filtered= mergeById(this.SubCategoryList, this.categoryList);
    // console.log(this.filtered);
    }
  get_max_id(){
      var maxid =Math.max.apply(Math, this.SubCategoryList.map(function(o) { return o.SubCategory_id; }));
      this.max_id = maxid+1;
      console.log(this.max_id);
  }
}