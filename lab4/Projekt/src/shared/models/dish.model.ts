export interface Dish {
    id: number,
    name: string,
    cuisine: string,
    type: string,
    category: string,
    ingredients: string[],
    stock: number,
    currency: string,
    unitPrice: number,
    rating: number,
    ratesCount: number,
    description: string,
    images: {
        breakpoints: number[],
        cover: string[],
        gallery: string[][]
    }
}
