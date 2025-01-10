import { Injectable } from '@nestjs/common';
import { readJsonFile, writeJsonFile } from '../utils/file.helper';
import path from 'path';

const dataDir = path.resolve(__dirname, `../../data/`);
const PATH = path.join(dataDir, 'coasters.json');

@Injectable()
export class LocalStorageService {
  private readonly dataPath = PATH;

  getData(): any {
    return readJsonFile(this.dataPath);
  }

  getAllChanges(): any[] {
    return readJsonFile(this.dataPath) || {};
  }

  addChange(change: any): void {
    const changes = this.getAllChanges();
    changes.push(change);
    writeJsonFile(this.dataPath, changes);
  }
}
