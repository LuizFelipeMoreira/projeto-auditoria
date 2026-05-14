import { FinanceRequestResponseDTO } from './FInanceRequestDTO';

export interface StoreRequestDTO {
    name: string;
}

export interface StoreResponseDTO {
    id: number;
    name: string;
    financesRequests?: FinanceRequestResponseDTO[];
}
