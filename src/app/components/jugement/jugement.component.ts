import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FishService } from 'src/app/services/fish/fish.service';
import { HuntingService } from 'src/app/services/hunting/hunting.service';
import { Competition } from 'src/app/shared/models/Competition';
import { Fish } from 'src/app/shared/models/Fish';
import { Hunting } from 'src/app/shared/models/Hunting';
import { Member } from 'src/app/shared/models/Member';

@Component({
  selector: 'app-jugement',
  templateUrl: './jugement.component.html',
  styleUrls: ['./jugement.component.css']
})
export class JugementComponent implements OnInit {

  @Input() numberOfJudges!: number;

  fishList!: Fish[];

  formJuge!: FormGroup;

  selectedMember!: Member;

  competition!: Competition;

  competitionCode: string | null = null;

  showJudgePopup = false;


  constructor(private serviceFish: FishService, private serviceHunting: HuntingService, private fb: FormBuilder, private route: ActivatedRoute,) {
    this.createFormJug()
  }



  ngOnInit(): void {
    this.getAllFish();
    this.route.snapshot.params['code'];
        console.log(this.route.snapshot.params['code']);
  }

  getAllFish() {
    this.serviceFish.getFish().subscribe(
      data => {
        this.fishList = data;
        console.log(data)
      }
    )
  }

  selectedFish: any;

  selectFish(fish: any): void {
    this.selectedFish = fish;
    console.log(fish)

    this.createFormJug(this.selectedFish);


    
  }
  

  createFormJug(selectedFish: Fish | null = null) {
    const storedMemberNum = localStorage.getItem('selectedMemberNum');
    const fishNameValue = selectedFish ? selectedFish.name : null;

    console.log(this.route.snapshot.params['code']);

    this.formJuge = this.fb.group({
      competition_code: this.route.snapshot.params['code'],
      fish_name: fishNameValue,
      member_num: [storedMemberNum],
      numberOfFish: [''],
    })
    console.log(this.formJuge.value)
  }

  judgeFish(): void {
    if (this.selectedFish) {
      const newJug = this.formJuge.value as Hunting;
      this.serviceHunting.addHunting(newJug).subscribe(

      )
    }
  }







}
