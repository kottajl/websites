export interface Trip {
    id: number;

    name: string;
    country: string;
    startDate: string;
    endDate: string;
    price: number;
    maxQuantity: number;
    remained: number;
    description: string;
    imgLink: string;

    rateNumerator: number;
    rateDenominator: number;

    photoLinks: string[];
}