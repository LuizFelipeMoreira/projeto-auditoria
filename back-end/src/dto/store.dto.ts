import { FinanceRequestResponseDTO } from './finance-request.dto';

export interface StoreRequestDTO {
    name: string;
}

export interface StoreResponseDTO {
    id: number;
    name: string;
    financesRequests?: FinanceRequestResponseDTO[];
}
