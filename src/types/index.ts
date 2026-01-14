export interface Game {
    id: number;
    title: string;
    genre: string;
    priceOriginal: string;
    priceDiscount: string;
    priceValue: number; // numeric value for calculations
    discount: string | null;
    image: string;
    tag: string | null;
    tagColor: string;
}

export interface CartItem extends Game {
    quantity: number;
}
