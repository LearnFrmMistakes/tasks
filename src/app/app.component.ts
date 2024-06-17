import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { CommonService } from './common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tasks';
  usersData : any;
  weatherReport: any;
  tasks: any;
  latitude: string = '';
  longitude: string = '';
  @ViewChild('id') id!: ElementRef;

  constructor(private _commonService: CommonService){}

  ngOnInit(): void {
    this._commonService.fetchUsersData().subscribe({
      next:(res) =>{
        this.usersData = res.results[0];
        console.log(this.usersData);
      }
    });
    this._commonService.getAllTasks().subscribe({
      next:(res) =>{
        this.tasks = res;
        console.log(this.tasks);
      }
    });
  }

  getWeatherReport(){
    const stringtobeAppended = "latitude=" + this.latitude + "&longitude=" + this.longitude + "&current=temperature_2m";
    this._commonService.fetchWeatherInformation(stringtobeAppended).subscribe({
      next:(res)=>{
        this.weatherReport = res;
        console.log(this.weatherReport);
      }
    })
  }

  getLongitude(value: any){
    if(value.code.includes('Digit')){
      this.longitude = value.key;
    }
  }

  getlatitude(value: any){
    if(value.code.includes('Digit')){
      this.latitude = value.key;
    }
  }

  addTasks(){
    const id = (document.getElementById('id') as HTMLInputElement)?.value;
    const name = (document.getElementById('name') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const addObject = {
      "id" : id,
      "name" : name,
      "email" : email
    }
    this._commonService.addTask(addObject).subscribe({
      next:(res) =>{
        this._commonService.getAllTasks().subscribe({
          next:(res) =>{
            this.tasks = res;
            console.log(this.tasks);
          }
        });
      }
    });
   }

   deleteTask(){
    const deletetask = (document.getElementById('delete') as HTMLInputElement)?.value;
    this._commonService.deleteTask(deletetask).subscribe({
      next:(res) =>{
        this._commonService.getAllTasks().subscribe({
          next:(res) =>{
            this.tasks = res;
          }
        });
      }
    });
   }

   updateTask(){
    const id = (document.getElementById('id') as HTMLInputElement)?.value;
    const name = (document.getElementById('name') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const updateObject = {
      "id" : id,
      "name" : name,
      "email" : email
    }
    this._commonService.updateTask(updateObject).subscribe({
      next:(res) =>{
        this._commonService.getAllTasks().subscribe({
          next:(res) =>{
            this.tasks = res;
            console.log(this.tasks);
          }
        });
      }
    });
   }
}
