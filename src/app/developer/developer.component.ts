import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../services/helper.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})

export class DeveloperComponent implements OnInit {
  apps: DialogData[]=[];
  displayedColumns: string[] = ['no','name', 'version', 'keyApp', 'description'];
  dataSource : MatTableDataSource<DialogData>;
  model:DialogData;
  dataResult: any;
  constructor(private auth:AuthService, private http: HttpClient, private helper: HelperService,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.http.get<any>(this.helper.url("/developer/me"), this.auth.getHttpHeader())
    .subscribe(x=>{
     
    });
    this.apps=[{name: "App1", version: "1.0", description: "sadasd", keyApp:"dwwww"}];
    this.dataSource= new MatTableDataSource<DialogData>(this.apps);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeveloperModalDialog, {
      width: '400px',
      data: {name: "", version: "1.0", description: "", keyApp:""}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result!=undefined)
      {
        const data= {name: result.name, version:result.version, description:result.description, keyApp:''};
        this.apps.push(data);
        this.dataSource.data = this.apps;
      }

    });
  }


}

@Component({
  selector: 'developer-modal-dialog',
  templateUrl: 'DeveloperModalDialog.html',
  styleUrls: ['./developer.component.scss']
})

export class DeveloperModalDialog {

  constructor(
    public dialogRef: MatDialogRef<DeveloperModalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  name: string;
  version: string;
  description: string;
  keyApp:string;
}
