import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContactModalComponent } from '../components/add-contact-modal/add-contact-modal.component';
import { ContactCreate } from '../models/contact/create/ContactCreate';
import { ContactResponse } from '../models/contact/get/ContactResponse';
import { ContactService } from '../services/contact/contact.service';
import { UserService } from '../services/contact/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts: ContactResponse[];
  constructor(
    private readonly contactService: ContactService,
    private readonly userService:UserService,
    private readonly modalService: NgbModal
  ) {
   }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    var id = localStorage.getItem("userId");
    var userId = Number.parseInt(id);

    this.userService.getContactsByOwner(userId).subscribe(e => {
      this.contacts = e;
    });

  }
  setContacts(){
    var crated=new ContactCreate();
    this.contactService.setContact(crated);
  }

  addContactOnClick() {
    this.modalService.open(AddContactModalComponent);
  }

}
