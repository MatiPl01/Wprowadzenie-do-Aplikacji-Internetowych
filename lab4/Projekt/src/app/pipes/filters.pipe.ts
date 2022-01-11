import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from 'src/shared/models/dish.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FiltersPipe implements PipeTransform {
    transform(dishes: Dish[], filterFunction: any) {
        return dishes.filter((dish: Dish) => {
            // @ts-ignore
            return filterFunction(dish)
        })  
    }
}
