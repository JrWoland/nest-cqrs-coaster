import { Injectable, Logger } from '@nestjs/common';
import { readJsonFile, writeJsonFile } from 'src/utils/file.helper';
import { Coaster } from '../models/coaster.model';
import * as path from 'path';

const dataDir = path.resolve(__dirname, `../../../data/`);
const PATH = path.join(dataDir, 'coasters.json');

@Injectable()
export class CoasterRepository {
  async findAllCoasters(): Promise<Coaster[]> {
    return readJsonFile(PATH);
  }

  async findCoasterById(id: string): Promise<Coaster | void> {
    const coasters = await this.findAllCoasters();

    const coaster = coasters.find((i) => i.id === id);

    if (!coaster) return Logger.error(`Could not found coaster: ${id}`);

    return coaster;
  }

  async updateCoaster(id: string, coaster: Coaster): Promise<Coaster | void> {
    const coasters = await this.findAllCoasters();

    const index = coasters.findIndex((i) => i.id === id);

    if (index !== -1) coasters[index] = coaster;

    return writeJsonFile(PATH, coasters);
  }

  async save(coaster: Coaster) {
    const coasters = await this.findAllCoasters();

    coasters.push(coaster);

    writeJsonFile(PATH, coasters);
  }
}
