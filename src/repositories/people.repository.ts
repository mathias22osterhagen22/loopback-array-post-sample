import {DefaultCrudRepository} from '@loopback/repository';
import {People, PeopleRelations} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PeopleRepository extends DefaultCrudRepository<
  People,
  typeof People.prototype.id,
  PeopleRelations
> {
  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource,
  ) {
    super(People, dataSource);
  }
}
