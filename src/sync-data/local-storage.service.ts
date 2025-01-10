import { Injectable } from '@nestjs/common';
import { readJsonFile, writeJsonFile } from '../utils/file.helper';
import * as path from 'path';

const dataDir = path.resolve(__dirname, `../../data/`);
const PATH = path.join(dataDir, 'coasters.json');

@Injectable()
export class LocalStorageService {
  private readonly dataPath = PATH;

  getAllChanges(): Record<string, any> {
    return readJsonFile(this.dataPath) || {};
  }

  saveData(data: any): void {
    writeJsonFile(this.dataPath, data);
  }

  updateData(key: string, value: any): void {
    const data = this.getAllChanges();
    data[key] = value;
    writeJsonFile(this.dataPath, data);
  }
}
