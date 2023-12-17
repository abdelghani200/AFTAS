import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { Competition } from 'src/app/shared/models/Competition';
import { Ranking } from 'src/app/shared/models/Ranking';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/app/shared/models/Member';
import { SweetAlertService } from 'src/app/services/sweetalert/sweet-alert.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],

})
export class DetailsComponent implements OnInit {

  @Output() editMemberClicked: EventEmitter<number> = new EventEmitter<number>();

  competition?: Competition;

  numberOfJudges: number = 1;

  registerForm!: FormGroup;

  showAddForm = false;

  showRegisterForm = false;

  showdetails = false;

  operation: String = 'add'

  currentMember: any;

  selectedCompetition: Competition | null = null;


  competitionForm!: FormGroup;

  @Output() updateClicked = new EventEmitter<void>();

  // Receive the form from CompetitionComponent
  receiveCompetitionForm(form: FormGroup) {
    this.competitionForm = form;
  }

  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private rankingService: RankingService,
    private router: Router,
    public dialog: MatDialog,
    private sweetAlertService: SweetAlertService
  ) {
    this.createFormRegister();
    this.createCompetitionForm()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const code = params.get('code');
      console.log(code);
      if (code) {
        this.getCompetition(code);
      }
    });
  }

  onUpdateClick() {
    this.updateClicked.emit();
  }

  selectedMember: Member | null = null;

  showMemberDetails(member: Member | undefined) {
    if (member) {
      this.selectedMember = member;

      this.showdetails = true;
    }
  }



  getCompetition(code: string) {
    this.competitionService.getByCode(code).subscribe(
      data => {
        this.competition = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching competition:', error);
      }
    );
  }

  createFormRegister() {
    this.registerForm = this.fb.group({
      memberNum: ['', Validators.required],
    })
  }


  registerMember() {
    const newMember = {
      memberNum: this.registerForm.get('memberNum')?.value,
      competitionCode: this.competition?.code
    } as Ranking;

    console.log(newMember.competition?.code);
    console.log(newMember.member?.num);

    this.rankingService.registerMember(newMember).subscribe(
      () => {
        console.log('Member registered successfully');
        this.sweetAlertService.showAlert('Success', 'Member registered successfully', 'success');
        this.resetForm();
      },
      error => {
        console.error('Error registering member:', error);
        if (error.status === 500) {
          console.error('Registration failed:', error);
          if (error.error.message.includes('Registration is closed')) {
            this.sweetAlertService.showAlert('Error', 'Registration is closed. The competition has already started or is less than 24 hours away.', 'error');
          } else {
            this.sweetAlertService.showAlert('Error', 'Member registration failed. An unexpected error occurred.', 'error');
          }
        }
      }
    );
  }

  cancelAddOrEdit() {
    this.operation = 'add';
    this.resetForm();
  }

  resetForm() {
    this.showRegisterForm = false;
    this.registerForm.reset();
  }

  cancelAddOrEdit1() {
    this.operation = 'add';
    this.resetForm1();
  }

  resetForm1() {
    this.showAddForm = false;
    this.competitionForm.reset();
  }

  updateRegister() {

  }

  navigeTojugement(id: number | undefined) {
    this.router.navigate(['/jugement', id]);
  }


  showJudgePopup: boolean = false;

  openJudgePopup(memberNum: number): void {
    localStorage.setItem('selectedMemberNum', memberNum.toString());

    // Assurez-vous que this.competition et this.competition.rankingList ne sont pas undefined
    if (this.competition && this.competition.rankingList) {
      // Définissez la propriété selectedMember à l'aide de la liste des membres
      const foundMember = this.competition.rankingList.find(ranking => ranking.member?.num === memberNum);

      // Assurez-vous que foundMember est défini et non null avant d'accéder à sa propriété member
      if (foundMember !== undefined && foundMember !== null && foundMember.member !== undefined) {
        this.selectedMember = foundMember.member;
      } else {
        // Si foundMember ou foundMember.member est undefined ou null, définissez selectedMember sur null
        this.selectedMember = null;
      }
    } else {
      // Si this.competition ou this.competition.rankingList est undefined, définissez selectedMember sur null
      this.selectedMember = null;
    }

    this.showJudgePopup = true;
  }





  closeJudgePopup(): void {
    this.showJudgePopup = false;

  }



  updateCompetition() {
    if (this.selectedCompetition && this.selectedCompetition.code) {
      const updateCompetition = this.competitionForm?.value as Competition;
      const competitionCode = String(this.selectedCompetition.code);

      if (competitionCode) {
        this.competitionService.updateCompetition({
          ...updateCompetition,
          code: competitionCode
        }).subscribe(
          res => {
            this.sweetAlertService.showAlert('Succès!', 'Competition a été mis à jour avec succès.', 'success');
            this.getCompetition(competitionCode);
            this.resetForm1();
            this.operation = 'add';
          },
          error => {
            this.sweetAlertService.showAlert('Erreur!', 'Une erreur s\'est produite lors de la mise à jour du competiton.', 'error');
          }
        );
      } else {
        console.error('Invalid competition code:', this.selectedCompetition.code);
      }
    }
  }

  createCompetitionForm() {
    this.competitionForm = this.fb.group(
      {
        date: ['', Validators.required],
        location: ['', Validators.required],
        code: [{ value: '', disabled: true }, Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        numberOfParticipants: ['', Validators.required],
        amount: ['', [Validators.required, Validators.min(0)]],

      }
    )
  }


  editCompetition(competition: Competition) {
    this.operation = 'edit';
    this.selectedCompetition = competition;
    console.log(competition)
    this.competitionForm?.patchValue({
      date: competition?.date,
      location: competition.location,
      endTime: competition.endTime,
      amount: competition.amount,
      startTime: competition.startTime,
      numberOfParticipants: competition.numberOfParticipants,
    });

    this.showAddForm = true;
  }

  deleteCompetition(code: string | undefined) {
    if (code !== undefined) {
      this.competitionService.deleteCompetition(code).subscribe(
        res => {
          this.sweetAlertService.showAlert('Succès!', 'Competition a été supprimer avec succès.', 'success');
          this.router.navigate(['/competitions']);
        }
      );
    }
  }




}
