import { PrismaFinanceRequestRepository } from './repositories/finance-request-repository/prisma-finance-request.repository';
import { PrismaStoreRepository } from './repositories/store-repository/prisma-store.repository';
import { PrismaAuthRepository } from './repositories/auth-repository/prisma-auth.repository';

import { AuthService } from './services/auth.service';
import { StoreService } from './services/store.service';
import { FinanceRequestService } from './services/finance-request.service';
import { EmailService } from './services/email.service';

import { AuthController } from './controllers/auth.controller';
import { StoreController } from './controllers/store.controller';
import { FinanceRequestController } from './controllers/finance-request.controller';

import { JwTServices } from './utils/jwt.service';

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
