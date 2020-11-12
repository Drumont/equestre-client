import {Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HorseService} from '../_services/horse.service';
import {Router} from '@angular/router';
import {first, map} from 'rxjs/operators';
import {HorseModel} from '../_models/horse.model';

@Component({
  selector: 'app-horses',
  templateUrl: './horses.component.html',
  styleUrls: ['./horses.component.scss']
})
export class HorsesComponent implements OnInit, OnDestroy {

  horses: Observable<HorseModel>;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
      private horseService: HorseService,
      private router: Router
  ) {
    this.isLoading$ = this.horseService.isLoading$;
  }

  ngOnInit(): void {
    this.horses = this.horseService.getAllHorses();
  }

  delete(id) {
    this.hasError = false;
    const allSubscr = this.horseService
        .delete(id)
        .pipe(first())
        .subscribe(data => {
          if (data === 'success') {
            console.log('Data ' + data);
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
            });
          } else {
            this.hasError = true;
          }
        });
    this.unsubscribe.push(allSubscr);
  }

  edit(id){
    this.hasError = false;
    const allSubscr = this.horseService
        .edit(id)
        .subscribe(() => {
            this.router.navigate(['/horse-management/edit']);
        });
  }


  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
