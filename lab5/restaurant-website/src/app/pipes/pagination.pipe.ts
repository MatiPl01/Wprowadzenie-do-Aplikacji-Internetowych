import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'paginate'
})
export class PaginationPipe implements PipeTransform {
    transform(items: any, pageIdx: number, itemsPerPage: number, paginationTrigger: number = 0) {
        if (!items.length) return []
        const startIdx = pageIdx * itemsPerPage
        const endIdx = startIdx + itemsPerPage
        return items.slice(startIdx, endIdx)
    }
}
