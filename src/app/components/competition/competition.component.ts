import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import { Competition, CompetitionDetails } from 'src/app/shared/models/Competition';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweetalert/sweet-alert.service';
import { EMPTY } from 'rxjs';

interface ButtonItem {
  label: string;
  color: string;
  method?: string;
  args?: any[];
}

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  @Output() competitionFormChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  competitions?: Competition[];

  filteredCompetitions!: Competition[];

  competitionForm!: FormGroup;

  operation: String = 'add';

  selectedCompetition: Competition | null = null;

  showAddForm = false;

  isEnCoursMode = false;

  currentPage = 0;
  pageSize = 3;

  totalItems: number = 0;

  buttons: ButtonItem[] = [
    { label: 'En Cours', color: 'green', method: 'toggleEnCoursMode', args: ['closed'] },
    { label: 'Fermées', color: 'red', method: 'filterCompetitions', args: ['closed'] },
    { label: 'Programé', color: 'green', method: 'filterCompetitions', args: ['programmed'] },
    { label: 'Toutes', color: 'red', method: 'filterCompetitions', args: ['all'] }
  ];

  [key: string]: any;


  constructor(private competitionService: CompetitionService, private fb: FormBuilder, private router: Router, private sweetAlertService: SweetAlertService) {
    this.createCompetitionForm()
  }

  ngOnInit(): void {
    this.getAllCompetition();
    this.filterCompetitions('today');
    console.log(this.filteredCompetitions);

    this.competitionForm.valueChanges.subscribe(() => {
      this.competitionFormChanged.emit(this.competitionForm);
    });

  }

  handleUpdateClick() {
    this.showAddForm = true;
  }

  handleButtonClick(button: ButtonItem) {
    if (button.method) {
      if (button.args) {
        this[button.method](...button.args);
      } else {
        this[button.method]();
      }
    }
  }

  filterCompetitions(filterType: 'closed' | 'programmed' | 'all' | 'today') {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    this.filteredCompetitions = (this.competitions || []).filter(competition => {
      const { date, code } = competition || {};
      if (date && code) {
        const competitionDate = new Date(date);
        const competitionYear = competitionDate.getFullYear();
        const competitionMonth = competitionDate.getMonth() + 1;
        const competitionDay = competitionDate.getDate();

        switch (filterType) {
          case 'closed':
            return competitionYear < currentYear ||
              (competitionYear === currentYear && competitionMonth < currentMonth) ||
              (competitionYear === currentYear && competitionMonth === currentMonth && competitionDay < currentDay);

          case 'programmed':
            return competitionYear > currentYear ||
              (competitionYear === currentYear && competitionMonth > currentMonth) ||
              (competitionYear === currentYear && competitionMonth === currentMonth && competitionDay > currentDay);

          case 'all':
            return true;

          case 'today':
            return (
              competitionYear === currentYear &&
              competitionMonth === currentMonth &&
              competitionDay === currentDay
            );


          default:
            return false;
        }
      }
      return false;
    });

    console.log(this.filteredCompetitions);
  }



  getAllCompetition() {
    this.competitionService.getCompetitions(this.currentPage, this.pageSize).subscribe(
      data => {
        this.competitions = data.content;
        // this.filteredCompetitions = [...this.competitions];
        this.filteredCompetitions = data.content;
        console.log(this.filteredCompetitions)
        this.totalItems = data.totalElements;
      }
    )
  }

  pageChanged(newPage: number) {
    console.log(`Current Page: ${this.currentPage}, New Page: ${newPage}`);
    if (this.currentPage !== newPage - 1) {
      this.currentPage = newPage - 1;
      this.getAllCompetition();
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

  generateCode() {
    const location = this.competitionForm.get('location')?.value;
    const date = this.competitionForm.get('date')?.value;
  
    if (location && date) {

      const locationCode = location.substr(0, 3).toLowerCase();
      const yearCode = new Date(date).getFullYear().toString().substr(-2);
      const month = ('0' + (new Date(date).getMonth() + 1)).slice(-2);
      const day = ('0' + new Date(date).getDate()).slice(-2);
  
      const generatedCode = locationCode + '-' + yearCode + '-' + month + '-' + day;
  
      this.competitionForm.get('code')?.setValue(generatedCode);
    }
  }
  


  addCompetition() {
    const newCompetition = this.competitionForm.value as Competition;

    this.generateCode();
    const generatedCode = this.competitionForm.get('code')?.value;

    newCompetition.code = generatedCode;

    this.competitionService.addCompetition(newCompetition).subscribe(
      res => {
        this.sweetAlertService.showAlert('Succès!', 'La compétition a été ajoutée avec succès.', 'success');
        this.getAllCompetition();
        this.resetForm()
      },
      error => {
        this.sweetAlertService.showAlert('Erreur!', 'Une erreur s\'est produite lors de l\'ajout de la compétition.', 'error');
      }
    )
  }



  isModalVisible = false;

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  cancelAddOrEdit() {
    this.operation = 'add';
    this.resetForm();
  }

  resetForm() {
    this.showAddForm = false;
    this.competitionForm.reset();
  }

  navigateToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  toggleEnCoursMode() {
    this.isEnCoursMode = true;
    this.filterCompetitions('today');
  }

  Programe() {
    this.isEnCoursMode = true;
    this.filterCompetitions('programmed');
  }

  Passe() {
    this.isEnCoursMode = !this.isEnCoursMode;
    this.filterCompetitions('closed')
  }


}
