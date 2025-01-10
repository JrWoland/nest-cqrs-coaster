import { Injectable, Logger } from '@nestjs/common';
import { readJsonFile, writeJsonFile } from 'src/utils/file.helper';
import { Coaster } from '../models/coaster.model';
import * as path from 'path';
import { UUID } from 'crypto';

const dataDir = path.resolve(__dirname, `../../../data/`);
const PATH = path.join(dataDir, 'coasters.json');

interface PersistCoaster {
  id: UUID;
  stuffNumber: number;
  clientsNumber: number;
  openingHour: string;
  closingHour: string;
  routeLength: number;
  wagons: [];
}

@Injectable()
export class CoasterRepository {
  async findAllCoasters(): Promise<Record<string, Coaster>> {
    const file: any = readJsonFile(PATH);

    const coasters = {};
    for (const [key, value] of Object.entries(file)) {
      const coasterValue = value as PersistCoaster;
      coasters[key] = new Coaster(
        coasterValue.id,
        coasterValue.stuffNumber,
        coasterValue.clientsNumber,
        coasterValue.openingHour,
        coasterValue.closingHour,
        coasterValue.routeLength,
        coasterValue.wagons,
      );
    }
    return coasters;
  }

  async findCoasterById(id: string): Promise<Coaster | void> {
    const coasters = await this.findAllCoasters();

    const coaster = coasters[id];

    if (!coaster) return Logger.error(`Could not found coaster: ${id}`);

    return coaster;
  }

  async save(coaster: Coaster) {
    const coasters = await this.findAllCoasters();

    coasters[coaster.id] = coaster;

    writeJsonFile(PATH, coasters);
  }
}
