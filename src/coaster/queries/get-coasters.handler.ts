import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCoastersListQuery } from './get-coasters.query';

@QueryHandler(GetCoastersListQuery)
export class GetCoastersListHandler
  implements IQueryHandler<GetCoastersListQuery>
{
  constructor() {}

  async execute(query: GetCoastersListQuery) {
    console.log(' GetCoastersListQuery...', query);
  }
}
