import { Injectable } from '@angular/core';
import { GridService } from '../../../core/services/grid.service';
import { RestService } from '../../../core/services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GridService {

  constructor(
    private readonly restService: RestService
  ) { 
    super(restService, 'odata/User');
    this.stateInitialization();
    this.defaultFilter = {
      Deleted: [
        {
          value: false,
          matchMedia: 'equals',
          oprator: 'and'
        }
      ]
    }
  }
}
