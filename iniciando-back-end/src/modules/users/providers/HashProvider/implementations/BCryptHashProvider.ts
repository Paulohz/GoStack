import { hash, compare } from 'bcryptjs';
import IHaseProvider from '../models/IHashProvider';

class BCryptHaseProvider implements IHaseProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHaseProvider;
