import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgFor} from "@angular/common";
import {NgForm} from "@angular/forms";
import {JSONFile} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Currency Converter API';

  alphabet = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  apikey: string = "wbiMG4PorlYHOXVEJwpniM4XldQYLI6RDFkfT86V";
  currencyList: any = {};
  leftQuery: any = {};
  from: string = "USD";
  to: string = "EUR";
  from_native: any;
  to_native: any;
  amount: number = 1;
  last_amount: number = 0;
  result: any = {};
  httpHeaders: any = new HttpHeaders(
    {
      'Content-Type': 'application/json; charset=utf-8;',
      "apikey": this.apikey
    });
  apiHeaders: any = this.httpHeaders;

  listPath: string = "https://api.freecurrencyapi.com/v1/currencies";
  statusPath: string = "https://api.freecurrencyapi.com/v1/status";
  requestPath: string = "https://api.freecurrencyapi.com/v1/latest";

  constructor(private http: HttpClient) {
    if (!this.currencyList.hasItem) {
      this.GetCurrencyList().subscribe((data) => {
        this.currencyList = Object.keys(data['data']).map((key) => {
          return {
            code: data['data'][key]['code'],
            name: data['data'][key]['name'],
            symbol: data['data'][key]['symbol'],
            native: data['data'][key]['symbol_native']
          }
        });
      });
    }

    this.CheckLeftQuery();
  }

  ngOnInit(): void {
  }


  CheckLeftQuery() {
    this.http.get<any>(this.statusPath, {headers: this.apiHeaders}).subscribe((data) => {
      this.leftQuery = Object.keys(data).map((key) => {
        return {
          total: data[key]['month']['total'],
          left: data[key]['month']['remaining'],
          used: data[key]['month']['used']
        }
      });
    });
  }

  SetRequestURL(): string {
    return "?base_currency=" + this.from + "&currencies=" + this.to;
  }

  GetCurrencyList(): Observable<any> {
    return this.http.get<any>(this.listPath, {headers: this.apiHeaders});
  }

  Swap(func: NgForm) {
    let newfrom = this.from;
    this.from = this.to;
    this.to = newfrom;
    this.Convert(func);
  }

  Convert(func: NgForm) {
    this.CheckLeftQuery();
    this.http.get<any>(this.requestPath + this.SetRequestURL(), {headers: this.apiHeaders}).subscribe((data) => {
        this.result = Object.keys(data['data']).map((key) => {
          this.last_amount = this.amount;
          return {
            code: key,
            from_code: this.from,
            base_amount: this.amount,
            pure_result: data['data'][key],
            result: this.amount * data['data'][key]
          }
        });
      }
    );
  }

  getNameFromCode(codename: string) {
    for (let key in this.currencyList) {
      if (this.currencyList[key]['code'] == codename) {
        return this.currencyList[key]['name'];
      }
    }
  }
}
