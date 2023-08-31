import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SubscriberService } from './subscriber.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddSubscriberDialogComponent } from './add-subscriber-dialog/add-subscriber-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Project';
  displayedColumns: string[] = ['id', 'email', 'reason', 'referral', 'other'];
  dataSource: any[] = [];

  loading: boolean = false;
  referralSources: any[] = [];
  subs: Subscription[] = [];
  @ViewChild('errorTemplate') errorTemplateRef!: TemplateRef<any>;
  subscriberErrors: any[] = [];

  constructor(private ss: SubscriberService, public dlg: MatDialog, private sb: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllSubscribers();
  }

  getAllSubscribers(): void {
    this.loading = true;
    const sub = this.ss.getAll().subscribe(
      (response) => {
        this.referralSources = response.sources;
        this.dataSource = this.getFormattedData(response.subscribers);
        this.loading = false;
      },
      (error) => {
        this.dataSource = [];
        this.loading = false;
      }
    );

    this.subs.push(sub);
  }

  getFormattedData(subscribers: any[]): any[] {
    return subscribers.map((a) => {
      return {
        ...a,
        referral: a.referralSource.name,
      };
    });
  }

  openSubscriberDialog(): void {
    const dialog = this.dlg.open(AddSubscriberDialogComponent, {
      data: {
        referralSources: this.referralSources,
      },
      disableClose: true,
      width: '400px'
    });
    const sub = dialog.afterClosed().subscribe((result) => {
      switch (result.action) {
        case 'save':
          this.subscribeToNewsletter(result.data);
          break;
      
        default:
          break;
      }
    });
    this.subs.push(sub);
  }
  
  subscribeToNewsletter(data: any): void {
    this.subscriberErrors = []
    this.ss.post(data).subscribe((res) => {
      this.sb.open('Congratulations! You are subscribed to Newsletter.', undefined,{
        duration: 1000,
      });
      this.getAllSubscribers();
    }, (badRes) => {
      this.subscriberErrors = Object.entries(badRes.error.errors);
      console.log(this.subscriberErrors)
      this.sb.openFromTemplate(this.errorTemplateRef, {
        duration: 1000
      });
    })
  }

  ngOnDestroy(): void {
    this.subs.map((a) => {
      if (!a.closed) {
        a.unsubscribe();
      }
    });
  }
}
