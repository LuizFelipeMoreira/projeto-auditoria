import { FinanceRequestResponseDTO } from './FInanceRequestDto';

export interface StoreRequestDTO {
    name: string;
}

export interface StoreResponseDTO {
    id: number;
    name: string;
    financesRequests?: FinanceRequestResponseDTO[];
}
