import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactCreate } from 'src/app/models/contact/create/ContactCreate';
import { ContactService } from 'src/app/services/contact/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-contact-modal',
  templateUrl: './add-contact-modal.component.html',
  styleUrls: ['./add-contact-modal.component.scss'],
})
export class AddContactModalComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contactService: ContactService,
    private readonly activeModal: NgbActiveModal
  ) {}
  prepareForm() {
    this.contactForm = this.formBuilder.group({
      title: [null],
      phoneNumber: [null],
      adress: [null],
      province: [null],
      district: [null],
      ownerId: [localStorage.getItem('userId')],
    });
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  registerButtonOnClick() {
    const contactDto = Object.assign(
      new ContactCreate(),
      this.contactForm.value
    );
    this.contactService.setContact(contactDto).subscribe((e) => {
      if(e.success) {
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.activeModal.close();
          window.location.reload();
        })
      }

    });
    console.log(contactDto);
  }
}
