import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContactModalComponent } from '../components/add-contact-modal/add-contact-modal.component';
import { ContactCreate } from '../models/contact/create/ContactCreate';
import { ContactResponse } from '../models/contact/get/ContactResponse';
import { ContactService } from '../services/contact/contact.service';
import { UserService } from '../services/contact/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contacts: ContactResponse[];
  constructor(
    private readonly contactService: ContactService,
    private readonly userService: UserService,
    private readonly modalService: NgbModal,
    private readonly router:Router
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    var id = localStorage.getItem('userId');
    var userId = Number.parseInt(id);

    this.userService.getContactsByOwner(userId).subscribe((e) => {
      console.log(e);

      this.contacts = e;
    });
  }
  setContacts() {
    var crated = new ContactCreate();
    this.contactService.setContact(crated);
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  addContactOnClick() {
    this.modalService.open(AddContactModalComponent);
  }
  deleteContactOnClick(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.deleteContactByID(id).subscribe((e) => {
          console.log(e);

          if (e.success) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then((e) => {
              window.location.reload();
            });
          }
        });
      }
    });
  }
}
