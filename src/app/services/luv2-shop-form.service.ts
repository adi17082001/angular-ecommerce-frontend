import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  // method to get countries
  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  // method to get states
  getStates(theCountryCode: string): Observable<State[]>{

    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  // method for credit card months
  getCreditCardMonths(startMonth: number): Observable<number[]>{
    
    let data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at current month and loop until

    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    return of(data);  // the "of" operator from rxjs, will wrap an object as an Observable
  }

  // method for credit card years
  getCreditCardYears(): Observable<number[]>{

    let data: number[] = [];

    // build an array for "Year" dropdown list
    // - start at current year and loop for  next 10 years

    const startYear: number = new Date().getFullYear();  // get the current year
    const endYear: number = startYear + 10;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data);
  }
}


// used for unwrap the JSON from Spring Data REST _embedded entry for counties
interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

// used for unwrap the JSON from Spring Data REST _embedded entry for states
interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}
