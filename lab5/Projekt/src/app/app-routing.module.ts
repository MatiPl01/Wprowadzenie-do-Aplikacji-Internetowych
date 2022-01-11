import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './about/about.component'
import { AddDishComponent } from './add-dish/add-dish.component'
import { CartComponent } from './cart/cart.component'
import { DishesComponent } from './dishes/dishes.component'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { DishPageComponent } from './dish-page/dish-page.component'
import { CreateReviewComponent } from './dish-page/reviews/create-review/create-review.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dishes', component: DishesComponent },
  { path: 'dishes/:id', component: DishPageComponent, children: [
    { path: 'review', component: CreateReviewComponent }
  ] },
  { path: 'about', component: AboutComponent },
  { path: 'add-dish', component: AddDishComponent },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
