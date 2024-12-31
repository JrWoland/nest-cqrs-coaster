import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCoastersListQuery } from './get-coasters.query';
import { Logger } from '@nestjs/common';

@QueryHandler(GetCoastersListQuery)
export class GetCoastersListHandler
  implements IQueryHandler<GetCoastersListQuery>
{
  constructor() {}

  async execute(query: GetCoastersListQuery) {
    Logger.log('GetCoastersListQuery...');
  }
}
