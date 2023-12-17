import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/services/members/member.service';
import { SweetAlertService } from 'src/app/services/sweetalert/sweet-alert.service';
import { Member } from 'src/app/shared/models/Member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members!: Member[];
  filteredMembers!: Member[];

  operation: String = 'add';

  formMember!: FormGroup;
  formSearch!: FormGroup;

  selectedCompetition: Member | null = null;

  showAddForm = false;

  selectMember: Member | null = null;

  totalItems: number = 0;

  currentPage = 0;
  pageSize = 5;

  constructor(private serviceMember: MemberService, private fb: FormBuilder, private sweetAlertService: SweetAlertService) {
    this.createFormMember();
    this.createFormSearch();
  }

  ngOnInit(): void {
    this.getAllMembers()
  }

  getAllMembers() {
    this.serviceMember.getMembers(this.currentPage, this.pageSize).subscribe(
      data => {
        this.members = data.content;
        console.log(this.currentPage)
        console.log(data.content)
        this.filteredMembers = data.content;
        console.log(data.content)
        this.totalItems = data.totalElements;
      }
    );
  }

  createFormMember() {
    this.formMember = this.fb.group({
      accessionDate: ['', Validators.required],
      familyName: ['', Validators.required],
      identityDocumentType: ['', Validators.required],
      identityNumber: ['', Validators.required],
      nationality: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  createFormSearch() {
    this.formSearch = this.fb.group({
      searchTerm: [''],
    });
  }

  addMember() {

    const newMember = this.formMember.value as Member;

    this.serviceMember.addMember(newMember).subscribe(
      res => {
        this.sweetAlertService.showAlert('Succès!', 'Le membere a été ajoutée avec succès.', 'success');
        this.getAllMembers();
        this.resetForm()
      },
      error => {
        this.sweetAlertService.showAlert('Erreur!', 'Une erreur s\'est produite lors de l\'ajout du membere.', 'error');
      }
    )

  }

  pageChanged(newPage: number) {
    console.log(`Current Page: ${this.currentPage}, New Page: ${newPage}`);
    if (this.currentPage !== newPage - 1) {
      this.currentPage = newPage - 1;
      this.getAllMembers();
    }
  }

  deleteMember(id: number | undefined) {
    if (id != undefined) {
      this.serviceMember.deleteMember(id).subscribe(
        res => {
          this.selectMember = null;
          this.sweetAlertService.showAlert('Succès!', 'Le membre a été supprimerr avec succès.', 'success');
          this.getAllMembers();
        },
        error => {
          this.sweetAlertService.showAlert('Erreur!', 'Une erreur s\'est produite lors de la supprission du membre.', 'error');
        }
      )
    }
  }


  updateMember() {
    if (this.selectMember && this.selectMember.num) {
      const updatedMember = this.formMember.value as Member;
      const memberNum = Number(this.selectMember.num);

      if (!isNaN(memberNum)) {
        this.serviceMember.updateMember({
          ...updatedMember,
          num: memberNum
        }).subscribe(
          res => {
            this.sweetAlertService.showAlert('Succès!', 'Le membre a été mis à jour avec succès.', 'success');
            this.getAllMembers();
            this.resetForm();
            this.operation = 'add';
          },
          error => {
            this.sweetAlertService.showAlert('Erreur!', 'Une erreur s\'est produite lors de la mise à jour du membre.', 'error');
          }
        );
      } else {
        console.error('Invalid member num:', this.selectMember.num);
      }
    }
  }


  editMember(member: Member) {
    this.operation = 'edit';
    this.selectMember = member;

    this.formMember.patchValue({
      accessionDate: member.accessionDate,
      familyName: member.familyName,
      identityDocumentType: member.identityDocumentType,
      identityNumber: member.identityNumber,
      nationality: member.nationality,
      name: member.name,
    });

    this.showAddForm = true;
  }


  cancelAddOrEdit() {
    this.operation = 'add';
    this.resetForm();
  }

  resetForm() {
    this.showAddForm = false;
    this.formMember.reset();
  }

  searchMembers() {
    const searchTerm = this.formSearch.value.searchTerm.toLowerCase();

    console.log(searchTerm)
    this.filteredMembers = this.members.filter(member =>
      (member.name && member.name.toLowerCase().includes(searchTerm)) ||
      (member.familyName && member.familyName.toLowerCase().includes(searchTerm))
    );
  }



}
