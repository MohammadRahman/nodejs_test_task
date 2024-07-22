import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';

import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(User)
    itemsRepository: Repository<User>,
    entityManager: EntityManager,
  ) {
    super(itemsRepository, entityManager);
  }
}
