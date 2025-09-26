import { FinanceRequestResponseDTO } from './FinanceRequestDTO';

export interface StoreRequestDTO {
    name: string;
}

export interface StoreResponseDTO {
    id: number;
    name: string;
    financesRequests?: FinanceRequestResponseDTO[];
}
