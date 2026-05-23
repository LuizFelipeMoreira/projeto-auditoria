import { PrismaFinanceRequestRepository } from './repositories/financeRequest-repositorie/PrismaFinanceRequestRepository';
import { PrismaStoreRepository } from './repositories/store-repositorie/PrismaStoreRepositories';
import { PrismaAuthRepository } from './repositories/auth-repositorie/PrismaAuthRepository';

import { AuthService } from './services/AuthService';
import { StoreService } from './services/StoreService';
import { FinanceRequestService } from './services/FinanceRequestService';
import { EmailService } from './services/EmailService';

import { AuthController } from './controllers/AuthControllers';
import { StoreController } from './controllers/StoreController';
import { FinanceRequestController } from './controllers/FinanceRequestController';

import { JwTServices } from './utils/jwt';

export class AppContainer {
    private instances = new Map();

    constructor() {
        const authRepository = new PrismaAuthRepository();
        const storeRepository = new PrismaStoreRepository();
        const financeRequestRepository = new PrismaFinanceRequestRepository();

        const jwtServices = new JwTServices();
        const emailService = new EmailService();

        const authService = new AuthService(authRepository, jwtServices);
        const storeService = new StoreService(storeRepository);
        const financeRequestService = new FinanceRequestService(
            emailService,
            financeRequestRepository
        );

        this.instances.set(AuthService, authService);
        this.instances.set(StoreService, storeService);
        this.instances.set(FinanceRequestService, financeRequestService);

        this.instances.set(AuthController, new AuthController(authService));
        this.instances.set(StoreController, new StoreController(storeService));
        this.instances.set(
            FinanceRequestController,
            new FinanceRequestController(financeRequestService)
        );
    }

    get(someClass: any) {
        const instance = this.instances.get(someClass);

        if (!instance) {
            return new someClass();
        }

        return instance;
    }
}

export const appContainer = new AppContainer();
