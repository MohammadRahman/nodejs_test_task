import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HelperService {
  private usedToken = new Map<string, string>();
  constructor(private readonly jwtService: JwtService) {}
  createUsers(howMany: number) {
    const users = [];
    for (let i = 0; i < howMany; i++) {
      const userId = i + 1;
      const randomNumber = Math.floor(Math.random() * 5);
      users.push({
        name: `user-${userId}`,
        email: `user${userId}@email.com`,
        phone: `+380 123456`,
        position_id: randomNumber == 0 ? randomNumber + 1 : randomNumber,
        photo: '',
      });
    }
    return users;
  }
  storeTokenInMemory(token: string): boolean {
    const key = token;
    if (this.usedToken.has(key)) {
      return true;
    }
    this.usedToken.set(key, token);
    return false;
  }
  async validateJwtToken(token: string): Promise<boolean> {
    try {
      const validToken = this.jwtService.verify(token, { secret: '123456' });
      return !!validToken;
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return false;
    }
  }
}
