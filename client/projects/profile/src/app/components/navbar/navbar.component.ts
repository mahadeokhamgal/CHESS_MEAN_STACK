import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserState } from '../../reducers/user.reducer';
import { Store } from '@ngrx/store';
import { selectUser } from '../../reducers/user.selector';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-navbar',
  imports: [MatDialogModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  user$: Observable<User | null> | undefined;

  constructor(private store: Store<{ user: UserState }>, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }

  openUserAnalytics(): void {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: "1200px",
      height: "600px",
      data: {
        profileName: 'DefaultUser',
        registeredDate: new Date(),
        isFriend: false
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
