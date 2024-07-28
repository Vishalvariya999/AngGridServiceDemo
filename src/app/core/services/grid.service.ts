import { inject } from '@angular/core';
import { RestService } from './rest.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { LoaderService } from '../../shared/loader/loader.service';
import { State } from '../models/entity.model';

export abstract class GridService {
  public state: State = {};
  public data$: BehaviorSubject<any> = new BehaviorSubject([]);
  public currentFilter: any = '';
  public gridState: any = {};
  public defaultFilter!: any;
  public defaultExpand!: any;
  private apiUrl: string = '';
  private readonly loaderService!: LoaderService;

  constructor(private _restService: RestService, private _apiUrl: string) {
    this.apiUrl = _apiUrl;
    this.loaderService = inject(LoaderService);
  }

  public read() {
    this.loaderService.show();
    var query = this.generateODataQuery(this.gridState);
    this._restService
      .get(this.apiUrl + (query ? '?' + query : ''), {})
      .pipe(
        tap(() => this.loaderService.hide()),
        map((x: any) => {
          this.data$.next(x.value ?? x);
          this.state.totalCount = x['@odata.count'] ?? x.length;
          return x;
        })
      )
      .subscribe();
  }

  public onFilterChange(event: any) {
    var eventString = JSON.stringify(event);
    var gridStateString = JSON.stringify(this.gridState);
    var defaultFilterString = JSON.stringify(this.defaultFilter);
    defaultFilterString = defaultFilterString?.substring(
      1,
      defaultFilterString.length - 1
    );
    gridStateString = gridStateString?.replace(',' + defaultFilterString, '');
    if (eventString === gridStateString) {
      return;
    }
    this.gridState = JSON.parse(JSON.stringify(event));
    this.read();
  }

  protected stateInitialization(state?: State) {
    if (state) {
      this.state = state;
    } else {
      this.state = {
        skip: 0,
        top: 10,
        filter: [],
        defaultGridFilter: [],
        gridFilter: [],
      };
    }
  }

  private generateODataQuery(gridState: any): string {
    const filterQueries: string[] = [];
    const queryParts: string[] = [];
    let filterData: any = {};
    filterData = Object.assign({}, {}, this.defaultFilter ?? {});
    if (gridState) {
      const { first, filters, multiSortMeta } = gridState;
      filterData = Object.assign({}, filters, this.defaultFilter ?? {});
      const sortQueries: string[] = [];
      multiSortMeta?.map((sortMeta: any) => {
        const { field, order } = sortMeta;
        sortQueries.push(`${field} ${order === 1 ? 'asc' : 'desc'}`);
      });
      if (sortQueries?.length > 0) {
        queryParts.push(`$orderby=${sortQueries.join(',')}`);
      }
    }
    for (const field in filterData) {
      for (const filterItem of filterData[field]) {
        const { value, matchMode, operator } = filterItem;
        let filterValue = value
        if( typeof value === 'string') {
          filterValue = `'${value}'`;
        }
        else {
          filterValue = `${value}`;
        }
        if (value !== null) {
          switch (matchMode) {
            case 'startsWith':
              filterQueries.push(`startswith(${field}, ${filterValue})`);
              break;
            case 'endsWith':
              filterQueries.push(`endswith(${field}, ${filterValue})`);
              break;
            case 'contains':
              filterQueries.push(`contains(${field}, ${filterValue})`);
              break;
            case 'notContains':
              break;
            case 'equals':
              filterQueries.push(`${field} eq ${filterValue}`);
              break;
            case 'notEquals':
              filterQueries.push(`${field} ne ${filterValue}`);
              break;
            case 'dateIs':
              filterQueries.push(`Date(${field}) eq ${filterValue.replace(/'/g, '')}`);
              break;
            case 'dateIsNot':
              filterQueries.push(`Date(${field}) ne ${filterValue.replace(/'/g, '')}`);
              break;
            case 'dateBefore':
              filterQueries.push(`Date(${field}) gt ${filterValue.replace(/'/g, '')}`);
              break;
            case '"dateAfter"':
              filterQueries.push(`Date(${field}) lt ${filterValue.replace(/'/g, '')}`);
              break;
          }
        }
      }
    }
    if (filterQueries.length > 0) {
      queryParts.push(`$filter=${filterQueries.join(' and ')}`);
    }
    queryParts.push(`$skip=${gridState?.first ?? 0}`);
    queryParts.push(`$top=${gridState?.rows ?? 10}`);
    queryParts.push('$count=true');
    if (this.defaultExpand) {
      queryParts.push(`$expand=${this.defaultExpand}`);
    }
    return queryParts.join('&');
  }
}
