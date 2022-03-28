import { Injectable, EventEmitter } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

type PagesData = { dishesPerPage: number, pagesCount: number, pageNum: number  }

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    pagesChangedEvent = new EventEmitter<PagesData>()
    private allPossibleDishesPerPage: number[] = [2, 3, 6, 10, 15, 30, 45] // Must be sorted
    private currPossibleDishesPerPage: number[] = []
    private defaultDishesPerPage: number = 10

    private pageNum: number = 1
    private pagesCount: number = 1
    private dishesPerPage: number = this.defaultDishesPerPage
    private prevDishesPerPage: number = 1
    private displayedDishesCount: number = 1

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) {}

    getPossibleDishesPerPage(): number[] {
        return this.currPossibleDishesPerPage
    }

    getDefaultDishesPerPage(): number {
        return this.defaultDishesPerPage
    }

    getDataObject(): PagesData {
        return {
            pageNum: this.pageNum,
            pagesCount: this.pagesCount,
            dishesPerPage: this.dishesPerPage
        }
    }

    getDefaultQueryParams(): { page: number, limit: number } {
        return {
            page: 1,
            limit: this.defaultDishesPerPage
        }
    }

    getCurrentQueryParams(): {page: number, limit: number} {
        return {
            page: this.pageNum,
            limit: this.dishesPerPage
        }
    }

    setQueryParams(params: Params): void {
        const pageNum = parseInt(params['page'])
        const dishesPerPage = parseInt(params['limit'])
        if (this.allPossibleDishesPerPage.includes(dishesPerPage)) {
            this.dishesPerPage = dishesPerPage
        }
        if (pageNum > 0 && (pageNum - 1) * this.dishesPerPage < this.displayedDishesCount) {
            this.pageNum = +pageNum  
        } 
        this.updatePagination(false)
    }

    setDishesPerPageCount(count: number, updatePagination: boolean = true): void {
        this.prevDishesPerPage = this.dishesPerPage
        this.dishesPerPage = count
        // this.updateQueryParams()
        if (updatePagination) this.updatePagination()
    }

    setDisplayedDishesCount(count: number, updatePagination: boolean = true): void {
        if (count === this.displayedDishesCount) return
        this.displayedDishesCount = count
        this.setPossibleDishesPerPage()
        if (updatePagination) this.updatePagination()
    }

    setCurrentPage(pageNum: number): void {
        this.pageNum = pageNum
        this.updateQueryParams()
        this.notifyChanges()
    }

    notifyChanges(): void {
        this.pagesChangedEvent.emit(this.getDataObject())
    }

    private updatePagination(calcCurrPage: boolean = true): void {
        const prevPagesDishesCount = Math.min((this.pageNum - 1) * this.prevDishesPerPage, this.displayedDishesCount)
        let pageNum
        this.pagesCount = Math.ceil(this.displayedDishesCount / this.dishesPerPage)
        // @ts-ignore
        if (calcCurrPage) pageNum = Math.max(Math.min(Math.ceil(prevPagesDishesCount / this.dishesPerPage) + (prevPagesDishesCount !== this.displayedDishesCount), this.pagesCount), 1)
        else pageNum = this.pageNum
        this.setCurrentPage(pageNum)
    }

    private setPossibleDishesPerPage(): void {
        const idx = this.allPossibleDishesPerPage.findIndex(v => v >= this.displayedDishesCount)
        this.currPossibleDishesPerPage = this.allPossibleDishesPerPage.slice(0, idx + 1)
    }

    private updateQueryParams() {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                page: this.pageNum,
                limit: this.dishesPerPage   
            }
        })
    }
}