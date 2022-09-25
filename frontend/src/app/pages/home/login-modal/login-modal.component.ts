import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of, switchMap, tap } from 'rxjs';

import { StorageKey } from '../../../models/storage-key.enum';
import { BusinessProfileDataService } from '../../../services/backend/business-profile-data.service';
import { UserDataService } from '../../../services/backend/user-data.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  private activeTab: 'Login' | 'Register' = 'Login';

  isLoginActive = true;
  loginForm!: FormGroup;
  loginError?: string;
  registerForm!: FormGroup;
  registerError?: string;

  @ViewChild('modal', { static: true }) modal?: any;

  constructor(
    private activeModal: NgbActiveModal,
    private businessProfileDataService: BusinessProfileDataService,
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private userDataService: UserDataService,
  ) {}

  ngOnInit() {
    this.createForms();
  }

  isTabActive(tab: 'Login' | 'Register'): boolean {
    return this.activeTab === tab;
  }

  switchTap(activeTab: 'Login' | 'Register'): void {
    this.activeTab = activeTab;
  }

  login(): void {
    const credentials: { username: string; password: string } = {
      ...this.loginForm.value,
    };
    this.userDataService
      .login(credentials.username, credentials.password)
      .pipe(
        switchMap(() => this.userDataService.isActive()),
        switchMap(() =>
          this.businessProfileDataService.getProfileId().pipe(
            tap((profileId) => {
              if (profileId) {
                this.localStorageService.setItem(
                  StorageKey.BusinessProfileId,
                  profileId,
                );
              } else {
                this.localStorageService.removeItem(
                  StorageKey.BusinessProfileId,
                );
              }
              this.loginService.modalWillClose();
              this.activeModal.close();
            }),
          ),
        ),
        catchError(() =>
          of({}).pipe(
            tap(() => (this.loginError = 'Wrong username or password!')),
          ),
        ),
      )
      .subscribe();
  }

  signUp(): void {
    const credentials: {
      username: string;
      password: string;
      passwordConfirm: string;
    } = { ...this.registerForm.value };
    if (credentials.password === credentials.passwordConfirm) {
      this.userDataService
        .signUp(credentials.username, credentials.password)
        .pipe()
        .subscribe((result) => {
          // TODO CH: Improve error handling
          if (Object.keys(result).length === 0) {
            this.registerError = 'Username already exists!';
          } else {
            this.localStorageService.removeItem(StorageKey.BusinessProfileId);

            this.userDataService
              .login(credentials.username, credentials.password)
              .subscribe();

            this.loginService.modalWillClose();
            this.modalService.dismissAll();
          }
        });
    } else {
      this.registerError = 'Passwords do not match!';
    }
  }

  private createForms() {
    this.loginForm = this.formBuilder.group({
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
    });

    this.registerForm = this.formBuilder.group({
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
      passwordConfirm: [undefined, [Validators.required]],
    });
  }
}
