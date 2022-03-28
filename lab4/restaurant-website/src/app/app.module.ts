import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { AppComponent } from './app.component';
import { DishesListComponent } from './dishes/dishes-list/dishes-list.component';
import { DishComponent } from './dishes/dish/dish.component';
import { DishesComponent } from './dishes/dishes.component';
import { PriceComponent } from './price/price.component';
import { ImgResponsiveComponent } from './img-responsive/img-responsive.component';
import { DishDetailsComponent } from './dishes/dish/dish-details/dish-details.component';
import { DishQuantityComponent } from './dishes/dish/dish-quantity/dish-quantity.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogoBoxComponent } from './logo-box/logo-box.component';
import { ChooseCurrencyComponent } from './choose-currency/choose-currency.component';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { DishOrderComponent } from './dishes/dish/dish-order/dish-order.component';
import { RatingComponent } from './dishes/dish/dish-rating/dish-rating.component';
import { BasketComponent } from './basket/basket.component';
import { BasketSummaryComponent } from './basket/basket-summary/basket-summary.component';
import { BasketItemComponent } from './basket/basket-item/basket-item.component';
import { FiltersFormComponent } from './filters-form/filters-form.component';
import { FiltersSelectComponent } from './filters-form/filters-select/filters-select.component';

import { FiltersPipe } from '../app/pipes/filters.pipe';
import { FiltersRangeComponent } from './filters-form/filters-range/filters-range.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesListComponent,
    DishComponent,
    DishesComponent,
    PriceComponent,
    ImgResponsiveComponent,
    DishDetailsComponent,
    DishQuantityComponent,
    NavBarComponent,
    LogoBoxComponent,
    ChooseCurrencyComponent,
    AddDishFormComponent,
    DishOrderComponent,
    RatingComponent,
    BasketComponent,
    BasketSummaryComponent,
    BasketItemComponent,
    FiltersFormComponent,
    FiltersSelectComponent,
    FiltersPipe,
    FiltersRangeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
